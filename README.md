# API Express MongoDB

Esta é uma API RESTful criada com Express e MongoDB usando Mongoose para modelar os dados. A API permite a criação, leitura, atualização e exclusão de documentos em uma coleção de pessoas.

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Dotenv

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/seuusuario/api-express-mongodb.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd api-express-mongodb
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Crie um arquivo `.env` na raiz do projeto e adicione suas credenciais do MongoDB:

    ```env
    DBUser=seu_usuario
    DBPassword=sua_senha
    ```

5. Inicie o servidor:

    ```bash
    npm start
    ```

## Rotas

### Criar uma nova pessoa

- **URL**: `/person`
- **Método**: `POST`
- **Descrição**: Cria uma nova pessoa.
- **Body**:
  ```json
  {
    "name": "Nome da Pessoa",
    "salary": 5000,
    "approved": true
  }```


### Códigos de Resposta:

201 Created: Pessoa criada com sucesso.
422 Unprocessable Entity: Falha na validação dos dados.
500 Internal Server Error: Erro inesperado no servidor.


### Listar todas as pessoas:
**URL**: /person
**Método**: GET
**Descrição**: Retorna uma lista de todas as pessoas.

**Códigos de Resposta**:

200 OK: Lista de pessoas retornada com sucesso.
500 Internal Server Error: Erro inesperado no servidor.


### Obter uma pessoa por ID:
URL: /person/:id
Método: GET

Descrição: Retorna uma pessoa pelo ID.

**Códigos de Resposta:**

200 OK: Pessoa encontrada com sucesso.
424 Failed Dependency: Pessoa não encontrada.
500 Internal Server Error: Erro inesperado no servidor.

### Atualizar uma pessoa por ID:
URL: /person/:id
Método: PATCH
Descrição: Atualiza uma pessoa pelo ID.
Body:
``json
{
  "name": "Nome Atualizado",
  "salary": 6000,
  "approved": false
}``

**Códigos de Resposta**:
200 OK: Pessoa atualizada com sucesso.
500 Internal Server Error: Erro inesperado no servidor.


### Excluir uma pessoa por ID:

URL: /person/:id
Método: DELETE

**Descrição**: Exclui uma pessoa pelo ID.

**Códigos de Resposta**:
200 OK: Pessoa excluída com sucesso.
422 Unprocessable Entity: Pessoa não encontrada.
500 Internal Server Error: Erro inesperado no servidor.
Configuração do Banco de Dados
A string de conexão com o MongoDB Atlas é configurada no arquivo .env:

`env
DBUser=seu_usuario
DBPassword=sua_senha`

A API usa o Mongoose para modelar os dados.
O modelo Person está definido em ./models/Person.js:

`javascript
const mongoose = require('mongoose');
const Person = mongoose.model('Person', {
  name: String,
  salary: Number,
  approved: Boolean,
});`

module.exports = Person;
### Estrutura do Projeto

`bash
api-express-mongodb/
├── models/
│   └── Person.js
├── routes/
│   └── routes.js
├── .env
├── package.json
├── server.js
└── README.md `

Inicializando a API
Para iniciar a API, execute o seguinte comando:

bash
`npm start`
