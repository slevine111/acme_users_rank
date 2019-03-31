const Sequelize = require('sequelize')

const connection = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/acme_users_rank'
)

module.exports = connection
