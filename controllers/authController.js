const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Asegúrate de que el modelo de usuario esté importado

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({
            message: 'User already exists',
            args: {},
            headers: res.getHeaders(),
            url: req.originalUrl,
        });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            args: {},
            headers: res.getHeaders(),
            url: req.originalUrl,
        });
    } else {
        return res.status(400).json({
            message: 'Invalid user data',
            args: {},
            headers: res.getHeaders(),
            url: req.originalUrl,
        });
    }
};


// Iniciar sesión y generar un token JWT
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        // Buscar al usuario por correo electrónico
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Comparar la contraseña con la contraseña hasheada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Devolver los datos del usuario y el token JWT
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};

// Función auxiliar para generar el token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Tiempo de expiración del token
    });
};

module.exports = { registerUser, loginUser };
