const {Sequelize} = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize('notes', 'root', process.env.DB_PASSWORD, {host: '127.0.0.1', dialect: 'mysql'})

module.exports = sequelize
global.sequelize = sequelize
