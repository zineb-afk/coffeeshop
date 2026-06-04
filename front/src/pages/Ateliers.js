import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Ateliers = () => {
  const [ateliers, setAteliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/ateliers')
      .then(({ data }) => setAteliers(data))
      .catch(() => toast.error('Erreur chargement ateliers'))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
  };

  return (
    <div>
      <div className="page-header">
        <h1>Nos ateliers</h1>
        <p>
          Des ateliers de céramique pour explorer la matière, s'initier aux gestes
          et vivre une expérience créative, au rythme de chacun.
        </p>
      </div>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="spinner" />
          ) : ateliers.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888' }}>Aucun atelier disponible pour le moment.</p>
          ) : (
            <div className="grid-3">
              {ateliers.map((atelier) => (
                <div key={atelier._id} className="card">
                  <div style={{ position: 'relative' }}>
                    <img
                      src={atelier.image || 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500'}
                      alt={atelier.titre}
                      style={{ width: '100%', height: 220, objectFit: 'cover' }}
                    />
                    <span
                      className="badge badge-beige"
                      style={{ position: 'absolute', top: 12, left: 12 }}
                    >
                      {atelier.type}
                    </span>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', marginBottom: 8 }}>
                      {atelier.titre}
                    </h3>
                    <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: 16 }}>
                      {atelier.description}
                    </p>
                    <div style={styles.atelierMeta}>
                      <span>📅 {formatDate(atelier.date)}</span>
                      <span>🕐 {atelier.heureDebut} – {atelier.heureFin}</span>
                      <span>👥 {atelier.placesRestantes} places restantes</span>
                      <span>🎯 {atelier.niveau}</span>
                    </div>
                    <div style={styles.atelierFooter}>
                      <span style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>
                        {atelier.prix} €
                      </span>
                      <Link
                        to={`/ateliers/${atelier._id}`}
                        className="btn btn-dark"
                        style={{ padding: '10px 20px', fontSize: '0.85rem' }}
                      >
                        {atelier.placesRestantes > 0 ? 'Réserver' : 'Complet'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pourquoi section */}
      <section style={{ background: '#FAF5EC', padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', textAlign: 'center', marginBottom: 48 }}>
            Une expérience pour tous
          </h2>
          <div className="grid-3">
            {[
              { icon: '🌱', title: 'Ouvert à tous les niveaux', desc: 'Les ateliers accueillent débutants comme initiés. Chacun avance à son rythme, sans prérequis.' },
              { icon: '👥', title: 'En petits groupes', desc: 'Des sessions en groupes réduits pour un accompagnement attentif et un cadre propice à l\'échange.' },
              { icon: '✨', title: 'Une expérience encadrée', desc: 'Chaque atelier est pensé pour être fluide, structuré et accessible. Le geste, la matière et le plaisir.' },
            ].map((item) => (
              <div key={item.title} style={{ textAlign: 'center', padding: '24px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: 12 }}>{item.title}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  atelierMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    fontSize: '0.82rem',
    color: '#555',
    marginBottom: 16,
  },
  atelierFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #f0f0f0',
    paddingTop: 16,
    marginTop: 8,
  },
};

export default Ateliers;
