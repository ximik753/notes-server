const {DataTypes} = require('sequelize')
const sequelize = require('../')

module.exports = sequelize.define('Note', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(15)
  },
  owner_id: {
    type: DataTypes.INTEGER,
    references: {
      module: 'users',
      key: 'id'
    },
    allowNull: false
  },
  data: {
    type: DataTypes.JSON
  }
})
