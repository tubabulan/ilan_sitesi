import React, { useState } from 'react';
import { FaUserCircle, FaCode } from 'react-icons/fa';  // İkonları buraya ekledim

import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ProjectDetail from './pages/ProjectDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from "./pages/Profile";
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    navigate('/profile');
  };

  return (
    <div className="app">
      <header className="hero-header">
        <div className="hero-content">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 className="hero-title">
              <FaCode className="hero-icon" />
              DevJobs
            </h1>
            <p className="hero-slogan">
              Yazılım geliştiriciler için en kapsamlı iş arama platformu
            </p>
          </Link>
        </div>

        <div className="header-buttons">
          <div className="flex items-center space-x-4">
            {/* Profil Simgesi */}
            <Link to="/profile" className="text-white hover:text-blue-200 transition-colors duration-200">
              <FaUserCircle size={32} /> {/* Burada FaUserCircle kullan */}
            </Link>
          </div>
          {!user ? (
            <>
              <Link to="/login" className="nav-button login">Giriş Yap</Link>
              <Link to="/register" className="nav-button signup">Kayıt Ol</Link>
            </>
          ) : (
            <Link to="/profile" className="nav-button profile">Profilim</Link>
          )}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs/:jobId" element={<ProjectDetail />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 DevJobs. Tüm hakları saklıdır.</p>
          <p>
            <a href="#privacy-policy">Gizlilik Politikası</a> | <a href="#terms-of-service">Kullanım Koşulları</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
