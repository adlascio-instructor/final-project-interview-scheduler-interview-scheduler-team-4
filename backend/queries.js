const getDays = "SELECT * FROM days"


const getAppointments = "SELECT appointments.id, appointments.time, interviews.student, interviewers.id AS interviewer_id, interviewers.name AS interviewer, interviewers.avatar FROM appointments LEFT JOIN interviews ON interviews.appointment_id = appointments.id LEFT JOIN interviewers ON interviews.interviewer_id = interviewers.id LEFT JOIN days ON appointments.day_id = days.id WHERE days.name = $1 ORDER BY appointments.id"

const postAppointments = "INSERT INTO interviews (student, interviewer_id, appointment_id) VALUES ($1, $2, $3)";

module.exports = {getDays};
module.exports = {getAppointments};
module.exports = {postAppointments};