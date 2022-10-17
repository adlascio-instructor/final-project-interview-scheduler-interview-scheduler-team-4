const dbCredentials = require("../server");
const queries = require("./queries");

const getDays = (req, res) => {
    dbCredentials.query(queries.getDays, (error, result) => {
        if (error) throw error;
        res.status(200);
    });
};


const getAppointments = (req, res) => {
    const weekDay = req.params.weekDay;
    dbCredentials.query(queries.getAppointments, [weekDay], (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
};

module.exports = {getDays};
module.exports = {getAppointments};