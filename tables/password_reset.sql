DROP TABLE IF EXISTS password_reset CASCADE; 

CREATE TABLE password_reset(
    id SERIAL PRIMARY KEY,
    code VARCHAR(255),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--  psql socialnetwork -f password_reset.sql
