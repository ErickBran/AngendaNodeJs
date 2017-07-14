CREATE DATABASE Agenda;
USE Agenda;

CREATE TABLE Categoria(
	idCategoria INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (30) NOT NULL,
    PRIMARY KEY (idCategoria)
);

CREATE TABLE Contacto(
	idContacto INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (30) NOT NULL,
    apellido VARCHAR (30) NOT NULL,
    direccion VARCHAR (30) NOT NULL,
    telefono VARCHAR (12) NOT NULL,
    correo VARCHAR (40) NOT NULL,
    idCategoria INT NOT NULL,
    PRIMARY KEY (idContacto),
    FOREIGN KEY (idCategoria) REFERENCES Categoria (idCategoria)
);

CREATE TABLE Usuario(
	idUsuario INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (30) NOT NULL,
    contrasena VARCHAR (30) NOT NULL,
    PRIMARY KEY (idUsuario)
);

CREATE TABLE DetalleUsuario(
	idDetalle INT NOT NULL AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    idContacto INT NOT NULL,
    PRIMARY KEY (idDetalle),
    FOREIGN KEY (idUsuario) REFERENCES Usuario (idUsuario),
    FOREIGN KEY (idContacto) REFERENCES Contacto (idContacto)
);

CREATE TABLE Historial(
	idHistorial INT NOT NULL AUTO_INCREMENT,
    Accion VARCHAR(100) NOT NULL,
    Fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    idUsuario INT NOT NULL,
    PRIMARY KEY (idHistorial),
    FOREIGN KEY (idUsuario) REFERENCES Usuario (idUsuario)
);



SELECT * FROM Historial;
SELECT * FROM Usuario;

SELECT ud.idDetalle, c.nombre, c.apellido, c.direccion, c.telefono, c.correo,
	a.nombre, a.contrasena, b.nombre FROM DetalleUsuario ud
INNER JOIN Contacto c ON ud.idContacto = c.idContacto
INNER JOIN Usuario a ON ud.idUsuario = a.idUsuario
INNER JOIN Categoria b ON c.idCategoria = b.idCategoria;



/*USUARIOS */
DELIMITER $$
CREATE PROCEDURE getUsuario(
  IN _nombre VARCHAR(30),
  IN _contrasena VARCHAR(30))
BEGIN
   SELECT * FROM Usuario WHERE nombre = _nombre AND contrasena = _contrasena;
END$$


DELIMITER $$
CREATE PROCEDURE addUsuario(
  IN _nombre VARCHAR(30),
  IN _contrasena VARCHAR(30))
BEGIN
   INSERT INTO Usuario (nombre, contrasena) VALUES(_nombre, _contrasena);
END$$


DELIMITER $$
CREATE PROCEDURE editUsuario(
  IN _idUsuario INT,
  IN _nombre VARCHAR(30),
  IN _contrasena VARCHAR(30))
BEGIN
   UPDATE Usuario 
   SET nombre = _nombre, contrasena = _contrasena
   WHERE idUsuario = _idUsuario;
END$$

DELIMITER $$
CREATE PROCEDURE deleteUsuario(
  IN _idUsuario INT)
BEGIN
   DELETE FROM Usuario 
   WHERE idUsuario = _idUsuario;
END$$

CALL getUsuario('pato', 'll');
CALL addUsuario('patoMomo', '1234');
CALL editUsuario(3,'patoMomos', '1234');
CALL deleteUsuario(3);
SELECT * FROM Usuario;
/*CATEGORIA */
DELIMITER $$
CREATE PROCEDURE addCategoria(
  IN _nombre VARCHAR(30))
BEGIN
   INSERT INTO Categoria (nombre) VALUES(_nombre);
END$$

CALL addCategoria('Prueba');

SELECT * FROM Categoria;

/*Contacto */
DELIMITER $$
CREATE PROCEDURE addContacto(
  IN _nombre VARCHAR(30),
  IN _apellido VARCHAR (30),
  IN _direccion VARCHAR (30),
  IN _telefono VARCHAR (12),
  IN _correo VARCHAR (40),
  IN _idCategoria INT)
BEGIN
   INSERT INTO Contacto (nombre, apellido, direccion, telefono, correo, idCategoria) VALUES(_nombre, _apellido, _direccion, _telefono, _correo, _idCategoria);
END$$

DELIMITER $$
CREATE PROCEDURE editContacto(
  IN _idContacto INT,
  IN _nombre VARCHAR(30),
  IN _apellido VARCHAR (30),
  IN _direccion VARCHAR (30),
  IN _telefono VARCHAR (12),
  IN _correo VARCHAR (40),
  IN _idCategoria INT)
BEGIN
   UPDATE Contacto 
   SET nombre = _nombre, apellido = _apellido, direccion = _direccion, telefono = _telefono, correo = _correo, idCategoria = _idCategoria
   WHERE idContacto = _idContacto;
END$$

DELIMITER $$
CREATE PROCEDURE deleteContacto(
  IN _idContacto INT)
BEGIN
   DELETE FROM Contacto 
   WHERE idContacto = _idContacto;
END$$

CALL addContacto('prueba', 'prueba', 'en su casa', '12345678', 'patomomo@gmail.com', 1);
CALL editContacto(1,'patoMomos', 'prueba', 'en su casa', '12345678', 'patomomo@gmail.com', 3);
CALL deleteContacto(2);
SELECT * FROM Contacto;

/*DETALLE USUARIO */
DELIMITER $$
CREATE PROCEDURE addDetalleUsuario(
  IN _idUsuario INT,
  IN _idContacto INT)
BEGIN
   INSERT INTO DetalleUsuario (idUsuario, idContacto) VALUES(_idUsuario, _idContacto);
END$$


DELIMITER $$
CREATE PROCEDURE deleteDetalleUsuario(
  IN _idDetalleUsuario INT)
BEGIN
   DELETE FROM DetalleUsuario 
   WHERE idDetalle = _idDetalleUsuario;
END$$

CALL addDetalleUsuario(1,1);
CALL deleteDetalleUsuario(2);
SELECT * FROM DetalleUsuario;

