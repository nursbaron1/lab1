import React, { useState } from 'react';
import './LearningSection.css';

const LearningSection = () => {
  const [algorithms] = useState([
    {
      name: "JavaScript Негіздері",
      description: "Айнымалылар, функциялар, циклдар және басқа негізгі ұғымдар",
      level: "Бастауыш",
      topics: ["Айнымалылар", "Типтер", "Операторлар", "Функциялар"],
      color: "#f7df1e"
    },
    {
      name: "Объектілер және Массивтер",
      description: "Күрделі деректер құрылымдарымен жұмыс",
      level: "Орташа",
      topics: ["Объектілер", "Массивтер", "JSON", "Деструктуризация"],
      color: "#61dafb"
    },
    {
      name: "Асинхронды JavaScript",
      description: "Promise, async/await және API шалу",
      level: "Кеңейтілген", 
      topics: ["Promise", "async/await", "fetch API", "Error handling"],
      color: "#ff6b6b"
    },
    {
      name: "DOM Манипуляциясы",
      description: "Web беттерін динамикалық түрде өзгерту",
      level: "Орташа",
      topics: ["DOM элементтері", "Оқиғалар", "Формалар", "Анимация"],
      color: "#4ecdc4"
    }
  ]);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);

  return (
    <section className="learning-section">
      <div className="container">
        <h2>JavaScript Оқу Бағдарламасы</h2>
        <p className="section-description">
          Толық JavaScript курсы нөлден бастап профессионалды деңгейге дейін. 
          Әр тақырып практикалық мысалдармен және жобалармен қамтылған.
        </p>

        <div className="algorithms-container">
          <div className="algorithms-sidebar">
            <h3>Тақырыптар</h3>
            <div className="algorithm-list">
              {algorithms.map((algo, index) => (
                <div
                  key={index}
                  className={`algorithm-tab ${selectedAlgorithm === index ? 'active' : ''}`}
                  onClick={() => setSelectedAlgorithm(index)}
                  style={{ 
                    borderLeft: `4px solid ${algo.color}`,
                    background: selectedAlgorithm === index ? 
                      `${algo.color}20` : 'transparent'
                  }}
                >
                  <div className="algo-name">{algo.name}</div>
                  <div className="algo-level" style={{ color: algo.color }}>
                    {algo.level}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="algorithm-details">
            {algorithms[selectedAlgorithm] && (
              <div className="algorithm-card">
                <div className="algo-header">
                  <h3 style={{ color: algorithms[selectedAlgorithm].color }}>
                    {algorithms[selectedAlgorithm].name}
                  </h3>
                  <span 
                    className="level-badge"
                    style={{ 
                      background: algorithms[selectedAlgorithm].color,
                      color: '#000'
                    }}
                  >
                    {algorithms[selectedAlgorithm].level}
                  </span>
                </div>
                
                <p className="algo-description">
                  {algorithms[selectedAlgorithm].description}
                </p>
                
                <div className="topics-section">
                  <h4>Негізгі тақырыптар:</h4>
                  <div className="topics-grid">
                    {algorithms[selectedAlgorithm].topics.map((topic, index) => (
                      <div key={index} className="topic-item">
                        <span className="topic-bullet" 
                              style={{background: algorithms[selectedAlgorithm].color}}></span>
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="algo-actions">
                  <button className="btn-primary">Сабақты бастау</button>
                  <button className="btn-secondary">Практикалық жаттығу</button>
                  <button className="btn-outline">Тестілеу</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningSection;