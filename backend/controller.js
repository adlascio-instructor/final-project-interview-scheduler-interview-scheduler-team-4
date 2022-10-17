const dbCredentials = require("../server");
const getDays = require("./queries/get_days")

const getDays = (req, res) => {
    dbCredentials.query(get_Days.getDays, (error, result) => {
        if (error) throw error;
        res.status(200);
    });
};

const getAppointments = (req, res) => {
    const weekDay = req.params.weekDay;
    dbCredentials.query(get_appointments.getAppointments, [weekDay], (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
};

module.exports = {getDays};
module.exports = {getAppointments};