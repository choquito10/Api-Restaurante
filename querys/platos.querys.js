const todosLosPatos = "SELECT id,precio,url_imagen,nombre FROM platos";
const agregarPlato = "INSERT INTO platos (precio,url_imagen,nombre) VALUES (?,?,?)";
const platoActualizado = "UPDATE platos SET precio = ?, url_imagen = ?, nombre = ? WHERE id = ?";
const platoEliminado = "DELETE FROM platos WHERE id = ? ";

module.exports = {
    todosLosPatos,
    agregarPlato,
    platoActualizado,
    platoEliminado
}