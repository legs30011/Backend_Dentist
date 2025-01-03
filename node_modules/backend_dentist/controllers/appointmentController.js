const Appointment = require('../models/Appointment');

// Crear una cita
const createAppointment = async (req, res) => {
    const { clientName, clientPhone,date, time,notes } = req.body;
    try {
        const appointment = await Appointment.create({ clientName,clientPhone, date, time, notes });
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la cita', error });
    }
};

// Obtener todas las citas
const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener las citas', error });
    }
};

// Obtener citas por fecha
const getAppointmentsByDate = async (req, res) => {
    const { date } = req.query;
    try {
        const appointments = await Appointment.find({ date });
        res.json(appointments);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener citas por fecha', error });
    }
};

// Editar una cita
const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const appointment = await Appointment.findByIdAndUpdate(id, updates, { new: true });
        res.json(appointment);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la cita', error });
    }
};

// Eliminar una cita
const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        await Appointment.findByIdAndDelete(id);
        res.json({ message: 'Cita eliminada correctamente' });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar la cita', error });
    }
};

module.exports = { createAppointment, getAppointments, getAppointmentsByDate, updateAppointment, deleteAppointment };
