const express = require("express");
const availableDayRoutes = require ("./routes/availableDay");
const interviewerRoutes = require ("./routes/interviewer");

const app = express();

app.use(availableDayRoutes)
app.use(interviewerRoutes)

const port = 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
