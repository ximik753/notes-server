const sequelize = require('../')
const Note = require('./Note')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User', {
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

User.hasMany(Note, {foreignKey: 'owner_id'})

module.exports = User
