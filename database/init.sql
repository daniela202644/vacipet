CREATE TABLE IF NOT EXISTS tutores (
  id SERIAL PRIMARY KEY,
  nome varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  senha varchar(255) NOT NULL,
  telefone varchar(30) NOT NULL,
  cpf varchar(14),
  criado_em timestamp DEFAULT CURRENT_TIMESTAMP
);
