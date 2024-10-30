const express = require("express");
const usuarios = express.Router();

const controller = require("../controllers/usuarios_controller");
const perfil = require("../controllers/perfil_controller.js");
const bodegas = require("../controllers/bodegas_controller.js");
const productos = require("../controllers/productos_controller.js");
const inventario = require("../controllers/inventario_controller.js");
const carrito = require("../controllers/carrito_controller.js");



usuarios.get('/:id/:rol/:tabla', controller.home)

usuarios.post('/:id/:rol/usuarios/add_us', controller.save)
usuarios.get('/:id/:rol/usuarios/des/:id_us', controller.des)
usuarios.get('/:id/:rol/usuarios/act/:id_us', controller.act)
usuarios.get('/:id/:rol/usuarios/delete/:id_us', controller.delete)
usuarios.post('/:id/:rol/usuarios/edit/:id_us', controller.edit)

usuarios.post('/:id/:rol/perfil/edit/mail', perfil.mail);
usuarios.post('/:id/:rol/perfil/edit/clave', perfil.clave);
usuarios.post('/:id/:rol/perfil/edit/direccion', perfil.dir);


usuarios.post('/:id/:rol/bodegas/add_us', bodegas.insert)
usuarios.get('/:id/:rol/bodegas/des/:id_bo', bodegas.des)
usuarios.get('/:id/:rol/bodegas/act/:id_bo', bodegas.act)
usuarios.get('/:id/:rol/bodegas/delete/:id_bo', bodegas.delete)
usuarios.post('/:id/:rol/bodegas/edit/:id_bo', bodegas.edit)

usuarios.post('/:id/:rol/productos/add_product', productos.save)
usuarios.post('/:id/:rol/productos/edit/:id_pr', productos.edit)

usuarios.get('/:id/:rol/inventario/add_in', inventario.save)
usuarios.post('/:id/:rol/inventario/edit/:id_in/:id_producto', inventario.edit)
usuarios.get('/:id/:rol/inventario/delete/:id_in', inventario.delete)
usuarios.post('/:id/:rol/inventario/sell/:id_in/:ganancias/:id_pr', inventario.sell)
usuarios.post('/:id/:rol/inventario/agregar/:id_in/:id_pr', inventario.add)

usuarios.post('/:id/:rol/inventario/agregar_carrito/:id_inv/:precio', carrito.add)
usuarios.get('/:id/:rol/carrito/delete/:id_ca', carrito.delete)
usuarios.post('/:id/:rol/carrito/edit/:id_ca', carrito.edit)
usuarios.get('/:id/:rol/carrito/pagar', carrito.pagar)


module.exports = usuarios;