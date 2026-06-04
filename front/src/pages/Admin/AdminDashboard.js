import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/stats').then(({ data }) => setStats(data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner" />;

  const cards = [
    { label: 'Chiffre d\'affaires', val: `${stats.caTotal.toFixed(2)} €`, icon: '💰', color: '#E8F0E9' },
    { label: 'Commandes', val: stats.totalCommandes, icon: '📦', color: '#FFF3E0' },
    { label: 'Réservations', val: stats.totalReservations, icon: '📅', color: '#E3F2FD' },
    { label: 'Clients', val: stats.totalClients, icon: '👥', color: '#F3E5F5' },
    { label: 'Messages non lus', val: stats.messagesNonLus, icon: '✉️', color: '#FDECEA' },
    { label: 'Produits actifs', val: stats.totalProduits, icon: '🛍️', color: '#FAF5EC' },
  ];

  return (
    <div>
      <h1 style={styles.title}>Dashboard</h1>
      <p style={styles.sub}>Vue d'ensemble de votre activité</p>

      {/* Stats cards */}
      <div style={styles.statsGrid}>
        {cards.map((card) => (
          <div key={card.label} style={{ ...styles.statCard, background: card.color }}>
            <div style={styles.statIcon}>{card.icon}</div>
            <div style={styles.statVal}>{card.val}</div>
            <div style={styles.statLabel}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Commandes récentes */}
      <div style={styles.tableSection}>
        <h2 style={styles.h2}>Commandes récentes (7 jours)</h2>
        {stats.commandesRecentes.length === 0 ? (
          <p style={{ color: '#888' }}>Aucune commande récente.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                {['ID', 'Client', 'Total', 'Statut', 'Date'].map(h => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.commandesRecentes.map((order) => (
                <tr key={order._id}>
                  <td style={styles.td}>#{order._id.slice(-6).toUpperCase()}</td>
                  <td style={styles.td}>{order.client?.prenom} {order.client?.nom}</td>
                  <td style={styles.td}>{order.total} €</td>
                  <td style={styles.td}>
                    <span className={`badge ${order.statut === 'livrée' ? 'badge-green' : 'badge-beige'}`}>
                      {order.statut}
                    </span>
                  </td>
                  <td style={styles.td}>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Réservations récentes */}
      <div style={styles.tableSection}>
        <h2 style={styles.h2}>Réservations récentes (7 jours)</h2>
        {stats.reservationsRecentes.length === 0 ? (
          <p style={{ color: '#888' }}>Aucune réservation récente.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                {['Client', 'Atelier', 'Personnes', 'Total', 'Date'].map(h => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.reservationsRecentes.map((res) => (
                <tr key={res._id}>
                  <td style={styles.td}>{res.client?.prenom} {res.client?.nom}</td>
                  <td style={styles.td}>{res.atelier?.titre}</td>
                  <td style={styles.td}>{res.nombrePersonnes}</td>
                  <td style={styles.td}>{res.total} €</td>
                  <td style={styles.td}>{new Date(res.createdAt).toLocaleDateString('fr-FR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  title: { fontFamily: 'Playfair Display, serif', fontSize: '2rem', marginBottom: 4 },
  sub: { color: '#888', marginBottom: 32 },
  statsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 20, marginBottom: 48,
  },
  statCard: { borderRadius: 12, padding: '20px', textAlign: 'center' },
  statIcon: { fontSize: '2rem', marginBottom: 8 },
  statVal: { fontSize: '1.8rem', fontWeight: 700, fontFamily: 'Playfair Display, serif' },
  statLabel: { color: '#555', fontSize: '0.8rem', marginTop: 4 },
  tableSection: { background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 10px rgba(0,0,0,0.05)' },
  h2: { fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', marginBottom: 20 },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { background: '#f8f8f8', padding: '10px 16px', textAlign: 'left', fontSize: '0.8rem', color: '#888', fontWeight: 600 },
  td: { padding: '12px 16px', borderBottom: '1px solid #f0f0f0', fontSize: '0.9rem' },
};

export default AdminDashboard;
