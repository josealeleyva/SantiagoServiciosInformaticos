//Metodos para insercion, y listado de presupuestos/ventas accesible a trevez de una variable let exportada

const dbConnection = require('../config/dbconnection');
const connection = dbConnection();
const catalogo = require('../models/catalogo');

let presupuestocompra = {};

const listAP = [];
var montoTotal = 0;






//------PRESUPUESTOS----------

//genera el listado de presupuestos guardado en la base de datos
presupuestocompra.listP = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM presupuestocompra WHERE PoC = 0',
            (err, presup) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, presup);
                }

            }
        );
    };
};


//devuelve el ultimo presupuesto generado, para saber el codigo que hay que ingresar en el detalle de compra
presupuestocompra.ultimoP = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM presupuestocompra WHERE PoC = 0 ORDER BY codigoTransaccion DESC LIMIT 1',
            (err, presup) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, presup);
                }

            }
        );
    };
};

//registra un nuevo presupeusto SIN el detalle de la compra (este de agrega desde otro metodo)
presupuestocompra.insertP = (callback) => {
    if (connection) {

        var valores = {
            codigoTransaccion: null,
            montoTotal: montoTotal,
            fechaEntrega: null,
            tipoPago: null,
            codigoCliente: null,
            codigoEmpleado: null,
            PoC: 0
        }

        
        connection.query('INSERT INTO presupuestocompra set ?', [valores],
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






//-----------DETALLE DE LAS COMPRAS/PRESUPUESTOS----------------

//inserta el elemento que viene como dato producto y devuelve la lista completa
presupuestocompra.insertlistAP = (datoProducto, callback) => {

    var codigo = datoProducto.productoSeleccionado.split(" ");

    catalogo.nombreProducto(codigo[0], (nombre) => {
        catalogo.precioProducto(codigo[0], (precio) => {

            var cantidadAdquirida = parseFloat(datoProducto.cantidadAdquirida);
            var monto = cantidadAdquirida * precio[0].precioProductoVenta;
            montoTotal = montoTotal + monto;


            const producto = {
                codigoCatalogo: codigo[0],
                nombreProducto: nombre[0].nombreProducto,
                cantidadAdquirida: cantidadAdquirida,
                precioxCantidad: monto
            };

            listAP.push(producto);
            callback(listAP);
        });
    });

};

//elimina todos los elemntos de la lista y develve la lista vacia
presupuestocompra.deletelistAP = (callback) => {
    while (listAP.length != 0) {
        listAP.pop();
    }
    montoTotal = 0;
    callback(listAP);
};

//devuelve la lista
presupuestocompra.getlistAP = (callback) => {
    callback(listAP);
};

//devuelve el monto total
presupuestocompra.getmontoTotal = (callback) => {
    callback(montoTotal);
};

presupuestocompra.insertDP = (callback) => {
    if (connection) {
        presupuestocompra.ultimoP((err, prespuesto)=>{
           var CT = prespuesto[0].codigoTransaccion;
           var resultado; //ultimo valor agregado
            for (i = 0; i < listAP.length; i++) {
                
                var valores = {
                    codigoTransaccion: CT,
                    codigoCatalogo: listAP[i].codigoCatalogo,
                    nombreProducto: listAP[i].nombreProducto,
                    cantidadAdquirida: listAP[i].cantidadAdquirida,
                    precioxCantidad: listAP[i].precioxCantidad
                }

                connection.query('INSERT INTO detallecomrpa set ?', [valores],
                    (err, result) => {
                        if (err) {
                            throw err
                        }
                        else {
                            resultado = result
                        }
                    }
                );
            };
            callback(null, resultado);
        });
    };
};

presupuestocompra.insertDV = (callback) => {
    if (connection) {
        presupuestocompra.ultimaV((err, venta)=>{
           var CT = venta[0].codigoTransaccion;
           var resultado; //ultimo valor agregado
            for (i = 0; i < listAP.length; i++) {
                
                var valores = {
                    codigoTransaccion: CT,
                    codigoCatalogo: listAP[i].codigoCatalogo,
                    nombreProducto: listAP[i].nombreProducto,
                    cantidadAdquirida: listAP[i].cantidadAdquirida,
                    precioxCantidad: listAP[i].precioxCantidad
                }

                connection.query('INSERT INTO detallecomrpa set ?', [valores],
                    (err, result) => {
                        if (err) {
                            throw err
                        }
                        else {
                            resultado = result
                        }
                    }
                );
            };
            callback(null, resultado);
        });
    };
};

presupuestocompra.listDP = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM detallecomrpa',
            (err, presup) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, presup);
                }

            }
        );
    };
};

presupuestocompra.DetalleVoP = (codigoTransaccion,callback) => {
    if (connection) {
        connection.query('SELECT * FROM detallecomrpa WHERE codigoTransaccion = ?',[codigoTransaccion],
            (err, VoP) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, VoP);
                }

            }
        );
    };
};






//----------VENTAS------------

//genera el listado de ventas registradas en la base de datos 
presupuestocompra.listV = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM presupuestocompra WHERE PoC = 1',
            (err, ven) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, ven);
                }

            }
        );
    };
};

presupuestocompra.venta = (id, callback) => {
    if (connection) {
        connection.query('SELECT * FROM presupuestocompra WHERE codigoTransaccion = ?',[id],
            (err, ven) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, ven);
                }

            }
        );
    };
};

presupuestocompra.ultimaV = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM presupuestocompra WHERE PoC = 1 ORDER BY codigoTransaccion DESC LIMIT 1',
            (err, venta) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, venta);
                }

            }
        );
    };
};

presupuestocompra.insertV = (venta, callback) => {
    if (connection) {

        var tipoPago = venta.formapago.split(" ");
        var codigoCliente = venta.clienteselect.split(" ");

        var valores = {
            codigoTransaccion: null,
            montoTotal: montoTotal,
            fechaEntrega: venta.fechaEntrega,
            tipoPago: tipoPago[0],
            codigoCliente: codigoCliente[0],
            codigoEmpleado: venta.empleado,
            PoC: 1
        }

        
        connection.query('INSERT INTO presupuestocompra set ?', [valores],
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

module.exports = presupuestocompra;