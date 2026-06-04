const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Génère un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// POST /api/auth/register — Inscription
router.post('/register', async (req, res) => {
  try {
    const { nom, prenom, email, password, telephone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    const user = await User.create({ nom, prenom, email, password, telephone });

    res.status(201).json({
      _id: user._id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login — Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    res.json({
      _id: user._id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/me — Profil connecté
router.get('/me', protect, async (req, res) => {
  res.json(req.user);
});

// PUT /api/auth/profile — Modifier profil
router.put('/profile', protect, async (req, res) => {
  try {
    const { nom, prenom, telephone, password } = req.body;
    const user = await User.findById(req.user._id);

    if (nom) user.nom = nom;
    if (prenom) user.prenom = prenom;
    if (telephone) user.telephone = telephone;
    if (password) user.password = password;

    await user.save();
    res.json({ message: 'Profil mis à jour', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
