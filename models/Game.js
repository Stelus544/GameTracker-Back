const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  portada: {
    type: String,
    default: 'https://via.placeholder.com/300x400?text=Sin+Portada'
  },
  plataforma: {
    type: String,
    enum: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile', 'Otra'],
    default: 'PC'
  },
  genero: {
    type: String,
    trim: true
  },
  desarrollador: {
    type: String,
    trim: true
  },
  fechaLanzamiento: {
    type: Date
  },
  completado: {
    type: Boolean,
    default: false
  },
  puntuacion: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  horasJugadas: {
    type: Number,
    default: 0,
    min: 0
  },
  fechaAgregado: {
    type: Date,
    default: Date.now
  },
  notas: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);