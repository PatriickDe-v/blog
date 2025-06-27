//carregando express
const express = require("express")
//objeto que será utilizado para criar as rotas
const router = express.Router()
//carregando model
const Category = require("./Category")
const slugify = require("slugify")

//rota para criar nova categoria
router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new")
})

//rota para salvar as categorias no banco de dados
router.post("/categories/save", (req, res) => {
    let title = req.body.title
    if (title != undefined) {

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/")
        })

    } else {                                    //caso o usuario digite um valor nullo
        res.redirect("/admin/categories/new")
    }
})

router.get("/admin/categories", (req, res) => {
    res.render("admin/categories/index")
})

module.exports = router