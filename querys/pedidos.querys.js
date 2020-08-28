const traerPedidos = "SELECT id,estado,hora,descripcion,forma_pago,precio,usuario,direccion FROM pedidos";
const pedidoEspecificoUser = "SELECT * FROM usuarios JOIN pedidos on usuarios.id = ? AND pedidos.id = ? JOIN platosDePedidos on platosDePedidos.id_pedido = ?";
const usuario = "SELECT * FROM usuarios WHERE id = ?"
const insertarPedido = "INSERT INTO pedidos (estado,hora,descripcion,forma_pago,precio,usuario,direccion,id_usuario) VALUES (?,?,?,?,?,?,?,?)";
const idPedido = "SELECT * FROM pedidos WHERE usuario = ?";
const Platos = "SELECT * FROM platos WHERE id = ?"
const actualizarEstado = "UPDATE pedidos SET estado= ? WHERE id = ?";
const tabladeplatospedidos = "INSERT INTO platosDePedidos(id_pedido, id_plato,cantidad) VALUES (?,?,?)"
const formaPago = "SELECT significado FROM forma_pago WHERE id_forma_pago = ?";
const estado = "SELECT significado FROM estado WHERE id_estado = ?";
const revisionId = "SELECT id FROM pedidos WHERE pedidos.id_usuario = ? AND id = ?";
const idplatos = "SELECT * FROM platosDePedidos WHERE id_pedido = ?";
const idUSUARIO = "SELECT id_usuario FROM pedidos WHERE id = ?"

module.exports = {
    traerPedidos,
    insertarPedido,
    Platos,
    actualizarEstado,
    idPedido,
    tabladeplatospedidos,
    usuario,
    pedidoEspecificoUser,
    estado,
    formaPago,
    revisionId,
    idplatos,
    idUSUARIO
}