const sql = require('../DB/coneccionDB');
const {
    traerPedidos,
    insertarPedido,
    actualizarEstado,
    Platos,
    idPedido,
    tabladeplatospedidos,
    usuario,
    pedidoEspecificoUser,
    estado,
    formaPago,
    EspecificoAdmin,
    revisionId
} = require('../querys/pedidos.querys');




async function todosLosPedidos() {
    try {
        const [resultado] = await sql.query(traerPedidos)
        for (let i = 0; i < resultado.length; i++) {
            const [estatus] = await sql.query(estado, { replacements: [resultado[i].estado] })
            const [pago] = await sql.query(formaPago, { replacements: [resultado[i].forma_pago] })
            resultado[i].estado = estatus[0].significado
            resultado[i].forma_pago = pago[0].significado
        }
        return resultado
    } catch (error) {
        throw new Error(error)
    }
}



async function agregarPedido({ id_usuario, forma_pago, direccion, detalle }) {
    try {
        const [user] = await sql.query(usuario, { replacements: [id_usuario] });
        let descripcion = '';
        let precio = 0;
        let idsYcantidad = [];
        for (let i = 0; i < detalle.length; i++) {
            let [platos] = await sql.query(Platos, { replacements: [detalle[i].id_plato] })
            descripcion += platos[0].nombre + " ";
            precio += platos[0].precio;
            idsYcantidad.push([detalle[i].id_plato, detalle[i].cantidad])
        }
        await sql.query(insertarPedido, { replacements: [1, new Date(), descripcion, forma_pago, precio, user[0].usuario, direccion, id_usuario] })
        const [pedido] = await sql.query(idPedido, { replacements: [user[0].usuario] })
        for (let i = 0; i < idsYcantidad.length; i++) {
            await sql.query(tabladeplatospedidos, { replacements: [pedido[pedido.length - 1].id, idsYcantidad[i][0], idsYcantidad[i][1]] })
        }
        return `pedido exitoso con numero de id ${pedido[pedido.length-1].id}`
    } catch (error) {
        throw new Error('error en alguno de los datos ' + error.message)
    }
}



async function pedidoEspecificoUsuario(query, body) {
    try {
        const [idDelPedido] = await sql.query(revisionId, { replacements: [body.id_usuario, query.id] })
        if (idDelPedido.length > 0) {
            const [pedido] = await sql.query(pedidoEspecificoUser, { replacements: [body.id_usuario, query.id, query.id] })
            let idsplatos = [];
            for (let i = 0; i < pedido.length; i++) {
                idsplatos.push([pedido[i].id_plato, pedido[i].cantidad])
            }
            let caractplatos = [];
            for (let i = 0; i < idsplatos.length; i++) {
                const [element] = await sql.query(Platos, { replacements: [idsplatos[i][0]] })
                caractplatos.push({ plato: element[0], cantidad: idsplatos[i][1] })
            }
            const [estatus] = await sql.query(estado, { replacements: [pedido[0].estado] })
            const [pago] = await sql.query(formaPago, { replacements: [pedido[0].forma_pago] })
            let u = pedido[0]
            return {
                usuario: u.usuario,
                nombre: u.nombre,
                email: u.email,
                telefono: u.telefono,
                direccion: u.direccion,
                estado: estatus[0].significado,
                hora: u.hora,
                descripcion: u.descripcion,
                forma_pago: pago[0].significado,
                precio: u.precio,
                platos: caractplatos
            }
        }
        throw new Error('no se encontraron pedidos')
    } catch (error) {
        throw new Error(error.message)
    }
}



async function pedidoEspecificoAdmin(query) {
    try {
        const [pedido] = await sql.query(EspecificoAdmin, { replacements: [query.id, query.id] })
        if (pedido.length > 0) {
            let idsplatos = [];
            for (let i = 0; i < pedido.length; i += 2) {
                idsplatos.push([pedido[i].id_plato, pedido[i].cantidad])
            }
            let caractplatos = [];
            for (let i = 0; i < idsplatos.length; i++) {
                const [element] = await sql.query(Platos, { replacements: [idsplatos[i][0]] })
                caractplatos.push({ plato: element[0], cantidad: idsplatos[i][1] })
            }
            const [estatus] = await sql.query(estado, { replacements: [pedido[0].estado] })
            const [pago] = await sql.query(formaPago, { replacements: [pedido[0].forma_pago] })
            let u = pedido[0]
            return {
                usuario: u.usuario,
                nombre: u.nombre,
                email: u.email,
                telefono: u.telefono,
                direccion: u.direccion,
                estado: estatus[0].significado,
                hora: u.hora,
                descripcion: u.descripcion,
                forma_pago: pago[0].significado,
                precio: u.precio,
                platos: caractplatos
            }
        }
        throw new Error('no se encontraron pedidos')
    } catch (error) {
        throw new Error(error.message)
    }
}




async function actualizarPedido(id, estado) {
    try {
        const [resultado] = await sql.query(actualizarEstado, { replacements: [estado.estado, id.id] });
        if (resultado.affectedRows > 0) {
            return 'actualizacion exitosa'
        }
        throw new Error('ya se actualizo o no se encontro el pedido')
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {
    todosLosPedidos,
    agregarPedido,
    pedidoEspecificoUsuario,
    actualizarPedido,
    pedidoEspecificoAdmin
}