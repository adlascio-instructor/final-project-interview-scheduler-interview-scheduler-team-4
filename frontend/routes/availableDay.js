const express = require("express");
const days = require("../frontend/src/components/__mocks__/days.json")
const router = express.Router();
router.get("/days", (req, res)=> {
    res.send("days", {days})
});
module.exports = router