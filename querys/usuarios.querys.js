const inicioSesion = 'SELECT * FROM usuarios WHERE (usuario = ? OR email = ?) AND clave = ?';
const registrarse = 'INSERT INTO usuarios (usuario,nombre,email,telefono,direccion,clave,rol_admin) VALUES (?,?,?,?,?,?,?)';

module.exports = {
    inicioSesion,
    registrarse
}