const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('groupomania', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'viaduct.proxy.rlwy.net',
  dialect: 'postgres',
  port: 41957,
});

module.exports = sequelize;
