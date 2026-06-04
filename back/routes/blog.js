const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect, adminOnly } = require('../middleware/auth');
const { upload } = require('../middleware/cloudinary');

// GET /api/blog — Articles publiés (public)
router.get('/', async (req, res) => {
  try {
    const articles = await Blog.find({ publie: true }).sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/blog/admin — Tous articles (admin)
router.get('/admin', protect, adminOnly, async (req, res) => {
  try {
    const articles = await Blog.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/blog/:slug — Un article (public)
router.get('/:slug', async (req, res) => {
  try {
    const article = await Blog.findOne({ slug: req.params.slug, publie: true });
    if (!article) return res.status(404).json({ message: 'Article non trouvé' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/blog — Créer un article (admin)
router.post('/', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = req.file.path;

    const article = await Blog.create(data);
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/blog/:id — Modifier un article (admin)
router.put('/:id', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.image = req.file.path;

    const article = await Blog.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/blog/:id — Supprimer (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
