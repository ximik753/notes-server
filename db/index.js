const {Sequelize} = require('sequelize')
require('dotenv').config()

module.exports = new Sequelize('notes', 'root', process.env.DB_PASSWORD, {host: '127.0.0.1', dialect: 'mysql'})
