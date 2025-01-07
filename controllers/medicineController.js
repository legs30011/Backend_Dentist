// controllers/medicineController.js

const Medicine = require('../models/Medicine');

// Obtener todas las medicinas
const getMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.json(medicines);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch medicines' });
    }
};

// Obtener una medicina por ID
const getMedicineById = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        res.json(medicine);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch medicine' });
    }
};

// Crear una nueva medicina
const createMedicine = async (req, res) => {
    const { name, description, price, stock } = req.body;

    try {
        const newMedicine = await Medicine.create({
            name,
            description,
            price,
            stock,
        });
        res.status(201).json(newMedicine);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create medicine' });
    }
};

// Actualizar una medicina
const updateMedicine = async (req, res) => {
    try {
        const updatedMedicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedMedicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        res.json(updatedMedicine);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update medicine' });
    }
};

// Eliminar una medicina
const deleteMedicine = async (req, res) => {
    try {
        const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);
        if (!deletedMedicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        res.json({ message: 'Medicine deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete medicine' });
    }
};

module.exports = {
    getMedicines,
    getMedicineById,
    createMedicine,
    updateMedicine,
    deleteMedicine,
};
