const Sequelize = require("sequelize");
const db = require("../config/db");
const Proyectos = require("../models/Proyectos");

const Usuarios = db.define("usuarios", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING(60),
    allowNull: false, //This says that the field cannot be empty.
  },
  password: {
    type: Sequelize.STRING(60),
    allowNull: false,
  },
});

Usuarios.hasMany(Proyectos); //A user can have multiple projects

module.exports = Usuarios;
