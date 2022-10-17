const express = require("express");
const { Pool } = require("pg");
const routes = require("./backend/routes");

require ("dotenv").config ()

/*
too many routes

const interviewRoutes = require("./routes/interview")
const interviewerRoutes = require("./routes/interviewer")
const availableDaysRoutes = require("./routes/availableDay")
const appointmentRoutes = require("./routes/appointment")

server.use(interviewRoutes)
server.use(interviewerRoutes)
server.use(availableDaysRoutes)
server.use(appointmentRoutes)
*/

const cors = require("cors")
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors())
server.use("/", routes);

const dbCredentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
}; 

/*
server.get("/days", (req, res) => {
    const pool = new Pool(dbCredentials);
    pool
      .query("SELECT * FROM days")
      .then((result) => result.rows)
      .then((days) => res.json(days))
      .catch((err) => console.log(err))
      .finally(() => pool.end());
  });

  server.get("/appointments", (req, res) => {
    const pool = new Pool(dbCredentials);
    pool
      .query("SELECT appointments.id, appointments.time, interviews.student, interviewers.id AS interviewer_id, interviewers.name AS interviewer, interviewers.avatar FROM appointments LEFT JOIN interviews ON interviews.appointment_id = appointments.id LEFT JOIN interviewers ON interviews.interviewer_id = interviewers.id LEFT JOIN days ON appointments.day_id = days.id WHERE days.name = $1 ORFER BY appointments.id")
      .then((result) => result.rows)
      .then((appointments) => res.json(appointments))
      .catch((err) => console.log(err))
      .finally(() => pool.end());
  });  

  */


/*
server.get("/available_interviewers", (req, res) => {
  const pool = new Pool(dbCredentials);
  pool
    .query("SELECT * FROM available_interviewers JOIN days WHERE ") Research how to get AV INT for a given day 
    .then((result) => result.rows)
    .then((available_interviewers) => res.json(available_interviewers))
    .catch((err) => console.log(err))
    .finally(() => pool.end());
});

const availableDayRoutes = require ("./routes/availableDay");
const interviewerRoutes = require ("./routes/interviewer");


server.use(availableDayRoutes)
server.use(interviewerRoutes)


const port = 8000;
*/



module.exports = dbCredentials;

server.listen(8000, () => console.log(`Server is running on port 8000`));
