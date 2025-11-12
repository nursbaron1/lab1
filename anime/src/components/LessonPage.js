// LessonPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './LessonPage.css';
import { lessonsData } from '../data/lessonsData';

const LessonPage = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [activeTab, setActiveTab] = useState('theory');

  useEffect(() => {
    const currentLesson = lessonsData[topicId];
    if (currentLesson) {
      setLesson(currentLesson);
    } else {
      navigate('/');
    }
  }, [topicId, navigate]);

  // const executeCode = (code) => {
  //   try {
  //     // Қауіпсіз код орындау
  //     const consoleLogs = [];
  //     const originalConsoleLog = console.log;
  //     console.log = (...args) => {
  //       consoleLogs.push(args.join(' '));
  //     };

  //     // Кодты орындау
  //     eval(code);

  //     console.log = originalConsoleLog;
  //     return consoleLogs.join('\n');
  //   } catch (error) {
  //     return `Қате: ${error.message}`;
  //   }
  // };

  if (!lesson) {
    return <div>Жүктелуде...</div>;
  }

  return (
    <div className="lesson-page">
      <div className="lesson-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Артқа
        </button>
        <h1 style={{ color: lesson.color }}>{lesson.title}</h1>
        <span className="lesson-level">{lesson.level}</span>
      </div>

      <div className="lesson-tabs">
        <button 
          className={activeTab === 'theory' ? 'active' : ''}
          onClick={() => setActiveTab('theory')}
        >
          Теория
        </button>
        <button 
          className={activeTab === 'code' ? 'active' : ''}
          onClick={() => setActiveTab('code')}
        >
          Код Мысалдары
        </button>
        <button 
          className={activeTab === 'terminology' ? 'active' : ''}
          onClick={() => setActiveTab('terminology')}
        >
          Терминдер
        </button>
      </div>

      <div className="lesson-content">
        {activeTab === 'theory' && (
          <div className="theory-section">
            <h3>Теориялық бөлім</h3>
            <div className="theory-content">
              {lesson.content.theory.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="code-section">
            <h3>Код Мысалдары</h3>
            {lesson.content.codeExamples.map((example, index) => (
              <div key={index} className="code-example">
                <h4>{example.title}</h4>
                <div className="code-editor">
                  <pre><code>{example.code}</code></pre>
                </div>
                <div className="code-result">
                  <h5>Нәтиже:</h5>
                  <pre>{example.result}</pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'terminology' && (
          <div className="terminology-section">
            <h3>Терминдер сөздігі</h3>
            <div className="terminology-list">
              {lesson.content.terminologies.map((term, index) => (
                <div key={index} className="term-item">
                  <dt className="term-name">{term.term}</dt>
                  <dd className="term-definition">{term.definition}</dd>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
