require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const porta = 5750;
const {routes} = require('./routes') 

const dbUser = process.env.DBUser;
const dbPassword = process.env.DBPassword;
const uri = `mongodb+srv://${dbUser}:${dbPassword}@myapicluster.aawvvon.mongodb.net/`

const Person = require('./models/Person')

app.use("/person", routes)
app.use(
    express.urlencoded({extended: true})
)
app.use(express.json())





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

