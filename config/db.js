const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🟢 MongoDB conectado exitosamente');
  } catch (error) {
    console.error('🔴 Error al conectar MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
