const mongoose = require ('mongoose');

const reviewSchema = new mongoose.Schema({
    juegoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    contenido: {
        type: String,
        required: true,
    },
    puntuacion: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    aspectosPositivos: {
        type: [String],
        default: []
    },
    aspectosNegativos: {
        type: [String],
        default: []
    },
    recomendado: {
        type: Boolean,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);