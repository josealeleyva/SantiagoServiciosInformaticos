const express = require('express');
const router = express.Router();
const dbConnection = require('../config/dbconnection');
const connection = dbConnection();

router.get('/', (req , res) => {
    //res.send('hola');
    //res.sendFile(path.join(__dirname,'views/index.html')); //declaracion para redirigir al hml
    //res.render('index') //declaracion con el motor grafico ejs
    res.render('index.html') //para llamar un archivo html renderizado por ejs
    //res.render('index.html',{title: 'hola'}) //para mandar un parametro en forma de objeto, este caso titulo
});

router.get('/ventas', (req , res) => {
    res.render('ventas.html');
});

router.get('/ventas/listP', (req , res) => {
    connection.query('SELECT * FROM proveedores', (err, result) => {
        res.render('listarPresupuestos.html',{
            prov: result
        });
    })
});

module.exports = router;