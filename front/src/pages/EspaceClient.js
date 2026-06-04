import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

const EspaceClient = () => {
  const { user, login, register, logout, updateProfile } = useAuth();
  const [tab, setTab] = useState('login'); // login | register | dashboard | commandes | reservations | profil
  const [loading, setLoading] = useState(false);

  // Formulaires
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ nom: '', prenom: '', email: '', password: '', telephone: '' });
  const [profileForm, setProfileForm] = useState({ nom: '', prenom: '', telephone: '', password: '' });

  // Données
  const [commandes, setCommandes] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (user) {
      setTab('dashboard');
      setProfileForm({ nom: user.nom, prenom: user.prenom, telephone: user.telephone || '', password: '' });
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      const [ordRes, resRes] = await Promise.all([
        api.get('/orders/mes-commandes'),
        api.get('/reservations/mes-reservations'),
      ]);
      setCommandes(ordRes.data);
      setReservations(resRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(loginForm.email, loginForm.password);
      toast.success('Bienvenue !');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await register(registerForm);
      toast.success('Compte créé !');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateProfile(profileForm);
      toast.success('Profil mis à jour !');
    } catch (err) {
      toast.error('Erreur mise à jour profil');
    } finally {
      setLoading(false);
    }
  };

  // Non connecté
  if (!user) {
    return (
      <div>
        <div className="page-header">
          <h1>Espace client</h1>
        </div>
        <section className="section">
          <div className="container" style={{ maxWidth: 480 }}>
            <div style={styles.tabs}>
              <button
                style={{ ...styles.tabBtn, ...(tab === 'login' ? styles.tabActive : {}) }}
                onClick={() => setTab('login')}
              >Connexion</button>
              <button
                style={{ ...styles.tabBtn, ...(tab === 'register' ? styles.tabActive : {}) }}
                onClick={() => setTab('register')}
              >Inscription</button>
            </div>

            {tab === 'login' ? (
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Mot de passe</label>
                  <input type="password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} required />
                </div>
                <button type="submit" className="btn btn-dark" style={{ width: '100%' }} disabled={loading}>
                  {loading ? 'Connexion...' : 'Se connecter'}
                </button>
                <p style={styles.hint}>Compte test : client@test.fr / client1234</p>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label>Nom</label>
                    <input value={registerForm.nom} onChange={e => setRegisterForm({ ...registerForm, nom: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>Prénom</label>
                    <input value={registerForm.prenom} onChange={e => setRegisterForm({ ...registerForm, prenom: e.target.value })} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={registerForm.email} onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Mot de passe</label>
                  <input type="password" value={registerForm.password} onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Téléphone (optionnel)</label>
                  <input value={registerForm.telephone} onChange={e => setRegisterForm({ ...registerForm, telephone: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-dark" style={{ width: '100%' }} disabled={loading}>
                  {loading ? 'Création...' : 'Créer mon compte'}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    );
  }

  // Connecté
  return (
    <div>
      <div className="page-header">
        <h1>Bonjour, {user.prenom} 👋</h1>
        <p>Gérez vos commandes, réservations et votre profil</p>
      </div>

      <section className="section">
        <div className="container">
          <div style={styles.dashGrid}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
              {[
                { key: 'dashboard', label: '🏠 Tableau de bord' },
                { key: 'commandes', label: '📦 Mes commandes' },
                { key: 'reservations', label: '🏺 Mes réservations' },
                { key: 'profil', label: '👤 Mon profil' },
              ].map((item) => (
                <button
                  key={item.key}
                  style={{ ...styles.sideBtn, ...(tab === item.key ? styles.sideBtnActive : {}) }}
                  onClick={() => setTab(item.key)}
                >
                  {item.label}
                </button>
              ))}
              <button onClick={logout} style={styles.logoutBtn}>Déconnexion</button>
            </div>

            {/* Contenu */}
            <div>
              {tab === 'dashboard' && (
                <div>
                  <h2 style={styles.h2}>Mon tableau de bord</h2>
                  <div style={styles.statsRow}>
                    <div style={styles.statCard}>
                      <div style={styles.statNum}>{commandes.length}</div>
                      <div style={styles.statLabel}>Commandes</div>
                    </div>
                    <div style={styles.statCard}>
                      <div style={styles.statNum}>{reservations.length}</div>
                      <div style={styles.statLabel}>Réservations</div>
                    </div>
                  </div>
                </div>
              )}

              {tab === 'commandes' && (
                <div>
                  <h2 style={styles.h2}>Mes commandes</h2>
                  {commandes.length === 0 ? (
                    <p style={{ color: '#888' }}>Aucune commande pour le moment.</p>
                  ) : (
                    commandes.map((order) => (
                      <div key={order._id} style={styles.orderCard}>
                        <div style={styles.orderHeader}>
                          <span style={{ fontWeight: 600 }}>Commande #{order._id.slice(-6).toUpperCase()}</span>
                          <span className={`badge ${order.statut === 'livrée' ? 'badge-green' : 'badge-beige'}`}>
                            {order.statut}
                          </span>
                        </div>
                        <div style={styles.orderItems}>
                          {order.items.map((item, i) => (
                            <span key={i}>{item.nom} × {item.quantite}</span>
                          ))}
                        </div>
                        <div style={styles.orderFooter}>
                          <span style={{ color: '#888', fontSize: '0.8rem' }}>
                            {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                          <span style={{ fontWeight: 700 }}>{order.total} €</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {tab === 'reservations' && (
                <div>
                  <h2 style={styles.h2}>Mes réservations</h2>
                  {reservations.length === 0 ? (
                    <p style={{ color: '#888' }}>Aucune réservation pour le moment.</p>
                  ) : (
                    reservations.map((res) => (
                      <div key={res._id} style={styles.orderCard}>
                        <div style={styles.orderHeader}>
                          <span style={{ fontWeight: 600 }}>{res.atelier?.titre}</span>
                          <span className="badge badge-green">{res.statut}</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#666' }}>
                          📅 {res.atelier?.date ? new Date(res.atelier.date).toLocaleDateString('fr-FR') : ''}
                          {' '} · 🕐 {res.atelier?.heureDebut}
                          {' '} · 👥 {res.nombrePersonnes} personne{res.nombrePersonnes > 1 ? 's' : ''}
                        </p>
                        <div style={styles.orderFooter}>
                          <span style={{ color: '#888', fontSize: '0.8rem' }}>
                            {new Date(res.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                          <span style={{ fontWeight: 700 }}>{res.total} €</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {tab === 'profil' && (
                <div>
                  <h2 style={styles.h2}>Mon profil</h2>
                  <form onSubmit={handleUpdateProfile} style={{ maxWidth: 480 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div className="form-group">
                        <label>Nom</label>
                        <input value={profileForm.nom} onChange={e => setProfileForm({ ...profileForm, nom: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Prénom</label>
                        <input value={profileForm.prenom} onChange={e => setProfileForm({ ...profileForm, prenom: e.target.value })} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Téléphone</label>
                      <input value={profileForm.telephone} onChange={e => setProfileForm({ ...profileForm, telephone: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Nouveau mot de passe (laisser vide si inchangé)</label>
                      <input type="password" value={profileForm.password} onChange={e => setProfileForm({ ...profileForm, password: e.target.value })} />
                    </div>
                    <button type="submit" className="btn btn-dark" disabled={loading}>
                      {loading ? 'Mise à jour...' : 'Enregistrer'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  tabs: { display: 'flex', borderBottom: '2px solid #eee', marginBottom: 32 },
  tabBtn: { padding: '12px 24px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem', color: '#888' },
  tabActive: { color: '#2C2C2C', fontWeight: 600, borderBottom: '2px solid #2C2C2C', marginBottom: -2 },
  hint: { textAlign: 'center', color: '#aaa', fontSize: '0.8rem', marginTop: 12 },
  dashGrid: { display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48, alignItems: 'start' },
  sidebar: { display: 'flex', flexDirection: 'column', gap: 4 },
  sideBtn: {
    padding: '12px 16px', border: 'none', background: 'none', cursor: 'pointer',
    textAlign: 'left', borderRadius: 8, fontSize: '0.9rem', color: '#555',
  },
  sideBtnActive: { background: '#FAF5EC', color: '#2C2C2C', fontWeight: 600 },
  logoutBtn: {
    padding: '12px 16px', border: 'none', background: 'none', cursor: 'pointer',
    textAlign: 'left', borderRadius: 8, fontSize: '0.9rem', color: '#e74c3c',
    marginTop: 16,
  },
  h2: { fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', marginBottom: 24 },
  statsRow: { display: 'flex', gap: 24 },
  statCard: {
    background: '#FAF5EC', borderRadius: 12, padding: '24px 32px', textAlign: 'center', minWidth: 120,
  },
  statNum: { fontSize: '2.5rem', fontWeight: 700, fontFamily: 'Playfair Display, serif' },
  statLabel: { color: '#888', fontSize: '0.85rem', marginTop: 4 },
  orderCard: {
    border: '1.5px solid #eee', borderRadius: 12, padding: 20, marginBottom: 16,
  },
  orderHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 },
  orderItems: { fontSize: '0.85rem', color: '#666', display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 },
  orderFooter: { display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f0f0f0', paddingTop: 12 },
};

export default EspaceClient;
