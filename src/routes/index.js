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

router.get('/vyp', (req , res) => {
    res.render('ventas-presupuestos.html');
});

router.get('/ventas/presup', (req , res) => {
    connection.query('SELECT * FROM presupuestocompra WHERE PoC = 0', (err, result) => {
        res.render('presupuestos.html',{
            presup: result
        });
    })
});

module.exports = router;