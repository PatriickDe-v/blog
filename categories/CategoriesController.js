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
            res.redirect("/admin/categories")
        })

    } else {                                    //caso o usuario digite um valor nullo
        res.redirect("/admin/categories/new")
    }
})
//rota para listar as categorias
router.get("/admin/categories", (req, res) => {

    Category.findAll().then(categories => {
        res.render("admin/categories/index",
            { categories: categories }
        )
    })
})

router.post("/categories/delete", (req, res) => {
    let id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
                //apagar uma categoria que tem o id igual ao id passado
            Category.destroy({
                where: {
                    id: id 
                }
            }).then(() => {
                res.redirect("/admin/categories")
            })

        } else { //Não for um número
            res.redirect("/admin/categories")
        }
    } else { //se for null
        res.redirect("/admin/categories")
    }
})

//rota para edição de categoria
router.get("/admin/categories/edit/:id", (req, res) => {
    let id = req.params.id
    
    if(isNaN(id)) {
        res.redirect("admin/categories")
    }

    Category.findByPk(id).then(category => {
        if(category != undefined) {

        res.render("admin/categories/edit", {category: category})

        }else {
            res.redirect("/admin/categories")
        }
    }).catch(erro => {
        res.redirect("/admin/categories")
    })
})

//rota para atualizar a categoria
router.post("/categories/update", (req, res) => {
    let id = req.body.id
    let title = req.body.title
    let slug = req.body.slugify

    Category.update({title: title, slug: slugify(title)},{
        where: {
            id: id,
        }
    }).then(() => {
        res.redirect("/admin/categories")
    })
})

module.exports = router