const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', '', '', {
  dialect: 'sqlite',
  storage: './database/database.sqlite' ,
});
sequelize.authenticate().then(() => {
  console.log('Connection has been established sucessfully !');
});
module.exports = sequelize;
