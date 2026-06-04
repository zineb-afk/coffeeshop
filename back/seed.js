const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Product = require('./models/Product');
const Atelier = require('./models/Atelier');
const Blog = require('./models/Blog');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connecté pour le seed...');

  // Nettoyage
  await User.deleteMany();
  await Product.deleteMany();
  await Atelier.deleteMany();
  await Blog.deleteMany();

  // --- USERS ---
  const admin = await User.create({
    nom: 'Admin',
    prenom: 'Coffee Arts',
    email: 'admin@coffeearts.fr',
    password: 'admin1234',
    role: 'admin',
  });

  await User.create({
    nom: 'Dupont',
    prenom: 'Marie',
    email: 'client@test.fr',
    password: 'client1234',
    role: 'client',
  });

  console.log('✅ Users créés');

  // --- PRODUCTS ---
  await Product.insertMany([
    {
      nom: 'Mug artisanal Coffee Arts',
      description: 'Mug en céramique fait main, unique et résistant. Capacité 300ml.',
      prix: 35,
      categorie: 'Céramique',
      sousCategorie: 'Cup',
      stock: 20,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
    },
    {
      nom: 'Bol céramique beige',
      description: 'Bol fait à la main à l\'atelier Coffee Arts. Dimensions : 15cm.',
      prix: 45,
      categorie: 'Céramique',
      sousCategorie: 'Cup',
      stock: 15,
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400',
    },
    {
      nom: 'T-shirt Coffee Arts',
      description: 'T-shirt 100% coton biologique, sérigraphié à Paris.',
      prix: 30,
      categorie: 'Goodies / Lifestyle',
      sousCategorie: 'T-shirt',
      stock: 30,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    },
    {
      nom: 'Tote bag Coffee Arts',
      description: 'Tote bag en coton bio avec le logo Coffee Arts Paris.',
      prix: 18,
      categorie: 'Goodies / Lifestyle',
      sousCategorie: 'Tote bag',
      stock: 40,
      image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400',
    },
    {
      nom: 'Casquette beige',
      description: 'Casquette brodée Coffee Arts, style vintage.',
      prix: 25,
      categorie: 'Goodies / Lifestyle',
      sousCategorie: 'Casquette',
      stock: 20,
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400',
    },
    {
      nom: 'Carte cadeau 50€',
      description: 'Carte cadeau valable sur les ateliers et en boutique.',
      prix: 50,
      categorie: 'Cartes cadeaux',
      stock: 100,
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400',
    },
  ]);

  console.log('✅ Produits créés');

  // --- ATELIERS ---
  const demain = new Date();
  demain.setDate(demain.getDate() + 1);

  const dans3Jours = new Date();
  dans3Jours.setDate(dans3Jours.getDate() + 3);

  const dans7Jours = new Date();
  dans7Jours.setDate(dans7Jours.getDate() + 7);

  await Atelier.insertMany([
    {
      titre: 'Initiation à la poterie',
      description: 'Découvrez les bases du tournage et du façonnage de l\'argile. Repartez avec votre création.',
      prix: 65,
      date: demain,
      heureDebut: '14:00',
      heureFin: '17:00',
      placesTotal: 8,
      placesRestantes: 5,
      niveau: 'Débutant',
      type: 'Standard',
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400',
    },
    {
      titre: 'Peinture sur céramique',
      description: 'Peignez et personnalisez vos pièces en céramique. Matériaux fournis.',
      prix: 55,
      date: dans3Jours,
      heureDebut: '10:00',
      heureFin: '12:30',
      placesTotal: 10,
      placesRestantes: 8,
      niveau: 'Tous niveaux',
      type: 'Standard',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400',
    },
    {
      titre: 'Atelier modelage avancé',
      description: 'Techniques avancées de modelage à la main pour ceux qui ont déjà pratiqué.',
      prix: 80,
      date: dans7Jours,
      heureDebut: '16:00',
      heureFin: '19:00',
      placesTotal: 6,
      placesRestantes: 3,
      niveau: 'Intermédiaire',
      type: 'Premium',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
    },
  ]);

  console.log('✅ Ateliers créés');

  // --- BLOG ---
  await Blog.insertMany([
    {
      titre: 'Pourquoi le café de spécialité change tout',
      contenu: 'Le café de spécialité n\'est pas juste une tendance. C\'est une approche radicalement différente de la caféiculture, du commerce équitable et de la torréfaction. Chez Coffee Arts Paris, nous sélectionnons chaque grain avec soin, en privilégiant les producteurs engagés dans une agriculture durable.\n\nLe café de spécialité se distingue par sa notation : un grain noté au-dessus de 80/100 par des experts certifiés SCA. Cela garantit une traçabilité totale, de la ferme à la tasse.',
      extrait: 'Découvrez pourquoi le café de spécialité est bien plus qu\'une tendance.',
      auteur: 'Coffee Arts Paris',
      tags: ['café', 'spécialité', 'origines'],
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      publie: true,
    },
    {
      titre: 'La céramique, un art accessible à tous',
      contenu: 'Beaucoup pensent que la céramique est réservée aux artistes confirmés. C\'est faux. Chez Coffee Arts Paris, nous accueillons chaque semaine des débutants complets qui repartent avec leur première pièce après seulement 3 heures d\'atelier.\n\nLa clé ? Un encadrement bienveillant, un matériel de qualité et une approche sans pression. L\'objectif n\'est pas la perfection, mais le plaisir de créer.',
      extrait: 'Découvrez pourquoi la céramique est accessible à absolument tout le monde.',
      auteur: 'Coffee Arts Paris',
      tags: ['céramique', 'atelier', 'débutant'],
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400',
      publie: true,
    },
    {
      titre: 'Notre sélection de cafés du mois de juin',
      contenu: 'Ce mois-ci, nous mettons en avant trois origines exceptionnelles : l\'Éthiopie Yirgacheffe avec ses notes florales et agrumes, le Guatemala Huehuetenango pour ses arômes chocolatés et caramel, et le Kenya AA pour son acidité vive et fruitée.\n\nChaque café est torréfié à Paris par notre équipe, dans les 72h avant la dégustation.',
      extrait: 'Les trois cafés qu\'on vous recommande ce mois-ci.',
      auteur: 'Coffee Arts Paris',
      tags: ['café', 'origines', 'sélection'],
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
      publie: true,
    },
  ]);

  console.log('✅ Articles de blog créés');
  console.log('\n🎉 Seed terminé avec succès !');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Compte admin  : admin@coffeearts.fr / admin1234');
  console.log('Compte client : client@test.fr / client1234');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  process.exit(0);
};

seed().catch((err) => {
  console.error('Erreur seed :', err);
  process.exit(1);
});
