const dbConnection = require('../config/dbconnection');
const connection = dbConnection();

let clientes = {};

clientes.list = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM clientes',
            (err, cli) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, cli);
                }

            }
        );
    };
};

clientes.cliente = (codigoCliente, callback) => {
    if (connection) {
        connection.query('SELECT * FROM clientes WHERE codigoCliente = ?',[codigoCliente],
            (err, cli) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, cli);
                }

            }
        );
    };
};

module.exports = clientes;