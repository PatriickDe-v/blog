//IMPORTAÇÕES
//carrega o modulo do express
const express = require("express")
//cria uma instância do módulo express
const app = express()
//constante do body-parser
const bodyParser = require("body-parser")

//view engine
app.set('view engine', 'ejs')

//static
app.use(express.static('public'))



//configuração do body-parser
app.use(bodyParser.urlencoded({extendes: false}))
app.use(bodyParser.json())

//rota padrão
app.get("/", (req, res) => {
    res.render('index')
})


//inicia a aplicação com esse método
app.listen(8080, () => {
    console.log("O servidor está rodando")
})