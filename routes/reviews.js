const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Review = require('../models/Review');

router.get('/', async (req, res) => {
  try {
    const{ juegoId } = req.query;
    let filtro = {};

    if (juegoId) {
      filtro.juegoId = juegoId;
    }

    const reviews = await Review.find(filtro)
    .populate('juegoId', 'Titulo Portada')
    .sort({ fechaCreacion: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener reseñas', error: error.mensaje });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const resena = await Resena.findById(req.params.id)
      .populate('juegoId', 'titulo portada plataforma genero');

    if (!resena) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    res.json(resena);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la reseña', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    // Verificar que el juego existe
    const juego = await Juego.findById(req.body.juegoId);
    if (!juego) {
      return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }

    const nuevaResena = new Resena(req.body);
    const resenaGuardada = await nuevaResena.save();

    // Poblar los datos del juego antes de enviar la respuesta
    await resenaGuardada.populate('juegoId', 'titulo portada');

    res.status(201).json(resenaGuardada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear reseña', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const resenaActualizada = await Resena.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('juegoId', 'titulo portada');

    if (!resenaActualizada) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    res.json(resenaActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar reseña', error: error.message });
  }
});

// DELETE - Eliminar una reseña
router.delete('/:id', async (req, res) => {
  try {
    const resenaEliminada = await Resena.findByIdAndDelete(req.params.id);
    if (!resenaEliminada) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    res.json({ mensaje: 'Reseña eliminada correctamente', resena: resenaEliminada });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar reseña', error: error.message });
  }
});

module.exports = router;