const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect, adminOnly } = require('../middleware/auth');

// POST /api/contacts — Envoyer un message (public)
router.post('/', async (req, res) => {
  try {
    const { nom, email, objet, message } = req.body;
    const contact = await Contact.create({ nom, email, objet, message });
    res.status(201).json({ message: 'Message envoyé avec succès !' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/contacts — Tous les messages (admin)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/contacts/:id/lu — Marquer comme lu (admin)
router.put('/:id/lu', protect, adminOnly, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { lu: true }, { new: true });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/contacts/:id — Supprimer (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
