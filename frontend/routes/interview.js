const express = require("express")
const interview = require("../frontend/src/components/__mocks__/appointments.json")
const router = express.Router();
router.get("/interview", (req,res)=>{
    res.send("interview", {interview})
});
module.exports = router