const express = require('express');
const router = express.Router();
const dbConnection = require('../config/dbconnection');
const connection = dbConnection();

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req, res) => {
    //res.send('hola');
    //res.sendFile(path.join(__dirname,'views/index.html')); //declaracion para redirigir al hml
    //res.render('index') //declaracion con el motor grafico ejs
    res.render('index.html') //para llamar un archivo html renderizado por ejs
    //res.render('index.html',{title: 'hola'}) //para mandar un parametro en forma de objeto, este caso titulo
});

router.get('/vyp', (req, res) => {
    res.render('ventas-presupuestos.html');
});

router.get('/catalogo', (req, res) => {
    connection.query('SELECT * FROM catalogo', (err, cat) => {
        connection.query('SELECT * FROM proveedores', (err, prov) => {
            res.render('catalogo.html', {
                cat: cat,
                prov: prov
            });
        });
    });
});


router.post('/catalogo',urlencodedParser, (req, res) => {
   const a = req.body;
   var codigoProveedor = a.codigoProveedor.split(" ");
   var q = 'INSERT INTO `catalogo` (`nombreProducto`, `descripcionProducto`, `precioProductoVenta`, `codigoProveedor`, `precioProductiLista`) VALUES ';
   var values = "('"+a.nombreProducto+"','"+a.descripcionProducto+"',"+a.precioProductoVenta+","+codigoProveedor[0]+","+a.precioProductiLista+");";
   var sqlins = q+values;
   console.log('valores: ',sqlins);
   connection.query(sqlins, (err, result) => {
        res.redirect('/catalogo')
        console.log('resultado: ',result, ' error? ',err);
   });
});


router.get('/ventas/presup', (req, res) => {
    connection.query('SELECT * FROM presupuestocompra WHERE PoC = 0', (err, presup) => {
        connection.query('SELECT * FROM catalogo', (err, cat) => {
            res.render('presupuestos.html', {
                presup: presup,
                cat: cat
            });
        })
    })
});

/*
router.get('/ventas/presup', (req, res) => {
    res.render('presupuestos.html', {
        presup: presup
    });
});
*/
module.exports = router;