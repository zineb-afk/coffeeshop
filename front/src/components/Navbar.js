import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/carte" style={styles.link}>Café</Link>
        <Link to="/ateliers" style={styles.link}>Céramique</Link>
        <Link to="/boutique" style={styles.link}>Boutique</Link>
        <Link to="/evenements" style={styles.link}>Événements</Link>
      </div>

      <Link to="/" style={styles.logo}>
        <div style={styles.logoIcon}>☕</div>
        <div>
          <div style={styles.logoText}>Coffee Arts</div>
          <div style={styles.logoSub}>Paris</div>
        </div>
      </Link>

      <div style={styles.right}>
        <Link to="/blog" style={styles.link}>Blog</Link>
        <Link to="/apropos" style={styles.link}>Nos engagements</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
        <Link to="/espace-client" style={styles.link}>Espace client</Link>

        {/* Panier */}
        <Link to="/panier" style={styles.iconBtn}>
          🛒
          {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
        </Link>

        {/* Admin link si admin */}
        {user?.role === 'admin' && (
          <Link to="/admin" style={{ ...styles.link, color: '#7A9E7E', fontWeight: 600 }}>
            Admin
          </Link>
        )}

        {/* Logout si connecté */}
        {user && (
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Déconnexion
          </button>
        )}
      </div>

      {/* Mobile burger */}
      <button
        style={styles.burger}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {['/', '/carte', '/ateliers', '/boutique', '/evenements', '/blog', '/apropos', '/contact', '/espace-client'].map((path) => (
            <Link
              key={path}
              to={path}
              style={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {path === '/' ? 'Accueil' : path.replace('/', '').replace('-', ' ')}
            </Link>
          ))}
          {user?.role === 'admin' && (
            <Link to="/admin" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>
              Admin
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 32px',
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 1px 20px rgba(0,0,0,0.06)',
  },
  left: { display: 'flex', gap: 28, alignItems: 'center' },
  right: { display: 'flex', gap: 20, alignItems: 'center' },
  link: { fontSize: '0.9rem', color: '#2C2C2C', fontWeight: 400 },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    textDecoration: 'none',
  },
  logoIcon: { fontSize: '1.8rem' },
  logoText: { fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.2 },
  logoSub: { fontSize: '0.7rem', color: '#666', textAlign: 'center' },
  iconBtn: {
    position: 'relative',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '4px',
    textDecoration: 'none',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    background: '#7A9E7E',
    color: '#fff',
    fontSize: '0.65rem',
    fontWeight: 700,
    width: 18,
    height: 18,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutBtn: {
    background: 'none',
    border: '1px solid #ddd',
    borderRadius: 20,
    padding: '4px 12px',
    fontSize: '0.8rem',
    cursor: 'pointer',
    color: '#666',
  },
  burger: {
    display: 'none',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: '#fff',
    padding: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  mobileLink: {
    padding: '12px 0',
    borderBottom: '1px solid #f0f0f0',
    textTransform: 'capitalize',
  },
};

export default Navbar;
