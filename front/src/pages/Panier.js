import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Panier = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 24px' }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>🛒</div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: 12 }}>Votre panier est vide</h2>
        <p style={{ color: '#888', marginBottom: 32 }}>Découvrez nos produits et ajoutez-les à votre panier.</p>
        <Link to="/boutique" className="btn btn-dark">Découvrir la boutique</Link>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!user) {
      toast.error('Connectez-vous pour passer commande');
      navigate('/espace-client');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div>
      <div className="page-header">
        <h1>Mon panier</h1>
        <p>{cartCount} article{cartCount > 1 ? 's' : ''}</p>
      </div>

      <section className="section">
        <div className="container">
          <div style={styles.grid}>
            {/* Liste articles */}
            <div>
              {cartItems.map((item) => (
                <div key={item._id} style={styles.item}>
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200'}
                    alt={item.nom}
                    style={styles.itemImg}
                  />
                  <div style={styles.itemInfo}>
                    <h3 style={styles.itemName}>{item.nom}</h3>
                    <p style={styles.itemPrice}>{item.prix} €</p>
                  </div>
                  <div style={styles.itemQty}>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    >−</button>
                    <span style={styles.qtyVal}>{item.quantity}</span>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    >+</button>
                  </div>
                  <span style={styles.itemTotal}>{(item.prix * item.quantity).toFixed(2)} €</span>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={styles.removeBtn}
                  >✕</button>
                </div>
              ))}
            </div>

            {/* Récapitulatif */}
            <div style={styles.summary}>
              <h3 style={styles.summaryTitle}>Récapitulatif</h3>
              <div style={styles.summaryRow}>
                <span>Sous-total</span>
                <span>{cartTotal.toFixed(2)} €</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Livraison</span>
                <span style={{ color: '#7A9E7E' }}>Offerte</span>
              </div>
              <div style={styles.summaryTotal}>
                <span>Total</span>
                <span>{cartTotal.toFixed(2)} €</span>
              </div>
              <button
                className="btn btn-dark"
                style={{ width: '100%', marginTop: 24 }}
                onClick={handleCheckout}
              >
                Passer la commande
              </button>
              <Link
                to="/boutique"
                style={{ display: 'block', textAlign: 'center', marginTop: 12, color: '#888', fontSize: '0.85rem' }}
              >
                ← Continuer mes achats
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  grid: { display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, alignItems: 'start' },
  item: {
    display: 'flex', alignItems: 'center', gap: 20, padding: '20px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  itemImg: { width: 80, height: 80, objectFit: 'cover', borderRadius: 8 },
  itemInfo: { flex: 1 },
  itemName: { fontFamily: 'Playfair Display, serif', fontSize: '1rem', marginBottom: 4 },
  itemPrice: { color: '#888', fontSize: '0.9rem' },
  itemQty: { display: 'flex', alignItems: 'center', gap: 12 },
  qtyBtn: {
    width: 32, height: 32, borderRadius: '50%', border: '1.5px solid #ddd',
    background: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 600,
  },
  qtyVal: { fontWeight: 600, minWidth: 24, textAlign: 'center' },
  itemTotal: { fontWeight: 700, minWidth: 70, textAlign: 'right' },
  removeBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#aaa', fontSize: '1rem',
  },
  summary: {
    background: '#FAF5EC', borderRadius: 16, padding: 28,
    position: 'sticky', top: 100,
  },
  summaryTitle: {
    fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', marginBottom: 20,
  },
  summaryRow: {
    display: 'flex', justifyContent: 'space-between', marginBottom: 12,
    fontSize: '0.95rem',
  },
  summaryTotal: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    borderTop: '1.5px solid #ddd', paddingTop: 16, marginTop: 8,
    fontWeight: 700, fontSize: '1.2rem',
  },
};

export default Panier;
