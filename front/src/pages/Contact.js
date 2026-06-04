import React, { useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Contact = () => {
  const [form, setForm] = useState({ nom: '', email: '', objet: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/contacts', form);
      toast.success('Message envoyé ! Nous vous répondrons rapidement.');
      setForm({ nom: '', email: '', objet: '', message: '' });
    } catch {
      toast.error('Erreur lors de l\'envoi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Contact</h1>
        <p>Une question, une demande sur mesure ? Écrivez-nous.</p>
      </div>

      <section className="section">
        <div className="container">
          <div style={styles.grid}>
            {/* Formulaire */}
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label>Nom</label>
                  <input name="nom" value={form.nom} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Objet</label>
                <input name="objet" value={form.objet} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={6} required />
              </div>
              <button type="submit" className="btn btn-dark" style={{ padding: '14px 40px' }} disabled={loading}>
                {loading ? 'Envoi...' : 'Envoyer le message'}
              </button>
            </form>

            {/* Infos */}
            <div style={styles.infoBox}>
              <h3 style={styles.infoTitle}>Informations</h3>
              {[
                { icon: '📍', label: 'Adresse', val: '25 Boulevard du Temple\n75003 Paris' },
                { icon: '📞', label: 'Téléphone', val: '07.66.91.82.94' },
                { icon: '✉️', label: 'Email', val: 'coffeeartsparis@gmail.com' },
                { icon: '🕐', label: 'Horaires', val: 'Mar – Ven : 08h – 20h\nSam – Dim : 10h – 21h' },
              ].map((info) => (
                <div key={info.label} style={styles.infoItem}>
                  <span style={styles.infoIcon}>{info.icon}</span>
                  <div>
                    <div style={styles.infoLabel}>{info.label}</div>
                    <div style={{ whiteSpace: 'pre-line', color: '#555', fontSize: '0.9rem' }}>{info.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  grid: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: 64, alignItems: 'start' },
  infoBox: { background: '#FAF5EC', borderRadius: 16, padding: 32 },
  infoTitle: { fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', marginBottom: 24 },
  infoItem: { display: 'flex', gap: 16, marginBottom: 24 },
  infoIcon: { fontSize: '1.4rem' },
  infoLabel: { fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 },
};

export default Contact;
