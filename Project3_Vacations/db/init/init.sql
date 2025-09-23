SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- init.sql for Vacations app
DROP SCHEMA IF EXISTS `vacations_app`;
CREATE SCHEMA IF NOT EXISTS `vacations_app` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `vacations_app`;

-- Users table
CREATE TABLE IF NOT EXISTS `vacations_app`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name`  VARCHAR(100) NOT NULL,
  `email`      VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) DEFAULT NULL,
  `role` ENUM('user','admin') NOT NULL DEFAULT 'user',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_users_email` (`email`)
);

-- Vacations table
CREATE TABLE IF NOT EXISTS `vacations_app`.`vacations` (
  `vacation_id` INT NOT NULL AUTO_INCREMENT,
  `destination` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `start_date` DATETIME NOT NULL,
  `end_date`   DATETIME NOT NULL,
  `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `image_name` VARCHAR(255) DEFAULT NULL, 
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`vacation_id`),
  KEY `idx_vacations_start` (`start_date`),
  KEY `idx_vacations_destination` (`destination`)
) ;

-- Followers join table (user follows vacation)
CREATE TABLE IF NOT EXISTS `vacations_app`.`followers` (
  `user_id` INT NOT NULL,
  `vacation_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`vacation_id`),
  KEY `idx_followers_vacation` (`vacation_id`),
  CONSTRAINT `fk_followers_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_followers_vacation` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`vacation_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ;

-- Seed: example vacations (12+ records)
INSERT INTO `vacations_app`.`vacations` (`destination`, `description`, `start_date`, `end_date`, `price`, `image_name`)
VALUES
('Paris, France', 'Explore the city of lights: museums, cafes and the Seine.', '2025-11-05 09:00:00', '2025-11-12 18:00:00', 1299.00, 'paris.jpg'),
('Rome, Italy', 'Ancient history tour: Colosseum, Vatican, and local cuisine.', '2025-10-10 08:00:00', '2025-10-17 20:00:00', 999.00, 'rome.jpg'),
('Santorini, Greece', 'A relaxing island getaway with stunning sunsets and beaches.', '2025-07-01 10:00:00', '2025-07-07 18:00:00', 1499.00, 'santorini.jpg'),
('Tokyo, Japan', 'Modern city life and traditional temples; food tour included.', '2026-03-15 06:00:00', '2026-03-22 22:00:00', 1999.00, 'tokyo.jpg'),
('New York, USA', 'Big apple highlights: shows, museums, skyline views.', '2025-12-01 09:00:00', '2025-12-06 22:00:00', 1199.00, 'nyc.jpg'),
('Reykjavik, Iceland', 'Northern lights, geothermal pools and scenic drives.', '2025-11-20 12:00:00', '2025-11-27 20:00:00', 1799.00, 'iceland.jpg'),
('Bali, Indonesia', 'Tropical beaches, temples and wellness retreats.', '2026-02-05 08:00:00', '2026-02-12 19:00:00', 1399.00, 'bali.jpg'),
('Cape Town, South Africa', 'Coastal scenery, vineyards and Table Mountain hike.', '2025-09-30 07:00:00', '2025-10-07 18:00:00', 1599.00, 'capetown.jpg'),
('Barcelona, Spain', 'Architecture, tapas and Mediterranean beaches.', '2025-10-25 09:00:00', '2025-10-31 17:00:00', 1099.00, 'barcelona.jpg'),
('Sydney, Australia', 'Harbour views, beaches and city attractions.', '2026-04-10 07:00:00', '2026-04-18 20:00:00', 2099.00, 'sydney.jpg'),
('Prague, Czech Republic', 'Historic old town, castles and riverside walks.', '2025-11-02 09:00:00', '2025-11-08 17:00:00', 899.00, 'prague.jpg'),
('Lisbon, Portugal', 'Hillside streets, trams, and fresh seafood.', '2025-12-15 10:00:00', '2025-12-21 18:00:00', 999.00, 'lisbon.jpg');


-- View: vacations with followers count (convenience)
DROP VIEW IF EXISTS `vacations_app`.`vw_vacations_with_followers`;
CREATE VIEW `vw_vacations_with_followers` AS
SELECT
  v.vacation_id,
  v.destination,
  v.description,
  v.start_date,
  v.end_date,
  v.price,
  v.image_name,
  (SELECT COUNT(*) FROM followers f WHERE f.vacation_id = v.vacation_id) AS followers_count
FROM vacations v;

