CREATE TABLE interviewers (
    id SERIAL PRIMARY KEY NOT NULL, -- GENERATED ALWAYS AS IDENTITY --
    name VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NOT NULL
);

CREATE TABLE available_interviewers (
    id SERIAL PRIMARY KEY,
    interviewer_id INTEGER REFERENCES interviewers(id), -- ON DELETE CASCADE --
    day_id INTEGER REFERENCES days(id) -- ON DELETE CASCADE --
);

CREATE TABLE interviews (
    id SERIAL PRIMARY KEY NOT NULL,
    student VARCHAR(255) NOT NULL,
    interviewer_id INTEGER REFERENCES interviewers(id), -- ON DELETE CASCADE --
    appointment_id INTEGER UNIQUE REFERENCES appointments(id) -- ON DELETE CASCADE --
);

