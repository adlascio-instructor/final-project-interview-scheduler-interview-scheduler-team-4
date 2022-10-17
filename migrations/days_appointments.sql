CREATE TABLE days (
    id SERIAL PRIMARY KEY NOT NULL, -- GENERATED ALWAYS AS IDENTITY --
    name VARCHAR(255)
);

CREATE TABLE appointments (
    id SERIAL PRIMARY KEY NOT NULL,
    time VARCHAR(255) NOT NULL,
    day_id INTEGER REFERENCES days(id) ON DELETE CASCADE
);