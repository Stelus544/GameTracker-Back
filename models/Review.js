const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reviewText: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Review', gameSchema);