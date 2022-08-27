DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL CHECK (name != ''),
    email VARCHAR UNIQUE NOT NULL CHECK (email != ''),
    password_hash VARCHAR NOT NULL CHECK(password_hash != ''),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tasks_per_week INTEGER NOT NULL DEFAULT 2
);

CREATE TABLE reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );