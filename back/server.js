const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/ateliers', require('./routes/ateliers'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/users', require('./routes/users'));
app.use('/api/stats', require('./routes/stats'));

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'Coffee Arts Paris API is running ☕' });
});

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connecté ✅');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Serveur démarré sur le port ${process.env.PORT || 5000} 🚀`);
    });
  })
  .catch((err) => {
    console.error('Erreur MongoDB :', err.message);
    process.exit(1);
  });

module.exports = app;
