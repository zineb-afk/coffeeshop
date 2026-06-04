const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nom: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  prix: { type: Number, required: true },
  categorie: {
    type: String,
    enum: ['Céramique', 'Goodies / Lifestyle', 'Cartes cadeaux'],
    required: true,
  },
  sousCategorie: { type: String, default: '' }, // Cup, Casquette, T-shirt...
  image: { type: String, default: '' },
  stock: { type: Number, default: 0 },
  disponible: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
