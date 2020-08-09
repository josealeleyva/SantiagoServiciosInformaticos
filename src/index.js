//Archivo de servidor, aqui tenemos la configuracion general del servidor (configuraciones, middelwares y statics files), por ultimo ponemos al servidor a escuchar en el puerto 4000 

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const sessionMysql = require('express-mysql-session')(session);
const passport = require('passport');
const flash = require('connect-flash');

require('./config/passport');



//configuraciones
app.set('port', process.env.PORT || 4000); //el puerto que me de el sistema o el 4000
app.set('views', path.join(__dirname, '../src/app/views'));
app.engine('html', require('ejs').renderFile);
app.set('views engine', 'ejs');



//middlewares
const connection = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tiendaonline'
}
app.use(session({
    secret: 'codigosecreto',
    resave: false,
    saveUninitialized: false,
    store: new sessionMysql(connection),    
}))
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(passport.initialize());
app.use(passport.session());



//Variable Globales
app.use((req, res, next) => {
    app.locals.guardadoCorrectamente = req.flash('guardadoCorrectamente');
    app.locals.bienvenida = req.flash('bienvenida');
    app.locals.error = req.flash('error');
    app.locals.usuario = req.user

    next();
});



//rutas 
app.use(require('./app/routes/index'));



//archivos estaticos
app.use(express.static(path.join(__dirname, '../src/app/public')))



//servidor escuchando
app.listen(app.get('port'), () => {
    console.log("servidor escuchando en le puerto:", app.get('port'))
});