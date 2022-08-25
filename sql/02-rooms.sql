DROP TABLE IF EXISTS rooms;

CREATE TABLE rooms(
    room_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    user_id   INT NOT NULL  REFERENCES users(id)

);