DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks(
    task_id SERIAL PRIMARY KEY,
    description VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    user_id   INT NOT NULL  REFERENCES users(id),
     room_id  INT NOT NULL  REFERENCES rooms(room_id),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     completed_at TIMESTAMP

);
