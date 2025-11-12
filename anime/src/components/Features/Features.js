import React, { useState } from 'react';
import './Features.css';

const Features = () => {
  const [features, setFeatures] = useState([
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

  const [progress, setProgress] = useState(25);

  const handleCheckboxChange = (featureIndex, itemIndex) => {
    const updatedFeatures = [...features];
    updatedFeatures[featureIndex].completed[itemIndex] = 
      !updatedFeatures[featureIndex].completed[itemIndex];
    
    setFeatures(updatedFeatures);
    
    // Прогресті есептеу
    const totalItems = features.reduce((acc, feature) => acc + feature.items.length, 0);
    const completedItems = updatedFeatures.reduce(
      (acc, feature) => acc + feature.completed.filter(Boolean).length, 
      0
    );
    const newProgress = Math.round((completedItems / totalItems) * 100);
    setProgress(newProgress);
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

        {/* 3D слайдер */}
        <div className="banner">
          <div className="slider" style={{ '--quantity': features.length }}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="item" 
                style={{ '--position': index + 1 }}
              >
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
                          onChange={() => handleCheckboxChange(index, itemIndex)}
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
      </div>
    </section>
  );
};

export default Features;