//IMPORTAÇÕES
const Sequelize = require("sequelize")
const connection = require("../database/database")

//Definindo a criação da tabela 'users' no banco de dados
const User = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


module.exports = User