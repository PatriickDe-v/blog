//carregando express
const express = require("express")
//objeto que será utilizado para criar as rotas
const router = express.Router()
//carregando model de categorias
const Category = require("../categories/Category")

//rota de categorias
router.get("/articles", (req, res) => {
    res.send("ROTA DE ARTIGOS")
})

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", { categories: categories })
    })
})



module.exports = router