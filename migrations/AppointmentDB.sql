CREATE SCHEMA [IF NOT EXISTS] schema_name;

CREATE TABLE appointments (
    id serial primary key,
    time varchar(255),
    day_id integer REFERENCES day(id)
);

CREATE TABLE available_interviewers (
    id serial primary key,
    interviewer_id integer REFERENCES interviewer (id),
    day_id integer REFERENCES day (id)
);

CREATE TABLE days (
    id serial primary key,
    week_name varchar(15)
);

CREATE TABLE interviews (
    id serial primary key,
    student varchar(100),
    interviewer_id integer REFERENCES interviewer (id),
    appointment integer REFERENCES appointment (id)
);

CREATE TABLE interviewers (
    id serial primary key,
    name varchar(100),
    avatar text
);


SELECT * FROM appointments;
SELECT * FROM days;
SELECT * FROM interviews;
SELECT * FROM interviewers;
SELECT * FROM available_interviewers;