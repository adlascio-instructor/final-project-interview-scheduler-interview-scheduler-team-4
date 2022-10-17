var express = require('express');
var route = express.Router();
const { Pool } = require("pg");

//getting appointments for specific day 

const dbCredentials = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  }; 

route.get("/appointments/:dayId", async (req, res) => {
    const pool = new Pool(dbCredentials);
    const resultApps = await pool.query(`SELECT * FROM appointments WHERE day_id = ${req.params.dayId}`)
    const resultInterviews = await pool.query(`SELECT * FROM interviews`)
    const resultInterviewers = await pool.query(`SELECT * FROM interviewers`)
    let interviewers = resultInterviewers.rows
    let interviews = resultInterviews.rows
    let appointments = resultApps.rows
    pool.end ()
    appointments = appointments.map((appointment) => {
        interviews.forEach((interview) =>{
            interviewers.forEach((interviewer) =>{
                if (interview.interviewer_id == interviewer.id){
                    interview.interviewer = interviewer
                }
            }) 
            if (appointment.id == interview.appointment_id){
                appointment.interview = interview
            }
        })
        return appointment
    })
    res.json(appointments)


   /*  pool
        .query(`SELECT appointments.id, time, interviews.student, interviewers.name, interviewers.avatar
            FROM appointments 
            INNER JOIN interviews 
            ON appointments.id = interviews.appointment_id 
            INNER JOIN interviewers ON interviews.interviewer_id = interviewers.id
            WHERE day_id = ${req.params.dayId}`)
        .then((result) => {
            return (
                result.rows
            )
        })
        .then((appointments) => {
            console.log (appointments)
            appointments = appointments.map((appointment) => {
                return {
                    id:appointment.id,
                    time:appointment.time,
                    interview:{
                        student:appointment.student,
                        interviewer:{
                            name:appointment.name,
                            avatar:appointment.avatar
                        }
                    }
                }
            })
            res.json(appointments)
            pool.query(`SELECT * FROM interviews`)
            .then((result) => {
                console.log(result)
                return (
                    result.rows
                )
            })
            .then ((interviews)=> {
                console.log(interviews)
                appointments = appointments.map((appointment) => {
                    interviews.forEach((interview) =>{
                        if (appointment.id == interview.appointment_id){
                            appointment.interview = interview
                        }
                    })
                    return appointment
                })
                res.json(appointments)
            })
            .finally(() => pool.end()); 
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => pool.end()); */
})

module.exports = route;