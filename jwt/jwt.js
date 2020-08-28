require('dotenv').config()
const jwt = require('jsonwebtoken');
const secreto = process.env.SECRETO;
const secretoUsuario = process.env.SECRETO_USUARIO


module.exports = {
    jwt,
    secreto,
    secretoUsuario
}