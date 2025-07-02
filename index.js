//IMPORTAÇÕES
//carrega o modulo do express
const express = require("express")

//cria uma instância do módulo express
const app = express()

//constante do body-parser

const bodyParser = require("body-parser")
//importando a conexão com banco de dados
const connection = require("./database/database")


//importação das rotas
const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/articlesController")

//importação de models
const Article = require("./articles/Article")
const Category = require("./categories/Category")


//view engine
app.set('view engine', 'ejs')

//static
app.use(express.static('public'))


//configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//database
connection
    .authenticate()         //autenticação 
    .then(() => {
        console.log("Conexão feita com sucesso!")
    }).catch((error) => {
        console.log(error)
    })


app.use("/", categoriesController)
app.use("/", articlesController)

//rota padrão
app.get("/", (req, res) => {

    Article.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {

        Category.findAll().then(categories => {
            res.render('index', { articles: articles, categories: categories })
        })
    })
})

//rota para buscar o slug do artigo
app.get("/:slug", (req, res) => {
    let slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render('article', { article: article, categories: categories })
            })
        } else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })
})

//inicia a aplicação com esse método
app.listen(8080, () => {
    console.log("O servidor está rodando")
})