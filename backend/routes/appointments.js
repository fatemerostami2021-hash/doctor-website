const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

router.post('/', [
  body('fullName').notEmpty(),
  body('phone').notEmpty()
], appointmentController.createAppointment);
router.get('/', auth, appointmentController.getAppointments);
router.put('/:id/status', auth, appointmentController.updateStatus);

module.exports = router;
