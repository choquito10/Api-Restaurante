const sql = require('../DB/coneccionDB');
const {
    traerPedidos,
    buscarUsuario,
    idPlato,
    insertarPedido,
    obtenerIdPedido,
    insertarEnplatosDePedidos,
    idPedidoConIdPedido,
    todoDelUsuario,
    idPlatos,
    datosPlato,
    actualizarEstado
} = require('../querys/pedidos.querys');




async function todosLosPedidos() {
    try {
        const [resultado] = await sql.query(traerPedidos)
        return resultado
    } catch (error) {
        throw new Error(error)
    }
}



function tiposDeId(id_plato) {
    const convertido = JSON.parse(id_plato);
    if (convertido.length > 0) {
        return convertido
    } else {
        return id_plato
    }
}


async function agregarPedido({ descripcion, precio, forma_pago, direccion, email, id_plato }) {
    const resultadoArray = (tiposDeId(id_plato));
    try {
        const [user] = await sql.query(buscarUsuario, { replacements: [email] })
        if (user.length > 0 && typeof resultadoArray === 'object') {

            let array = [];
            for (let i = 0; i < resultadoArray.length; i++) {
                const [idDelPlato] = await sql.query(idPlato, { replacements: [resultadoArray[i]] })
                array.push(idDelPlato[0].id)
            }

            await sql.query(insertarPedido, { replacements: ['nuevo', new Date(), descripcion, forma_pago, precio, user[0].usuario, direccion, user[0].id] });
            const [idPedido] = await sql.query(obtenerIdPedido, { replacements: [user[0].id] })

            for (let i = 0; i < array.length; i++) {
                await sql.query(insertarEnplatosDePedidos, { replacements: [idPedido[idPedido.length - 1].id, array[i]] })
            }

            return 'pedido tomado exitosamente ' + user[0].usuario;

        } else {

            await sql.query(idPlato, { replacements: [resultadoArray] })

            await sql.query(insertarPedido, { replacements: ['nuevo', new Date(), descripcion, forma_pago, precio, user[0].usuario, direccion, user[0].id] });
            const [idPedido] = await sql.query(obtenerIdPedido, { replacements: [user[0].id] })

            await sql.query(insertarEnplatosDePedidos, { replacements: [idPedido[idPedido.length - 1].id, resultadoArray] })

            return 'pedido tomado exitosamente ' + user[0].usuario;

        }
    } catch (error) {
        throw new Error('error en algun dato del pedido')
    }

}



async function pedidoEspecifico(idPedi) {
    try {
        const [idPedido] = await sql.query(idPedidoConIdPedido, { replacements: [idPedi] });
        if (idPedido.length > 0) {
            let { estado, precio, forma_pago, id_usuario, id } = idPedido[0]
            const [datosUser] = await sql.query(todoDelUsuario, { replacements: [id_usuario] })
            let { direccion, usuario, nombre, email, telefono } = datosUser[0];
            const [relacionPlatos] = await sql.query(idPlatos, { replacements: [id] })
            let datosPlatos = [];
            if (relacionPlatos.length > 0) {
                for (let i = 0; i < relacionPlatos.length; i++) {
                    const [losPlatos] = await sql.query(datosPlato, { replacements: [relacionPlatos[i].id_plato] })
                    datosPlatos.push(losPlatos[0])
                }
            } else {
                throw new Error('el pedido no tiene platos asignados aun')
            }
            return { estado, precio, forma_pago, direccion, usuario, nombre, email, telefono, platosDelPedido: datosPlatos };
        }
        throw new Error('id del pedido erroneo')

    } catch (error) {
        throw new Error(error)
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
    pedidoEspecifico,
    actualizarPedido
}