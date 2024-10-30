const express = require('express');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//importar rutas
const login = require('./routes/login');
const usuarios = require('./routes/usuarios');

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



//middlewares
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'crud'
}, 'single'));
app.use(express.urlencoded({extended:false}));

//routes
app.use('/login',login);
app.use('/log',usuarios);

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
    console.log('http://localhost:' + app.get('port')+'/login');
});