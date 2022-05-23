
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
     friends        int[],
     created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     
);

CREATE TABLE resetCode(
     id             SERIAL PRIMARY KEY,
     code           VARCHAR NOT NULL,
     email          VARCHAR NOT NULL,
     created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE pending_requests(
     id             SERIAL PRIMARY KEY,
     sender_id      int,
     recipient_id   int
)

CREATE TABLE messages(
     id             SERIAL PRIMARY KEY,
     sender_id      int,
     text           VARCHAR
)

CREATE TABLE events(
     id                  SERIAL PRIMARY KEY,
     creator             int,
     evt_name            VARCHAR,
     startDate           DATE,
     startTime           TIME,
     endDate             DATE,
     endTime             TIME,
     evt_location        VARCHAR,
     poster              VARCHAR,
     evt_description     VARCHAR,
     collaborators       VARCHAR

)

INSERT INTO events (creator, evt_name, startDate, startTime, endDate, endTime, evt_location, poster, evt_description, collaborators) 
VALUES ('203','Autonoma','2022-01-21','20:00','2022-01-21','20:00','berlin','poster','description','collaborators');
