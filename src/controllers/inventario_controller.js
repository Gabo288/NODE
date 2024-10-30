const inventario = {}

inventario.save = (req, res) => {
    console.log(req.body)
    if (req.body.unidades < 0) {
        res.redirect(`/log/${req.params.id}/${req.params.rol}/inventario`);
    } else {
        req.getConnection((err, conn) => {
            if (err) console.log(err);
            conn.query(`insert into inventario (id_producto, unidades, precio, id_bo) values (${req.body.id_producto}, ${req.body.unidades},${req.body.precio}, ${req.body.id_bo})`, (err) => {
                if (err) console.log(err);
                res.redirect(`/log/${req.params.id}/${req.params.rol}/inventario`);
            });
        })
    }
}
inventario.edit = (req, res) => {
    console.log(req.body);
    if (req.body.unidades < 0) {
        res.redirect(`/log/${req.params.id}/${req.params.rol}/inventario`);
    } else {
        req.getConnection((err, conn) => {
            if (err) console.log(err);
            conn.query(`update inventario set precio=${req.body.precio}, unidades=${req.body.unidades} where id_in=${req.params.id_in};`, (err) => {if (err) console.log(err);})
            
                conn.query(` select * from inventario where id_producto=${req.params.id_producto}`, (err, inv) => {
                if (err) console.log(err);
                conn.query(`update productos set unidades_totales=0 where id_producto=${req.params.id_producto}`,(err)=>{if(err) console.log(err)});

                inv.forEach(producto => {
                    conn.query(`update productos set unidades_totales =unidades_totales + ${producto.unidades} where id_producto=${req.params.id_producto}`,(err)=>{if(err) console.log(err)});
                });
            })

            res.redirect(`/log/${req.params.id}/${req.params.rol}/inventario`);
        })
    }
}
inventario.delete = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) console.log(err);
        conn.query(`delete from inventario where id_in=${req.params.id_in}`, (err) => {
            if (err) console.log(err);
            res.redirect(`/log/${req.params.id}/${req.params.rol}/inventario`);
        })
    })
};
inventario.sell = (req, res) => {
    if (req.body.unidades < 0) {
        res.redirect(`/log/${req.params.id}/${req.params.rol}/inventario`);
    } else {
        req.getConnection((err, conn) => {
            if (err) console.log(err);
            conn.query(`update inventario set unidades=unidades - ${req.body.unidades} where id_in=${req.params.id_in}`, (err) => {
                if (err) console.log(err);
                conn.query(` update usuarios set ganancias=ganancias + ${req.body.unidades}*${req.params.ganancias} where id_us=${req.params.id}`, (err) => {
                    if (err) console.log(err);
                    conn.query(` update productos set unidades_totales=unidades_totales - ${req.body.unidades} where id_producto=${req.params.id_pr}`, (err) => {
                        if (err) console.log(err);

                        res.redirect(`/log/${req.params.id}/${req.params.rol}/inventario`);
                    })
                })
            })
        })
    }
};
inventario.add = (req, res) => {
    if (req.body.unidades < 0) {
        res.redirect(`/log/${req.params.id}/${req.params.rol}/inventario`);
    } else {
        req.getConnection((err, conn) => {
            if (err) console.log(err);
            conn.query(`update inventario set unidades=unidades + ${req.body.unidades} where id_in=${req.params.id_in}`, (err) => {
                if (err) console.log(err);
                conn.query(`update usuarios set ganancias=ganancias-${req.body.unidades}*${req.body.precio} where id_us=${req.params.id}`, (err) => {
                    if (err) console.log(err);
                    conn.query(`update productos set unidades_totales=unidades_totales+${req.body.unidades} where id_producto=${req.params.id_pr}`, (err) => {
                        if (err) console.log(err);
                        res.redirect(`/log/${req.params.id}/${req.params.rol}/inventario`);
                    })
                })
            })
        })
    }
};




module.exports = inventario;