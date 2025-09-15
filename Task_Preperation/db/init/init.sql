SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `lecturer_management` ;
CREATE SCHEMA IF NOT EXISTS `lecturer_management` DEFAULT CHARACTER SET latin1 ;
USE `lecturer_management` ;


CREATE TABLE IF NOT EXISTS `lecturer_management`.`lecturer` (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  age INT,
  course_count INT,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at DATETIME NOT NULL,
  level_n8n VARCHAR(100), 
  level_fullstack VARCHAR(100), 
  level_AI VARCHAR(100), 
  level_MySQL VARCHAR(100), 
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC)
);

INSERT INTO `lecturer_management`.`lecturer` (`first_name`, `last_name`, `age`, `course_count`, `email`, `created_at`, `level_n8n`, `level_fullstack`, `level_AI`, `level_MySQL`) VALUES ('roei', 'kalimi', '30', '3', 'roeik@gmail.com', '2025-09-15', '1', '2', '2', '2');
INSERT INTO `lecturer_management`.`lecturer` (`first_name`, `last_name`, `age`, `course_count`, `email`, `created_at`, `level_n8n`, `level_fullstack`, `level_AI`, `level_MySQL`) VALUES ('dummy', 'user', '19', '8', 'dummy@user.com', '2025-09-15', '3', '3', '3', '3');


CREATE TABLE IF NOT EXISTS `lecturer_management`.`knowledgeLevel` (
  `levelID` INT NOT NULL AUTO_INCREMENT,
  `levelName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`levelID`));

INSERT INTO `lecturer_management`.`knowledgeLevel` (`levelName`) VALUES ('No Knowledge');
INSERT INTO `lecturer_management`.`knowledgeLevel` (`levelName`) VALUES ('Low');
INSERT INTO `lecturer_management`.`knowledgeLevel` (`levelName`) VALUES ('Medium');
INSERT INTO `lecturer_management`.`knowledgeLevel` (`levelName`) VALUES ('Expert');
INSERT INTO `lecturer_management`.`knowledgeLevel` (`levelName`) VALUES ('Roei Test');
