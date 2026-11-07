const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || true,
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
}

// Rota de teste inicial
app.get('/', (req, res) => {
  res.send('API do VaciPet a funcionar perfeitamente!');
});

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

    const result = await pool.query(
      `INSERT INTO tutores (nome, email, senha, telefone, cpf)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, nome, email, telefone, cpf`,
      [nome.trim(), email.trim().toLowerCase(), senha, telefone, cpfDigits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')]
    );
    res.status(201).json({ message: 'Tutor registado com sucesso!', tutor: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registar tutor. Verifique se o email já está em uso.' });
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
      `SELECT id, nome, email, telefone, cpf
       FROM tutores
       WHERE (LOWER(email) = $1 OR cpf = $2 OR regexp_replace(cpf, '\\D', '', 'g') = $3) AND senha = $4`,
      [identifier.toLowerCase(), normalizedCpf, cpfDigits, senha]
    );
    if (result.rows.length > 0) {
      res.json({ message: 'Login efetuado com sucesso!', tutor: result.rows[0] });
    } else {
      res.status(401).json({ error: 'Email ou palavra-passe incorretos.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao efetuar login.' });
  }
});

/* ==========================================
   2. ROTAS DE PETS
   ========================================== */

// Listar todos os pets de um tutor específico
app.get('/pets/tutor/:tutor_id', async (req, res) => {
  const { tutor_id } = req.params;
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
  const { tutor_id, nome, especie, raca, idade, peso, foto_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pets (tutor_id, nome, especie, raca, idade, peso, foto_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [tutor_id, nome, especie || 'Cão', raca, idade, peso, foto_url]
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
       LEFT JOIN vacinas v ON cv.vacina_id = v.id 
       WHERE cv.pet_id = $1 
       ORDER BY cv.data_aplicacao DESC`,
      [pet_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao consultar a carteira de vacinas.' });
  }
});

// Registar nova vacina aplicada
app.post('/carteira', async (req, res) => {
  const { pet_id, vacina_id, data_aplicacao, data_proxima_dose, lote, fabricante } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO carteira_vacinas (pet_id, vacina_id, data_aplicacao, data_proxima_dose, lote, fabricante) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [pet_id, vacina_id, data_aplicacao, data_proxima_dose, lote, fabricante]
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
  const { pet_id, tutor_id, servico, data_hora, observacoes } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO agendamentos (pet_id, tutor_id, servico, data_hora, observacoes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [pet_id, tutor_id, servico, data_hora, observacoes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar agendamento.' });
  }
});

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