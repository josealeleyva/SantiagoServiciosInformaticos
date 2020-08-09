//Metodos para insercion, modificacion y listado de proveedores accesible a trevez de una variable let exportada

const dbConnection = require('../config/dbconnection');
const connection = dbConnection();

let proveedores = {};

proveedores.list = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM proveedores',
            (err, prov) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, prov);
                }

            }
        );
    };
};


module.exports = proveedores;