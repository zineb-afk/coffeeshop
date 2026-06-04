const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Atelier = require('./models/Atelier');

const ateliers = [
  {
    titre: 'Initiation au tournage',
    description: 'Découvrez le tournage sur roue dans une ambiance détendue. Apprenez les gestes fondamentaux pour centrer la terre et former vos premières pièces. Aucune expérience requise, juste de la curiosité !',
    prix: 65,
    date: new Date('2026-06-15'),
    heureDebut: '10:00',
    heureFin: '13:00',
    placesTotal: 8,
    placesRestantes: 5,
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600',
    niveau: 'Débutant',
    type: 'Standard',
    actif: true,
  },
  {
    titre: 'Modelage libre — Pinch & Coil',
    description: 'Explorez les techniques ancestrales du modelage à la main : le pinçage et le colombin. Créez bols, tasses ou sculptures selon votre imagination. Une session idéale pour se reconnecter à la matière.',
    prix: 55,
    date: new Date('2026-06-18'),
    heureDebut: '14:00',
    heureFin: '17:00',
    placesTotal: 10,
    placesRestantes: 8,
    image: 'https://images.unsplash.com/photo-1511406361295-0a1ff814c0ce?w=600',
    niveau: 'Tous niveaux',
    type: 'Standard',
    actif: true,
  },
  {
    titre: 'Atelier émaillage & décoration',
    description: 'Donnez vie à vos pièces séchées grâce aux techniques d\'émaillage. Apprenez à maîtriser les effets de couleur, les textures et les finitions artisanales pour des céramiques uniques.',
    prix: 70,
    date: new Date('2026-06-22'),
    heureDebut: '11:00',
    heureFin: '14:00',
    placesTotal: 8,
    placesRestantes: 3,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
    niveau: 'Intermédiaire',
    type: 'Standard',
    actif: true,
  },
  {
    titre: 'Tournage avancé — Formes fermées',
    description: 'Pour ceux qui maîtrisent déjà les bases. Explorez les formes fermées : théières, vases à col étroit, bouteilles. Un atelier technique et créatif pour aller plus loin dans votre pratique.',
    prix: 85,
    date: new Date('2026-06-25'),
    heureDebut: '09:30',
    heureFin: '13:00',
    placesTotal: 6,
    placesRestantes: 2,
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600',
    niveau: 'Intermédiaire',
    type: 'Premium',
    actif: true,
  },
  {
    titre: 'Soirée céramique & café — Duo',
    description: 'Un moment unique à partager en duo : créez ensemble une pièce en céramique tout en dégustant nos cafés de spécialité. L\'atelier idéal pour un cadeau original ou une soirée complice.',
    prix: 120,
    date: new Date('2026-06-28'),
    heureDebut: '18:30',
    heureFin: '21:00',
    placesTotal: 6,
    placesRestantes: 6,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600',
    niveau: 'Tous niveaux',
    type: 'Événement spécial',
    actif: true,
  },
  {
    titre: 'Céramique enfants (6-12 ans)',
    description: 'Un atelier 100% dédié aux enfants pour découvrir la céramique en s\'amusant. Modelage de petits animaux, décorations, et beaucoup de rires garantis. Parents bienvenus pour observer !',
    prix: 40,
    date: new Date('2026-07-05'),
    heureDebut: '10:00',
    heureFin: '12:00',
    placesTotal: 10,
    placesRestantes: 7,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600',
    niveau: 'Débutant',
    type: 'Standard',
    actif: true,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connecté ✅');

    await Atelier.deleteMany({});
    console.log('Anciens ateliers supprimés 🗑️');

    await Atelier.insertMany(ateliers);
    console.log(`${ateliers.length} ateliers injectés avec succès 🎉`);

    process.exit(0);
  } catch (err) {
    console.error('Erreur seed :', err.message);
    process.exit(1);
  }
};

seed();