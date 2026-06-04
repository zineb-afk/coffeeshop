const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  contenu: { type: String, required: true },
  extrait: { type: String, default: '' },
  image: { type: String, default: '' },
  auteur: { type: String, default: 'Coffee Arts Paris' },
  tags: [{ type: String }],
  publie: { type: Boolean, default: true },
  slug: { type: String, unique: true },
}, { timestamps: true });

// Génère un slug automatiquement
blogSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.titre
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
