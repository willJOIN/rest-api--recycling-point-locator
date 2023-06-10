CREATE DATABASE db_api_recicla;

USE db_api_recicla;

CREATE TABLE pontos_coleta (
  id int(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  material varchar(8) NOT NULL,
  CEP varchar(8) NOT NULL
);
