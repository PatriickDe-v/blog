//IMPORTAÇÕES
const Sequelize = require("sequelize")
const connection = require("../database/database")
const Category = require("../categories/Category")



//Definindo a criação da tabela 'articles' no banco de dados
const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

//UMA categoria tem vários artigos (relacionamento 1 P M)
Category.hasMany(Article)
//UM artigo pertence a uma categoria (relacionamento 1 P 1)
Article.belongsTo(Category)




module.exports = Article