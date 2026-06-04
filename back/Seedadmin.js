const mongoose = require('mongoose');
const User = require('./models/User'); // 👈 Adaptez le chemin selon votre projet
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connecté à MongoDB');

    // Vérifie si un admin existe déjà
    const existing = await User.findOne({ email: 'admin@coffeearts.com' });
    if (existing) {
      console.log('⚠️  Un admin existe déjà :', existing.email);
      process.exit(0);
    }

    // Création de l'admin (le hash est fait automatiquement par le pre-save hook)
    const admin = await User.create({
      nom: 'Admin',
      prenom: 'Coffee Arts',
      email: 'admin@coffeearts.com',
      password: 'Admin1234!',
      telephone: '0600000000',
      role: 'admin',
    });

    console.log('🎉 Admin créé avec succès !');
    console.log('   Email    :', admin.email);
    console.log('   Mot de passe : Admin1234!  (changez-le après connexion)');
    process.exit(0);

  } catch (err) {
    console.error('❌ Erreur lors du seed :', err.message);
    process.exit(1);
  }
};

seedAdmin();