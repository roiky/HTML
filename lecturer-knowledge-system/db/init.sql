CREATE DATABASE IF NOT EXISTS lecturer_management
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE lecturer_management;

CREATE TABLE IF NOT EXISTS lecturer (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name  VARCHAR(100) NOT NULL,
  age        INT NOT NULL CHECK (age >= 0),
  course_count INT NOT NULL DEFAULT 0,
  email      VARCHAR(255) NOT NULL UNIQUE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  knowledge_fullstack ENUM('No knowledge','Low','Medium','Expert') NOT NULL DEFAULT 'No knowledge',
  knowledge_ai_tools  ENUM('No knowledge','Low','Medium','Expert') NOT NULL DEFAULT 'No knowledge',
  knowledge_n8n       ENUM('No knowledge','Low','Medium','Expert') NOT NULL DEFAULT 'No knowledge',
  knowledge_mysql     ENUM('No knowledge','Low','Medium','Expert') NOT NULL DEFAULT 'No knowledge',
  knowledge_mongodb   ENUM('No knowledge','Low','Medium','Expert') NOT NULL DEFAULT 'No knowledge',
  knowledge_node      ENUM('No knowledge','Low','Medium','Expert') NOT NULL DEFAULT 'No knowledge',
  knowledge_typescript ENUM('No knowledge','Low','Medium','Expert') NOT NULL DEFAULT 'No knowledge'
);
