const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser); // Handle user registration
router.post('/login', loginUser); // Handle user login
// Obtener la información del usuario autenticado
const getUser = async (req, res) => {
    try {
        // Suponemos que el token ya fue verificado en un middleware
        const user = await User.findById(req.user.id).select('-password'); // Seleccionamos todos los campos, excepto la contraseña

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Enviar la respuesta con los datos del usuario
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = router;
