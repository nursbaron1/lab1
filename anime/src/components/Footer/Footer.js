import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">JS</span>
              <span className="logo-text">JavaScript Master</span>
            </div>
            <p className="footer-description">
              JavaScript-ті нөлден бастап профессионалды деңгейге дейін үйренуге арналған 
              жетілдірілген оқу платформасы.
            </p>
          </div>

          <div className="footer-section">
            <h4>Курстар</h4>
            <ul className="footer-links">
              <li><a href="#basics">JavaScript Негіздері</a></li>
              <li><a href="#advanced">Кеңейтілген JavaScript</a></li>
              <li><a href="#frameworks">Фреймворктер</a></li>
              <li><a href="#projects">Жобалар</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Байланыс</h4>
            <ul className="footer-links">
              <li><a href="mailto:info@jsmaster.kz">info@jsmaster.kz</a></li>
              <li><a href="tel:+77771234567">+7 777 123 45 67</a></li>
              <li>Қазақстан, Астана</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Әлеуметтік желілер</h4>
            <div className="social-links">
              <a href="#" className="social-link">Telegram</a>
              <a href="#" className="social-link">YouTube</a>
              <a href="#" className="social-link">GitHub</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 JavaScript Master. Барлық құқықтар қорғалған.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;