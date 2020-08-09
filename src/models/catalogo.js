//Metodos para insercion y listado de catalogo accesible a trevez de una variable let exportada

const dbConnection = require('../config/dbconnection');
const connection = dbConnection();

let catalogo = {};

catalogo.list = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM catalogo',
            (err, cat) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, cat);
                }

            }
        );
    };
};

catalogo.nombreProducto = (codigo, callback) => {
    if (connection) {
        q = 'SELECT nombreProducto FROM catalogo WHERE codigoCatalogo ='+codigo;
        connection.query(q,
            (err, nombreProducto) => {
                if (err) {
                    throw err
                }
                else {
                    callback(nombreProducto);
                }

            }
        );
    };
};

catalogo.precioProducto = (codigo, callback) => {
    if (connection) {
        q = 'SELECT precioProductoVenta FROM catalogo WHERE codigoCatalogo ='+codigo;
        connection.query(q,
            (err, precioProducto) => {
                if (err) {
                    throw err
                }
                else {
                    callback(precioProducto);
                }

            }
        );
    };
};

/*
catalogo.insert = (datosCatalogo, callback) => {
    if (connection) {
        var codigoProveedor = datosCatalogo.codigoProveedor.split(" ");
        var q = 'INSERT INTO `catalogo` (`nombreProducto`, `descripcionProducto`, `precioProductoVenta`, `codigoProveedor`, `precioProductiLista`) VALUES ';
        var values = "('" + datosCatalogo.nombreProducto + "','" + datosCatalogo.descripcionProducto + "'," + datosCatalogo.precioProductoVenta + "," + codigoProveedor[0] + "," + datosCatalogo.precioProductiLista + ");";
        var sqlins = q + values;
        console.log('VALORES: ', sqlins);
        connection.query(sqlins,
            (err, result) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, result);
                }
            }
        );
    };
};
*/


catalogo.insert = (datosCatalogo, callback) => {
    if (connection) {
        
        var codigoProveedor = datosCatalogo.codigoProveedor.split(" ");
        var valores = {
            codigoCatalogo: null,
            nombreProducto: datosCatalogo.nombreProducto,
            descripcionProducto: datosCatalogo.descripcionProducto,
            precioProductoVenta: datosCatalogo.precioProductoVenta,
            codigoProveedor: codigoProveedor[0],
            precioProductiLista: datosCatalogo.precioProductiLista
        };

        connection.query('INSERT INTO catalogo set ?', [valores],
            (err, result) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, result);
                }
            }
        );
    };
};


module.exports = catalogo;