CREATE DATABASE Notes_Application;

CREATE TABLE user_info (
	user_id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	username VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(60) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);