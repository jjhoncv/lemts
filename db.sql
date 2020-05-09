-- phpMyAdmin SQL Dump
-- version 5.0.0
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 12-01-2020 a las 22:45:53
-- Versión del servidor: 5.6.46
-- Versión de PHP: 7.4.1

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
-- Estructura de tabla para la tabla `module`
--

CREATE TABLE `module` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `module`
--

INSERT INTO `module` (`id`, `name`) VALUES
(1, 'home'),
(2, 'configuration'),
(3, 'sections');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'invited');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `section`
--

CREATE TABLE `section` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `moduleId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `section`
--

INSERT INTO `section` (`id`, `name`, `url`, `status`, `moduleId`) VALUES
(1, 'pages', '/pages', 1, 3),
(2, 'users', '/users', 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `lastLogin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reading` tinyint(1) NOT NULL DEFAULT '1',
  `writing` tinyint(1) NOT NULL DEFAULT '1',
  `roleId` int(11) DEFAULT NULL,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `photo` varchar(70) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `lastLogin`, `reading`, `writing`, `roleId`, `name`, `surname`, `email`, `photo`, `username`, `password`) VALUES
(2, '2020-01-12 02:22:13', 1, 1, 1, 'jhonnatan', 'castro', 'jjhoncv@gmail.com', 'me.jpg', 'jjhoncv', '$2b$10$qGh8nfMO1v7sSeJSVMQC4uR49xQTg.3hP/TUIlRDR5yYuzkGWS9sm'),
(4, '2020-01-12 04:09:42', 1, 1, 2, 'desly', 'portal', 'desply.ipr@gmail.com', 'me.jpg', 'desly.ipr', '$2b$10$GwbRms/cAvLuEAxMJktZ2..2DZZd6sRcEtLro7ENKW5GNeZX/ZvMa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_section`
--

CREATE TABLE `user_section` (
  `userId` int(11) NOT NULL,
  `sectionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `user_section`
--

INSERT INTO `user_section` (`userId`, `sectionId`) VALUES
(2, 1),
(2, 2),
(4, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_0f905b6fa815ff6e21da6f27fb6` (`moduleId`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  ADD KEY `FK_c28e52f758e7bbc53828db92194` (`roleId`);

--
-- Indices de la tabla `user_section`
--
ALTER TABLE `user_section`
  ADD PRIMARY KEY (`userId`,`sectionId`),
  ADD KEY `IDX_99ac4bdb2cfe9f4f5c9667658f` (`userId`),
  ADD KEY `IDX_bcab46131ab9771e7555fe92e0` (`sectionId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `module`
--
ALTER TABLE `module`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `section`
--
ALTER TABLE `section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `section`
--
ALTER TABLE `section`
  ADD CONSTRAINT `FK_0f905b6fa815ff6e21da6f27fb6` FOREIGN KEY (`moduleId`) REFERENCES `module` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_c28e52f758e7bbc53828db92194` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `user_section`
--
ALTER TABLE `user_section`
  ADD CONSTRAINT `FK_99ac4bdb2cfe9f4f5c9667658f7` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_bcab46131ab9771e7555fe92e0d` FOREIGN KEY (`sectionId`) REFERENCES `section` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

