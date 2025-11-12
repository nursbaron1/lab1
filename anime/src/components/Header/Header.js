// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

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
          {isLoggedIn ? (
            <div className="user-menu">
              <span className="user-greeting">
                Сәлем, {user.firstName}!
              </span>
              <button className="btn-logout" onClick={handleLogout}>
                Шығу
              </button>
            </div>
          ) : (
            <>
              <button 
                className="btn-login" 
                onClick={() => navigate('/login')}
              >
                Кіру
              </button>
              <button 
                className="btn-register" 
                onClick={() => navigate('/register')}
              >
                Тіркелу
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;