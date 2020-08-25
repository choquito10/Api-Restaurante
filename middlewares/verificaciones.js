const { jwt, secreto } = require('../jwt/jwt')

function verificarToken(req, res, next) {
    if (req.get('authorization')) {
        const token = req.get('authorization').split(' ')[1]
        const verificar = jwt.verify(token, secreto, (err, decoded) => {
            decoded ? next() : next(err)
        });
        return verificar
    } else {
        next({ numero: 400, error: 'falta el token' })
    }

}

function verificarDatosRegistro(req, res, next) {
    let { usuario, nombre, email, telefono, direccion, clave } = req.body
    if (usuario && nombre && email && telefono && direccion && clave) {
        next()

    } else {
        next({ numero: 400, error: 'faltan datos para poder registrarse' })

    }
}

function verificarDatosPedido(req, res, next) {
    let { descripcion, precio, forma_pago, direccion, email, id_plato } = req.body
    if (descripcion && precio && forma_pago && direccion && email && id_plato) {
        next()
    } else {
        next({ numero: 400, error: 'faltan datos para tomar su pedido' })
    }
}


function verificarDatosDePlato(req, res, next) {
    let { precio, url_imagen, nombre } = req.body
    if (precio && url_imagen && nombre) {
        next()
    } else {
        next({ numero: 400, error: 'faltan datos del plato' })
    }
}


function verificarIdQueryParams(req, res, next) {
    let idQuery = req.query.id;
    if (!idQuery) {
        next({ numero: 400, error: 'error con el id' })
    } else {
        next()
    }
}


function verificarEmail(req, res, next) {
    if (req.body.email) {
        next()
    } else {
        next({ numero: 400, error: 'falta el email del usuario' })
    }
}


module.exports = {
    verificarToken,
    verificarDatosRegistro,
    verificarDatosPedido,
    verificarDatosDePlato,
    verificarIdQueryParams,
    verificarEmail
}