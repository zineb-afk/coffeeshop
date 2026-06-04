const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const Atelier = require('../models/Atelier');
const { protect, adminOnly } = require('../middleware/auth');

// POST /api/reservations — Réserver un atelier
router.post('/', protect, async (req, res) => {
  try {
    const { atelierId, nombrePersonnes } = req.body;

    const atelier = await Atelier.findById(atelierId);
    if (!atelier) return res.status(404).json({ message: 'Atelier non trouvé' });
    if (atelier.placesRestantes < nombrePersonnes) {
      return res.status(400).json({ message: 'Pas assez de places disponibles' });
    }

    const total = atelier.prix * nombrePersonnes;

    const reservation = await Reservation.create({
      client: req.user._id,
      atelier: atelierId,
      nombrePersonnes,
      total,
    });

    // Décrémenter les places
    atelier.placesRestantes -= nombrePersonnes;
    await atelier.save();

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/reservations/mes-reservations — Réservations du client
router.get('/mes-reservations', protect, async (req, res) => {
  try {
    const reservations = await Reservation.find({ client: req.user._id })
      .populate('atelier', 'titre date heureDebut prix image')
      .sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/reservations — Toutes les réservations (admin)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('client', 'nom prenom email')
      .populate('atelier', 'titre date heureDebut prix')
      .sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/reservations/:id/statut — Changer statut (admin)
router.put('/:id/statut', protect, adminOnly, async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { statut: req.body.statut },
      { new: true }
    );
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
