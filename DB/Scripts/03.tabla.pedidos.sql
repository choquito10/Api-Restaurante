CREATE TABLE pedidos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      estado INT NOT NULL,
      hora TIMESTAMP NOT NULL,
      descripcion VARCHAR (300) NOT NULL,
      forma_pago INT NOT NULL,
      precio INT NOT NULL,
      usuario VARCHAR (250) NOT NULL,
      direccion VARCHAR (250) NOT NULL,
      id_usuario INT NOT NULL,
      CONSTRAINT FK_usuarioPedidos FOREIGN KEY (id_usuario)
      REFERENCES usuarios(id)  ON DELETE CASCADE ON UPDATE CASCADE
)