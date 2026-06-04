const mongoose = require('mongoose');

const atelierSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  prix: { type: Number, required: true },
  date: { type: Date, required: true },
  heureDebut: { type: String, required: true }, // ex: "14:00"
  heureFin: { type: String, required: true },   // ex: "17:00"
  placesTotal: { type: Number, required: true },
  placesRestantes: { type: Number, required: true },
  image: { type: String, default: '' },
  niveau: {
    type: String,
    enum: ['Débutant', 'Intermédiaire', 'Tous niveaux'],
    default: 'Tous niveaux',
  },
  type: {
    type: String,
    enum: ['Standard', 'Premium', 'Événement spécial'],
    default: 'Standard',
  },
  actif: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Atelier', atelierSchema);
