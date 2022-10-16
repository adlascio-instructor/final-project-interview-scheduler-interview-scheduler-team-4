const express = require("express")
//const interviewer = require("../frontend/src/components/__mocks__/appointments.json")
const router = express.Router();
const { Pool } = require("pg");


const dbCredentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
}; 

const interviewers = [
    { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
    { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
    { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
    { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
    { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
  ];

// getting interviewers specific day
router.get("/interviewers", (req, res)=> {
  const pool = new Pool(dbCredentials);
  pool
    .query("SELECT * FROM interviewers")
    .then((result) => result.rows)
    .then((interviewers) => res.json(interviewers))
    .catch((err) => console.log(err))
    .finally(() => pool.end());
})

router.get("/interviewers/:dayId", (req,res)=>{
  const pool = new Pool(dbCredentials);
  pool
    .query(`SELECT available_interviewers.id, interviewers.name FROM available_interviewers 
    INNER JOIN interviewers ON available_interviewers.interviewer_id = interviewers.id
    `) /* Research how to get AV INT for a given day */
    .then((result) => result.rows)
    .then((available_interviewers) => res.json(available_interviewers))
    .catch((err) => console.log(err))
    .finally(() => pool.end());
});

module.exports = router