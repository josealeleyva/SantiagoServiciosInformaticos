//Archivo de rutas, aqui colocamos todas las rutas accesibles de las pagina, dando respuesta a las consultas de tipo "/sitio" direccionando a la pigina solicitada

const express = require('express');
const router = express.Router();
const passport = require('passport');


const catalogo = require('../../models/catalogo');
const proveedores = require('../../models/proveedores');
const PoC = require('../../models/presupuestocompra');
const clientes = require('../../models/clientes');
const empleados = require('../../models/empleados');

const { isLoggedIn, isNotLoggedIn } = require('../../config/auth');


var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//-----LOGUEO
router.get('/', isNotLoggedIn, (req, res) => {
    res.render('loguin.html')
});


router.post('/loguin', urlencodedParser, (req, res, next) => {
    passport.authenticate('local.singin', {
        successRedirect: '/menu',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next)
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/');
});

/*
router.post('/loguin', urlencodedParser, passport.authenticate('local.singin', {
        successRedirect: '/menu',
        failureRedirect: '/',
        failureFlash: True
    })
);
*/

//------MENU
router.get('/menu', isLoggedIn, (req, res) => {
    res.render('index.html')
})

router.get('/vyp', isLoggedIn, (req, res) => {
    res.render('ventas-presupuestos.html');
});

router.get('/perfil', isLoggedIn, (req, res) => {
    res.render('perfil.html')
});

//------CATALOGO
router.get('/catalogo', isLoggedIn, (req, res) => {
    catalogo.list((err, cat) => {
        proveedores.list((err, prov) => {
            res.render('catalogo.html', {
                cat: cat,
                prov: prov
            });
        });
    });
});


router.post('/catalogo', urlencodedParser, (req, res) => {
    const a = req.body;
    catalogo.insert(a, (err, result) => {
        req.flash('guardadoCorrectamente', 'Producto guardado correctamente!');
        res.redirect('/catalogo');
    });
});



//-------PRESUPUESTOS
router.post('/inListAP', urlencodedParser, (req, res) => {
    const a = req.body;
    PoC.insertlistAP(a, (result) => {
        res.redirect('/vyp/presupuestos');
    });
});

router.post('/delListAP', urlencodedParser, (req, res) => {
    const a = req.body;
    PoC.deletelistAP((result) => {
        res.redirect('/vyp/presupuestos');
    });
});

router.post('/registrarPresup', urlencodedParser, (req, res) => {

    PoC.insertP((err, result) => {
        PoC.insertDP((err, resultado) => {
            req.flash('guardadoCorrectamente', 'Presupuesto guardado correctamente!');
            res.redirect('/vyp/presupuestos');
        });
    });
});

router.get('/vyp/presupuestos', isLoggedIn, (req, res) => {

    PoC.listP((err, presup) => {
        catalogo.list((err, cat) => {
            PoC.getlistAP((listaAP) => {
                PoC.getmontoTotal((montoTotal) => {
                    PoC.listDP((err, detallePresup) => {
                        res.render('presupuestos.html', {
                            presup: presup,
                            cat: cat,
                            listAP: listaAP,
                            montoTotal: montoTotal,
                            detP: detallePresup
                        });
                    });
                });
            })
        })
    })
});




//-------VENTAS
router.post('/inListAPV', urlencodedParser, (req, res) => {
    const a = req.body;
    PoC.insertlistAP(a, (result) => {
        res.redirect('/vyp/ventas');
    });
});

router.post('/delListAPV', urlencodedParser, (req, res) => {
    const a = req.body;
    PoC.deletelistAP((result) => {
        res.redirect('/vyp/ventas');
    });
});

router.get('/vyp/ventas', isLoggedIn, (req, res) => {

    PoC.listP((err, presup) => {
        catalogo.list((err, cat) => {
            PoC.getlistAP((listaAP) => {
                PoC.getmontoTotal((montoTotal) => {
                    PoC.listDP((err, detallePresup) => {
                        PoC.listV((err, venta) => {
                            clientes.list((err, cli) => {
                                res.render('ventas.html', {
                                    presup: presup,
                                    cat: cat,
                                    listAP: listaAP,
                                    montoTotal: montoTotal,
                                    detP: detallePresup,
                                    venta: venta,
                                    cliente: cli
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

router.get('/vyp/ventas/:id', isLoggedIn, (req, res) => {
    PoC.venta(req.params.id, (err, venta) => {
        console.log("----VENTA-----", venta);
        PoC.DetalleVoP(req.params.id, (err, detalle) => {
            console.log("----DETALLE-----", detalle);
            clientes.cliente(venta[0].codigoCliente, (err, cliente) => {
                console.log("----CLIENTE-----", cliente);
                empleados.empleado(venta[0].codigoEmpleado, (err, empleado) => {
                    console.log("----EMPLEADO-----", empleado);
                    res.render('factura.html', {
                        venta: venta,
                        detalle: detalle,
                        cliente: cliente,
                        empleado: empleado
                    });
                });
            });
        });
    });
});

router.post('/registrarVenta', urlencodedParser, (req, res) => {

    PoC.insertV(req.body,(err, result) => {
        PoC.insertDV((err, resultado) => {
            req.flash('guardadoCorrectamente', 'Presupuesto guardado correctamente!');
            res.redirect('/vyp/ventas');
        });
    });

});

module.exports = router;

//FORMAS PARA RESPONDER AL CLIENTE CON UNA PAGINA
//res.send('hola');
//res.sendFile(path.join(__dirname,'views/index.html')); //declaracion para redirigir al hml
//res.render('index') //declaracion con el motor grafico ejs
//res.render('index.html') //para llamar un archivo html renderizado por ejs
//res.render('index.html',{title: 'hola'}) //para mandar un parametro en forma de objeto, este caso titulo
////res.render('index.html') //para re llamar a un archivo html renderizado por ejs