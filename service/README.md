## Como rodar

### docker compose up --build


# Explicação

## Tecnologias escolhidas
## Modelo de organização de pastas/arquitetura

## Back
### Usuário com email único
### Autenticação por JWT, passando o token JWT em header da requisição e middleware de auth em todas as rotas protegidas e autenticadas
### Mostrar postman aplicação backend funcionando
#### Criar usuário
#### Tentar autenticar com senha errada
#### Autenticar com senha correta
#### Rota POST criar serviço sem token
#### Rota POST criar serviço com token
#### Rota GET pegar serviço por filtro
#### Tratativa de segurança na rota de confirmar booking, caso o user q tente atualizar não seja dono do serviço

## Front
### Design clean e direto
### Container para fácil responsividade (usar mobile, iPad, notebook ou qualquer device)
### Passar por todas as funcionalidades

DONE:
* Voltar com a busca dos serviços pelo nome

TODO:
* Listar "Meus serviços" e ter um botão pra poder confirmar algum serviço específico de algum usuário
* Mostrar status dos serviços agendados dos usuários