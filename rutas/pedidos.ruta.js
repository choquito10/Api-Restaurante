const { Router } = require('express');
const ruta = Router();
const { todosLosPedidos, agregarPedido, pedidoEspecifico, actualizarPedido } = require('../servicios/pedidos.servicios')
const { verificarToken, verificarDatosPedido, verificarIdQueryParams } = require('../middlewares/verificaciones');


ruta.get('/', verificarToken, async(req, res, next) => {
    try {
        const resultado = await todosLosPedidos();
        res.json(resultado);
    } catch (error) {
        next({ numero: 400, error })
    }
})



ruta.post('/', verificarDatosPedido, async(req, res, next) => {
    try {
        const resultado = await agregarPedido(req.body)
        res.json(resultado);
    } catch (error) {
        next({ numero: 400, error: error.message })
    }
})


ruta.get('/unico', verificarToken, verificarIdQueryParams, async(req, res, next) => {
    let { id } = req.query
    try {
        const resultado = await pedidoEspecifico(id);
        res.json(resultado)
    } catch (error) {
        next({ numero: 400, error })
    }
})


ruta.patch('/', verificarToken, verificarIdQueryParams, async(req, res, next) => {
    try {
        const resultado = await actualizarPedido(req.query, req.body);
        res.json(resultado)
    } catch (error) {
        next({ numero: 400, error: error.message })
    }
})



module.exports = ruta;