const express = require("express")
//const interviewer = require("../frontend/src/components/__mocks__/appointments.json")
const router = express.Router();

const interviewers = [
    { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
    { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
    { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
    { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
    { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
  ];

// getting interviewers specific day

router.get("/interviewers/:dayId", (req,res)=>{
    res.json(interviewers)
});

module.exports = router