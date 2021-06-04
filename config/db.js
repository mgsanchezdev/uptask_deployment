const { Sequelize } = require("sequelize");

const db = new Sequelize("uptasknode", "mario", "123456", {
  host: "localhost",
  dialect: "mysql",
  port: "3306",
  operatorsAliases: 0,
  define: {
    timestamps: false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = db;
