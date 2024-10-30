const productos ={}

productos.save=(req, res)=>{
    console.log(req.body)
    req.getConnection((err,conn)=>{
        if (err) console.log(err);
        conn.query(`insert into productos (str_nombre, tipo, marca) values ('${req.body.str_nombre}', '${req.body.tipo}', '${req.body.marca}')`,(err)=>{
            if (err) console.log(err);
            res.redirect(`/log/${req.params.id}/${req.params.rol}/productos`);
        });
    })
}
productos.edit =(req, res)=>{
    console.log(req.body);
    req.getConnection((err,conn)=>{
        if (err) console.log(err);
        conn.query(`update productos set str_nombre='${req.body.str_nombre}', tipo='${req.body.tipo}', marca='${req.body.marca}' where id_producto=${req.params.id_pr}`,(err)=>{
            if (err) console.log(err);
            res.redirect(`/log/${req.params.id}/${req.params.rol}/productos`);
        })
    })
}






module.exports= productos;