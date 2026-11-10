# VaciPet

Aplicação React/Vite com API Express e PostgreSQL.

## Desenvolvimento local

1. Instale as dependências em `backend-paste` e `frontend-paste/frontend` com `npm install`.
2. Crie um banco PostgreSQL local e copie `.env.example` para `.env`, preenchendo a conexão em `DATABASE_URL` ou os campos `DB_*`.
3. Inicie o backend com `npm start` em `backend-paste`.
4. Inicie o frontend com `npm run dev` em `frontend-paste/frontend` e abra `http://localhost:5173`.

O backend prepara as tabelas ao iniciar. Senhas são armazenadas com hash; contas antigas são migradas automaticamente na inicialização.

## Publicar pelo GitHub

O GitHub mantém o código; ele não hospeda o backend Express nem o PostgreSQL. O `render.yaml` configura o Render para publicar o frontend e a API no mesmo domínio e criar um PostgreSQL gerenciado.

1. Envie o repositório e as alterações para o GitHub.
2. No Render, escolha **New > Blueprint** e conecte o repositório que contém este arquivo.
3. Revise os recursos e custos antes de confirmar. O Blueprint usa planos pagos para manter o serviço ativo e o banco persistente.
4. O Render cria a aplicação, configura `DATABASE_URL` e gera `JWT_SECRET`. O endereço `*.onrender.com` será o link para compartilhar.

Não publique arquivos `.env` nem credenciais no GitHub. O `.env.example` contém apenas nomes e exemplos de variáveis.

## Migrar dados locais

O PostgreSQL hospedado começa vazio. Para levar os dados locais, faça um backup com `pg_dump` e restaure-o no banco gerenciado pelo Render antes de compartilhar o site. Guarde o backup fora do repositório. Ao iniciar, a aplicação migra senhas antigas para hashes sem mudar as senhas usadas pelos tutores.

Configure backups do banco no serviço de hospedagem. O banco local não sincroniza automaticamente com o banco publicado.