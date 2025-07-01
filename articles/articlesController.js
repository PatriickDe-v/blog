//carregando express
const express = require("express")
//objeto que será utilizado para criar as rotas
const router = express.Router()

//rota de categorias
router.get("/articles", (req, res) => {
    res.send("ROTA DE ARTIGOS")
})

router.get("/admin/articles/new", (req, res) => {
    res.render("admin/articles/new")
})



module.exports = router