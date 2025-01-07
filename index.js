// index.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointment');
const medicineRoutes = require('./routes/medicines'); // Importa las rutas de medicinas

dotenv.config();

const app = express();

const cors = require('cors');
app.use(cors());

// Middleware para procesar cuerpos JSON
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medicines', medicineRoutes); // Añade las rutas de medicinas

// Conectar a la base de datos
connectDB().then(() => {
    console.log('🔵 Conexión a la base de datos exitosa');
}).catch((err) => {
    console.error('🔴 Error al conectar a la base de datos', err);
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🟢 Servidor corriendo en http://localhost:${PORT}`);
});
