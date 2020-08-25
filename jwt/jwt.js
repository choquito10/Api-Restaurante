require('dotenv').config()
const jwt = require('jsonwebtoken');
const secreto = process.env.SECRETO;


module.exports = {
    jwt,
    secreto
}