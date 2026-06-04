import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

// ==================== ATELIERS ====================
const emptyAtelier = { titre: '', description: '', prix: '', date: '', heureDebut: '', heureFin: '', placesTotal: '', niveau: 'Tous niveaux', type: 'Standard' };

export const AdminAteliers = () => {
  const [ateliers, setAteliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptyAtelier);
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const load = () => api.get('/ateliers/admin').then(({ data }) => setAteliers(data)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyAtelier); setEditId(null); setModal(true); };
  const openEdit = (a) => {
    const dateStr = a.date ? new Date(a.date).toISOString().split('T')[0] : '';
    setForm({ ...a, date: dateStr });
    setEditId(a._id); setModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (imageFile) fd.append('image', imageFile);
    try {
      if (editId) { await api.put(`/ateliers/${editId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Atelier modifié'); }
      else { await api.post('/ateliers', fd, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Atelier créé'); }
      setModal(false); load();
    } catch (err) { toast.error('Erreur'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ?')) return;
    await api.delete(`/ateliers/${id}`); toast.success('Supprimé'); load();
  };

  return (
    <div>
      <div style={sh}>
        <h1 style={st}>Ateliers</h1>
        <button className="btn btn-dark" onClick={openAdd}>+ Ajouter un atelier</button>
      </div>
      {loading ? <div className="spinner" /> : (
        <div style={tw}>
          <table style={tb}>
            <thead><tr>{['Titre', 'Date', 'Horaire', 'Prix', 'Places', 'Actif', 'Actions'].map(h => <th key={h} style={thS}>{h}</th>)}</tr></thead>
            <tbody>
              {ateliers.map(a => (
                <tr key={a._id}>
                  <td style={td}>{a.titre}</td>
                  <td style={td}>{new Date(a.date).toLocaleDateString('fr-FR')}</td>
                  <td style={td}>{a.heureDebut}–{a.heureFin}</td>
                  <td style={td}><strong>{a.prix} €</strong></td>
                  <td style={td}>{a.placesRestantes}/{a.placesTotal}</td>
                  <td style={td}><span className={`badge ${a.actif ? 'badge-green' : 'badge-red'}`}>{a.actif ? 'Oui' : 'Non'}</span></td>
                  <td style={td}>
                    <button onClick={() => openEdit(a)} style={eb}>✏️</button>
                    <button onClick={() => handleDelete(a._id)} style={db}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modal && (
        <div style={ov}>
          <div style={md}>
            <h2 style={mt}>{editId ? 'Modifier' : 'Ajouter'} un atelier</h2>
            <form onSubmit={handleSave}>
              <div className="form-group"><label>Titre</label><input value={form.titre} onChange={e => setForm({ ...form, titre: e.target.value })} required /></div>
              <div className="form-group"><label>Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} required /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group"><label>Prix (€)</label><input type="number" value={form.prix} onChange={e => setForm({ ...form, prix: e.target.value })} required /></div>
                <div className="form-group"><label>Places total</label><input type="number" value={form.placesTotal} onChange={e => setForm({ ...form, placesTotal: e.target.value })} required /></div>
              </div>
              <div className="form-group"><label>Date</label><input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group"><label>Heure début</label><input type="time" value={form.heureDebut} onChange={e => setForm({ ...form, heureDebut: e.target.value })} required /></div>
                <div className="form-group"><label>Heure fin</label><input type="time" value={form.heureFin} onChange={e => setForm({ ...form, heureFin: e.target.value })} required /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group"><label>Niveau</label>
                  <select value={form.niveau} onChange={e => setForm({ ...form, niveau: e.target.value })}>
                    {['Débutant', 'Intermédiaire', 'Tous niveaux'].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
                <div className="form-group"><label>Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    {['Standard', 'Premium', 'Événement spécial'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group"><label>Image</label><input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} /></div>
              <div style={mb}>
                <button type="button" className="btn btn-outline" onClick={() => setModal(false)}>Annuler</button>
                <button type="submit" className="btn btn-dark">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== COMMANDES ====================
export const AdminCommandes = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => api.get('/orders').then(({ data }) => setOrders(data)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const changeStatut = async (id, statut) => {
    await api.put(`/orders/${id}/statut`, { statut }); toast.success('Statut mis à jour'); load();
  };

  return (
    <div>
      <h1 style={st}>Commandes</h1>
      {loading ? <div className="spinner" /> : (
        <div style={tw}>
          <table style={tb}>
            <thead><tr>{['ID', 'Client', 'Articles', 'Total', 'Statut', 'Date', 'Action'].map(h => <th key={h} style={thS}>{h}</th>)}</tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o._id}>
                  <td style={td}>#{o._id.slice(-6).toUpperCase()}</td>
                  <td style={td}>{o.client?.prenom} {o.client?.nom}<br /><span style={{ color: '#888', fontSize: '0.8rem' }}>{o.client?.email}</span></td>
                  <td style={td}>{o.items.map(i => `${i.nom} ×${i.quantite}`).join(', ')}</td>
                  <td style={td}><strong>{o.total} €</strong></td>
                  <td style={td}><span className={`badge ${o.statut === 'livrée' ? 'badge-green' : o.statut === 'annulée' ? 'badge-red' : 'badge-beige'}`}>{o.statut}</span></td>
                  <td style={td}>{new Date(o.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td style={td}>
                    <select value={o.statut} onChange={e => changeStatut(o._id, e.target.value)} style={{ padding: '4px 8px', fontSize: '0.8rem', borderRadius: 6, border: '1px solid #ddd' }}>
                      {['en attente', 'confirmée', 'expédiée', 'livrée', 'annulée'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ==================== RESERVATIONS ====================
export const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => api.get('/reservations').then(({ data }) => setReservations(data)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const changeStatut = async (id, statut) => {
    await api.put(`/reservations/${id}/statut`, { statut }); toast.success('Statut mis à jour'); load();
  };

  return (
    <div>
      <h1 style={st}>Réservations</h1>
      {loading ? <div className="spinner" /> : (
        <div style={tw}>
          <table style={tb}>
            <thead><tr>{['Client', 'Atelier', 'Date', 'Personnes', 'Total', 'Statut', 'Action'].map(h => <th key={h} style={thS}>{h}</th>)}</tr></thead>
            <tbody>
              {reservations.map(r => (
                <tr key={r._id}>
                  <td style={td}>{r.client?.prenom} {r.client?.nom}</td>
                  <td style={td}>{r.atelier?.titre}</td>
                  <td style={td}>{r.atelier?.date ? new Date(r.atelier.date).toLocaleDateString('fr-FR') : '—'}</td>
                  <td style={td}>{r.nombrePersonnes}</td>
                  <td style={td}><strong>{r.total} €</strong></td>
                  <td style={td}><span className={`badge ${r.statut === 'confirmée' ? 'badge-green' : r.statut === 'annulée' ? 'badge-red' : 'badge-beige'}`}>{r.statut}</span></td>
                  <td style={td}>
                    <select value={r.statut} onChange={e => changeStatut(r._id, e.target.value)} style={{ padding: '4px 8px', fontSize: '0.8rem', borderRadius: 6, border: '1px solid #ddd' }}>
                      {['confirmée', 'en attente', 'annulée'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ==================== MESSAGES ====================
export const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = () => api.get('/contacts').then(({ data }) => setMessages(data)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const markRead = async (id) => { await api.put(`/contacts/${id}/lu`); load(); };
  const handleDelete = async (id) => { await api.delete(`/contacts/${id}`); toast.success('Supprimé'); load(); };

  return (
    <div>
      <h1 style={st}>Messages de contact</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 24, alignItems: 'start' }}>
        <div style={tw}>
          {loading ? <div className="spinner" /> : messages.map(m => (
            <div
              key={m._id}
              onClick={() => { setSelected(m); if (!m.lu) markRead(m._id); }}
              style={{ padding: '16px', borderBottom: '1px solid #f0f0f0', cursor: 'pointer', background: selected?._id === m._id ? '#FAF5EC' : m.lu ? '#fff' : '#FEFCE8' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <strong style={{ fontSize: '0.9rem' }}>{m.nom}</strong>
                {!m.lu && <span className="badge badge-beige">Nouveau</span>}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>{m.objet}</div>
              <div style={{ fontSize: '0.75rem', color: '#aaa' }}>{new Date(m.createdAt).toLocaleDateString('fr-FR')}</div>
            </div>
          ))}
        </div>
        {selected ? (
          <div style={{ ...tw, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif' }}>{selected.objet}</h3>
              <button onClick={() => handleDelete(selected._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e74c3c' }}>🗑️</button>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: 16 }}>De : {selected.nom} ({selected.email})</p>
            <p style={{ lineHeight: 1.8 }}>{selected.message}</p>
          </div>
        ) : (
          <div style={{ ...tw, padding: 40, textAlign: 'center', color: '#888' }}>Sélectionnez un message</div>
        )}
      </div>
    </div>
  );
};

// ==================== BLOG ADMIN ====================
const emptyBlog = { titre: '', contenu: '', extrait: '', auteur: 'Coffee Arts Paris', tags: '', publie: true };

export const AdminBlog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptyBlog);
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const load = () => api.get('/blog/admin').then(({ data }) => setArticles(data)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyBlog); setEditId(null); setModal(true); };
  const openEdit = (a) => { setForm({ ...a, tags: a.tags?.join(', ') || '' }); setEditId(a._id); setModal(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (imageFile) fd.append('image', imageFile);
    try {
      if (editId) { await api.put(`/blog/${editId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Article modifié'); }
      else { await api.post('/blog', fd, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Article créé'); }
      setModal(false); load();
    } catch { toast.error('Erreur'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ?')) return;
    await api.delete(`/blog/${id}`); toast.success('Supprimé'); load();
  };

  return (
    <div>
      <div style={sh}>
        <h1 style={st}>Articles de blog</h1>
        <button className="btn btn-dark" onClick={openAdd}>+ Nouvel article</button>
      </div>
      {loading ? <div className="spinner" /> : (
        <div style={tw}>
          <table style={tb}>
            <thead><tr>{['Titre', 'Auteur', 'Tags', 'Publié', 'Date', 'Actions'].map(h => <th key={h} style={thS}>{h}</th>)}</tr></thead>
            <tbody>
              {articles.map(a => (
                <tr key={a._id}>
                  <td style={td}><strong>{a.titre}</strong></td>
                  <td style={td}>{a.auteur}</td>
                  <td style={td}>{a.tags?.join(', ')}</td>
                  <td style={td}><span className={`badge ${a.publie ? 'badge-green' : 'badge-red'}`}>{a.publie ? 'Oui' : 'Non'}</span></td>
                  <td style={td}>{new Date(a.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td style={td}>
                    <button onClick={() => openEdit(a)} style={eb}>✏️</button>
                    <button onClick={() => handleDelete(a._id)} style={db}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modal && (
        <div style={ov}>
          <div style={{ ...md, maxWidth: 680 }}>
            <h2 style={mt}>{editId ? 'Modifier' : 'Créer'} un article</h2>
            <form onSubmit={handleSave}>
              <div className="form-group"><label>Titre</label><input value={form.titre} onChange={e => setForm({ ...form, titre: e.target.value })} required /></div>
              <div className="form-group"><label>Extrait</label><input value={form.extrait} onChange={e => setForm({ ...form, extrait: e.target.value })} /></div>
              <div className="form-group"><label>Contenu</label><textarea value={form.contenu} onChange={e => setForm({ ...form, contenu: e.target.value })} rows={8} required /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group"><label>Auteur</label><input value={form.auteur} onChange={e => setForm({ ...form, auteur: e.target.value })} /></div>
                <div className="form-group"><label>Tags (virgule séparés)</label><input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} /></div>
              </div>
              <div className="form-group"><label>Image</label><input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} /></div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input type="checkbox" id="publie" checked={form.publie} onChange={e => setForm({ ...form, publie: e.target.checked })} style={{ width: 'auto' }} />
                <label htmlFor="publie" style={{ margin: 0 }}>Publié</label>
              </div>
              <div style={mb}>
                <button type="button" className="btn btn-outline" onClick={() => setModal(false)}>Annuler</button>
                <button type="submit" className="btn btn-dark">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== USERS ====================
export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => api.get('/users').then(({ data }) => setUsers(data)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const changeRole = async (id, role) => { await api.put(`/users/${id}/role`, { role }); toast.success('Rôle mis à jour'); load(); };
  const handleDelete = async (id) => { if (!window.confirm('Supprimer ?')) return; await api.delete(`/users/${id}`); toast.success('Supprimé'); load(); };

  return (
    <div>
      <h1 style={st}>Utilisateurs</h1>
      {loading ? <div className="spinner" /> : (
        <div style={tw}>
          <table style={tb}>
            <thead><tr>{['Nom', 'Email', 'Téléphone', 'Rôle', 'Inscrit le', 'Actions'].map(h => <th key={h} style={thS}>{h}</th>)}</tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td style={td}>{u.prenom} {u.nom}</td>
                  <td style={td}>{u.email}</td>
                  <td style={td}>{u.telephone || '—'}</td>
                  <td style={td}>
                    <select value={u.role} onChange={e => changeRole(u._id, e.target.value)} style={{ padding: '4px 8px', fontSize: '0.8rem', borderRadius: 6, border: '1px solid #ddd' }}>
                      <option value="client">client</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td style={td}>{new Date(u.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td style={td}><button onClick={() => handleDelete(u._id)} style={db}>🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Styles partagés
const sh = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 };
const st = { fontFamily: 'Playfair Display, serif', fontSize: '2rem', marginBottom: 24 };
const tw = { background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 10px rgba(0,0,0,0.05)' };
const tb = { width: '100%', borderCollapse: 'collapse' };
const thS = { background: '#f8f8f8', padding: '12px 16px', textAlign: 'left', fontSize: '0.8rem', color: '#888', fontWeight: 600 };
const td = { padding: '12px 16px', borderBottom: '1px solid #f5f5f5', fontSize: '0.9rem', verticalAlign: 'middle' };
const eb = { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', marginRight: 8 };
const db = { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' };
const ov = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 };
const md = { background: '#fff', borderRadius: 16, padding: 40, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' };
const mt = { fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', marginBottom: 24 };
const mb = { display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 };
