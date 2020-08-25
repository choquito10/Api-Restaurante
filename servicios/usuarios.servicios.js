const { inicioSesion, registrarse } = require('../querys/usuarios.querys')
const sql = require('../DB/coneccionDB');
const { jwt, secreto } = require('../jwt/jwt');
require('dotenv').config()


async function iniciarLaSesion({ usuario, email, clave }) {
    try {
        const [resultado] = await sql.query(inicioSesion, { replacements: [usuario, email, clave] });
        if (resultado.length > 0 && resultado[0].rol_admin === 1) {
            const token = jwt.sign({ usuario: email }, secreto, { expiresIn: '1800s' })
            return { token, email }
        } else if (resultado.length > 0 && resultado[0].rol_admin === 0) {
            return `bienvenido ${email}`
        }
        throw new Error('usuario o contraseña incorrecta')
    } catch (error) {
        throw new Error(error)
    }

}


async function registro({ usuario, nombre, email, telefono, direccion, clave }) {
    try {
        if (email === process.env.ADMINISTRADOR) {
            return await sql.query(registrarse, { replacements: [usuario, nombre, email, telefono, direccion, clave, rol_admin = true] });
        }
        return await sql.query(registrarse, { replacements: [usuario, nombre, email, telefono, direccion, clave, rol_admin = false] });
    } catch (error) {
        throw new Error(error.errors[0].message)
    }

}

module.exports = {
    iniciarLaSesion,
    registro
}