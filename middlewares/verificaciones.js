const { jwt, secreto, secretoUsuario } = require('../jwt/jwt')

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
    let { id_usuario, forma_pago, direccion, detalle } = req.body
    if (id_usuario && forma_pago && direccion && detalle) {
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

function verificarNuevoAdmin(req, res, next) {
    let { numero, email } = req.body
    if ((numero == 1 || numero == 0) && email) {
        next()
    } else {
        next({ numero: 400, error: 'error en los datos ingresados' })
    }

}


function verificarEstado(req, res, next) {
    let { estado } = req.body
    if (estado == 1 || estado == 2 || estado == 3) {
        next()
    } else {
        next({ numero: 400, error: 'dato de estado invalido' })
    }
}


function verificarFormaPago(req, res, next) {
    let { forma_pago } = req.body
    if (forma_pago == 1 || forma_pago == 2) {
        next()
    } else {
        next({ numero: 400, error: 'dato de forma_pago invalido' })
    }
}


function verificarTokenUsuario(req, res, next) {
    if (req.get('authorization')) {
        const token = req.get('authorization').split(' ')[1]
        const verificar = jwt.verify(token, secretoUsuario, (err, decoded) => {
            decoded ? next() : next(err)
        });
        return verificar
    } else {
        next({ numero: 400, error: 'falta el token' })
    }

}

function veriricarPedidoUsuario(req, res, next) {
    if (req.get('authorization')) {
        const token = req.get('authorization').split(' ')[1]
        let { id_usuario } = req.body
        const verificar = jwt.verify(token, secretoUsuario, (err, decoded) => {
            if (decoded.usuario == id_usuario) {
                return next();
            } else {
                return next(err)
            }
        });
        return verificar
    } else {
        next({ numero: 400, error: 'error en el token' })
    }
}



module.exports = {
    verificarToken,
    verificarDatosRegistro,
    verificarDatosPedido,
    verificarDatosDePlato,
    verificarIdQueryParams,
    verificarEmail,
    verificarNuevoAdmin,
    verificarEstado,
    verificarFormaPago,
    verificarTokenUsuario,
    veriricarPedidoUsuario
}