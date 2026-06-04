const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Contact = require('../models/Contact');
const Product = require('../models/Product');
const Atelier = require('../models/Atelier');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/stats — Dashboard stats (admin)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    // Chiffres globaux
    const totalCommandes = await Order.countDocuments();
    const totalReservations = await Reservation.countDocuments();
    const totalClients = await User.countDocuments({ role: 'client' });
    const messagesNonLus = await Contact.countDocuments({ lu: false });
    const totalProduits = await Product.countDocuments();
    const totalAteliers = await Atelier.countDocuments({ actif: true });

    // Chiffre d'affaires total
    const caCommandes = await Order.aggregate([
      { $match: { statut: { $ne: 'annulée' } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);

    const caReservations = await Reservation.aggregate([
      { $match: { statut: { $ne: 'annulée' } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);

    const caTotal =
      (caCommandes[0]?.total || 0) + (caReservations[0]?.total || 0);

    // Commandes des 7 derniers jours
    const il7Jours = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const commandesRecentes = await Order.find({ createdAt: { $gte: il7Jours } })
      .populate('client', 'nom prenom email')
      .sort({ createdAt: -1 })
      .limit(5);

    // Réservations récentes
    const reservationsRecentes = await Reservation.find({ createdAt: { $gte: il7Jours } })
      .populate('client', 'nom prenom email')
      .populate('atelier', 'titre date')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalCommandes,
      totalReservations,
      totalClients,
      messagesNonLus,
      totalProduits,
      totalAteliers,
      caTotal,
      commandesRecentes,
      reservationsRecentes,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
