const Sequelize = require('sequelize')
const connection = require('../connection')

const User = connection.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'Name value can not be empty'
      }
    }
  },
  bio: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Bio value can not be empty' }
    }
  },
  rank: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: { args: 1, msg: 'Rank can not be set to value of zero' }
    }
  }
})

module.exports = User
