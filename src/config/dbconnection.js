//Archivo de configuracion de la base de datos, aqui simplemente nos conectamos a la base de datos definida por el nombre, donde se aloja, el usuario que se conecta y su contra

const mysql = require('mysql');

module.exports = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'tiendaonline'
    })
}