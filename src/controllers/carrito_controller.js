const productos = require("./productos_controller");

const carrito = {}

carrito.add = (req,res)=>{
    console.log(req.body)
    req.getConnection((err, conn) =>{
        if (err) console.log(err);
        conn.query(`insert into carrito (id_us,id_inv,cantidad, precio) values (${req.params.id},${req.params.id_inv},${req.body.unidades}, ${req.params.precio})`,(err)=>{
            if (err) console.log(err);
            res.redirect(`/log/${req.params.id}/${req.params.rol}/inventario`);
        })
    })
}
carrito.delete = (req,res)=>{
    req.getConnection((err, conn) =>{
        if (err) console.log(err);
        conn.query(`delete from carrito where id_inv=${req.params.id_ca}`,(err)=>{
            if (err) console.log(err);
            res.redirect(`/log/${req.params.id}/${req.params.rol}/carrito`);
        })
    })
}
carrito.edit = (req,res)=>{
    req.getConnection((err, conn) =>{
        if (err) console.log(err);
        console.log(req.body)
        conn.query(`update carrito set cantidad=${req.body.unidades} where id_inv=${req.params.id_ca}`,(err)=>{
            if (err) console.log(err);
            res.redirect(`/log/${req.params.id}/${req.params.rol}/carrito`);
        })
    })
}

carrito.pagar = (req,res)=>{
    req.getConnection((err, conn) =>{
        if (err) console.log(err);
        let total=0;
        let fecha = new Date(),
        actual = `${fecha.getFullYear()}/${fecha.getMonth()}/${fecha.getDate()}`,
        hora = `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds}`
        
        
        conn.query(`select id_us, carrito.id_inv, carrito.cantidad, carrito.precio, productos.id_producto from carrito left join (inventario left join productos on inventario.id_producto=productos.id_producto) on carrito.id_inv=inventario.id_in where id_us=${req.params.id}`,(err, rows)=>{
            if (err) console.log(err);
            rows.forEach(producto => {
                conn.query(`update inventario set unidades=unidades - ${producto.cantidad} where id_in=${producto.id_inv}`,(err)=>{if (err) console.log(err);})
                conn.query(`update productos set unidades_totales=unidades_totales - ${producto.cantidad} where id_producto=${producto.id_producto}`,(err)=>{if (err) console.log(err);})
                conn.query(`insert into salidas (id_us,id_inv,cantidad,precio,fecha,hora) values (${req.params.id},${producto.id_inv},${producto.cantidad},${producto.precio},'${actual}',current_time())`,(err)=>{if (err) console.log(err);})
                total += producto.precio * producto.cantidad;
            });
            conn.query(`insert into boleta (id_us,fecha,hora,total) values (${req.params.id},'${actual}',current_time(),${total})`,(err)=>{if (err) console.log(err);})
            conn.query(`delete from carrito where id_us=${req.params.id}`,(err)=>{if (err) console.log(err);})
        })
        
        res.redirect(`/log/${req.params.id}/${req.params.rol}/carrito`)

    })
}


module.exports = carrito;