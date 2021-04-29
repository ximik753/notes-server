const {DataTypes} = require('sequelize')
const sequelize = require('../')

module.exports = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  login: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  refresh_token: {
    type: DataTypes.STRING(165)
  }
})
