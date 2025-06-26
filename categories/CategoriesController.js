//carregando express
const express = require("express")
//objeto que será utilizado para criar as rotas
const router = express.Router()

//rota de categorias
router.get("/categories", (req, res) => {
    res.send("ROTA DE CATEGORIAS")
})



module.exports = router