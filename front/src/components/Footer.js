import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={styles.footer}>
    <div className="container">
      <div style={styles.grid}>
        {/* Logo + description */}
        <div>
          <div style={styles.logo}>☕ Coffee Arts Paris</div>
          <p style={styles.desc}>
            Un lieu unique où la céramique rencontre le café artisanal à Paris.
            Créer, déguster, partager.
          </p>
        </div>

        {/* Liens */}
        <div>
          <h4 style={styles.title}>Découvrir</h4>
          <div style={styles.links}>
            <Link to="/carte" style={styles.link}>Café</Link>
            <Link to="/ateliers" style={styles.link}>Céramique</Link>
            <Link to="/boutique" style={styles.link}>Boutique</Link>
            <Link to="/evenements" style={styles.link}>Événements</Link>
            <Link to="/blog" style={styles.link}>Blog</Link>
            <Link to="/apropos" style={styles.link}>À propos</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 style={styles.title}>Contact</h4>
          <div style={styles.links}>
            <span style={styles.link}>07.66.91.82.94</span>
            <span style={styles.link}>coffeeartsparis@gmail.com</span>
            <span style={styles.link}>25 Boulevard du Temple</span>
            <span style={styles.link}>75003 Paris</span>
          </div>
        </div>

        {/* Horaires */}
        <div>
          <h4 style={styles.title}>Horaires</h4>
          <div style={styles.links}>
            <span style={styles.link}>Mar – Ven : 08h – 20h</span>
            <span style={styles.link}>Sam – Dim : 10h – 21h</span>
          </div>
        </div>
      </div>

      <div style={styles.bottom}>
        <span>© 2026 Coffee Arts Paris. Tous droits réservés.</span>
        <div style={styles.bottomLinks}>
          <Link to="/contact" style={styles.link}>Contact</Link>
          <Link to="/espace-client" style={styles.link}>Espace client</Link>
        </div>
      </div>
    </div>
  </footer>
);

const styles = {
  footer: {
    background: '#2C2C2C',
    color: '#ccc',
    padding: '60px 0 30px',
    marginTop: 80,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 40,
    marginBottom: 40,
  },
  logo: {
    fontSize: '1.2rem',
    fontFamily: 'Playfair Display, serif',
    color: '#F5ECD7',
    marginBottom: 12,
    fontWeight: 600,
  },
  desc: { fontSize: '0.85rem', lineHeight: 1.7 },
  title: {
    color: '#F5ECD7',
    fontFamily: 'Playfair Display, serif',
    marginBottom: 16,
    fontSize: '1rem',
  },
  links: { display: 'flex', flexDirection: 'column', gap: 8 },
  link: { fontSize: '0.85rem', color: '#aaa', textDecoration: 'none' },
  bottom: {
    borderTop: '1px solid #444',
    paddingTop: 24,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    fontSize: '0.8rem',
    color: '#888',
  },
  bottomLinks: { display: 'flex', gap: 20 },
};

export default Footer;
