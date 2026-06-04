import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const CATEGORIES = ['Tous', 'Céramique', 'Goodies / Lifestyle', 'Cartes cadeaux'];

const Boutique = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categorie, setCategorie] = useState('Tous');
  const { addToCart } = useCart();

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const params = categorie !== 'Tous' ? { categorie } : {};
      const { data } = await api.get('/api/products', { params });
      setProducts(data);
    } catch (err) {
      toast.error('Erreur lors du chargement des produits');
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, [categorie]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.nom} ajouté au panier !`);
  };

  return (
    <div>
      <div className="page-header">
        <h1>La boutique</h1>
        <p>Des pièces choisies avec soin, à utiliser au quotidien ou à offrir.</p>
      </div>

      <section className="section">
        <div className="container">
          {/* Filtres catégories */}
          <div style={styles.filters}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategorie(cat)}
                style={{
                  ...styles.filterBtn,
                  ...(categorie === cat ? styles.filterBtnActive : {}),
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="spinner" />
          ) : products.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888' }}>Aucun produit disponible.</p>
          ) : (
            <div className="grid-4">
              {products.map((product) => (
                <div key={product._id} className="card">
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400'}
                    alt={product.nom}
                    style={styles.productImg}
                  />
                  <div style={styles.productBody}>
                    <span className="badge badge-beige">{product.categorie}</span>
                    <h3 style={styles.productName}>{product.nom}</h3>
                    <p style={styles.productDesc}>{product.description}</p>
                    <div style={styles.productFooter}>
                      <span style={styles.price}>{product.prix} €</span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn btn-dark"
                        style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? 'Épuisé' : 'Ajouter'}
                      </button>
                    </div>
                    {product.stock > 0 && product.stock <= 5 && (
                      <p style={styles.stockWarning}>Plus que {product.stock} en stock !</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA commandes sur mesure */}
      <section style={styles.ctaSection}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginBottom: 16 }}>
            Commandes sur mesure
          </h2>
          <p style={{ color: '#666', marginBottom: 24 }}>
            Vous avez un projet particulier ? Nous étudions les demandes au cas par cas.
          </p>
          <Link to="/contact" className="btn btn-dark">Nous contacter</Link>
        </div>
      </section>
    </div>
  );
};

const styles = {
  filters: {
    display: 'flex',
    gap: 12,
    marginBottom: 40,
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '10px 24px',
    borderRadius: 50,
    border: '1.5px solid #ddd',
    background: 'white',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.2s',
  },
  filterBtnActive: {
    background: '#2C2C2C',
    color: '#fff',
    borderColor: '#2C2C2C',
  },
  productImg: {
    width: '100%',
    height: 220,
    objectFit: 'cover',
  },
  productBody: { padding: '16px' },
  productName: {
    fontFamily: 'Playfair Display, serif',
    fontSize: '1.1rem',
    margin: '8px 0',
  },
  productDesc: {
    color: '#666',
    fontSize: '0.85rem',
    marginBottom: 16,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  productFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: 700,
    fontFamily: 'Playfair Display, serif',
  },
  stockWarning: {
    color: '#e67e22',
    fontSize: '0.75rem',
    marginTop: 8,
  },
  ctaSection: {
    background: '#FAF5EC',
    padding: '80px 0',
  },
};

export default Boutique;
