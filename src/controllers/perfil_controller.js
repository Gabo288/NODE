const perfil = {}

perfil.mail = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) console.log(err);

        conn.query(`update usuarios set mail='${req.body.mail}' where id_us=${req.params.id}`, (err) => {
            if (err) console.log(err);
            res.redirect(`/log/${req.params.id}/${req.params.rol}/perfil`);
        })

    })
}
perfil.clave = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) console.log(err);
        if (req.body.clave_1 == req.body.clave_2) {
            conn.query(`update usuarios set clave='${req.body.clave_1}' where id_us=${req.params.id}`, (err) => {
                if (err) console.log(err);
                res.redirect(`/log/${req.params.id}/${req.params.rol}/perfil`);
            })
        } else {

            res.redirect(`/log/${req.params.id}/${req.params.rol}/perfil`);
        }
    })
}
perfil.dir = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) console.log(err);

        conn.query(`update usuarios set str_dir='${req.body.str_dir}', id_co=${req.body.id_co} where id_us=${req.params.id}`, (err) => {
            if (err) console.log(err);
            res.redirect(`/log/${req.params.id}/${req.params.rol}/perfil`);
        })

    })
}

module.exports = perfil;