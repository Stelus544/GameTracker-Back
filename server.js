const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a la base de datos MongoDB'))
.catch(err => console.error('Error de conexión:', err));

const gameRoutes = require('./routes/gameRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use('/api/games', gameRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => { res.send('Backend funcionando correctamente'); });

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});