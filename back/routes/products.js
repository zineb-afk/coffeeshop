const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/auth');
const { upload } = require('../middleware/cloudinary');

// GET /api/products — Tous les produits (public)
router.get('/', async (req, res) => {
  try {
    const { categorie, sousCategorie } = req.query;
    const filter = { disponible: true };
    if (categorie) filter.categorie = categorie;
    if (sousCategorie) filter.sousCategorie = sousCategorie;

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/admin — Tous produits pour admin
router.get('/admin', protect, adminOnly, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/:id — Un produit
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/products — Créer un produit (admin)
router.post('/', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { nom, description, prix, categorie, sousCategorie, stock } = req.body;
    const image = req.file ? req.file.path : '';

    const product = await Product.create({
      nom, description, prix, categorie, sousCategorie, stock, image,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/products/:id — Modifier un produit (admin)
router.put('/:id', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.image = req.file.path;

    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/products/:id — Supprimer un produit (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Produit supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
