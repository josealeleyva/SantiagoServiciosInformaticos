const dbConnection = require('../config/dbconnection');
const connection = dbConnection();

let empleados = {};

empleados.list = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM empleados',
            (err, empleados) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, empleados);
                }

            }
        );
    };
};

empleados.empleado = (codigoEmpleado, callback) => {
    if (connection) {
        connection.query('SELECT * FROM empleados WHERE codigoEmpleado = ?',[codigoEmpleado],
            (err, empleado) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, empleado);
                }

            }
        );
    };
};

empleados.usuario = (usuario, callback) => {
    if (connection) {
        connection.query('SELECT * FROM empleados WHERE usuario = ?',[usuario],
            (err, empleado) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, empleado);
                }

            }
        );
    };
};

module.exports = empleados;