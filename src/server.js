require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const porta = 5750;
const dbUser = process.env.DBUser;
const dbPassword = process.env.DBPassword;
const uri = `mongodb+srv://${dbUser}:${dbPassword}@myapicluster.aawvvon.mongodb.net/`



//configurando o express para ler JSON
app.use(
    express.urlencoded({extended: true})
)
app.use(express.json())

// Rota de teste da API
app.get("/", (req, res)=>{
     
  res.json({resposta:req.body.nome})  
})


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

