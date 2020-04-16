DROP TABLE IF EXISTS chatMessages;

CREATE TABLE chatMessages(
  msg_id SERIAL PRIMARY KEY,
  message TEXT,
  sender_id INT REFERENCES users(id) NOT NULL,
  time_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--  psql socialnetwork -f chatMessages.sql
