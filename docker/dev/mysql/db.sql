-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 28-12-2019 a las 04:34:02
-- Versión del servidor: 5.6.46
-- Versión de PHP: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lemts`
--
CREATE DATABASE IF NOT EXISTS `lemts` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `lemts`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(25) NOT NULL,
  `imagen_categoria` varchar(71) NOT NULL,
  `id_parent` int(11) DEFAULT NULL,
  `orden_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre_categoria`, `imagen_categoria`, `id_parent`, `orden_categoria`) VALUES
(1, 'Bolsos', 'thumb_1373402975bmc044bk.jpg', 0, 1),
(2, 'Carteras', 'thumb_1373402987033bk.jpg', 0, 0),
(3, 'Vanites', '', 0, 2),
(4, 'Cueros', '', 0, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion`
--

CREATE TABLE `configuracion` (
  `id_configuracion` int(11) NOT NULL,
  `nombre_configuracion` varchar(40) NOT NULL DEFAULT '',
  `valor_configuracion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `configuracion`
--

INSERT INTO `configuracion` (`id_configuracion`, `nombre_configuracion`, `valor_configuracion`) VALUES
(1, 'EMAIL_CONTACTENOS', 'mivitrinadecarteras@proformsac.com'),
(2, 'EMAIL_PEDIDOS', 'mivitrinadecarteras@proformsac.com'),
(3, 'TIPO_CAMBIO', '2.65'),
(4, 'TELEFONOS', '992722077  823*9147'),
(5, 'URL_FACEBOOK', 'https://www.facebook.com/pages#!/pages/Mi-vitrina-de-carteras/125954154279950'),
(6, 'URL_TWITTER', 'www.twitter.com'),
(7, 'URL_YOUTUBE', 'www.youtube.com'),
(8, 'URL_RSS', ''),
(9, 'CODIGO_GOOGLE_ANALYTICS', ''),
(10, 'TERMINOS_CONDICIONES', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modules`
--

CREATE TABLE `modules` (
  `id_module` int(11) NOT NULL,
  `name_module` char(31) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `modules`
--

INSERT INTO `modules` (`id_module`, `name_module`) VALUES
(1, 'Inicio'),
(2, 'Catalogo'),
(3, 'Modulos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_role` int(11) NOT NULL,
  `name_role` varchar(50) NOT NULL,
  `order_role` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_role`, `name_role`, `order_role`) VALUES
(1, 'Administrador', 0),
(2, 'Usuario Registrado', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sections`
--

CREATE TABLE `sections` (
  `id_section` int(11) NOT NULL,
  `id_module` int(11) NOT NULL,
  `name_section` varchar(50) NOT NULL,
  `url_section` varchar(200) NOT NULL,
  `status_section` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sections`
--

INSERT INTO `sections` (`id_section`, `id_module`, `name_section`, `url_section`, `status_section`) VALUES
(1, 1, 'Inicio', 'index.php', 1),
(2, 1, 'Configuraci&oacute;n de Sitio', 'configuracion.php', 1),
(3, 1, 'Cuentas y Accesos', 'usuarios.php', 1),
(4, 2, 'Productos', 'productos.php?cat=0', 1),
(5, 3, 'Formas de Pago', 'index.php?modulo=formas_de_pago', 1),
(6, 3, 'Metodos de Envio', 'index.php?modulo=metodos_de_envio', 1),
(7, 3, 'Atributos', 'index.php?modulo=atributos', 1),
(8, 3, 'Banner', 'index.php?modulo=banner', 1),
(9, 3, 'Boletines', 'index.php?modulo=boletines', 1),
(10, 3, 'Paginas', 'index.php?modulo=paginas', 0),
(11, 3, 'Informaciones Al Cliente', 'index.php?modulo=informaciones_al_cliente', 1),
(12, 3, 'Novedades', 'index.php?modulo=novedades', 1),
(13, 3, 'Ofertas', 'index.php?modulo=ofertas', 1),
(14, 3, 'Productos Destacados', 'index.php?modulo=productos_destacados', 0),
(15, 3, 'Productos Relacionados', 'index.php?modulo=productos_relacionados', 1),
(16, 3, 'Widgets', 'index.php?modulo=widgets', 1),
(17, 3, 'Pedidos', 'index.php?modulo=pedidos', 1),
(18, 3, 'Clientes', 'index.php?modulo=clientes', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `id_role` int(11) NOT NULL,
  `name_user` varchar(50) NOT NULL DEFAULT '',
  `surname_user` varchar(50) NOT NULL DEFAULT '',
  `mail_user` varchar(50) NOT NULL DEFAULT '',
  `photo_user` varchar(71) NOT NULL,
  `login_user` varchar(20) NOT NULL DEFAULT '',
  `password_user` varchar(20) NOT NULL DEFAULT '',
  `login_date_user` date NOT NULL,
  `reading_user` char(2) NOT NULL DEFAULT '',
  `writing_user` char(2) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `id_role`, `name_user`, `surname_user`, `mail_user`, `photo_user`, `login_user`, `password_user`, `login_date_user`, `reading_user`, `writing_user`) VALUES
(1, 1, 'xxx', 'xxxx', 'xx@xx.xx', '', 'root', 'admin', '0000-00-00', '1', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_sections`
--

CREATE TABLE `users_sections` (
  `id_user` int(11) NOT NULL DEFAULT '0',
  `id_section` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users_sections`
--

INSERT INTO `users_sections` (`id_user`, `id_section`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 11),
(1, 12),
(1, 13),
(1, 15),
(1, 16),
(1, 17),
(1, 18);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  ADD PRIMARY KEY (`id_configuracion`);

--
-- Indices de la tabla `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id_module`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_role`);

--
-- Indices de la tabla `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id_section`),
  ADD KEY `id_modulo` (`id_module`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_rol` (`id_role`);

--
-- Indices de la tabla `users_sections`
--
ALTER TABLE `users_sections`
  ADD KEY `id_seccion` (`id_section`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  MODIFY `id_configuracion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `modules`
--
ALTER TABLE `modules`
  MODIFY `id_module` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sections`
--
ALTER TABLE `sections`
  MODIFY `id_section` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `sections`
--
ALTER TABLE `sections`
  ADD CONSTRAINT `sections_ibfk_1` FOREIGN KEY (`id_module`) REFERENCES `modules` (`id_module`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_role`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
