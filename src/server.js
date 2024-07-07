// importa o dotenv para mais segurança na nossa relação com o Banco de Dados
require('dotenv').config();
const express = require('express')
//utiliza o mongoose pra fazer essa relação
const mongoose = require('mongoose')
const app = express()
const porta = 5750;
//importa as rotas definidas em ./routes.js 
const {routes} = require('./routes') 

//login importada de .env
const dbUser = process.env.DBUser;
//senha importada de .env
const dbPassword = process.env.DBPassword;
//string de acesso com o mongodb atlas
const uri = `mongodb+srv://${dbUser}:${dbPassword}@myapicluster.aawvvon.mongodb.net/`

//classe para um CRUD
const Person = require('./models/Person')

//concatenar "/person" em cada rota, nesse caso eu utilizei apenas uma rota, mas para fins de escalabilidade, é mais eficaz criar uma pasta com rotas e utilizar esse método
app.use("/person", routes)

// adaptar o uso de JSON
app.use(
    express.urlencoded({extended: true})
)
app.use(express.json())




//conecta com o banco de dados e então sobe a api
mongoose
.connect
(uri)
.then(()=>{
    console.log("Conexão com o banco feita com sucesso!")
    // Ouvido  da API
    app.listen(porta, (error)=>{
        console.log(error|| "API Rodando!")
    })
    
}).catch(
    (err)=>console.log(err)
)

