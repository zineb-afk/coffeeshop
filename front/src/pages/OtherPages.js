// ============== BLOG ==============
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/blog')
      .then(({ data }) => setArticles(data))
      .catch(() => toast.error('Erreur chargement blog'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Blog</h1>
        <p>Inspirations, actualités de l'atelier et articles sur le café de spécialité.</p>
      </div>
      <section className="section">
        <div className="container">
          {loading ? <div className="spinner" /> : (
            <div className="grid-3">
              {articles.map((article) => (
                <Link to={`/blog/${article.slug}`} key={article._id} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <img src={article.image || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400'} alt={article.titre} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                      {article.tags?.map(tag => <span key={tag} className="badge badge-beige">{tag}</span>)}
                    </div>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', marginBottom: 8 }}>{article.titre}</h3>
                    <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: 12 }}>{article.extrait}</p>
                    <span style={{ fontSize: '0.8rem', color: '#888' }}>{new Date(article.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export const BlogDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/blog/${slug}`)
      .then(({ data }) => setArticle(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="spinner" style={{ marginTop: 80 }} />;
  if (!article) return <p style={{ textAlign: 'center', marginTop: 80 }}>Article non trouvé.</p>;

  return (
    <div>
      <div style={{ height: 400, position: 'relative' }}>
        <img src={article.image} alt={article.titre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {article.tags?.map(t => <span key={t} className="badge badge-beige">{t}</span>)}
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', marginBottom: 8 }}>{article.titre}</h1>
          <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: 40 }}>
            {article.auteur} · {new Date(article.createdAt).toLocaleDateString('fr-FR')}
          </p>
          <div style={{ lineHeight: 1.9, color: '#444', whiteSpace: 'pre-line' }}>{article.contenu}</div>
        </div>
      </section>
    </div>
  );
};

// ============== CARTE ==============
export const Carte = () => (
  <div>
    <div className="page-header">
      <h1>La carte</h1>
      <p>Café de spécialité, boissons chaudes et froides, petite restauration.</p>
    </div>
    <section className="section">
      <div className="container">
        {[
          {
            cat: 'Cafés de spécialité', items: [
              { nom: 'Espresso', desc: 'Single origin, extraction précise', prix: '3.50 €' },
              { nom: 'Flat White', desc: 'Double espresso, lait vaporisé soyeux', prix: '4.50 €' },
              { nom: 'Filtre du jour', desc: 'Méthode V60 ou Chemex selon l\'origine', prix: '4.00 €' },
              { nom: 'Cappuccino', desc: 'Espresso, mousse de lait', prix: '4.00 €' },
            ]
          },
          {
            cat: 'Boissons froides', items: [
              { nom: 'Cold Brew', desc: 'Infusion à froid 12h', prix: '5.50 €' },
              { nom: 'Latte glacé', desc: 'Espresso, lait froid, glaçons', prix: '5.00 €' },
              { nom: 'Matcha latte', desc: 'Matcha de qualité cérémonie, lait végétal', prix: '5.50 €' },
            ]
          },
          {
            cat: 'Pâtisseries', items: [
              { nom: 'Cookie cacao', desc: 'Fait maison, chocolat noir', prix: '3.50 €' },
              { nom: 'Madeleine vanille', desc: 'Recette maison, beurre noisette', prix: '2.50 €' },
              { nom: 'Carrot cake', desc: 'Glaçage cream cheese', prix: '5.00 €' },
            ]
          },
        ].map((section) => (
          <div key={section.cat} style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', marginBottom: 24, paddingBottom: 12, borderBottom: '1px solid #eee' }}>
              {section.cat}
            </h2>
            {section.items.map((item) => (
              <div key={item.nom} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f8f8f8' }}>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>{item.nom}</div>
                  <div style={{ color: '#888', fontSize: '0.85rem' }}>{item.desc}</div>
                </div>
                <span style={{ fontWeight: 700, fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', minWidth: 60, textAlign: 'right' }}>{item.prix}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  </div>
);

// ============== EVENEMENTS ==============
export const Evenements = () => (
  <div>
    <div className="page-header">
      <h1>Événements</h1>
      <p>Soirées, collaborations, ventes éphémères — restez connectés à l'agenda Coffee Arts.</p>
    </div>
    <section className="section">
      <div className="container">
        <div className="grid-3">
          {[
            { titre: 'Marché de créateurs', date: 'Samedi 14 juin 2026', desc: 'Rencontrez des artisans et designers locaux. Entrée libre.', tag: 'Marché' },
            { titre: 'Soirée céramique & vin', date: 'Vendredi 20 juin 2026', desc: 'Un atelier spécial le soir, avec sélection de vins naturels. Réservation obligatoire.', tag: 'Soirée' },
            { titre: 'Workshop café filtré', date: 'Dimanche 28 juin 2026', desc: 'Initiez-vous aux méthodes de café filtré avec notre torréfacteur partenaire.', tag: 'Workshop' },
          ].map((evt) => (
            <div key={evt.titre} className="card" style={{ padding: 28 }}>
              <span className="badge badge-green" style={{ marginBottom: 16 }}>{evt.tag}</span>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', marginBottom: 8 }}>{evt.titre}</h3>
              <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: 12 }}>📅 {evt.date}</p>
              <p style={{ color: '#555', fontSize: '0.9rem' }}>{evt.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

// ============== A PROPOS ==============
export const Apropos = () => (
  <div>
    <div className="page-header">
      <h1>Nos engagements</h1>
      <p>Pourquoi Coffee Arts Paris, et ce qui nous tient à cœur.</p>
    </div>
    <section className="section">
      <div className="container" style={{ maxWidth: 800 }}>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.9, marginBottom: 40, color: '#444' }}>
          Coffee Arts Paris est né d'une conviction simple : le café et la céramique partagent la même philosophie.
          Tous deux demandent patience, attention et amour du détail. Tous deux méritent d'être vécus lentement.
        </p>

        <div className="grid-3" style={{ marginBottom: 60 }}>
          {[
            { icon: '♻️', title: 'Café éthique', desc: 'Nous sélectionnons des cafés de spécialité en direct trade, avec traçabilité complète de la ferme à la tasse.' },
            { icon: '🌱', title: 'Circuit court', desc: 'Nos pâtisseries sont préparées chaque matin. Nos matières premières viennent de producteurs engagés.' },
            { icon: '🏺', title: 'Savoir-faire', desc: 'Chaque pièce de céramique est faite à la main, dans notre atelier parisien. Aucune pièce n\'est identique.' },
          ].map((item) => (
            <div key={item.title} style={{ textAlign: 'center', padding: 24 }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{item.icon}</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: 8 }}>{item.title}</h3>
              <p style={{ color: '#666', fontSize: '0.85rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#FAF5EC', borderRadius: 16, padding: 40 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', marginBottom: 16 }}>Notre adresse</h2>
          <p style={{ color: '#555', lineHeight: 1.8 }}>
            25 Boulevard du Temple, 75003 Paris<br />
            Mardi au vendredi : 08h – 20h<br />
            Samedi & dimanche : 10h – 21h
          </p>
        </div>
      </div>
    </section>
  </div>
);