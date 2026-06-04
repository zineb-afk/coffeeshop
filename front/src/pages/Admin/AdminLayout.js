import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) { navigate('/espace-client'); return; }
    if (user.role !== 'admin') { navigate('/'); }
  }, [user, navigate]); // ✅ navigate ajouté

  const handleLogout = () => { logout(); navigate('/'); };

  const links = [
    { to: '/admin', label: '📊 Dashboard', exact: true },
    { to: '/admin/produits', label: '🛍️ Produits' },
    { to: '/admin/ateliers', label: '🏺 Ateliers' },
    { to: '/admin/commandes', label: '📦 Commandes' },
    { to: '/admin/reservations', label: '📅 Réservations' },
    { to: '/admin/messages', label: '✉️ Messages' },
    { to: '/admin/blog', label: '📝 Blog' },
    { to: '/admin/users', label: '👥 Utilisateurs' },
  ];

  const isActive = (to, exact) => exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <div style={styles.layout}>
      <aside style={styles.sidebar}>
        <Link to="/" style={styles.logo}>☕ Coffee Arts</Link>
        <div style={styles.adminLabel}>Administration</div>
        <nav style={styles.nav}>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{ ...styles.navLink, ...(isActive(l.to, l.exact) ? styles.navLinkActive : {}) }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div style={styles.sidebarBottom}>
          <Link to="/" style={styles.siteLink}>← Voir le site</Link>
          <button onClick={handleLogout} style={styles.logoutBtn}>Déconnexion</button>
        </div>
      </aside>
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

const styles = {
  layout: { display: 'flex', minHeight: '100vh', background: '#F8F9FA' },
  sidebar: {
    width: 240, background: '#2C2C2C', color: '#fff',
    display: 'flex', flexDirection: 'column', padding: '24px 16px',
    position: 'fixed', top: 0, bottom: 0, left: 0, overflowY: 'auto',
  },
  logo: {
    fontFamily: 'Playfair Display, serif', color: '#F5ECD7',
    fontSize: '1.1rem', marginBottom: 4, textDecoration: 'none',
  },
  adminLabel: { color: '#888', fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 32 },
  nav: { display: 'flex', flexDirection: 'column', gap: 4, flex: 1 },
  navLink: {
    padding: '10px 12px', borderRadius: 8, color: '#ccc',
    textDecoration: 'none', fontSize: '0.88rem', transition: 'all 0.15s',
  },
  navLinkActive: { background: '#444', color: '#F5ECD7', fontWeight: 600 },
  sidebarBottom: { borderTop: '1px solid #444', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 },
  siteLink: { color: '#888', fontSize: '0.8rem', textDecoration: 'none', padding: '6px 12px' },
  logoutBtn: {
    background: 'none', border: '1px solid #555', color: '#aaa',
    borderRadius: 8, padding: '8px 12px', cursor: 'pointer', fontSize: '0.8rem', textAlign: 'left',
  },
  main: { marginLeft: 240, flex: 1, padding: '32px 40px', minHeight: '100vh' },
};

export default AdminLayout;