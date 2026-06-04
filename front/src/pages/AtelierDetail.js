import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AtelierDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [atelier, setAtelier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nbPersonnes, setNbPersonnes] = useState(1);
  const [reserving, setReserving] = useState(false);

  useEffect(() => {
    api.get(`/ateliers/${id}`)
      .then(({ data }) => setAtelier(data))
      .catch(() => toast.error('Atelier introuvable'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleReservation = async () => {
    if (!user) {
      toast.error('Connectez-vous pour réserver');
      navigate('/espace-client');
      return;
    }
    try {
      setReserving(true);
      await api.post('/reservations', { atelierId: id, nombrePersonnes: nbPersonnes });
      toast.success('Réservation confirmée ! 🎉');
      navigate('/espace-client');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de la réservation');
    } finally {
      setReserving(false);
    }
  };

  if (loading) return <div className="spinner" style={{ marginTop: 80 }} />;
  if (!atelier) return <p style={{ textAlign: 'center', marginTop: 80 }}>Atelier non trouvé.</p>;

  const total = atelier.prix * nbPersonnes;
  const formatDate = (d) => new Date(d).toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div>
      <div style={styles.hero}>
        <img
          src={atelier.image || 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200'}
          alt={atelier.titre}
          style={styles.heroImg}
        />
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <span className="badge badge-beige">{atelier.type}</span>
          <h1 style={styles.heroTitle}>{atelier.titre}</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={styles.grid}>
            {/* Infos */}
            <div>
              <h2 style={styles.sectionH2}>À propos de cet atelier</h2>
              <p style={styles.desc}>{atelier.description}</p>

              <div style={styles.infoGrid}>
                {[
                  { icon: '📅', label: 'Date', val: formatDate(atelier.date) },
                  { icon: '🕐', label: 'Horaire', val: `${atelier.heureDebut} – ${atelier.heureFin}` },
                  { icon: '👥', label: 'Places restantes', val: `${atelier.placesRestantes} / ${atelier.placesTotal}` },
                  { icon: '🎯', label: 'Niveau', val: atelier.niveau },
                ].map((info) => (
                  <div key={info.label} style={styles.infoCard}>
                    <span style={styles.infoIcon}>{info.icon}</span>
                    <div>
                      <div style={styles.infoLabel}>{info.label}</div>
                      <div style={styles.infoVal}>{info.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Réservation */}
            <div style={styles.reservCard}>
              <h3 style={styles.reservTitle}>Réserver cet atelier</h3>
              <div style={styles.priceDisplay}>{atelier.prix} € <span style={styles.priceLabel}>/ personne</span></div>

              <div className="form-group">
                <label>Nombre de personnes</label>
                <select
                  value={nbPersonnes}
                  onChange={(e) => setNbPersonnes(Number(e.target.value))}
                  disabled={atelier.placesRestantes === 0}
                >
                  {Array.from({ length: Math.min(atelier.placesRestantes, 6) }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>{n} personne{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div style={styles.totalRow}>
                <span>Total</span>
                <span style={styles.totalAmount}>{total} €</span>
              </div>

              <div style={styles.paySimule}>
                💳 Paiement simulé — aucun débit réel
              </div>

              <button
                onClick={handleReservation}
                className="btn btn-dark"
                style={{ width: '100%', marginTop: 16 }}
                disabled={reserving || atelier.placesRestantes === 0}
              >
                {atelier.placesRestantes === 0
                  ? 'Atelier complet'
                  : reserving
                  ? 'Réservation en cours...'
                  : 'Confirmer la réservation'}
              </button>

              {!user && (
                <p style={{ fontSize: '0.8rem', color: '#888', textAlign: 'center', marginTop: 12 }}>
                  Vous devez être connecté pour réserver.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  hero: { position: 'relative', height: 400 },
  heroImg: { width: '100%', height: '100%', objectFit: 'cover' },
  heroOverlay: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' },
  heroContent: {
    position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
    textAlign: 'center', color: '#fff',
  },
  heroTitle: {
    fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#F5ECD7', marginTop: 12,
  },
  grid: {
    display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48, alignItems: 'start',
  },
  sectionH2: { fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', marginBottom: 16 },
  desc: { color: '#555', lineHeight: 1.8, marginBottom: 32 },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  infoCard: {
    display: 'flex', gap: 12, alignItems: 'flex-start',
    background: '#FAF5EC', borderRadius: 12, padding: 16,
  },
  infoIcon: { fontSize: '1.4rem' },
  infoLabel: { fontSize: '0.75rem', color: '#888', marginBottom: 2 },
  infoVal: { fontWeight: 600, fontSize: '0.9rem' },
  reservCard: {
    background: '#fff', borderRadius: 16, padding: 32,
    boxShadow: '0 4px 30px rgba(0,0,0,0.1)', position: 'sticky', top: 100,
  },
  reservTitle: { fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', marginBottom: 16 },
  priceDisplay: {
    fontSize: '2rem', fontWeight: 700, fontFamily: 'Playfair Display, serif',
    color: '#2C2C2C', marginBottom: 24,
  },
  priceLabel: { fontSize: '1rem', fontWeight: 400, color: '#888' },
  totalRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 0', borderTop: '1px solid #f0f0f0', marginTop: 8,
  },
  totalAmount: { fontSize: '1.4rem', fontWeight: 700 },
  paySimule: {
    background: '#E8F0E9', color: '#5C7A60', padding: '10px 16px',
    borderRadius: 8, fontSize: '0.8rem', textAlign: 'center', marginTop: 12,
  },
};

export default AtelierDetail;
