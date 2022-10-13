const express = require("express");
const days = require("../frontend/src/components/__mocks__/days.json")
const router = express.Router();

router.get("/days", (req, res)=> {
    // fetch days from sql table
    res.json( days )
});

module.exports = router 