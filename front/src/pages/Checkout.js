import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [adresse, setAdresse] = useState({
    rue: '', ville: '', codePostal: '', pays: 'France',
  });

  const handleChange = (e) => {
    setAdresse({ ...adresse, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!adresse.rue || !adresse.ville || !adresse.codePostal) {
      toast.error('Remplissez tous les champs d\'adresse');
      return;
    }
    try {
      setLoading(true);
      const items = cartItems.map((item) => ({
        produit: item._id,
        quantite: item.quantity,
      }));
      await api.post('/orders', { items, adresseLivraison: adresse });
      clearCart();
      toast.success('Commande passée avec succès ! 🎉');
      navigate('/espace-client');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de la commande');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Finaliser la commande</h1>
      </div>

      <section className="section">
        <div className="container">
          <div style={styles.grid}>
            {/* Formulaire */}
            <div>
              <h3 style={styles.sectionH3}>Adresse de livraison</h3>
              <form onSubmit={handleOrder}>
                <div className="form-group">
                  <label>Rue et numéro</label>
                  <input name="rue" value={adresse.rue} onChange={handleChange} placeholder="12 rue de la Paix" required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label>Code postal</label>
                    <input name="codePostal" value={adresse.codePostal} onChange={handleChange} placeholder="75001" required />
                  </div>
                  <div className="form-group">
                    <label>Ville</label>
                    <input name="ville" value={adresse.ville} onChange={handleChange} placeholder="Paris" required />
                  </div>
                </div>

                <h3 style={{ ...styles.sectionH3, marginTop: 32 }}>Paiement simulé</h3>
                <div style={styles.payBox}>
                  <p>💳 <strong>Paiement simulé</strong> — aucun montant réel ne sera débité.</p>
                  <div style={styles.fakeCard}>
                    <input value="4242 4242 4242 4242" disabled placeholder="Numéro de carte" />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <input value="12/26" disabled placeholder="MM/AA" />
                      <input value="123" disabled placeholder="CVV" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-dark"
                  style={{ width: '100%', marginTop: 24, padding: '16px' }}
                  disabled={loading}
                >
                  {loading ? 'Traitement...' : `Confirmer et payer ${cartTotal.toFixed(2)} €`}
                </button>
              </form>
            </div>

            {/* Récap commande */}
            <div style={styles.recap}>
              <h3 style={styles.sectionH3}>Ma commande</h3>
              {cartItems.map((item) => (
                <div key={item._id} style={styles.recapItem}>
                  <img src={item.image || 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=80'} alt={item.nom} style={styles.recapImg} />
                  <span style={{ flex: 1 }}>{item.nom} × {item.quantity}</span>
                  <span style={{ fontWeight: 600 }}>{(item.prix * item.quantity).toFixed(2)} €</span>
                </div>
              ))}
              <div style={styles.recapTotal}>
                <span>Total</span>
                <span>{cartTotal.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  grid: { display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48, alignItems: 'start' },
  sectionH3: { fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', marginBottom: 20 },
  payBox: {
    background: '#E8F0E9', borderRadius: 12, padding: 20,
    fontSize: '0.9rem', color: '#3a6b3e',
  },
  fakeCard: { marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 },
  recap: { background: '#FAF5EC', borderRadius: 16, padding: 28, position: 'sticky', top: 100 },
  recapItem: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #eee' },
  recapImg: { width: 48, height: 48, objectFit: 'cover', borderRadius: 6 },
  recapTotal: {
    display: 'flex', justifyContent: 'space-between', fontWeight: 700,
    fontSize: '1.2rem', paddingTop: 16, marginTop: 8,
  },
};

export default Checkout;
