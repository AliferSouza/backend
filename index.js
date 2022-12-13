const express = require("express")
const server = express()
const cors = require('cors');
const router = express.Router()
const fs = require('fs')


server.use(
    cors({
        origin: "*",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
)

server.use(express.json({extended: true}))



router.get('/minisite/:id', (req, res) => {
    const {id} = req.params
   
    const content = fs.readFileSync(`./data/${id}.json`, 'utf-8')
    const data =  JSON.parse(content)
   

    res.send(data)
})



router.post('/minisite/', (req, res) => {
    const data = req.body  
    console.log(data)
    const id = data.dataDB.NOME
    const currentContent = data
    const updateFile = JSON.stringify(currentContent)   
    fs.writeFileSync(`./data/${id}.json`, updateFile, 'utf-8')
    res.send(data)
})




router.put('/minisite/:ids', (req, res) => {
   const data  = req.body    
   const id = data.dataDB.NOME
 

   const upDate =  data
   const updateFile = JSON.stringify(upDate)   


  fs.writeFile(`./data/${id}.json`, updateFile, function (err) {
    console.log(err)
  });

  res.send("Atualizado")

})

router.delete('/minisite/:id',(req, res) => {
    const {id}  = req.params

    fs.unlink(`./data/${id}.json`,function (err) {
        console.log(err)
    })
    res.send("Deletados")
})

server.use(router)

server.listen(3000, () => {
    console.log('Rodando servidor')
})