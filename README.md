# Sistema de Cadastro de Usuários com API

Este projeto é um sistema de cadastro de usuários desenvolvido com uma API usando o framework Express e o Prisma como ORM para interagir com o banco de dados, a qual foi utilizado o MongoDB. A API permite criar, listar, editar e excluir usuários. O projeto foi desenvolvido para fins de estudo e teste, então um Front-End também foi desenvolvido utilizando React.

## Funcionalidades

- **Cadastro de Usuário**: Permite adicionar um novo usuário com dados únicos de email, nome e idade.
- **Listagem de Usuários**: Retorna uma lista de todos os usuários cadastrados.
- **Edição de Usuário**: Permite atualizar as informações de um usuário específico pelo seu `id`.
- **Exclusão de Usuário**: Permite excluir um usuário específico pelo seu `id`.

## Requisitos

- Node.js
- Prisma ORM
- Banco de dados compatível com Prisma (como PostgreSQL, MySQL, SQLite, MongoDB.)
- Postman (Utilizado para executar as funções da API sem o Front.)
- React

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    cd nome-do-repositorio
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure o Prisma:
   - No arquivo `prisma/schema.prisma`, configure o banco de dados.
   - Rode o comando para configurar o banco de dados e criar as tabelas necessárias:
     ```bash
     npx prisma migrate dev --name init
     ```

4. Configure o servidor

- **Inicie a API** com o seguinte comando:
  ```bash
  node server.js

5. Iniciando o Front-End
   ```bash
   npm run dev
   ```

Obs: Você pode rodar a API sem rodar o Front, mas para que o Front funcione você precisa da API.
