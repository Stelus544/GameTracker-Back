const express = require('express');
const Review = require('../models/Review');

const router = express.Router();

// GET: Buscar reseñas (por gameId opcional)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.gameId ? { gameId: req.query.gameId } : {};
    const reviews = await Review.find(filter);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST, PUT, DELETE similares a games...
// (Copia y adapta el código de games.js, cambiando Game por Review)

module.exports = router;