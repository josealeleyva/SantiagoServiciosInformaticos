const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const empleados = require('../models/empleados');

passport.use('local.singin', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'contra',
    passReqToCallback: true
}, async (req, usuario, contra, done) => {

    empleados.usuario(usuario, (err, empleado) => {
        if(empleado.length > 0){
            const usuario = empleado[0];
            if ( usuario.contraseña == contra){
                done(null, usuario, req.flash('bienvenida', 'Bienvenido '+ usuario.nombreEmpleado));
            }else{
                done(null, false, req.flash('error', 'Contraseña incorrecta'));
            }
        }else{
           return done(null, false, req.flash('error', 'Usuario incorrecto'));
        }
    })

}));

passport.serializeUser((user, done) => {
    done(null, user.codigoEmpleado);
});

passport.deserializeUser((id, done) => {
    empleados.empleado(id, (err, empleado) => {
        done(null, empleado[0]);
    });
});

