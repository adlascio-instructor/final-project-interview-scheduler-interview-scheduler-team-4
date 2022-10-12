const express = require("express")
const interviewer = require("../frontend/src/components/__mocks__/appointments.json")
const router = express.Router();
router.get("/interviewer", (req,res)=>{
    res.send("interviewer", {interviewer})
});
module.exports = router