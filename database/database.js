//IMPORTAÇÃO
const Sequelize = require("sequelize")

//objeto de conexão
const connection = new Sequelize('blog', 'root', '123123', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection

