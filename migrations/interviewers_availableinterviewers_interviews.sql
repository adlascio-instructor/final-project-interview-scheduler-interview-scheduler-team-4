CREATE TABLE interviewers (
    id SERIAL PRIMARY KEY NOT NULL, /* GENERATED ALWAYS AS IDENTITY */
    name VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NOT NULL
);

CREATE TABLE available_interviewers (
    id SERIAL PRIMARY KEY,
    interviewer_id INTEGER REFERENCES interviewers(id), /* ON DELETE CASCADE */
    day_id INTEGER REFERENCES days(id), /* ON DELETE CASCADE */
);

CREATE TABLE interviews (
    id SERIAL PRIMARY KEY NOT NULL,
    student VARCHAR(255) NOT NULL,
    interviewer_id INTEGER REFERENCES interviewers(id), /* ON DELETE CASCADE */
    appointment_id INTEGER UNIQUE REFERENCES appointments(id) /* ON DELETE CASCADE */
);










/*CREATE SCHEMA [IF NOT EXISTS] schema_name;

CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    time VARCHAR(50),
    day_id INTEGER
);

CREATE TABLE available_interviewers (
    id SERIAL PRIMARY KEY,
    interviewer_id INTEGER,
    day_id INTEGER
);

CREATE TABLE days (
    id SERIAL PRIMARY KEY,
    name VARCHAR(15)
);

CREATE TABLE interviews (
    id SERIAL PRIMARY KEY,
    student VARCHAR(100),
    interviewer_id INTEGER,
    appointment_id INTEGER
);

CREATE TABLE interviewers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    avatar TEXT
);


/*
SELECT * FROM appointments;
SELECT * FROM days;
SELECT * FROM interviews;
SELECT * FROM interviewers;
SELECT * FROM available_interviewers; 
*/