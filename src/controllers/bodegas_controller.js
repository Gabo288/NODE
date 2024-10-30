const bodegas={}

bodegas.insert=(req,res)=>{
    console.log(req.body)
    req.getConnection((err,conn)=>{
        if (err) console.log(err);
        conn.query(`insert into bodega (str_nombre, str_dir,estado, id_co) values ('${req.body.str_nombre}','${req.body.str_dir}','en espera',${req.body.id_co})`,(err)=>{
            if (err) console.log(err);
            res.redirect(`/log/${req.params.id}/${req.params.rol}/bodegas`);
        });
    })
}
bodegas.des = (req, res)=>{
    req.getConnection((err,conn)=>{
        if (err) console.log(err);
        conn.query(`update bodega set estado='inactiva' where id_bo=${req.params.id_bo}`,(err)=>{
            if(err) console.log(err);
            res.redirect(`/log/${req.params.id}/${req.params.rol}/bodegas`);
        })
    })
};
bodegas.act = (req, res)=>{
    req.getConnection((err,conn)=>{
        if (err) console.log(err);
        conn.query(`update bodega set estado='activa' where id_bo=${req.params.id_bo}`,(err)=>{
            if(err) console.log(err);
            res.redirect(`/log/${req.params.id}/${req.params.rol}/bodegas`);
        })
    })
};
bodegas.delete = (req, res)=>{
    req.getConnection((err,conn)=>{
        if (err) console.log(err);
        conn.query(`delete from bodega where id_bo=${req.params.id_bo}`,(err)=>{
            if(err) console.log(err);
            res.redirect(`/log/${req.params.id}/${req.params.rol}/bodegas`);
        })
    })
};

bodegas.edit =(req, res)=>{
    console.log(req.body);
    req.getConnection((err,conn)=>{
        if (err) console.log(err);
        conn.query(`update bodega set str_nombre='${req.body.str_nombre}', str_dir='${req.body.str_dir}', id_co=${req.body.id_co}, estado='${req.body.estado}' where id_bo=${req.params.id_bo}`,(err)=>{
            if (err) console.log(err);
            res.redirect(`/log/${req.params.id}/${req.params.rol}/bodegas`);
        })
    })
}




module.exports=bodegas