// src/components/PracticePage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessonsData } from '../data/lessonsData';
import './PracticePage.css';

const PracticePage = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const currentLesson = lessonsData[topicId];
    if (currentLesson) {
      setLesson(currentLesson);
      if (currentLesson.content.exercises.length > 0) {
        setCode(currentLesson.content.exercises[0].starterCode);
      }
    } else {
      navigate('/');
    }
  }, [topicId, navigate]);

  const executeCode = () => {
    try {
      const consoleLogs = [];
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        consoleLogs.push(args.join(' '));
      };

      eval(code);

      console.log = originalConsoleLog;
      setOutput(consoleLogs.join('\n'));
      
      // Нәтижені тексеру
      const expected = lesson.content.exercises[currentExercise].expectedOutput;
      if (consoleLogs.join('\\n') === expected) {
        setIsCompleted(true);
      }
    } catch (error) {
      setOutput(`Қате: ${error.message}`);
    }
  };

  const nextExercise = () => {
    if (currentExercise < lesson.content.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setCode(lesson.content.exercises[currentExercise + 1].starterCode);
      setOutput('');
      setIsCompleted(false);
    }
  };

  const resetCode = () => {
    setCode(lesson.content.exercises[currentExercise].starterCode);
    setOutput('');
    setIsCompleted(false);
  };

  if (!lesson) {
    return <div className="loading">Жүктелуде...</div>;
  }

  const exercise = lesson.content.exercises[currentExercise];

  return (
    <div className="practice-page">
      <div className="practice-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Артқа
        </button>
        <h1 style={{ color: lesson.color }}>{lesson.title} - Практика</h1>
      </div>

      <div className="practice-container">
        <div className="exercise-info">
          <h3>{exercise.title}</h3>
          <p>{exercise.description}</p>
          <div className="exercise-progress">
            Жаттығу {currentExercise + 1} / {lesson.content.exercises.length}
          </div>
          
          {exercise.hint && (
            <div className="hint-section">
              <strong>Көмек:</strong> {exercise.hint}
            </div>
          )}

          {isCompleted && (
            <div className="success-message">
              ✅ Тапсырма орындалды! Келесі жаттығуға өтуге болады.
            </div>
          )}
        </div>

        <div className="code-editor-section">
          <div className="editor-header">
            <h4>Код редакторы</h4>
            <div className="editor-actions">
              <button onClick={resetCode} className="btn-secondary">
                Қалпына келтіру
              </button>
              <button onClick={executeCode} className="btn-primary">
                Орындау
              </button>
            </div>
          </div>
          
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="code-editor"
            spellCheck="false"
          />
        </div>

        <div className="output-section">
          <h4>Нәтиже:</h4>
          <pre className="output">{output || "Нәтиже осы жерде пайда болады..."}</pre>
        </div>

        <div className="navigation-buttons">
          {isCompleted && currentExercise < lesson.content.exercises.length - 1 && (
            <button onClick={nextExercise} className="btn-primary">
              Келесі жаттығу →
            </button>
          )}
          
          {isCompleted && currentExercise === lesson.content.exercises.length - 1 && (
            <div className="completion-message">
              🎉 Барлық жаттығулар орындалды!
              <button onClick={() => navigate('/')} className="btn-primary">
                Негізгі бетке оралу
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticePage;