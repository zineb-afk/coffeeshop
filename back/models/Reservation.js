const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  atelier: { type: mongoose.Schema.Types.ObjectId, ref: 'Atelier', required: true },
  nombrePersonnes: { type: Number, default: 1, min: 1 },
  total: { type: Number, required: true },
  statut: {
    type: String,
    enum: ['confirmée', 'annulée', 'en attente'],
    default: 'confirmée',
  },
  // Paiement simulé
  paiement: {
    methode: { type: String, default: 'carte' },
    statut: { type: String, default: 'payé' },
  },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
