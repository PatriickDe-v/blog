//IMPORTAÇÕES
const Sequelize = require("sequelize")
const connection = require("../database/database")

//Definindo a criação da tabela 'categories' no banco de dados
const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Category