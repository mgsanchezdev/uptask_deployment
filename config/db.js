const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('uptasknode', 'mario', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3306',
  operatorsAliases: false,
  define:{
      timestamps:false
  },
  pool:{
      max:5,
      min:0,
      acquire:30000,
      idle:10000
  }
});