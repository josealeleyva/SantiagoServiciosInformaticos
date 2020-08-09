-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-08-2020 a las 06:17:30
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tiendaonline`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catalogo`
--

CREATE TABLE `catalogo` (
  `codigoCatalogo` int(11) NOT NULL,
  `nombreProducto` varchar(150) DEFAULT NULL,
  `descripcionProducto` varchar(150) DEFAULT NULL,
  `precioProductoVenta` float DEFAULT NULL,
  `codigoProveedor` int(11) DEFAULT NULL,
  `precioProductiLista` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `catalogo`
--

INSERT INTO `catalogo` (`codigoCatalogo`, `nombreProducto`, `descripcionProducto`, `precioProductoVenta`, `codigoProveedor`, `precioProductiLista`) VALUES
(1, 'Router TP-Link', 'Reouter de 300mb con doble antena', 800, 1, 650),
(2, 'TV Samsung 32\"', 'televisior led samsung modelo smg32p', 30000, 2, 22000),
(3, 'Mother Asus B-250', 'Placa madre asus chipset 1151', 4500, 3, 2850),
(5, 'Epson Pirnt', 'Impresora Epson ep120', 9000, 3, 7500),
(6, 'Auriculares JVL', 'Auriculares 5.1 JVL 110apjv', 1800, 1, 1000),
(7, 'Cable Ethernet x1m', 'Cable de internet armado por metro', 100, 1, 20),
(26, 'Cable modem', 'Modem con 300mb de velocidad', 3800, 2, 2500),
(30, 'Teclado Genius k1122', 'Tecladro de membrana genius k1122', 1000, 3, 500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `codigoCliente` int(11) NOT NULL,
  `dniCuitCliente` int(11) NOT NULL,
  `nombreCliente` varchar(150) DEFAULT NULL,
  `apellidoCliente` varchar(150) DEFAULT NULL,
  `mailCliente` varchar(150) DEFAULT NULL,
  `horaContacto` time DEFAULT NULL,
  `fechaUltimaCompra` date DEFAULT NULL,
  `telefonoCliente` int(15) DEFAULT NULL,
  `direccionCliente` varchar(150) DEFAULT NULL,
  `tipoCliente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`codigoCliente`, `dniCuitCliente`, `nombreCliente`, `apellidoCliente`, `mailCliente`, `horaContacto`, `fechaUltimaCompra`, `telefonoCliente`, `direccionCliente`, `tipoCliente`) VALUES
(1, 39449923, 'Alfredo', 'Correa', 'alfcorr@gmail.com', '00:00:00', '2020-07-06', 421373, 'Lavalle 230', 1),
(2, 29577230, 'Gloria ', 'Roldan', 'gr@gmail.com', NULL, NULL, 421205, 'Congreso 1477', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallecomrpa`
--

CREATE TABLE `detallecomrpa` (
  `codigoTransaccion` int(11) NOT NULL,
  `codigoCatalogo` int(11) NOT NULL,
  `nombreProducto` varchar(150) DEFAULT NULL,
  `cantidadAdquirida` int(11) DEFAULT NULL,
  `precioxCantidad` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detallecomrpa`
--

INSERT INTO `detallecomrpa` (`codigoTransaccion`, `codigoCatalogo`, `nombreProducto`, `cantidadAdquirida`, `precioxCantidad`) VALUES
(14, 1, 'Router TP-Link', 1, 800),
(14, 7, 'Calbe Ethernetx1m', 12, 1200),
(15, 2, 'TV Samsung 32\"º', 1, 30000),
(16, 1, 'Router TP-Link', 1, 800),
(16, 3, 'Mother Asus B-250', 1, 4500),
(16, 5, 'Epson Pirnt', 1, 9000),
(16, 6, 'Auriculares JVL', 1, 1800),
(17, 6, 'Auriculares JVL', 3, 5400),
(18, 7, 'Cable Ethernet x1m', 15, 1500),
(19, 7, 'Cable Ethernet x1m', 7, 700),
(19, 26, 'Cable modem', 2, 7600),
(20, 1, 'Router TP-Link', 1, 800),
(20, 3, 'Mother Asus B-250', 1, 4500),
(20, 6, 'Auriculares JVL', 1, 1800),
(20, 26, 'Cable modem', 1, 3800),
(22, 2, 'TV Samsung 32\"', 1, 30000),
(22, 6, 'Auriculares JVL', 1, 1800),
(24, 5, 'Epson Pirnt', 1, 9000),
(24, 7, 'Cable Ethernet x1m', 2, 200),
(25, 6, 'Auriculares JVL', 1, 1800),
(25, 26, 'Cable modem', 1, 3800),
(26, 2, 'TV Samsung 32\"', 2, 60000),
(27, 2, 'TV Samsung 32\"', 2, 60000),
(27, 26, 'Cable modem', 20, 76000),
(38, 30, 'Teclado Genius k1122', 1, 1000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallepedido`
--

CREATE TABLE `detallepedido` (
  `codigoPedido` int(11) NOT NULL,
  `codigoCatalogo` int(11) NOT NULL,
  `codigoProveedor` int(11) NOT NULL,
  `cantidadPedida` int(11) DEFAULT NULL,
  `precioxCantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `codigoEmpleado` int(11) NOT NULL,
  `dniEmpleado` int(11) NOT NULL,
  `nombreEmpleado` varchar(150) DEFAULT NULL,
  `apellidoEmpleado` varchar(150) DEFAULT NULL,
  `mailEmpleado` varchar(150) DEFAULT NULL,
  `cargo` int(11) DEFAULT NULL,
  `salario` float DEFAULT NULL,
  `antiguedad` date DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL,
  `telefonoEmpleado` int(15) DEFAULT NULL,
  `direccionEmpleado` varchar(150) DEFAULT NULL,
  `usuario` varchar(150) DEFAULT NULL,
  `contraseña` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`codigoEmpleado`, `dniEmpleado`, `nombreEmpleado`, `apellidoEmpleado`, `mailEmpleado`, `cargo`, `salario`, `antiguedad`, `activo`, `telefonoEmpleado`, `direccionEmpleado`, `usuario`, `contraseña`) VALUES
(1, 11111111, 'Admin', 'Admin', 'admin@gmail.com', 1, 0, '2019-11-01', 1, 7405359, 'San Lorenzo 2030', 'Admin', 'Admin'),
(2, 30230112, 'Máximo', 'Salas', 'salas22@gmail.com', 2, 80000, '2016-07-01', 1, 4451230, 'Agustin Alavarez 120', 'salas', 'salas123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `codigoInvetario` int(11) NOT NULL,
  `tipo` int(11) DEFAULT NULL,
  `detalleInventario` varchar(200) DEFAULT NULL,
  `estadoInentario` int(11) DEFAULT NULL,
  `fechaAquisicion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidoproveedor`
--

CREATE TABLE `pedidoproveedor` (
  `codigoPedido` int(11) NOT NULL,
  `fechaPedido` timestamp NULL DEFAULT current_timestamp(),
  `estado` int(11) DEFAULT NULL,
  `montoTotal` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presupuestocompra`
--

CREATE TABLE `presupuestocompra` (
  `codigoTransaccion` int(11) NOT NULL,
  `fechaTransaccion` date DEFAULT current_timestamp(),
  `montoTotal` float DEFAULT NULL,
  `fechaEntrega` date DEFAULT NULL,
  `tipoPago` int(11) DEFAULT NULL,
  `codigoCliente` int(11) DEFAULT NULL,
  `codigoEmpleado` int(11) DEFAULT NULL,
  `PoC` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `presupuestocompra`
--

INSERT INTO `presupuestocompra` (`codigoTransaccion`, `fechaTransaccion`, `montoTotal`, `fechaEntrega`, `tipoPago`, `codigoCliente`, `codigoEmpleado`, `PoC`) VALUES
(14, '2020-07-31', 2000, NULL, NULL, NULL, NULL, 0),
(15, '2020-07-31', 30000, NULL, NULL, NULL, NULL, 0),
(16, '2020-07-31', 16100, '2020-08-03', 1, 1, 1, 1),
(17, '2020-08-01', 5400, NULL, NULL, NULL, NULL, 0),
(18, '2020-08-02', 1500, NULL, NULL, NULL, NULL, 0),
(19, '2020-08-02', 8300, NULL, NULL, NULL, NULL, 0),
(20, '2020-08-02', 10900, NULL, NULL, NULL, NULL, 0),
(22, '2020-08-02', 31800, '2020-08-03', 1, 1, 1, 1),
(24, '2020-08-05', 9200, NULL, NULL, NULL, NULL, 0),
(25, '2020-08-05', 5600, NULL, NULL, NULL, NULL, 0),
(26, '2020-08-05', 60000, NULL, NULL, NULL, NULL, 0),
(27, '2020-08-05', 136000, NULL, NULL, NULL, NULL, 0),
(38, '2020-08-09', 1000, '2020-08-11', 2, 2, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `CodigoProveedor` int(11) NOT NULL,
  `NombreProveedor` varchar(150) NOT NULL,
  `DireccionProveedor` varchar(150) DEFAULT NULL,
  `MailProveedor` varchar(150) DEFAULT NULL,
  `TelefonoProveedor` int(11) DEFAULT NULL,
  `TipoProductos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`CodigoProveedor`, `NombreProveedor`, `DireccionProveedor`, `MailProveedor`, `TelefonoProveedor`, `TipoProductos`) VALUES
(1, 'Redes Santiago', 'Buenos Aires 1100', 'redessantiago@gmail.com', 385424363, 1),
(2, 'YourSystem', 'Moreno 1000', 'yoursystem@gmail.com', 385422696, 2),
(3, 'InformaticaRepuestos', 'Saenz Peña 240', 'asd@gmail.com', 422359, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('gIPbpHTAPCYsgyP5SNuJOtID4nRLk35X', 1597032962, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":2}}');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `catalogo`
--
ALTER TABLE `catalogo`
  ADD PRIMARY KEY (`codigoCatalogo`),
  ADD KEY `codigoProveedor` (`codigoProveedor`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`codigoCliente`);

--
-- Indices de la tabla `detallecomrpa`
--
ALTER TABLE `detallecomrpa`
  ADD PRIMARY KEY (`codigoTransaccion`,`codigoCatalogo`),
  ADD KEY `codigoCatalogo` (`codigoCatalogo`);

--
-- Indices de la tabla `detallepedido`
--
ALTER TABLE `detallepedido`
  ADD PRIMARY KEY (`codigoPedido`,`codigoCatalogo`,`codigoProveedor`),
  ADD KEY `codigoCatalogo` (`codigoCatalogo`),
  ADD KEY `codigoProveedor` (`codigoProveedor`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`codigoEmpleado`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`codigoInvetario`);

--
-- Indices de la tabla `pedidoproveedor`
--
ALTER TABLE `pedidoproveedor`
  ADD PRIMARY KEY (`codigoPedido`);

--
-- Indices de la tabla `presupuestocompra`
--
ALTER TABLE `presupuestocompra`
  ADD PRIMARY KEY (`codigoTransaccion`),
  ADD KEY `codigoCliente` (`codigoCliente`),
  ADD KEY `codigoEmpleado` (`codigoEmpleado`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`CodigoProveedor`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `catalogo`
--
ALTER TABLE `catalogo`
  MODIFY `codigoCatalogo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `codigoCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `codigoEmpleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `codigoInvetario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedidoproveedor`
--
ALTER TABLE `pedidoproveedor`
  MODIFY `codigoPedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `presupuestocompra`
--
ALTER TABLE `presupuestocompra`
  MODIFY `codigoTransaccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `CodigoProveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `catalogo`
--
ALTER TABLE `catalogo`
  ADD CONSTRAINT `catalogo_ibfk_1` FOREIGN KEY (`codigoProveedor`) REFERENCES `proveedores` (`CodigoProveedor`);

--
-- Filtros para la tabla `detallecomrpa`
--
ALTER TABLE `detallecomrpa`
  ADD CONSTRAINT `detallecomrpa_ibfk_1` FOREIGN KEY (`codigoTransaccion`) REFERENCES `presupuestocompra` (`codigoTransaccion`),
  ADD CONSTRAINT `detallecomrpa_ibfk_2` FOREIGN KEY (`codigoCatalogo`) REFERENCES `catalogo` (`codigoCatalogo`);

--
-- Filtros para la tabla `detallepedido`
--
ALTER TABLE `detallepedido`
  ADD CONSTRAINT `detallepedido_ibfk_1` FOREIGN KEY (`codigoPedido`) REFERENCES `pedidoproveedor` (`codigoPedido`),
  ADD CONSTRAINT `detallepedido_ibfk_2` FOREIGN KEY (`codigoCatalogo`) REFERENCES `catalogo` (`codigoCatalogo`),
  ADD CONSTRAINT `detallepedido_ibfk_3` FOREIGN KEY (`codigoProveedor`) REFERENCES `catalogo` (`codigoProveedor`);

--
-- Filtros para la tabla `presupuestocompra`
--
ALTER TABLE `presupuestocompra`
  ADD CONSTRAINT `presupuestocompra_ibfk_1` FOREIGN KEY (`codigoCliente`) REFERENCES `clientes` (`codigoCliente`),
  ADD CONSTRAINT `presupuestocompra_ibfk_2` FOREIGN KEY (`codigoEmpleado`) REFERENCES `empleados` (`codigoEmpleado`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
