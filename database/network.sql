
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS resetCode;

CREATE TABLE users(
     id             SERIAL PRIMARY KEY,
     email          VARCHAR UNIQUE NOT NULL CHECK (email != ''),
     hash           VARCHAR NOT NULL CHECK (hash != ''),
     name           VARCHAR,  
     surname        VARCHAR,  
     imgUrl         VARCHAR, 
     bio            TEXT, 
     created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     
);

CREATE TABLE resetCode(
     id             SERIAL PRIMARY KEY,
     code           VARCHAR NOT NULL,
     email          VARCHAR NOT NULL,
     created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)