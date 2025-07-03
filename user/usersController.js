const express = require("express")
const router = express.Router()
const User = require("./user")
const bcrypt = require("bcryptjs")

router.get("/admin/users", (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", { users: users })
    })
})

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create")
})

router.post("/users/create", (req, res) => {
    let email = req.body.email
    let password = req.body.password

    //logica para emails duplicados
    User.findOne({ where: { email: email } }).then(user => {
        if (user == undefined) {
            //hash de senha
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(password, salt)

            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/")
            }).catch(err => {
                res.redirect("/")
            })
        } else {
            res.redirect("/admin/user/create")
        }
    })




    //hash de senha
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)

    User.create({
        email: email,
        password: hash
    }).then(() => {
        res.redirect("/")
    }).catch(err => {
        res.redirect("/")
    })
})

module.exports = router