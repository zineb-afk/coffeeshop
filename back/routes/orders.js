const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/auth');

// POST /api/orders — Créer une commande (client connecté)
router.post('/', protect, async (req, res) => {
  try {
    const { items, adresseLivraison } = req.body;

    // Calcul du total + vérification stock
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.produit);
      if (!product) return res.status(404).json({ message: `Produit ${item.produit} non trouvé` });
      if (product.stock < item.quantite) {
        return res.status(400).json({ message: `Stock insuffisant pour ${product.nom}` });
      }

      total += product.prix * item.quantite;
      orderItems.push({
        produit: product._id,
        nom: product.nom,
        quantite: item.quantite,
        prix: product.prix,
        image: product.image,
      });

      // Décrémenter le stock
      product.stock -= item.quantite;
      await product.save();
    }

    const order = await Order.create({
      client: req.user._id,
      items: orderItems,
      total,
      adresseLivraison,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/mes-commandes — Commandes du client connecté
router.get('/mes-commandes', protect, async (req, res) => {
  try {
    const orders = await Order.find({ client: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders — Toutes les commandes (admin)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('client', 'nom prenom email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/orders/:id/statut — Changer statut (admin)
router.put('/:id/statut', protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { statut: req.body.statut },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
