const express = require("express")
const interview = require("../frontend/src/components/__mocks__/appointments.json")
const router = express.Router();
const { Pool } = require("pg");


const dbCredentials = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  }; 



// showing interviews booked
router.get("/interviews", (req,res)=>{
  const pool = new Pool(dbCredentials);
  pool
    .query("SELECT * FROM interviews")
    .then((result) => {
      console.log("pool is working")
      return (
        result.rows
      )
    })
    .then((interviews) => res.json(interviews))
    .catch((err) => {
      console.log("error sketch")
      console.log(err)
    })
    .finally(() => pool.end());
});

// booking an interview
router.post("/interviews", (req, res) => {
    res.json("interviewBook")
})

module.exports = router