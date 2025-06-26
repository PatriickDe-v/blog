//IMPORTAÇÕES
const Sequelize = require("sequelize")
const connection = require("../database/database")


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

module.exports = Article