const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Blog = require('./models/Blog');

const articles = [
  {
    titre: 'Pourquoi le café de spécialité change tout',
    slug: 'pourquoi-le-cafe-de-specialite-change-tout',
    extrait: 'Découvrez pourquoi le café de spécialité est bien plus qu\'une tendance.',
    contenu: `Le café de spécialité n'est pas juste une tendance. C'est une approche radicalement différente de la caféiculture, du commerce équitable et de la torréfaction. Chez Coffee Arts Paris, nous sélectionnons chaque grain avec soin, en privilégiant les producteurs engagés dans une agriculture durable.\n\nLe café de spécialité se distingue par sa notation : un grain noté au-dessus de 80/100 par des experts certifiés SCA. Cela garantit une traçabilité totale, de la ferme à la tasse.`,
    auteur: 'Coffee Arts Paris',
    tags: ['café', 'spécialité', 'origines'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
    publie: true,
  },
  {
    titre: 'La céramique, un art accessible à tous',
    slug: 'la-ceramique-un-art-accessible-a-tous',
    extrait: 'Découvrez pourquoi la céramique est accessible à absolument tout le monde.',
    contenu: `Beaucoup pensent que la céramique est réservée aux artistes confirmés. C'est faux. Chez Coffee Arts Paris, nous accueillons chaque semaine des débutants complets qui repartent avec leur première pièce après seulement 3 heures d'atelier.\n\nLa clé ? Un encadrement bienveillant, un matériel de qualité et une approche sans pression. L'objectif n'est pas la perfection, mais le plaisir de créer.`,
    auteur: 'Coffee Arts Paris',
    tags: ['céramique', 'atelier', 'débutant'],
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500',
    publie: true,
  },
  {
    titre: 'Notre sélection de cafés du mois de juin',
    slug: 'notre-selection-de-cafes-du-mois-de-juin',
    extrait: 'Les trois cafés qu\'on vous recommande ce mois-ci.',
    contenu: `Ce mois-ci, nous mettons en avant trois origines exceptionnelles : l'Éthiopie Yirgacheffe avec ses notes florales et agrumes, le Guatemala Huehuetenango pour ses arômes chocolatés et caramel, et le Kenya AA pour son acidité vive et fruitée.\n\nChaque café est torréfié à Paris par notre équipe, dans les 72h avant la dégustation.`,
    auteur: 'Coffee Arts Paris',
    tags: ['café', 'origines', 'sélection'],
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500',
    publie: true,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connecté ✅');

    await Blog.deleteMany({});
    console.log('Anciens articles supprimés 🗑️');

    await Blog.insertMany(articles);
    console.log(`${articles.length} articles injectés avec succès 🎉`);

    process.exit(0);
  } catch (err) {
    console.error('Erreur seed :', err.message);
    process.exit(1);
  }
};

seed();