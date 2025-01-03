const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createAppointment, getAppointments, getAppointmentsByDate, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');

const router = express.Router();

router.post('/', protect, createAppointment);
router.get('/', protect, getAppointments);
router.get('/date', protect, getAppointmentsByDate);
router.put('/:id', protect, updateAppointment);
router.delete('/:id', protect, deleteAppointment);

module.exports = router;
