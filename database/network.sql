
DROP TABLE IF EXISTS userData;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS resetCode;

CREATE TABLE users(
     id             SERIAL PRIMARY KEY,
     email          VARCHAR UNIQUE NOT NULL CHECK (email != ''),
     hash           VARCHAR NOT NULL CHECK (hash != ''),
     name           VARCHAR,  
     surname        VARCHAR,  
     created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     
);
CREATE TABLE userData(
     id             SERIAL PRIMARY KEY,
     user_id        INT NOT NULL UNIQUE REFERENCES users(id), 
     age            INT, 
     city           VARCHAR, 
     country        VARCHAR, 
     website        VARCHAR
);

CREATE TABLE resetCode(
     id             SERIAL PRIMARY KEY,
     code           VARCHAR NOT NULL,
     email          VARCHAR NOT NULL,
     created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)