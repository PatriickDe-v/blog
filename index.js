//IMPORTAÇÕES
//carrega o modulo do express
const express = require("express")
//carrega o modulo session do express
const session = require("express-session")
//cria uma instância do módulo express
const app = express()

//constante do body-parser

const bodyParser = require("body-parser")
//importando a conexão com banco de dados
const connection = require("./database/database")


//importação das rotas
const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/articlesController")
const userController = require("./user/usersController")

//importação de models
const Article = require("./articles/Article")
const Category = require("./categories/Category")
const User = require("./user/user")


//view engine
app.set('view engine', 'ejs')

//sessions
app.use(session({
    secret: "qualquercoisa",
    cookie: {maxAge: 30000000}
}))


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
app.use("/", userController)




//rota padrão
app.get("/", (req, res) => {

    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
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

//rota para pesquisar uma categoria pelo seu slug
app.get("/category/:slug", (req, res) => {
    let slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined) {

            Category.findAll().then(categories => {
                res.render('index', {articles: category.articles, categories: categories})
            })

        }else {
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