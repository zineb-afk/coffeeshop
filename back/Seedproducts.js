const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');

const products = [
  // ── CÉRAMIQUE ──
  {
    nom: 'Bol céramique fait main',
    description: 'Bol tourné à la main, émaillé en vert olive. Pièce unique, légèrement irrégulière — c\'est sa beauté. Idéal pour le petit-déjeuner ou les salades.',
    prix: 38,
    categorie: 'Céramique',
    sousCategorie: 'Bol',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500',
    stock: 12,
    disponible: true,
  },
  {
    nom: 'Tasse à café en grès',
    description: 'Tasse en grès naturel, tournée et émaillée dans notre atelier. Contenance 18 cl, idéale pour un espresso ou un flat white. Passe au lave-vaisselle.',
    prix: 28,
    categorie: 'Céramique',
    sousCategorie: 'Tasse',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500',
    stock: 20,
    disponible: true,
  },
  {
    nom: 'Mug céramique Coffee Arts',
    description: 'Grand mug 30 cl en céramique artisanale, estampillé du logo Coffee Arts Paris. Émaillage beige intérieur, grès naturel extérieur. Un objet du quotidien à garder longtemps.',
    prix: 34,
    categorie: 'Céramique',
    sousCategorie: 'Mug',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    stock: 15,
    disponible: true,
  },
  {
    nom: 'Vase soliflore en terre cuite',
    description: 'Petit vase soliflore modelé à la main, finition mate en terre cuite rosée. Parfait pour une fleur unique posée sur un bureau ou une table de nuit.',
    prix: 42,
    categorie: 'Céramique',
    sousCategorie: 'Vase',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
    stock: 8,
    disponible: true,
  },
  {
    nom: 'Assiette creuse artisanale',
    description: 'Assiette creuse en grès, émaillée en blanc cassé avec des reflets gris. Diamètre 22 cm. Parfaite pour les soupes, risottos ou pâtes. Vendue à l\'unité.',
    prix: 46,
    categorie: 'Céramique',
    sousCategorie: 'Assiette',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500',
    stock: 6,
    disponible: true,
  },

  // ── GOODIES / LIFESTYLE ──
  {
    nom: 'Tote bag Coffee Arts',
    description: 'Tote bag en coton naturel sérigraphié avec l\'illustration Coffee Arts Paris. Robuste, lavable en machine, assez grand pour vos courses ou votre ordinateur.',
    prix: 22,
    categorie: 'Goodies / Lifestyle',
    sousCategorie: 'Tote bag',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    stock: 30,
    disponible: true,
  },
  {
    nom: 'Casquette brodée — Olive',
    description: 'Casquette dad hat en coton non structuré, coloris olive. Logo Coffee Arts brodé sur le devant. Réglable, taille unique. Parfaite pour les sorties café.',
    prix: 35,
    categorie: 'Goodies / Lifestyle',
    sousCategorie: 'Casquette',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500',
    stock: 18,
    disponible: true,
  },
  {
    nom: 'T-shirt Coffee Arts — Sable',
    description: 'T-shirt unisexe en coton bio, coloris sable. Coupe boxy oversize, impression sérigraphiée "Sip, create and connect". Disponible en S, M, L, XL.',
    prix: 45,
    categorie: 'Goodies / Lifestyle',
    sousCategorie: 'T-shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    stock: 25,
    disponible: true,
  },
  {
    nom: 'Carnet céramique & café',
    description: 'Carnet A5 couverture rigide, 120 pages lignées. Illustré par nos soins avec des motifs céramique et café. Parfait pour noter vos recettes, sketches ou idées créatives.',
    prix: 18,
    categorie: 'Goodies / Lifestyle',
    sousCategorie: 'Papeterie',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500',
    stock: 40,
    disponible: true,
  },
  {
    nom: 'Café en grains — Éthiopie Yirgacheffe',
    description: 'Café de spécialité en grains, origine Éthiopie Yirgacheffe. Notes de bergamote, jasmin et pêche blanche. Torréfaction claire, idéal en filtre. Sachet 250g.',
    prix: 16,
    categorie: 'Goodies / Lifestyle',
    sousCategorie: 'Café',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500',
    stock: 50,
    disponible: true,
  },

  // ── CARTES CADEAUX ──
  {
    nom: 'Carte cadeau — 50 €',
    description: 'Offrez une expérience Coffee Arts Paris. La carte cadeau est valable sur tous les ateliers, produits et consommations. Envoyée par email sous 24h.',
    prix: 50,
    categorie: 'Cartes cadeaux',
    sousCategorie: 'Carte cadeau',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500',
    stock: 999,
    disponible: true,
  },
  {
    nom: 'Carte cadeau — 100 €',
    description: 'Offrez une expérience Coffee Arts Paris. La carte cadeau est valable sur tous les ateliers, produits et consommations. Envoyée par email sous 24h.',
    prix: 100,
    categorie: 'Cartes cadeaux',
    sousCategorie: 'Carte cadeau',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500',
    stock: 999,
    disponible: true,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connecté ✅');

    await Product.deleteMany({});
    console.log('Anciens produits supprimés 🗑️');

    await Product.insertMany(products);
    console.log(`${products.length} produits injectés avec succès 🎉`);

    process.exit(0);
  } catch (err) {
    console.error('Erreur seed :', err.message);
    process.exit(1);
  }
};

seed();