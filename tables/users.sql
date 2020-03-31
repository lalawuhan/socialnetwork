DROP TABLE IF EXISTS users CASCADE; 

 CREATE TABLE users( 
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL,
      last VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      image_url TEXT,
      biography TEXT
 ); 

--  psql socialnetwork -f users.sql
