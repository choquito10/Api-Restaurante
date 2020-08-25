const sql = require('../DB/coneccionDB');
const { todosLosPatos, agregarPlato, platoActualizado, platoEliminado } = require('../querys/platos.querys');


async function obtenerPlatos() {
    try {
        const [resultado] = await sql.query(todosLosPatos);
        return resultado
    } catch (error) {
        throw new Error(error.message)
    }

}


async function nuevoPlato({ precio, url_imagen, nombre }) {
    try {
        const resultado = await sql.query(agregarPlato, { replacements: [precio, url_imagen, nombre] })
        return resultado
    } catch (error) {
        throw new Error(error.message)
    }

}


async function actualizarPlato(precio, url, nombre, id) {
    try {
        const [resultado] = await sql.query(platoActualizado, { replacements: [precio, url, nombre, id] });
        if (resultado.affectedRows > 0) {
            return 'actualizacion exitosa'
        }
        return 'ya fue actualizado o no existe un plato con ese id';
    } catch (error) {
        throw new Error(error.message)
    }
}


async function eliminarPlato({ id }) {
    try {
        const [resultado] = await sql.query(platoEliminado, { replacements: [id] })
        if (resultado.affectedRows > 0) {
            return 'eliminacion exitosa'
        }
        return 'no se pudo eliminar ese plato por que tiene relacion con algun pedido';
    } catch (error) {
        throw new Error(error.message)
    }

}


module.exports = {
    obtenerPlatos,
    nuevoPlato,
    actualizarPlato,
    eliminarPlato
}