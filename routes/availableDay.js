const express = require("express");
const days = require("../frontend/src/components/__mocks__/days.json")
const router = express.Router();
const { Pool } = require("pg");
const { response } = require("express");

const dbCredentials = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  }; 

router.get("/days", (req, res) => {
    const pool = new Pool(dbCredentials);
    pool
        .query("SELECT * FROM days")
        .then((result) => {
            return (
                result.rows
            )
        })
        .then((days) => {
            days = days.map((day) => {
                return {
                    ...day, spots:3
                }
            })
            res.json(days)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => pool.end());
});

module.exports = router 
