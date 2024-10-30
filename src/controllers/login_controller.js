const { mail, clave } = require("./perfil_controller");


const controller = {}

controller.list = (req, res) => {
    res.render('login');
};


controller.verif = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) console.log(err);
        if (req.body.mail=='' && req.body.clave=='') {
            res.redirect(`/log/1/0/home`)
        }else{

            conn.query(`select * from usuarios where mail='${req.body.mail}' and clave='${req.body.clave}'`, (err, rows) => {
                if (err) console.log(err);
                console.log(rows);
                console.log(req.body);
                if (rows[0]== undefined) {
                    res.redirect('/login');
                } else {
                    res.redirect(`/log/${rows[0].id_us}/${nvl_autoridad(rows[0].rol)}/home`);
                }
            });
        }
    });
};

function nvl_autoridad(data) {
    if (data=='visita') {
        return 0;
    }
    if (data=='cliente') {
        return 1;
    }
    if (data == 'trabajador') {
        return 2;
    }
    if (data == 'gerente') {
        return 3;
    }
    if (data == 'administrador') {
        return 4;
    }
    if (data == 'contador') {
        return 4.5;
    }
    return 5;
}

module.exports = controller;