const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User'); // ⚠️ Importa el modelo User aquí

const router = express.Router();

// Rutas de autenticación
router.post('/register', registerUser); // Registro de usuario
router.post('/login', loginUser); // Inicio de sesión

// Ruta protegida para obtener información del usuario autenticado
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password'); // Excluir contraseña

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Ruta protegida para actualizar la información del usuario
router.put('/profile', protect, async (req, res) => {
    try {
        const { name, email } = req.body; // Extraer los datos del cuerpo

        // Validar que los datos existan
        if (!name && !email) {
            return res.status(400).json({ message: 'No hay datos para actualizar' });
        }

        // Actualizar el usuario
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { 
                ...(name && { name }),
                ...(email && { email })
            },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Ruta protegida para eliminar la cuenta del usuario
router.delete('/profile', protect, async (req, res) => {
    try {
        // Eliminar el usuario
        const deletedUser = await User.findByIdAndDelete(req.user._id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Cuenta eliminada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;
