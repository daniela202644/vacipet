# VaciPet

## Executar o projeto completo

É necessário instalar o Docker Desktop e o Git.

No terminal, dentro da pasta do projeto, execute:

```powershell
docker compose up --build
```

Acesse:

- Aplicação: http://localhost:5173
- API: http://localhost:5000
- Banco: localhost:5432

O Docker inicia e mantém juntos o frontend, o backend e o PostgreSQL. Para parar:

```powershell
docker compose down
```

Para apagar também os dados cadastrados e começar do zero:

```powershell
docker compose down -v
docker compose up --build
```

Depois de enviar o projeto para o GitHub, outra pessoa pode executá-lo com os mesmos dois comandos, sem configurar o PostgreSQL manualmente.

## Publicar com link do GitHub

1. Crie o PostgreSQL e o backend no Render usando o arquivo `render.yaml`.
2. Copie a URL pública da API, por exemplo `https://vacipet-api.onrender.com`.
3. No GitHub, abra **Settings > Pages** e selecione **GitHub Actions** como fonte.
4. Em **Settings > Secrets and variables > Actions**, crie o segredo `VITE_API_URL` com a URL da API.
5. No Render, configure `FRONTEND_URL` com `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO`.
6. Envie para o branch `main`. A página será publicada automaticamente.
