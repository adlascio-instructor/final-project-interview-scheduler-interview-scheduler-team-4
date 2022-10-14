CREATE SCHEMA [IF NOT EXISTS] schema_name;

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