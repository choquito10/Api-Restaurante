const Sequelize = require('sequelize');
require('dotenv').config()

const sql = new Sequelize(`mysql://${process.env.USUARIO_DB}:${process.env.CLAVE_DB}@${process.env.URL_DB}:${process.env.PUERTO_DB}/${process.env.DB}`);

module.exports = sql