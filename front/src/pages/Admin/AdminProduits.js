import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const CATEGORIES = ['Céramique', 'Goodies / Lifestyle', 'Cartes cadeaux'];

const empty = { nom: '', description: '', prix: '', categorie: 'Céramique', sousCategorie: '', stock: '', disponible: true };

const AdminProduits = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => api.get('/products/admin').then(({ data }) => setProducts(data)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setImageFile(null); setModal(true); };
  const openEdit = (p) => { setForm({ ...p }); setEditId(p._id); setImageFile(null); setModal(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append('image', imageFile);

      if (editId) {
        await api.put(`/products/${editId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Produit modifié');
      } else {
        await api.post('/products', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Produit créé');
      }
      setModal(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return;
    await api.delete(`/products/${id}`);
    toast.success('Produit supprimé');
    load();
  };

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>Produits</h1>
        <button className="btn btn-dark" onClick={openAdd}>+ Ajouter un produit</button>
      </div>

      {loading ? <div className="spinner" /> : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                {['Image', 'Nom', 'Catégorie', 'Prix', 'Stock', 'Dispo', 'Actions'].map(h => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td style={styles.td}>
                    <img src={p.image || 'https://via.placeholder.com/50'} alt={p.nom} style={styles.thumb} />
                  </td>
                  <td style={styles.td}>{p.nom}</td>
                  <td style={styles.td}><span className="badge badge-beige">{p.categorie}</span></td>
                  <td style={styles.td}><strong>{p.prix} €</strong></td>
                  <td style={styles.td}>{p.stock}</td>
                  <td style={styles.td}>
                    <span className={`badge ${p.disponible ? 'badge-green' : 'badge-red'}`}>
                      {p.disponible ? 'Oui' : 'Non'}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button onClick={() => openEdit(p)} style={styles.editBtn}>✏️</button>
                    <button onClick={() => handleDelete(p._id)} style={styles.delBtn}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>{editId ? 'Modifier' : 'Ajouter'} un produit</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Nom</label>
                <input value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label>Prix (€)</label>
                  <input type="number" step="0.01" value={form.prix} onChange={e => setForm({ ...form, prix: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label>Catégorie</label>
                  <select value={form.categorie} onChange={e => setForm({ ...form, categorie: e.target.value })}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Sous-catégorie</label>
                  <input value={form.sousCategorie} onChange={e => setForm({ ...form, sousCategorie: e.target.value })} placeholder="Cup, T-shirt..." />
                </div>
              </div>
              <div className="form-group">
                <label>Image (Cloudinary)</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
              </div>
              <div style={styles.modalBtns}>
                <button type="button" className="btn btn-outline" onClick={() => setModal(false)}>Annuler</button>
                <button type="submit" className="btn btn-dark" disabled={saving}>
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  title: { fontFamily: 'Playfair Display, serif', fontSize: '2rem' },
  tableWrap: { background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 10px rgba(0,0,0,0.05)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { background: '#f8f8f8', padding: '12px 16px', textAlign: 'left', fontSize: '0.8rem', color: '#888', fontWeight: 600 },
  td: { padding: '12px 16px', borderBottom: '1px solid #f5f5f5', fontSize: '0.9rem', verticalAlign: 'middle' },
  thumb: { width: 48, height: 48, objectFit: 'cover', borderRadius: 8 },
  editBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', marginRight: 8 },
  delBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 },
  modal: { background: '#fff', borderRadius: 16, padding: 40, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' },
  modalTitle: { fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', marginBottom: 24 },
  modalBtns: { display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 },
};

export default AdminProduits;
