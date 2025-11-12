// src/components/LearningSection/LearningSection.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LearningSection.css';
import { lessonsData } from '../../data/lessonsData';

const LearningSection = () => {
  const navigate = useNavigate();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);

  const algorithms = Object.values(lessonsData);

  const handleStartLesson = (topicId, type) => {
    if (type === 'lesson') {
      navigate(`/lesson/${topicId}`);
    } else if (type === 'practice') {
      navigate(`/practice/${topicId}`);
    } else if (type === 'test') {
      navigate(`/test/${topicId}`);
    }
  };

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
                  key={algo.id}
                  className={`algorithm-tab ${selectedAlgorithm === index ? 'active' : ''}`}
                  onClick={() => setSelectedAlgorithm(index)}
                  style={{ 
                    borderLeft: `4px solid ${algo.color}`,
                    background: selectedAlgorithm === index ? 
                      `${algo.color}20` : 'transparent'
                  }}
                >
                  <div className="algo-name">{algo.title}</div>
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
                    {algorithms[selectedAlgorithm].title}
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
                    {algorithms[selectedAlgorithm].content.terminologies.map((term, index) => (
                      <div key={index} className="topic-item">
                        <span className="topic-bullet" 
                              style={{background: algorithms[selectedAlgorithm].color}}></span>
                        {term.term}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="algo-actions">
                  <button 
                    className="btn-primary"
                    onClick={() => handleStartLesson(algorithms[selectedAlgorithm].id, 'lesson')}
                  >
                    Сабақты бастау
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={() => handleStartLesson(algorithms[selectedAlgorithm].id, 'practice')}
                  >
                    Практикалық жаттығу
                  </button>
                  <button 
                    className="btn-outline"
                    onClick={() => handleStartLesson(algorithms[selectedAlgorithm].id, 'test')}
                  >
                    Тестілеу
                  </button>
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