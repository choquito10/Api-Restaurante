const express = require('express');
const app = express();
const rutasAcceso = require('./rutas/usuarios.ruta')
const rutasPlatos = require('./rutas/platos.ruta')
const rutasPedidos = require('./rutas/pedidos.ruta')
const helmet = require('helmet');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(cors());


app.use('/acceso', rutasAcceso);
app.use('/platos', rutasPlatos);
app.use('/pedidos', rutasPedidos);


app.use((err, req, res, next) => {
    if (err) {
        err.message ? res.status(400).json(err.message) : res.status(err.numero).json(err.error)
    }
});

app.listen(PORT, () => {
    console.log('Escuchando en puerto ' + PORT)
})