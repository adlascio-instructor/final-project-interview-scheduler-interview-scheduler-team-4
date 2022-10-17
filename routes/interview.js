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

router.delete("/interviews/:id", async (req, res) => {
    const pool = new Pool(dbCredentials);
    await pool.query (`delete FROM interviews WHERE id = ${req.params.id}`)
    pool.end()
    res.json("interview deleted")
})

router.post("/interviews", async (req, res) => {
  console.log(req.body)
  const pool = new Pool(dbCredentials);
  const result = await pool.query("SELECT * FROM interviews")
  console.log(result.rowCount)
  await pool.query (`INSERT INTO "interviews" ("id", "student", "interviewer_id", "appointment_id") 
  VALUES ($1, $2, $3, $4);`, [result.rowCount+3, req.body.student, req.body.interviewer_id, req.body.appointment_id])
  pool.end()
  res.json("interview added")
})

router.put("/interviews/:id", async (req, res) => {
  console.log(req.body)
  const pool = new Pool(dbCredentials);
  await pool.query (`update interviews set student = $1, interviewer_id = $2 WHERE id = $3`, [req.body.student, req.body.interviewer_id, req.params.id])
  pool.end()
  res.json("interview updated")
})



module.exports = router