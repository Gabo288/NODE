const inventario = require("./productos_controller");

const controller = {}


controller.home = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) console.log(err);
        conn.query(`select * from usuarios where id_us=${req.params.id} && rol='${autoridad(req.params.rol)}'`, (err, verif) => {
            if (err) console.log(err);
            console.log(verif[0]);
            if (verif[0] == undefined) {

                res.redirect('/login');
            } else {

                conn.query('select ganancias, id_us,rut_us as rut, usuarios.str_nombre, str_ap, mail, rol, usuarios.str_dir, usuarios.id_co, comuna_cl.str_descripcion as str_co, comuna_cl.id_pr, provincia_cl.str_descripcion as str_pr, provincia_cl.id_re, region_cl.str_descripcion as str_re, usuarios.estado, usuarios.id_bo, bodega.str_nombre as str_bo, bodega.str_dir as dir_bo, bodega.id_co as co_id from bodega left join (usuarios left join (comuna_cl left join (provincia_cl left join region_cl on provincia_cl.id_re=region_cl.id_re) on comuna_cl.id_pr=provincia_cl.id_pr) on comuna_cl.id_co=usuarios.id_co) on bodega.id_bo=usuarios.id_bo', (err, rows) => {
                    if (err) console.log(err);
                    conn.query(`select ganancias, clave, id_us,rut_us as rut, usuarios.str_nombre, str_ap, mail, rol, usuarios.str_dir, usuarios.id_co, comuna_cl.str_descripcion as str_co, comuna_cl.id_pr, provincia_cl.str_descripcion as str_pr, provincia_cl.id_re, region_cl.str_descripcion as str_re, usuarios.estado, usuarios.id_bo, bodega.str_nombre as str_bo, bodega.str_dir as dir_bo, bodega.id_co as co_id from bodega left join (usuarios left join (comuna_cl left join (provincia_cl left join region_cl on provincia_cl.id_re=region_cl.id_re) on comuna_cl.id_pr=provincia_cl.id_pr) on comuna_cl.id_co=usuarios.id_co) on bodega.id_bo=usuarios.id_bo where id_us=${req.params.id}`, (err, log) => {
                        if (err) console.log(err);
                        conn.query('select id_co,comuna_cl.id_pr,comuna_cl.str_descripcion, provincia_cl.str_descripcion as str_pr, provincia_cl.id_re, region_cl.str_descripcion as str_re from comuna_cl left join (provincia_cl left join region_cl on provincia_cl.id_re=region_cl.id_re) on provincia_cl.id_pr=comuna_cl.id_pr', (err, com) => {
                            if (err) console.log(err);
                            conn.query('select id_pr,provincia_cl.str_descripcion,provincia_cl.id_re, region_cl.str_descripcion as str_re, provincia_cl.num_comunas from provincia_cl left join region_cl on region_cl.id_re=provincia_cl.id_re', (err, prov) => {
                                if (err) console.log(err);
                                conn.query('select * from region_cl', (err, reg) => {
                                    if (err) console.log(err);
                                    conn.query('select estado,bodega.id_bo, str_nombre, str_dir, bodega.id_co, comuna_cl.str_descripcion as str_co, provincia_cl.id_pr, provincia_cl.str_descripcion as str_pr, region_cl.id_re, region_cl.str_descripcion as str_re from bodega left join (comuna_cl left join (provincia_cl left join region_cl on provincia_cl.id_re=region_cl.id_re) on provincia_cl.id_pr=comuna_cl.id_pr) on comuna_cl.id_co=bodega.id_co', (err, bod) => {
                                        if (err) console.log(err);
                                        conn.query('select productos.id_producto, productos.str_nombre as str_in, productos.marca, productos.tipo, id_in, unidades, precio, inventario.id_bo, bodega.str_nombre as str_bo,estado, bodega.str_dir, comuna_cl.str_descripcion as str_co from productos left join (inventario left join (bodega left join comuna_cl on bodega.id_co=comuna_cl.id_co) on inventario.id_bo=bodega.id_bo) on inventario.id_producto = productos.id_producto', (err, inv) => {
                                            if (err) console.log(err);
                                            conn.query('select * from productos', (err, prod) => {
                                                if (err) console.log(err);
                                                conn.query(`select ganancias, clave, id_us,rut_us as rut, usuarios.str_nombre, str_ap, mail, rol, usuarios.str_dir, usuarios.id_co, comuna_cl.str_descripcion as str_co, comuna_cl.id_pr, provincia_cl.str_descripcion as str_pr, provincia_cl.id_re, region_cl.str_descripcion as str_re from usuarios left join (comuna_cl left join (provincia_cl left join region_cl on provincia_cl.id_re=region_cl.id_re) on comuna_cl.id_pr=provincia_cl.id_pr) on comuna_cl.id_co=usuarios.id_co where id_us=${req.params.id}`, (err, cl) => {
                                                    if (err) console.log(err);

                                                    conn.query(`select id_us,carrito.id_inv,carrito.precio, carrito.cantidad, carrito.precio, productos.str_nombre, marca , tipo from carrito left join (productos left join inventario on inventario.id_producto = productos.id_producto) on inventario.id_in = carrito.id_inv where id_us=${req.params.id}`, (err, car) => {
                                                        if (err) console.log(err);
                                                        conn.query(`select id_venta, boleta.id_us,usuarios.str_nombre,str_ap,rut_us,boleta.fecha, boleta.hora,total,salidas.id_inv,cantidad,salidas.precio, inventario.id_producto,productos.str_nombre from usuarios inner join (boleta left join (salidas left join (inventario left join productos on inventario.id_producto=productos.id_producto) on salidas.id_inv=inventario.id_in) on (boleta.fecha=salidas.fecha and boleta.hora = salidas.hora)) on usuarios.id_us=boleta.id_us`, (err, bol) => {
                                                            if (err) console.log(err);
                                                        conn.query(`select id_venta, boleta.id_us,usuarios.str_nombre,str_ap,rut_us,boleta.fecha, boleta.hora,total from boleta left join usuarios on usuarios.id_us=boleta.id_us`, (err, vent) => {
                                                            if (err) console.log(err);
                                                            res.render((req.params.tabla=='ventas'?'boletas':req.params.tabla), {
                                                                tabla: req.params.tabla,
                                                                usuarios: rows,
                                                                sujeto: (req.params.rol > 1 ? log : cl),
                                                                autoridad: req.params.rol,
                                                                comunas: com,
                                                                provincias: prov,
                                                                regiones: reg,
                                                                bodegas: bod,
                                                                inventario: inv,
                                                                productos: prod,
                                                                carrito: car,
                                                                boletas:bol,
                                                                ventas:vent
                                                            })
                                                        })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    });
                                });
                            });
                        });
                    });
                });
            }
        });
    });
};

controller.save = (req, res) => {
    console.log(req.body)
    req.getConnection((err, conn) => {
        if (err) console.log(err);
        conn.query(`insert into usuarios (rut_us, str_nombre, str_ap, mail, clave, rol, str_dir, id_co, estado, id_bo) values ('${req.body.rut}','${req.body.str_nombre}', '${req.body.str_ap}', '${req.body.mail}', 'aux', '${req.body.rol}', '${req.body.str_dir}',${req.body.id_co}, 'en espera','0'); insert into ganancias (id_us) values (${req.body.id});`, (err) => {
            if (err) console.log(err);
            res.redirect(`/log/${req.params.id}/${req.params.rol}/usuarios`);
        });
    })
}

controller.des = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) console.log(err);
        conn.query(`update usuarios set estado='inactivo' where id_us=${req.params.id_us}`, (err) => {
            if (err) console.log(err);
            res.redirect(`/log/${req.params.id}/${req.params.rol}/usuarios`);
        })
    })
};
controller.act = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) console.log(err);
        conn.query(`update usuarios set estado='activo' where id_us=${req.params.id_us}`, (err) => {
            if (err) console.log(err);
            res.redirect(`/log/${req.params.id}/${req.params.rol}/usuarios`);
        })
    })
};
controller.delete = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) console.log(err);
        conn.query(`delete from usuarios where id_us=${req.params.id_us}`, (err) => {
            if (err) console.log(err);
            res.redirect(`/log/${req.params.id}/${req.params.rol}/usuarios`);
        })
    })
};

controller.edit = (req, res) => {
    console.log(req.body);
    req.getConnection((err, conn) => {
        if (err) console.log(err);
        conn.query(`update usuarios set rut_us='${req.body.rut}', str_nombre='${req.body.str_nombre}', str_ap='${req.body.str_ap}', mail='${req.body.mail}',rol='${req.body.rol}', str_dir='${req.body.str_dir}', id_co=${req.body.id_co}, estado='${req.body.estado}', id_bo=${req.body.id_bo} where id_us=${req.params.id_us}`, (err) => {
            if (err) console.log(err);
            res.redirect(`/log/${req.params.id}/${req.params.rol}/usuarios`);
        })
    })
}


function autoridad(niv) {
    if (niv == 0) return 'visita';
    if (niv == 1) return 'cliente';
    if (niv == 2) return 'trabajador';
    if (niv == 3) return 'gerente';
    if (niv == 4) return 'administrador';
    if (niv == 4.5) return 'contador';
    if (niv == 5) return 'ceo';
}

module.exports = controller;


