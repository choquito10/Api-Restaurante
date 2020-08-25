const { Router } = require('express');
const ruta = Router();
const { iniciarLaSesion, registro } = require('../servicios/usuarios.servicios')
const { verificarDatosRegistro } = require('../middlewares/verificaciones');

ruta.get('/', async(req, res, next) => {
    try {
        const resultado = await iniciarLaSesion(req.body);
        res.status(200).json(resultado);
    } catch (error) {
        next({ numero: 401, error: error.message })
    }

})


ruta.post('/', verificarDatosRegistro, async(req, res, next) => {
    try {
        await registro(req.body);
        res.status(200).json('registrado con exito');
    } catch (error) {
        next({ numero: 406, error: error.message })
    }

})



module.exports = ruta;