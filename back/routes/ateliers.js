const express = require('express');
const router = express.Router();
const Atelier = require('../models/Atelier');
const { protect, adminOnly } = require('../middleware/auth');
const { upload } = require('../middleware/cloudinary');

// GET /api/ateliers — Tous les ateliers actifs (public)
router.get('/', async (req, res) => {
  try {
    const ateliers = await Atelier.find({ actif: true }).sort({ date: 1 });
    res.json(ateliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/ateliers/admin — Tous pour admin
router.get('/admin', protect, adminOnly, async (req, res) => {
  try {
    const ateliers = await Atelier.find().sort({ date: 1 });
    res.json(ateliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/ateliers/:id
router.get('/:id', async (req, res) => {
  try {
    const atelier = await Atelier.findById(req.params.id);
    if (!atelier) return res.status(404).json({ message: 'Atelier non trouvé' });
    res.json(atelier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/ateliers — Créer (admin)
router.post('/', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = req.file.path;
    data.placesRestantes = data.placesTotal;

    const atelier = await Atelier.create(data);
    res.status(201).json(atelier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/ateliers/:id — Modifier (admin)
router.put('/:id', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.image = req.file.path;

    const atelier = await Atelier.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!atelier) return res.status(404).json({ message: 'Atelier non trouvé' });
    res.json(atelier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/ateliers/:id — Supprimer (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Atelier.findByIdAndDelete(req.params.id);
    res.json({ message: 'Atelier supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
