const { inicioSesion, registrarse, cambiarPermisos } = require('../querys/usuarios.querys')
const sql = require('../DB/coneccionDB');
const { jwt, secreto, secretoUsuario } = require('../jwt/jwt');
require('dotenv').config()


async function iniciarLaSesion({ usuario, email, clave }) {
    try {
        const [resultado] = await sql.query(inicioSesion, { replacements: [usuario, email, clave] });
        if (resultado.length > 0 && resultado[0].rol_admin === 1) {
            const token = jwt.sign({ usuario: resultado[0].id }, secreto, { expiresIn: '1800s' })
            return { token, id: resultado[0].id }
        } else if (resultado.length > 0 && resultado[0].rol_admin === 0) {
            const token = jwt.sign({ usuario: resultado[0].id }, secretoUsuario, { expiresIn: '1800s' })
            return { token, id: resultado[0].id }
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


async function modificarAdmin({ numero, email }) {
    try {
        const [resultado] = await sql.query(cambiarPermisos, { replacements: [numero, email] });
        if (resultado.affectedRows > 0) {
            return 'se cambio correctamente el rol del usuario'
        }
        throw new Error('ya se actualizo o ya tiene ese rol')
    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = {
    iniciarLaSesion,
    registro,
    modificarAdmin
}