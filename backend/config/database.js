const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('groupomania', 'username', 'password', {
  host: 'viaduct.proxy.rlwy.net',
  dialect: 'postgres',
});

module.exports = sequelize;
