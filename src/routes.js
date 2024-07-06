const {Router} = require('express')
const express = require('express')
const Person = require('./models/Person')
const router = Router()

// configuração para as rotas da aplicação lidarem com json
router.use(
    express.urlencoded({extended: true})
)
router.use(express.json())




//Create - Criação de dados
router.post("/", async (req, res)=>{
    const {name, salary, approved} = req.body 
    const person = {
        name, salary, approved
    }
    try{
        // validações básicas
        if(!name){
            res.status(422).json({error:" é necessário inserir nome"})
            return
        }
        else if(!salary){
            res.status(422).json({error:" é necessário inserir salario"})
            return
        }
        else if(!approved){
            res.status(422).json({error:" é necessário inserir aprovação"})
            return
        }
        
        //caso passe na peneira dads validações
        else{
            //cria um objeto da classe Person e insere no banco de dados
            await Person.create(person)
            res.status(201).json({message:"pessoa inserida com sucesso"})
        }
    }
    catch(error){
        //caso dê algum erro, indica seu nome e como status entrega o 500
        res.status(500).json({error:error})
    }
  })

  //Read - leitura geral de dados 
  router.get("/", async (req, res)=>{
    try{
        const people = await Person.find()
        res.status(200).json(people)
    }
    catch(err){
        res.status(500).json({error:err})
    }
})
//Read - Leitura de dados específicos
router.get("/:id", async (req, res) =>{
    try{
        const id = req.params.id
        const person = await Person.findById(id)
        if(!person){
            res.status(424).json({message:"Usuário não encontrado"})
            return
        }
        console.log(person)
        console.log(req)
        res.status(200).json(person)
    }    
    catch(err){
        res.status(500).json({error:err})
    }
  })
  
  //Update - Atualização de dados
  //patch - atualização parcial
  router.patch("/:id", async (req, res)=>{
      const {name, salary, approved} = req.body 
      const id = req.params.id
      const person = {name, salary, approved}
      try{
        const updatePerson = await Person.findByIdAndUpdate(id, person)
        res.status(200).json(person)
        console.log("Chegou")
        console.log(person)
      }  
      catch(err){
          res.status(500).json({error:err})
      }
    })
     
  

  //Delete - Destruição de dados
router.delete("/:id", async (req, res)=>{
    const id = req.params.id
    try{
        const person = await Person.findByIdAndDelete(id)
        res.status(200).json({aviso:"Usuário deletado com sucesso"})
    }
    catch(err){
        res.status(500).json({error:err})
    }
    
    res.json()  
  })




module.exports = {routes:router}