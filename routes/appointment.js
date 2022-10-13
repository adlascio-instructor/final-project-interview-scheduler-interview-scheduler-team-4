var express = require('express');
var route = express.Router();

//getting appointments for specific day 

route.get("/appointments/:dayId", (req, res) => {
    res.json("appointments")
})

module.exports = route;