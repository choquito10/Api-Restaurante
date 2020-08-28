const inicioSesion = 'SELECT * FROM usuarios WHERE (usuario = ? OR email = ?) AND clave = ?';
const registrarse = 'INSERT INTO usuarios (usuario,nombre,email,telefono,direccion,clave,rol_admin) VALUES (?,?,?,?,?,?,?)';
const cambiarPermisos = 'UPDATE usuarios SET rol_admin= ? WHERE email = ?';
module.exports = {
    inicioSesion,
    registrarse,
    cambiarPermisos
}