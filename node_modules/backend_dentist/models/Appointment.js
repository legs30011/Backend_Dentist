const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    clientName: { type: String, required: true }, // Este campo es obligatorio
    clientPhone: { type: String, required: true }, // Este campo es obligatorio
    date: { type: Date, required: true },
    time: { type: String, required: true },
    notes: { type: String, required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
