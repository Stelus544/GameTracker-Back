const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://morenoorejuela25_db_user:contraseñasegura@cluster0.tqbqonu.mongodb.net/?appName=Cluster0';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch((err) => console.error('❌ Error conectando a MongoDB:', err));

// Importar rutas
const juegosRoutes = require('./routes/games');
const resenasRoutes = require('./routes/reviews');

// Usar rutas
app.use('/api/juegos', juegosRoutes);
app.use('/api/resenas', resenasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: '🎮 GameTracker API funcionando correctamente' });
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;