//carregando express
const express = require("express")
//objeto que será utilizado para criar as rotas
const router = express.Router()

//rota para criar nova categoria
router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new")
})


module.exports = router