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
    //pega o nome, salario e approved do corpo da requisição
    const {name, salary, approved} = req.body 
    //cria o objeto pessoa 
    const person = {
        name, salary, approved
    }
    try{

        // ------ Códigos http da rota ------
        
        //Quando o servidor retorna um código de erro (HTTP) 500, indica que encontrou uma condição inesperada e que o impediu de atender à solicitação.

        //O código de resposta HTTP 422 Unprocessable Entity indica que o servidor entende o tipo de conteúdo da entidade da requisição, e a sintaxe da requisição está correta, mas não foi possível processar as instruções presentes.

        //O status HTTP "201 Created" é utilizado como resposta de sucesso, indica que a requisição foi bem sucedida e que um novo recurso foi criado


        // validações básicas
        if(!name){
            res.status(422).json({error:" é necessário inserir nome"})
            return
        }
        if(!salary){
            res.status(422).json({error:" é necessário inserir salario"})
            return
        }
        if(!approved){
            res.status(422).json({error:" é necessário inserir aprovação"})
            return
        }
        //caso passe na peneira dads validações
        
        //cria um objeto da classe Person e insere no banco de dados
        await Person.create(person)
        res.status(201).json({message:"pessoa inserida com sucesso"})
    }
    catch(error){
        //caso dê algum erro, indica seu nome e como status entrega o 500
        res.status(500).json({error:error})
    }
  })

  //Read - leitura geral de dados 
  router.get("/", async (req, res)=>{

    // ------ Códigos http da rota ------
        
    //Quando o servidor retorna um código de erro (HTTP) 500, indica que encontrou uma condição inesperada e que o impediu de atender à solicitação.

    //O código HTTP 200 OK é a resposta de status de sucesso que indica que a requisição foi bem sucedida. Uma resposta 200 é cacheável por padrão.

    try{
        //Retorna um Array de todas as pessoas dentro do banco
        const people = await Person.find()
        res.status(200).json(people)
    }
    catch(err){
        res.status(500).json({error:err})
    }
})
//Read - Leitura de dados específicos
router.get("/:id", async (req, res) =>{
        // ------ Códigos http da rota ------
        
    //Quando o servidor retorna um código de erro (HTTP) 500, indica que encontrou uma condição inesperada e que o impediu de atender à solicitação.

    //O código HTTP 200 OK é a resposta de status de sucesso que indica que a requisição foi bem sucedida. Uma resposta 200 é cacheável por padrão.

    //O código de resposta de erro do cliente HTTP 424 Failed Dependency indica que o método não pôde ser executado no recurso porque a ação solicitada dependia de outra ação e essa ação falhou.

    try{
        //pega o id no query params da requisição
        const id = req.params.id
        //encontra a pessoa pelo id
        const person = await Person.findById(id)
        //se ele não encontrar a pessoa, retorna um erro
        if(!person){
            res.status(424).json({message:"Usuário não encontrado"})
            return
        }
        //devolve o json da pessoa
        res.status(200).json(person)
    }    
    catch(err){
        res.status(500).json({error:err})
    }
  })
  
  //Update - Atualização de dados
  //patch - o patch foi escolhido pois ele realiza uma atualização parcial
router.patch("/:id", async (req, res)=>{

            // ------ Códigos http da rota ------
        
    //Quando o servidor retorna um código de erro (HTTP) 500, indica que encontrou uma condição inesperada e que o impediu de atender à solicitação.

    //O código HTTP 200 OK é a resposta de status de sucesso que indica que a requisição foi bem sucedida. Uma resposta 200 é cacheável por padrão.


      //retira nome, salario e approved do corpo da requisição
      const {name, salary, approved} = req.body 
      //retira o id dos query params
      const id = req.params.id
      //cria o objeto pessoa
      const person = {name, salary, approved}

      try{
          //encontra a pessoa pelo id e a atualiza conforme os atributos do objeto person
          const updatePerson = await Person.findByIdAndUpdate(id, person)
          
          res.status(200).json(person)
        }
        
      catch(err){
          res.status(500).json({error:err})
      }
    })
     
  

  //Delete - Destruição de dados
router.delete("/:id", async (req, res)=>{
    
            // ------ Códigos http da rota ------
        
    //Quando o servidor retorna um código de erro (HTTP) 500, indica que encontrou uma condição inesperada e que o impediu de atender à solicitação.

    //O código HTTP 200 OK é a resposta de status de sucesso que indica que a requisição foi bem sucedida. Uma resposta 200 é cacheável por padrão.

     //O código de resposta HTTP 422 Unprocessable Entity indica que o servidor entende o tipo de conteúdo da entidade da requisição, e a sintaxe da requisição está correta, mas não foi possível processar as instruções presentes.

    //pega o id dos query params
    const id = req.params.id

    try{
        const person = await Person.findByIdAndDelete(id)
        if(person){
            res.status(200).json({aviso:`Usuário ${person.name} deletado com sucesso`})
        }
        else{
            res.status(422).json({aviso:`Usuário não encontrado`})
        }
    }
    catch(err){
        res.status(500).json({error:err})
    }
    
    res.json()  
  })




module.exports = {routes:router}