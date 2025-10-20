const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    cover: { type: String},
    completed: { type: Boolean, default: false },
    rating: { type: Number, min: 0, max: 5 },
    hoursPlayed: { type: Number, default: 0 },
    platform: { type: String },
    releaseDate: { type: Date },
    genres: [String],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);