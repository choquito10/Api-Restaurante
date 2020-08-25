CREATE TABLE platosDePedidos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_pedido INT NOT NULL,
  id_plato INT NOT NULL,
  CONSTRAINT FK_platoPedido FOREIGN KEY (id_plato)
  REFERENCES platos(id),
  CONSTRAINT FK_pedido FOREIGN KEY (id_pedido)
  REFERENCES pedidos(id)
)