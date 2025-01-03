const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth'); // Importar las rutas
const appointmentRoutes = require('./routes/appointment');

dotenv.config(); // Cargar las variables de entorno

const app = express();
/*const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000', // Cambia esto si tu frontend está en otro dominio
}));
*/
const cors = require('cors');
app.use(cors());


// Middleware para procesar los cuerpos de las solicitudes
app.use(express.json());

// Usar las rutas de autenticación
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

// Conectar a la base de datos y manejar errores
connectDB().then(() => {
    console.log('🔵 Conexión a la base de datos exitosa');
}).catch((err) => {
    console.error('🔴 Error al conectar a la base de datos', err);
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🟢 Servidor corriendo en http://localhost:${PORT}`);
});