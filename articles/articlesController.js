//carregando express
const express = require("express")
//objeto que será utilizado para criar as rotas
const router = express.Router()
//carregando model de categorias
const Category = require("../categories/Category")
//carregando artigos
const Article = require("./Article")
//carregando slug
const slugify = require("slugify")





//rota de categorias
router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{ model: Category }]
    }).then(articles => {
        res.render("admin/articles/index", { articles: articles })
    })
})

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", { categories: categories })
    })
})

//rota para salvar os artigos no banco de dados
router.post("/articles/save", (req, res) => {
    let title = req.body.title
    let body = req.body.body
    let category = req.body.category

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles")
    })
})


router.post("/articles/delete", (req, res) => {
    let id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            //apagar uma categoria que tem o id igual ao id passado
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles")
            })

        } else { //Não for um número
            res.redirect("/admin/articles")
        }
    } else { //se for null
        res.redirect("/admin/articles")
    }
})

module.exports = router