import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { testsAPI } from '../services/api';
import './Test.css';

const Test = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const data = await testsAPI.getTest(id);
        setTest(data);
        setTimeLeft(data.timeLimit);
      } catch (error) {
        console.error('Тестті алу қатесі:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [id]);

  // Таймер
  useEffect(() => {
    if (timeLeft > 0 && !testCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !testCompleted) {
      handleSubmit();
    }
  }, [timeLeft, testCompleted]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    try {
      const result = await testsAPI.submitTest(id, { answers, timeSpent: test.timeLimit - timeLeft });
      setScore(result.percentage);
      setTestCompleted(true);
    } catch (error) {
      console.error('Тест жіберу қатесі:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) return <div className="loading">Тест жүктелуде...</div>;
  if (!test) return <div className="error">Тест табылмады</div>;

  const currentQuestionData = test.testQuestions?.[currentQuestion];

  return (
    <div className="test-page">
      <div className="container">
        <div className="test-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Артқа
          </button>
          <h1>{test.title}</h1>
          <div className="test-progress">
            <span>Сұрақ {currentQuestion + 1}/{test.testQuestions?.length}</span>
            <span className="timer">⏱️ {formatTime(timeLeft)}</span>
          </div>
        </div>

        {!testCompleted ? (
          <div className="test-content">
            {currentQuestionData && (
              <div className="question-container">
                <h2 className="question-text">{currentQuestionData.question}</h2>
                
                <div className="options-container">
                  {currentQuestionData.options.map((option, index) => (
                    <label key={index} className="option-label">
                      <input
                        type={currentQuestionData.type === 'multiple' ? 'checkbox' : 'radio'}
                        name={`question-${currentQuestionData.id}`}
                        value={index}
                        checked={answers[currentQuestionData.id]?.includes(index)}
                        onChange={(e) => {
                          if (currentQuestionData.type === 'multiple') {
                            const currentAnswers = answers[currentQuestionData.id] || [];
                            const newAnswers = e.target.checked
                              ? [...currentAnswers, index]
                              : currentAnswers.filter(i => i !== index);
                            handleAnswer(currentQuestionData.id, newAnswers);
                          } else {
                            handleAnswer(currentQuestionData.id, [index]);
                          }
                        }}
                      />
                      <span className="option-text">{option}</span>
                    </label>
                  ))}
                </div>

                <div className="navigation-buttons">
                  {currentQuestion > 0 && (
                    <button 
                      className="nav-btn prev-btn"
                      onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    >
                      ← Алдыңғы
                    </button>
                  )}
                  
                  {currentQuestion < test.testQuestions.length - 1 ? (
                    <button 
                      className="nav-btn next-btn"
                      onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    >
                      Келесі →
                    </button>
                  ) : (
                    <button 
                      className="nav-btn submit-btn"
                      onClick={handleSubmit}
                    >
                      ✅ Тесті аяқтау
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="test-results">
            <h2>Тест нәтижелері</h2>
            <div className={`result-card ${score >= test.passingScore ? 'passed' : 'failed'}`}>
              <div className="result-score">
                <span className="percentage">{score}%</span>
                <span className="status">
                  {score >= test.passingScore ? '✅ ӨТТІҢІЗ!' : '❌ ӨТЕ АЛМАДЫҢЫЗ'}
                </span>
              </div>
              <div className="result-details">
                <p>Өту баллы: {test.passingScore}%</p>
                <p>Сіздің нәтижеңіз: {score}%</p>
                <p>Уақыт: {formatTime(test.timeLimit - timeLeft)}</p>
              </div>
            </div>
            
            <div className="result-actions">
              <button 
                className="retry-btn"
                onClick={() => window.location.reload()}
              >
                🔄 Қайта бастау
              </button>
              <button 
                className="course-btn"
                onClick={() => navigate(-1)}
              >
                ← Курсқа оралу
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;