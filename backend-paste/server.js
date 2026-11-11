require('dotenv').config({ path: require('node:path').join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('node:path');

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'vacipet-local-development-secret';

if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET precisa estar configurada em produção.');
}

// Middlewares
const allowedOrigins = new Set(
  [
    ...(process.env.FRONTEND_URL || '').split(',').map((origin) => origin.trim()).filter(Boolean),
    ...(process.env.RENDER_EXTERNAL_HOSTNAME ? [`https://${process.env.RENDER_EXTERNAL_HOSTNAME}`] : []),
  ]
);
app.use(cors({
  origin(origin, callback) {
    const isLocalDevelopment = process.env.NODE_ENV !== 'production'
      && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin || '');
    if (!origin || allowedOrigins.has(origin) || isLocalDevelopment) {
      return callback(null, true);
    }
    return callback(new Error('Origem não autorizada.'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());

// Configuração da ligação ao PostgreSQL
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DB_SSL === 'false' ? false : { rejectUnauthorized: false },
    })
  : new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'vidapet_db',
      password: process.env.DB_PASSWORD || 'postgre',
      port: Number(process.env.DB_PORT || 5432),
    });

async function prepareDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tutores (
      id SERIAL PRIMARY KEY,
      nome varchar(255) NOT NULL,
      email varchar(255) NOT NULL UNIQUE,
      senha varchar(255) NOT NULL,
      telefone varchar(30) NOT NULL,
      cpf varchar(14),
      criado_em timestamp DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await pool.query(`
    ALTER TABLE tutores ADD COLUMN IF NOT EXISTS cpf varchar(14)
  `);
  await pool.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS tutores_cpf_unique
    ON tutores(cpf)
    WHERE cpf IS NOT NULL AND cpf <> ''
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS pets (
      id SERIAL PRIMARY KEY,
      tutor_id INTEGER NOT NULL REFERENCES tutores(id) ON DELETE CASCADE,
      nome varchar(255) NOT NULL,
      especie varchar(80) NOT NULL DEFAULT 'Cao',
      raca varchar(120),
      idade varchar(50),
      peso numeric(7, 2),
      foto_url text,
      criado_em timestamp DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS vacinas (
      id SERIAL PRIMARY KEY,
      nome varchar(255) NOT NULL UNIQUE
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS carteira_vacinas (
      id SERIAL PRIMARY KEY,
      pet_id INTEGER NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
      vacina_id INTEGER REFERENCES vacinas(id) ON DELETE SET NULL,
      data_aplicacao date NOT NULL,
      data_proxima_dose date,
      lote varchar(120),
      fabricante varchar(255),
      categoria varchar(40) NOT NULL DEFAULT 'optional',
      criado_em timestamp DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await pool.query(`
    ALTER TABLE carteira_vacinas
    ADD COLUMN IF NOT EXISTS categoria varchar(40) NOT NULL DEFAULT 'optional'
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS agendamentos (
      id SERIAL PRIMARY KEY,
      pet_id INTEGER NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
      tutor_id INTEGER NOT NULL REFERENCES tutores(id) ON DELETE CASCADE,
      servico varchar(255) NOT NULL,
      veterinario varchar(255) NOT NULL DEFAULT 'A definir',
      data_hora timestamp NOT NULL,
      observacoes text,
      status varchar(40) NOT NULL DEFAULT 'agendado',
      criado_em timestamp DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await pool.query(`
    ALTER TABLE agendamentos
    ADD COLUMN IF NOT EXISTS veterinario varchar(255) NOT NULL DEFAULT 'A definir'
  `);

  const tutors = await pool.query('SELECT id, senha FROM tutores');
  for (const tutor of tutors.rows) {
    if (!/^\$2[aby]\$\d{2}\$/.test(tutor.senha)) {
      const passwordHash = await bcrypt.hash(tutor.senha, 12);
      await pool.query('UPDATE tutores SET senha = $1 WHERE id = $2', [passwordHash, tutor.id]);
    }
  }
}

function authenticateTutor(req, res, next) {
  const authorization = req.get('authorization') || '';
  const [scheme, token] = authorization.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Entre na sua conta para continuar.' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.tutorId = Number(payload.sub);
    if (!Number.isInteger(req.tutorId)) {
      return res.status(401).json({ error: 'Sessão inválida. Entre novamente.' });
    }
    return next();
  } catch {
    return res.status(401).json({ error: 'Sessão expirada. Entre novamente.' });
  }
}

app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    console.error('Falha ao consultar o PostgreSQL:', err.message);
    res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

/* ==========================================
   1. ROTAS DE TUTORES (AUTENTICAÇÃO & REGISTO)
   ========================================== */

// Registo de novo tutor
app.post('/tutores/register', async (req, res) => {
  const { nome, email, senha, telefone, cpf } = req.body;
  if (!nome || !email || !senha || !telefone || !cpf) {
    return res.status(400).json({ error: 'Nome, e-mail, CPF, telefone e palavra-passe são obrigatórios.' });
  }
  try {
    const cpfDigits = String(cpf).replace(/\D/g, '');
    if (cpfDigits.length !== 11) {
      return res.status(400).json({ error: 'Informe um CPF válido com 11 dígitos.' });
    }
    if (Buffer.byteLength(String(senha), 'utf8') > 72) {
      return res.status(400).json({ error: 'A senha deve ter no máximo 72 bytes.' });
    }

    const passwordHash = await bcrypt.hash(String(senha), 12);
    const result = await pool.query(
      `INSERT INTO tutores (nome, email, senha, telefone, cpf)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, nome, email, telefone, cpf`,
      [nome.trim(), email.trim().toLowerCase(), passwordHash, telefone, cpfDigits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')]
    );
    res.status(201).json({ message: 'Tutor registado com sucesso!', tutor: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'E-mail ou CPF já cadastrado. Entre na sua conta ou use outros dados.' });
    }
    console.error('Falha ao registar tutor:', err.code || 'erro desconhecido');
    res.status(500).json({ error: 'Erro ao registar tutor.' });
  }
});

// Login do tutor
app.post('/tutores/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: 'Informe o e-mail e a palavra-passe.' });
  }
  try {
    const identifier = String(email).trim();
    const isCpf = /^\d/.test(identifier);
    const cpfDigits = isCpf ? identifier.replace(/\D/g, '') : '';
    const normalizedCpf = cpfDigits.length === 11
      ? cpfDigits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
      : '';

    const result = await pool.query(
      `SELECT id, nome, email, telefone, cpf, senha
       FROM tutores
       WHERE LOWER(email) = $1 OR cpf = $2 OR regexp_replace(cpf, '\\D', '', 'g') = $3`,
      [identifier.toLowerCase(), normalizedCpf, cpfDigits]
    );
    const tutor = result.rows[0];
    if (!tutor || !(await bcrypt.compare(String(senha), tutor.senha))) {
      return res.status(401).json({ error: 'Email ou palavra-passe incorretos.' });
    }
    delete tutor.senha;
    const token = jwt.sign({ sub: String(tutor.id) }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Login efetuado com sucesso!', tutor, token });
  } catch (err) {
    console.error('Falha ao efetuar login:', err.code || 'erro desconhecido');
    res.status(500).json({ error: 'Erro ao efetuar login.' });
  }
});

app.use(['/pets', '/carteira', '/agendamentos'], authenticateTutor);

/* ==========================================
   2. ROTAS DE PETS
   ========================================== */

// Listar todos os pets de um tutor específico
app.get('/pets/tutor/:tutor_id', async (req, res) => {
  const { tutor_id } = req.params;
  if (Number(tutor_id) !== req.tutorId) {
    return res.status(403).json({ error: 'Você não pode acessar os dados de outro tutor.' });
  }
  try {
    const result = await pool.query('SELECT * FROM pets WHERE tutor_id = $1 ORDER BY id DESC', [tutor_id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao procurar os pets.' });
  }
});

// Cadastrar novo pet
app.post('/pets', async (req, res) => {
  const { nome, especie, raca, idade, peso, foto_url } = req.body;
  if (!nome) return res.status(400).json({ error: 'O nome do pet é obrigatório.' });
  try {
    const result = await pool.query(
      'INSERT INTO pets (tutor_id, nome, especie, raca, idade, peso, foto_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [req.tutorId, nome, especie || 'Cão', raca, idade, peso, foto_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registar o pet.' });
  }
});

/* ==========================================
   3. ROTAS DE CARTEIRA DE VACINAS
   ========================================== */

// Obter histórico de vacinas de um pet
app.get('/carteira/:pet_id', async (req, res) => {
  const { pet_id } = req.params;
  try {
    const result = await pool.query(
      `SELECT cv.*, v.nome as vacina_nome 
       FROM carteira_vacinas cv 
        JOIN pets p ON p.id = cv.pet_id
       LEFT JOIN vacinas v ON cv.vacina_id = v.id 
      WHERE cv.pet_id = $1 AND p.tutor_id = $2
       ORDER BY cv.data_aplicacao DESC`,
          [pet_id, req.tutorId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao consultar a carteira de vacinas.' });
  }
});

// Registar nova vacina aplicada
app.post('/carteira', async (req, res) => {
  const { pet_id, vacina_id, nome, data_aplicacao, data_proxima_dose, lote, fabricante, categoria } = req.body;
  if (!pet_id || !data_aplicacao || (!vacina_id && !nome)) {
    return res.status(400).json({ error: 'Pet, nome da vacina e data de aplicação são obrigatórios.' });
  }
  try {
    const petOwnership = await pool.query(
      'SELECT id FROM pets WHERE id = $1 AND tutor_id = $2',
      [pet_id, req.tutorId]
    );
    if (petOwnership.rowCount === 0) {
      return res.status(404).json({ error: 'Pet não encontrado na sua conta.' });
    }
    let resolvedVaccineId = vacina_id;
    if (!resolvedVaccineId) {
      const vaccine = await pool.query(
        'INSERT INTO vacinas (nome) VALUES ($1) ON CONFLICT (nome) DO UPDATE SET nome = EXCLUDED.nome RETURNING id',
        [String(nome).trim()]
      );
      resolvedVaccineId = vaccine.rows[0].id;
    }
    const result = await pool.query(
      `INSERT INTO carteira_vacinas (pet_id, vacina_id, data_aplicacao, data_proxima_dose, lote, fabricante, categoria)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [pet_id, resolvedVaccineId, data_aplicacao, data_proxima_dose || null, lote || null, fabricante || null, categoria || 'optional']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registar a vacina.' });
  }
});

/* ==========================================
   4. ROTAS DE AGENDAMENTOS
   ========================================== */

// Consultar agendamentos do tutor
app.get('/agendamentos/tutor/:tutor_id', async (req, res) => {
  const { tutor_id } = req.params;
  if (Number(tutor_id) !== req.tutorId) {
    return res.status(403).json({ error: 'Você não pode acessar os dados de outro tutor.' });
  }
  try {
    const result = await pool.query(
      `SELECT a.*, p.nome as pet_nome 
       FROM agendamentos a 
       JOIN pets p ON a.pet_id = p.id 
       WHERE a.tutor_id = $1 
       ORDER BY a.data_hora ASC`,
      [tutor_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao procurar agendamentos.' });
  }
});

// Criar novo agendamento
app.post('/agendamentos', async (req, res) => {
  const { pet_id, servico, veterinario, data_hora, observacoes } = req.body;
  if (!pet_id || !servico || !veterinario || !data_hora) {
    return res.status(400).json({ error: 'Pet, serviço, veterinário e data são obrigatórios.' });
  }
  try {
    const petOwnership = await pool.query(
      'SELECT id FROM pets WHERE id = $1 AND tutor_id = $2',
      [pet_id, req.tutorId]
    );
    if (petOwnership.rowCount === 0) {
      return res.status(404).json({ error: 'Pet não encontrado na sua conta.' });
    }
    const result = await pool.query(
      'INSERT INTO agendamentos (pet_id, tutor_id, servico, veterinario, data_hora, observacoes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [pet_id, req.tutorId, servico, veterinario, data_hora, observacoes || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar agendamento.' });
  }
});

//const frontendDirectory = path.join(__dirname, '..', 'frontend-paste', 'frontend', 'dist');
//app.use(express.static(frontendDirectory));
//app.get(/.*/, (req, res, next) => {
  //if (/^\/(tutores|pets|carteira|agendamentos)(\/|$)/.test(req.path)) {
    //return res.status(404).json({ error: 'Rota da API não encontrada.' });
 // }
 // return res.sendFile(path.join(frontendDirectory, 'index.html'), (error) => {
 //   if (error) next(error);
 // });
//});

/* ==========================================
   5. INICIALIZAÇÃO DO SERVIDOR
   ========================================== */
const PORT = Number(process.env.PORT || 5000);
prepareDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor VaciPet a rodar na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Falha ao preparar o PostgreSQL:', err.message);
    process.exit(1);
  });