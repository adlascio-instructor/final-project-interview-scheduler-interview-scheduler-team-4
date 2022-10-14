const express = require("express");
const { Pool } = require("pg");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true}));


const dbCredentials = {
    user: "jorgeruiz",
    host: "localhost",
    database: "interviewer_scheduler",
    password: "",
    port: 5432,
  };

server.get("/interviews", (req, res) => {
    const pool = new Pool(dbCredentials);
    pool
      .query("SELECT * FROM interviews")
      .then((result) => result.rows)
      .then((interviews) => res.json(interviews))
      .catch((err) => console.log(err))
      .finally(() => pool.end());
  });

server.get("/interviewers", (req, res) => {
    const pool = new Pool(dbCredentials);
    pool
      .query("SELECT * FROM interviewers")
      .then((result) => result.rows)
      .then((interviewers) => res.json(interviewers))
      .catch((err) => console.log(err))
      .finally(() => pool.end());
  });


  server.get("/available_interviewers", (req, res) => {
    const pool = new Pool(dbCredentials);
    pool
      .query("SELECT * FROM available_interviewers JOIN days WHERE ") /* Research how to get AV INT for a given day */
      .then((result) => result.rows)
      .then((available_interviewers) => res.json(available_interviewers))
      .catch((err) => console.log(err))
      .finally(() => pool.end());
  }); 
/*
const availableDayRoutes = require ("./routes/availableDay");
const interviewerRoutes = require ("./routes/interviewer");


server.use(availableDayRoutes)
server.use(interviewerRoutes)


const port = 8000;
*/




server.listen(8000, () => console.log(`Server is running on port 8000`));
