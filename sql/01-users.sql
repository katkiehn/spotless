DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL CHECK (name != ''),
    email VARCHAR UNIQUE NOT NULL CHECK (email != ''),
    password_hash VARCHAR NOT NULL CHECK(password_hash != ''),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);