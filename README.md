# autonomos-projecao

## Como rodar

### Garanta que as dependências estejam instaladas

1. Garanta que está com o node versão >=20.9.0 rodando.

### Servidor e Banco de dados

1. Entre na pasta ./service
2. Rode npm install para instalação das dependências
3. Garanta que o DATABASE_URL que está no .env corresponde as credenciais de acesso ao seu banco de dados PostgreSQL local;
4. Rode npm run prisma para rodar as migrations e deixar o banco pronto para execução.
5. Rode npm run dev para rodar o projeto localmente;
2. O servidor estará rodando em http://localhost:3000.

### Frontend

1. Entre na pasta ./client/auth-ui/
2. Rode npm install para instalar as dependências
3. Rode npm run dev para rodar o projeto local
4. A aplicação estará rodando http://localhost:5173/
