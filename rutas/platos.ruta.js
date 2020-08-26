const { Router } = require('express');
const ruta = Router();
const { obtenerPlatos, nuevoPlato, actualizarPlato, eliminarPlato } = require('../servicios/platos.servicios')
const { verificarToken, verificarDatosDePlato, verificarIdQueryParams } = require('../middlewares/verificaciones');


ruta.get('/', async(req, res, next) => {
    try {
        let resultado = await obtenerPlatos();
        res.json(resultado)
    } catch (error) {
        next({ numero: 404, error })
    }

})


ruta.post('/', verificarToken, verificarDatosDePlato, async(req, res, next) => {
    try {
        await nuevoPlato(req.body);
        res.json('plato agregado con exito')
    } catch (error) {
        next({ numero: 400, error })
    }

})


ruta.put('/', verificarToken, verificarDatosDePlato, verificarIdQueryParams, async(req, res, next) => {
    let { id } = req.query;
    let { precio, url_imagen, nombre } = req.body
    try {
        const resultado = await actualizarPlato(precio, url_imagen, nombre, id);
        res.json(resultado)
    } catch (error) {
        next({ numero: 400, error })
    }
})



ruta.delete('/', verificarToken, async(req, res, next) => {
    try {
        let resultado = await eliminarPlato(req.query);
        res.json(resultado)
    } catch (error) {
        next({ numero: 400, error: error.message })
    }

})



module.exports = ruta;