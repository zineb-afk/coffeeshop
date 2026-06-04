import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    {/* Hero */}
    <section style={styles.hero}>
      <div style={styles.heroOverlay} />
      <div style={styles.heroContent}>
        <h1 style={styles.heroTitle}>Specialty coffee & pottery studio</h1>
        <p style={styles.heroSub}>Sip, create and connect</p>
        <p style={styles.heroDesc}>
          Un lieu hybride où l'on vient savourer un café, créer de ses mains
          et partager un moment, simplement.
        </p>
        <p style={styles.heroAddr}>25 boulevard du Temple, 75003 Paris</p>
        <div style={styles.heroBtns}>
          <Link to="/ateliers" className="btn btn-primary">Réserver un atelier</Link>
          <Link to="/carte" className="btn btn-dark">Découvrir la carte</Link>
        </div>
      </div>
    </section>

    {/* 3 expériences */}
    <section className="section">
      <div className="container">
        <h2 style={styles.sectionTitle}>Trois expériences, un même lieu</h2>
        <p style={styles.sectionSub}>
          Un café de spécialité, des ateliers créatifs et une boutique, pensés pour se compléter.
        </p>
        <div className="grid-3" style={{ marginTop: 48 }}>
          {[
            {
              emoji: '☕',
              label: 'DÉGUSTER',
              title: 'Café de spécialité',
              link: '/carte',
              linkText: 'Découvrir la carte',
            },
            {
              emoji: '🏺',
              label: 'CRÉER',
              title: 'Ateliers créatifs',
              link: '/ateliers',
              linkText: 'Participer à un atelier',
            },
            {
              emoji: '🛍️',
              label: 'EMPORTER',
              title: 'La boutique',
              link: '/boutique',
              linkText: 'Explorer la boutique',
            },
          ].map((item) => (
            <Link to={item.link} key={item.title} style={styles.expCard}>
              <div style={styles.expEmoji}>{item.emoji}</div>
              <div style={styles.expLabel}>{item.label}</div>
              <h3 style={styles.expTitle}>{item.title}</h3>
              <span style={styles.expLink}>{item.linkText} →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Section ambiance */}
    <section style={styles.ambianceSection}>
      <div className="container">
        <h2 style={styles.sectionTitle}>Au cœur de Coffee Arts Paris</h2>
        <p style={styles.sectionSub}>
          Un espace pensé pour créer, se retrouver et ralentir.
        </p>
        <div style={styles.ambianceGrid}>
          {[
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
            'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600',
            'https://images.unsplash.com/photo-1448043552756-e747b7a2b2b8?w=600',
            'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600',
          ].map((src, i) => (
            <img key={i} src={src} alt="ambiance" style={styles.ambianceImg} />
          ))}
        </div>
      </div>
    </section>

    {/* CTA final */}
    <section style={styles.ctaSection}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ ...styles.sectionTitle, color: '#fff' }}>
          Un moment autour du café et de la création
        </h2>
        <p style={{ color: '#ddd', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
          Un lieu où l'on vient créer, discuter, boire un café et s'attarder.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/ateliers" className="btn btn-primary">Découvrir les ateliers</Link>
          <Link to="/boutique" className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>
            Accéder à la boutique
          </Link>
        </div>
      </div>
    </section>
  </div>
);

const styles = {
  hero: {
    position: 'relative',
    height: '90vh',
    minHeight: 600,
    background: `url(https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1600) center/cover no-repeat`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,0,0,0.45)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    color: '#fff',
    padding: '0 24px',
    maxWidth: 800,
  },
  heroTitle: {
    fontFamily: 'Playfair Display, serif',
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 700,
    color: '#F5ECD7',
    marginBottom: 16,
  },
  heroSub: { fontSize: '1.1rem', marginBottom: 16, opacity: 0.85 },
  heroDesc: { fontSize: '1rem', marginBottom: 12, maxWidth: 560, margin: '0 auto 12px' },
  heroAddr: { fontSize: '0.85rem', opacity: 0.7, marginBottom: 32 },
  heroBtns: { display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' },
  sectionTitle: {
    fontFamily: 'Playfair Display, serif',
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: 12,
  },
  sectionSub: {
    textAlign: 'center',
    color: '#666',
    maxWidth: 600,
    margin: '0 auto',
  },
  expCard: {
    background: '#FAF5EC',
    borderRadius: 16,
    padding: 40,
    textAlign: 'center',
    textDecoration: 'none',
    color: '#2C2C2C',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'block',
  },
  expEmoji: { fontSize: '3rem', marginBottom: 12 },
  expLabel: { fontSize: '0.7rem', fontWeight: 700, letterSpacing: 3, color: '#7A9E7E', marginBottom: 8 },
  expTitle: { fontSize: '1.3rem', fontFamily: 'Playfair Display, serif', marginBottom: 16 },
  expLink: { fontSize: '0.85rem', color: '#7A9E7E', fontWeight: 500 },
  ambianceSection: { background: '#FAF5EC', padding: '80px 0' },
  ambianceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 16,
    marginTop: 48,
  },
  ambianceImg: {
    width: '100%',
    height: 280,
    objectFit: 'cover',
    borderRadius: 12,
  },
  ctaSection: {
    background: '#2C2C2C',
    padding: '80px 0',
  },
};

export default Home;
