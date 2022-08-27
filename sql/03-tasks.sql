DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks(
    task_id SERIAL PRIMARY KEY,
    description VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    -- on delete cascade will delete tasks if linked room or user is deleted
    user_id   INT NOT NULL  REFERENCES users(id) ON DELETE CASCADE,
     room_id  INT NOT NULL  REFERENCES rooms(room_id) ON DELETE CASCADE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     completed_at TIMESTAMP

);
