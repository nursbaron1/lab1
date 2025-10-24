import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">JS</span>
          <span className="logo-text">JavaScript Master</span>
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Басты бет</Link>
          <Link to="/courses" className="nav-link">Курстар</Link>
          <Link to="/theory" className="nav-link">Теория</Link>
          <Link to="/profile" className="nav-link">Жеке кабинет</Link>
        </nav>
        
        <div className="header-actions">
          <button className="btn-login">Кіру</button>
          <button className="btn-register">Тіркелу</button>
        </div>
      </div>
    </header>
  );
};

export default Header;