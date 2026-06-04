const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true },
  objet: { type: String, required: true },
  message: { type: String, required: true },
  lu: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
