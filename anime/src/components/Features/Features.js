import React, { useState } from 'react';
import './Features.css';

const Features = () => {
  const [features] = useState([
    {
      title: "JavaScript Негіздері",
      items: ["Айнымалылар және типтер", "Функциялар", "Объектілер және массивтер", "Жиынтықтармен жұмыс"],
      completed: [true, true, false, false]
    },
    {
      title: "Кеңейтілген JavaScript", 
      items: ["DOM манипуляциясы", "Асинхронды код", "ES6+ ерекшеліктері", "API жұмысы"],
      completed: [false, false, false, false]
    },
    {
      title: "Фреймворктер",
      items: ["React.js негіздері", "Компоненттер", "State менеджмент", "Routing"],
      completed: [false, false, false, false]
    }
  ]);

  const [progress, setProgress] = useState(25); // Бастапқы прогресс

  const handleCheckboxChange = (featureIndex, itemIndex) => {
    // Бұл жерде прогресті есептеу логикасы болады
    console.log(`Feature: ${featureIndex}, Item: ${itemIndex}`);
  };

  return (
    <section className="features-section">
      <div className="container">
        <h2>JavaScript Курсы Бағдарламасы</h2>
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{progress}% аяқталды</span>
        </div>

        <div className="features-grid">
          {features.map((feature, featureIndex) => (
            <div key={featureIndex} className="feature-card">
              <div className="feature-header">
                <h3>{feature.title}</h3>
                <div className="feature-status">
                  {feature.completed.filter(Boolean).length}/{feature.items.length}
                </div>
              </div>
              
              <ul className="feature-list">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="feature-item">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={feature.completed[itemIndex]}
                        onChange={() => handleCheckboxChange(featureIndex, itemIndex)}
                      />
                      <span className="checkmark"></span>
                      <span className="item-text">{item}</span>
                    </label>
                  </li>
                ))}
              </ul>
              
              <button className="feature-btn">
                Тақырыпты бастау →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;