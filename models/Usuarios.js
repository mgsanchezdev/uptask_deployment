const Sequelize = require("sequelize");
const db = require("../config/db");
const Proyectos = require("../models/Proyectos");
const bcrypt = require("bcrypt-nodejs");

const Usuarios = db.define(
  "usuarios",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING(60),
      allowNull: false, //This says that the field cannot be empty.
      validate: {
        isEmail: {
          mgs: "Agrega un correo válido",
        },
        notEmpty: {
          msg: "EL email no puede ir vacio",
        },
      },
      unique: {
        args: true,
        msg: "Usuario ya registrado",
      },
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "EL password no puede ir vacio",
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate(usuario) {
        usuario.password = bcrypt.hashSync(
          usuario.password,
          bcrypt.genSaltSync(10)
        );
      },
    },
  }
);

Usuarios.hasMany(Proyectos); //A user can have multiple projects

module.exports = Usuarios;
