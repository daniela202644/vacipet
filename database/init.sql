CREATE TABLE IF NOT EXISTS tutores (
  id SERIAL PRIMARY KEY,
  nome varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  senha varchar(255) NOT NULL,
  telefone varchar(30) NOT NULL,
  cpf varchar(14),
  criado_em timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS tutores_cpf_unique
  ON tutores(cpf)
  WHERE cpf IS NOT NULL AND cpf <> '';

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
);

CREATE TABLE IF NOT EXISTS vacinas (
  id SERIAL PRIMARY KEY,
  nome varchar(255) NOT NULL UNIQUE
);

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
);

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
);
