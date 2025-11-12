// src/components/TestPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessonsData } from '../data/lessonsData';
import './TestPage.css';

const TestPage = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const currentLesson = lessonsData[topicId];
    if (currentLesson) {
      setLesson(currentLesson);
    } else {
      navigate('/');
    }
  }, [topicId, navigate]);

  const handleAnswerSelect = (questionId, answerIndex, isMultiple = false) => {
    setAnswers(prev => {
      if (isMultiple) {
        const currentAnswers = prev[questionId] || [];
        const newAnswers = currentAnswers.includes(answerIndex)
          ? currentAnswers.filter(a => a !== answerIndex)
          : [...currentAnswers, answerIndex];
        return { ...prev, [questionId]: newAnswers };
      } else {
        return { ...prev, [questionId]: [answerIndex] };
      }
    });
  };

  const calculateScore = () => {
    let correct = 0;
    lesson.content.tests.forEach(test => {
      const userAnswer = answers[test.id];
      if (test.type === 'single') {
        if (userAnswer && userAnswer[0] === test.correctAnswer) {
          correct++;
        }
      } else {
        if (userAnswer && arraysEqual(userAnswer, test.correctAnswers)) {
          correct++;
        }
      }
    });
    
    setScore(correct);
    setShowResults(true);
  };

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
  };

  const resetTest = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setScore(0);
  };

  if (!lesson) {
    return <div className="loading">Жүктелуде...</div>;
  }

  const test = lesson.content.tests[currentQuestion];

  if (showResults) {
    return (
      <div className="test-page">
        <div className="test-header">
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Артқа
          </button>
          <h1 style={{ color: lesson.color }}>Тест нәтижелері</h1>
        </div>

        <div className="results-container">
          <div className="score-card">
            <h2>Сіздің нәтижеңіз: {score} / {lesson.content.tests.length}</h2>
            <div className="score-percentage">
              {Math.round((score / lesson.content.tests.length) * 100)}%
            </div>
            
            {score === lesson.content.tests.length && (
              <div className="perfect-score">🎉 Тамаша! Барлық жауаптар дұрыс!</div>
            )}
            
            {score >= lesson.content.tests.length / 2 && score < lesson.content.tests.length && (
              <div className="good-score">👍 Жақсы нәтиже!</div>
            )}
            
            {score < lesson.content.tests.length / 2 && (
              <div className="improve-score">📚 Тақырыпты қайталаңыз</div>
            )}
          </div>

          <div className="answers-review">
            <h3>Жауаптарды тексеру:</h3>
            {lesson.content.tests.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = question.type === 'single' 
                ? userAnswer && userAnswer[0] === question.correctAnswer
                : userAnswer && arraysEqual(userAnswer, question.correctAnswers);

              return (
                <div key={question.id} className={`answer-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <h4>{index + 1}. {question.question}</h4>
                  <p><strong>Сіздің жауабыңыз:</strong> {userAnswer ? userAnswer.map(a => question.options[a]).join(', ') : 'Жауап берілмеген'}</p>
                  <p><strong>Дұрыс жауап:</strong> {question.type === 'single' ? question.options[question.correctAnswer] : question.correctAnswers.map(a => question.options[a]).join(', ')}</p>
                  <p><strong>Түсіндіру:</strong> {question.explanation}</p>
                </div>
              );
            })}
          </div>

          <div className="results-actions">
            <button onClick={resetTest} className="btn-secondary">
              Тестті қайта бастау
            </button>
            <button onClick={() => navigate('/')} className="btn-primary">
              Негізгі бетке оралу
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="test-page">
      <div className="test-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Артқа
        </button>
        <h1 style={{ color: lesson.color }}>{lesson.title} - Тест</h1>
        <div className="test-progress">
          Сұрақ {currentQuestion + 1} / {lesson.content.tests.length}
        </div>
      </div>

      <div className="test-container">
        <div className="question-card">
          <h3>{test.question}</h3>
          
          <div className="options-list">
            {test.options.map((option, index) => (
              <label key={index} className="option-label">
                <input
                  type={test.type === 'single' ? 'radio' : 'checkbox'}
                  name={`question-${test.id}`}
                  checked={(answers[test.id] || []).includes(index)}
                  onChange={() => handleAnswerSelect(test.id, index, test.type === 'multiple')}
                />
                <span className="option-text">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="test-navigation">
          {currentQuestion > 0 && (
            <button 
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              className="btn-secondary"
            >
              ← Алдыңғы
            </button>
          )}
          
          {currentQuestion < lesson.content.tests.length - 1 ? (
            <button 
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="btn-primary"
            >
              Келесі →
            </button>
          ) : (
            <button 
              onClick={calculateScore}
              className="btn-primary"
              disabled={Object.keys(answers).length < lesson.content.tests.length}
            >
              Тестті аяқтау
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;