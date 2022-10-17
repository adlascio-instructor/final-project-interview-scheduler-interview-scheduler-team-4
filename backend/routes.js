const { Router } = require("express");
const controller = require("backend/controller");

const router = Router();

router.get('/days', controller.getDays);
router.get('/deleteAppointments', controller.deleteAppointments);
router.get('/appointments', controller.getAppointment);

module.exports = router;