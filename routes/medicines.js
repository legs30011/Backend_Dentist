// routes/medicineRoutes.js

const express = require('express');
const {
    getMedicines,
    getMedicineById,
    createMedicine,
    updateMedicine,
    deleteMedicine,
} = require('../controllers/medicineController');
const { protect, medicineManager } = require('../middleware/medicineAuth');

const router = express.Router();

// Rutas CRUD para medicinas
router.get('/', protect, getMedicines); // Acceso autenticado
router.get('/:id', protect, getMedicineById); // Acceso autenticado
router.post('/', protect, medicineManager, createMedicine); // Admin o medicine_manager
router.put('/:id', protect, medicineManager, updateMedicine); // Admin o medicine_manager
router.delete('/:id', protect, medicineManager, deleteMedicine); // Admin o medicine_manager

module.exports = router;
