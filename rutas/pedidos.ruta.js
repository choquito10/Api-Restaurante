const { Router } = require('express');
const ruta = Router();
const {
    todosLosPedidos,
    agregarPedido,
    pedidoEspecificoUsuario,
    actualizarPedido,
    pedidoEspecificoAdmin,
    eliminarPedido
} = require('../servicios/pedidos.servicios')
const {
    verificarToken,
    verificarDatosPedido,
    verificarIdQueryParams,
    verificarEstado,
    verificarFormaPago,
    verificarTokenUsuario,
    veriricarPedidoUsuario
} = require('../middlewares/verificaciones');


ruta.get('/', verificarToken, async(req, res, next) => {
    try {
        const resultado = await todosLosPedidos();
        res.status(200).json(resultado);
    } catch (error) {
        next({ numero: 400, error })
    }
})



ruta.post('/', verificarDatosPedido, verificarFormaPago, async(req, res, next) => {
    try {
        const resultado = await agregarPedido(req.body)
        res.json(resultado);
    } catch (error) {
        next({ numero: 400, error: error.message })
    }
})


ruta.get('/usuario', verificarIdQueryParams, verificarTokenUsuario, veriricarPedidoUsuario, async(req, res, next) => {
    try {
        const resultado = await pedidoEspecificoUsuario(req.query, req.body);
        res.json(resultado)
    } catch (error) {
        next({ numero: 400, error: error.message })
    }
})


ruta.get('/admin', verificarToken, verificarIdQueryParams, async(req, res, next) => {
    try {
        const resultado = await pedidoEspecificoAdmin(req.query);
        res.json(resultado)
    } catch (error) {
        next({ numero: 400, error: error.message })
    }
})



ruta.patch('/', verificarToken, verificarIdQueryParams, verificarEstado, async(req, res, next) => {
    try {
        const resultado = await actualizarPedido(req.query, req.body);
        res.json(resultado)
    } catch (error) {
        next({ numero: 400, error: error.message })
    }
})

ruta.delete('/', verificarToken, verificarIdQueryParams, async(req, res, next) => {
    try {
        const resultado = await eliminarPedido(req.query);
        res.json(resultado)
    } catch (error) {
        next({ numero: 400, error: error.message })
    }
})



module.exports = ruta;