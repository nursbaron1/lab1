import React, { useState } from 'react';
import './IntelligenceSection.css';

const IntelligenceSection = () => {
  const [intelligenceFeatures] = useState([
    {
      title: "Интерактивті код редакторы",
      description: "Браузерде тікелей код жазып, нәтижесін көру",
      icon: "💻",
      status: "active"
    },
    {
      title: "Жиі тестілеу",
      description: "Әр сабақтан кейін біліміңізді тексеру",
      icon: "📝",
      status: "active"
    },
    {
      title: "Нақты жобалар",
      description: "Портфолиоға арналған нақты жобаларды әзірлеу",
      icon: "🚀",
      status: "coming"
    },
    {
      title: "Прогресті бақылау",
      description: "Оқу процесін бақылау және статистика",
      icon: "📊",
      status: "active"
    }
  ]);

  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="intelligence-section">
      <div className="container">
        <h2>Оқу Тәжірибесін Жетілдіру</h2>
        <p className="section-subtitle">
          Заманауи әдістер мен құралдар арқылы тиімді оқыңыз
        </p>

        <div className="intelligence-grid">
          <div className="features-list">
            {intelligenceFeatures.map((feature, index) => (
              <div
                key={index}
                className={`feature-block ${activeFeature === index ? 'active' : ''} ${feature.status}`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
                <div className="feature-status">
                  {feature.status === 'active' ? '✓' : '🔜'}
                </div>
              </div>
            ))}
          </div>

          <div className="feature-preview">
            <div className="preview-content">
              <div className="preview-header">
                <h3>{intelligenceFeatures[activeFeature]?.title}</h3>
                <span className={`status-badge ${intelligenceFeatures[activeFeature]?.status}`}>
                  {intelligenceFeatures[activeFeature]?.status === 'active' ? 'Қолжетімді' : 'Жақында'}
                </span>
              </div>
              
              <div className="preview-body">
                <p>{intelligenceFeatures[activeFeature]?.description}</p>
                
                {intelligenceFeatures[activeFeature]?.status === 'active' && (
                  <div className="preview-actions">
                    <button className="demo-btn">Демоны көру</button>
                    <button className="try-btn">Қолданып көру</button>
                  </div>
                )}
                
                {intelligenceFeatures[activeFeature]?.status === 'coming' && (
                  <div className="coming-soon">
                    <div className="countdown">
                      <span>Жақында</span>
                    </div>
                    <p>Бұл мүмкіндік жақын арада қосылады</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Практикалық тапсырмалар</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">10</div>
              <div className="stat-label">Нақты жобалар</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Қолдау қызметі</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Практикаға бағытталған</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntelligenceSection;