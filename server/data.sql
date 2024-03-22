CREATE DATABASE todoapp;

CREATE TABLE todos (
    id VARCHAR(255) PRIMARY KEY,
    user-email VARCHAR(255),
    title VARCHAR(255),
    progress INT,
    date VARCHAR(300)
);


CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);


INSERT INTO todos (id, email, title, progress, date) 
VALUES ('0', 'angela@test.com', 'First todo', '10', '18-03-2024');