const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    dosage: { type: String },
    stock: { type: Number, default: 0 },
    price: { type: Number, required: true },
    expirationDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

const Medicine = mongoose.model('Medicine', MedicineSchema);
module.exports = Medicine;
