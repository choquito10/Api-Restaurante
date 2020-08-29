# BACK-END APP RESTAURANTE


**Pasos para arranca el proyecto:**
1. Entrar en la carpeta DB, abrir la carpeta de scripts e insertar en orden cada uno de los scripts en la base de datos mysql.
2. Crear un archivo **.env** en el root de la carpeta poniendo todos los datos de la conexion a la base de datos.
3. En el mismo archivo **.env** poner el correo de la persona que desea que sea administradora.
4. Ejecutar el comando **npm i** para instalar todas las dependencias del proyecto.
5. Cargar todos los platos,usuarios y pedidos correspondientes para poder hacer que las rutas funcionen.
5. Ejecutar el comando **npm run start** y ya podra usar la api.



## DESARROLLADO POR CHOCO OSORIO



##End Points Testeo

## rutas de pedidos
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8edb2e76b0471180423f)

**DATOS PARA HACER LAS PRUEBAS PEDIDOS**
1. id_usuario debe ser un numero
2. forma_pago debe ser un numero (1 o 2 ) significan efectivo o credito 
3. ver su propio pedido enviar token, id usuario y id pedido
4. actualizar el estado de un pedido debe ser un numero (1 2 3) significan nuevo cocinando y finalizado
5. eliminar pedido necesita token de usuario admin y el id del pedido


## rutas de platos
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/b44912104e18c6c5fc1a)



## rutas de usuarios
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/241e1a35ba0b66e6054a)

**DATOS PARA HACER LAS PRUEBAS USUARIOS**
1. para actualizar el rol de cada usuario debe ser un numero (1 o 0) admin o noAdmin




## url del repositorio

https://github.com/choquito10/api-restaurante
