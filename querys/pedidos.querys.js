const traerPedidos = "SELECT id,estado,hora,descripcion,forma_pago,precio,usuario,direccion FROM pedidos";
const buscarUsuario = "SELECT id,usuario FROM usuarios WHERE email = ?";
const insertarEnplatosDePedidos = "INSERT INTO platosDePedidos (id_pedido,id_plato) VALUES (?,?)"
const insertarPedido = "INSERT INTO pedidos (estado,hora,descripcion,forma_pago,precio,usuario,direccion,id_usuario) VALUES (?,?,?,?,?,?,?,?)";
const obtenerIdPedido = "SELECT id FROM pedidos WHERE id_usuario = ?";
const idPlato = "SELECT id FROM platos WHERE id = ?";
const idPedidoConIdPedido = "SELECT * FROM pedidos WHERE id = ?";
const todoDelUsuario = "SELECT * FROM usuarios WHERE id = ?";
const idPlatos = "SELECT id_plato FROM platosDePedidos WHERE id_pedido = ? ";
const datosPlato = "SELECT precio,url_imagen,nombre,id FROM platos WHERE id = ?";
const actualizarEstado = "UPDATE pedidos SET estado= ? WHERE id = ?";


module.exports = {
    traerPedidos,
    buscarUsuario,
    insertarPedido,
    obtenerIdPedido,
    insertarEnplatosDePedidos,
    idPlato,
    idPedidoConIdPedido,
    todoDelUsuario,
    idPlatos,
    datosPlato,
    actualizarEstado
}