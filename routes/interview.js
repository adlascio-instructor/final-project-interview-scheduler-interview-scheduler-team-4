const express = require("express")
const interview = require("../frontend/src/components/__mocks__/appointments.json")
const router = express.Router();

// showing interviews booked
router.get("/interviews", (req,res)=>{
    res.json("interviews")
});

// booking an interview
router.post("/interviews", (req, res) => {
    res.json("interviewBook")
})

module.exports = router