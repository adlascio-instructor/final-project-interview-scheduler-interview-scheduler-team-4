CREATE SCHEMA [IF NOT EXISTS] schema_name;

CREATE TABLE appointment (
    id serial primary key,
    time varchar(255),
    day_id integer REFERENCES day(id)
);

CREATE TABLE available_interviewer (
    id serial primary key,
    interviewer_id integer REFERENCES interviewer (id),
    day_id integer REFERENCES day (id)
);

CREATE TABLE day (
    id serial primary key,
    week_name varchar(255)
);

CREATE TABLE interview (
    id serial primary key,
    student varchar(255),
    nterviewer_id integer REFERENCES interviewer (id),
    appointment integer REFERENCES appointment (id)
);

CREATE TABLE interviewer (
    id serial primary key,
    name varchar(255),
    avatar text
);


SELECT * FROM appointment;
SELECT * FROM day;
SELECT * FROM interview;
SELECT * FROM interviewer;
SELECT * FROM available_interviewer;