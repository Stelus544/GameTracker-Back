const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

router.get('/', async (req, res) => {
    try {
      const { completado, plataforma, genero, ordenar } = req.query;
      let filtro = {};

      if (completado !== undefined) {
        filtro.completado = completado === 'true';
      }
      if(plataforma) {
        filtro.plataforma = plataforma;
      }
      if(genero) {
        filtro.genero = genero;
      }

      let.query = Juego.find(filtro);

    if (ordenar === 'puntuacion') {
      query = query.sort({ puntuacion: -1 });
    } else if (ordenar === 'recientes') {
      query = query.sort({ fechaAgregado: -1 });
    } else if (ordenar === 'nombre') {
      query = query.sort({ titulo: 1 });
    } else if (ordenar === 'horas') {
      query = query.sort({ horasJugadas: -1 });
    }

    const juegos = await query;
      res.json(juegos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) {
      return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }
    res.json(juego);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el juego', error: error.message });
  }
});

// POST - Crear un nuevo juego
router.post('/', async (req, res) => {
  try {
    const nuevoJuego = new Juego(req.body);
    const juegoGuardado = await nuevoJuego.save();
    res.status(201).json(juegoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear juego', error: error.message });
  }
});

// PUT - Actualizar un juego
router.put('/:id', async (req, res) => {
  try {
    const juegoActualizado = await Juego.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!juegoActualizado) {
      return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }
    res.json(juegoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar juego', error: error.message });
  }
});

// DELETE - Eliminar un juego
router.delete('/:id', async (req, res) => {
  try {
    const juegoEliminado = await Juego.findByIdAndDelete(req.params.id);
    if (!juegoEliminado) {
      return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }
    res.json({ mensaje: 'Juego eliminado correctamente', juego: juegoEliminado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar juego', error: error.message });
  }
});

// GET - Obtener estadísticas
router.get('/estadisticas/generales', async (req, res) => {
  try {
    const totalJuegos = await Juego.countDocuments();
    const juegosCompletados = await Juego.countDocuments({ completado: true });
    const horasTotales = await Juego.aggregate([
      { $group: { _id: null, total: { $sum: '$horasJugadas' } } }
    ]);
    const puntuacionPromedio = await Juego.aggregate([
      { $group: { _id: null, promedio: { $avg: '$puntuacion' } } }
    ]);

    res.json({
      totalJuegos,
      juegosCompletados,
      juegosEnProgreso: totalJuegos - juegosCompletados,
      horasTotales: horasTotales[0]?.total || 0,
      puntuacionPromedio: puntuacionPromedio[0]?.promedio?.toFixed(2) || 0
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener estadísticas', error: error.message });
  }
});

module.exports = router;