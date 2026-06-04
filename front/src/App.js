import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages publiques
import Home from './pages/Home';
import Carte from './pages/Carte';
import Ateliers from './pages/Ateliers';
import AtelierDetail from './pages/AtelierDetail';
import Boutique from './pages/Boutique';
import Evenements from './pages/Evenements';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Apropos from './pages/Apropos';
import Contact from './pages/Contact';
import Panier from './pages/Panier';
import Checkout from './pages/Checkout';

// Espace client
import EspaceClient from './pages/EspaceClient';

// Admin
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProduits from './pages/Admin/AdminProduits';
import AdminAteliers from './pages/Admin/AdminAteliers';
import AdminCommandes from './pages/Admin/AdminCommandes';
import AdminReservations from './pages/Admin/AdminReservations';
import AdminMessages from './pages/Admin/AdminMessages';
import AdminBlog from './pages/Admin/AdminBlog';
import AdminUsers from './pages/Admin/AdminUsers';

import './index.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            {/* Pages publiques avec Navbar + Footer */}
            <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
            <Route path="/carte" element={<><Navbar /><Carte /><Footer /></>} />
            <Route path="/ateliers" element={<><Navbar /><Ateliers /><Footer /></>} />
            <Route path="/ateliers/:id" element={<><Navbar /><AtelierDetail /><Footer /></>} />
            <Route path="/boutique" element={<><Navbar /><Boutique /><Footer /></>} />
            <Route path="/evenements" element={<><Navbar /><Evenements /><Footer /></>} />
            <Route path="/blog" element={<><Navbar /><Blog /><Footer /></>} />
            <Route path="/blog/:slug" element={<><Navbar /><BlogDetail /><Footer /></>} />
            <Route path="/apropos" element={<><Navbar /><Apropos /><Footer /></>} />
            <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
            <Route path="/panier" element={<><Navbar /><Panier /><Footer /></>} />
            <Route path="/checkout" element={<><Navbar /><Checkout /><Footer /></>} />
            <Route path="/espace-client" element={<><Navbar /><EspaceClient /><Footer /></>} />

            {/* Admin (layout dédié, sans Navbar publique) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="produits" element={<AdminProduits />} />
              <Route path="ateliers" element={<AdminAteliers />} />
              <Route path="commandes" element={<AdminCommandes />} />
              <Route path="reservations" element={<AdminReservations />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
