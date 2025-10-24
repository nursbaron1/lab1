import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coursesAPI, testsAPI } from '../services/api';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState('theory');
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await coursesAPI.getCourse(id);
        setCourse(data);
        if (data.modules && data.modules.length > 0) {
          const initialCode = data.modules[0]?.lessons?.[0]?.codeExamples?.[0]?.code || 
            '// Код жазыңыз\nconsole.log("Сәлем, әлем!");';
          setCode(initialCode);
        }
      } catch (error) {
        console.error('Курсты алу қатесі:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Ақылы курсқа кіруді тексеру
  const handleTabChange = (tab) => {
    if (!course.isFree && tab !== 'theory') {
      setShowPaymentModal(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handlePayment = () => {
    alert(`"${course.title}" курсы сәтті сатып алынды! 🎉`);
    // Курсты тегін ету (әзірлеу кезінде)
    course.isFree = true;
    setShowPaymentModal(false);
    setActiveTab('practice');
  };

  const runCode = () => {
    try {
      const originalLog = console.log;
      let logs = [];
      
      console.log = (...args) => {
        logs.push(args.join(' '));
      };

      eval(code);

      console.log = originalLog;
      setOutput(logs.join('\n') || 'Код орындалды (нәтиже жоқ)');
    } catch (error) {
      setOutput(`Қате: ${error.message}`);
    }
  };

  const resetCode = () => {
    const currentLessonData = course?.modules?.[currentModule]?.lessons?.[currentLesson];
    const exampleCode = currentLessonData?.codeExamples?.[0]?.code || 
      '// Код жазыңыз\nconsole.log("Сәлем, әлем!");';
    setCode(exampleCode);
    setOutput('');
  };

  const startTest = () => {
    const currentModuleData = course?.modules?.[currentModule];
    if (currentModuleData?.moduleTest) {
      navigate(`/test/${currentModuleData.moduleTest.id}`);
    }
  };

  if (loading) return <div className="loading">Жүктелуде...</div>;
  if (!course) return <div className="error">Курс табылмады</div>;

  const currentModuleData = course.modules?.[currentModule];
  const currentLessonData = currentModuleData?.lessons?.[currentLesson];

  return (
    <div className="course-detail-page">
      <div className="container">
        {/* Курс ақпараты */}
        <div className="course-header">
          <button className="back-btn" onClick={() => navigate('/courses')}>
            ← Курстарға оралу
          </button>
          <h1>{course.title}</h1>
          <p className="course-description">{course.description}</p>
          <div className="course-meta">
            <span className="level">{course.level}</span>
            <span className="duration">{Math.round(course.duration / 60)} сағат</span>
            {course.isFree ? (
              <span className="free-badge">Тегін</span>
            ) : (
              <span className="price-badge">${course.price}</span>
            )}
          </div>
        </div>

        {/* Ақылы курс ескертуі */}
        {!course.isFree && (
          <div className="premium-notice">
            <div className="premium-icon">⭐</div>
            <div className="premium-text">
              <h3>Премиум курс</h3>
              <p>Практика және тест бөлімдеріне қол жеткізу үшін курсты сатып алыңыз</p>
            </div>
            <button 
              className="buy-btn"
              onClick={() => setShowPaymentModal(true)}
            >
              ${course.price} сатып алу
            </button>
          </div>
        )}

        <div className="course-layout">
          {/* Сол жақ панель */}
          <div className="sidebar">
            <h3>Модульдер</h3>
            {course.modules?.map((module, moduleIndex) => (
              <div key={module.id} className="module-section">
                <div 
                  className={`module-title ${currentModule === moduleIndex ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentModule(moduleIndex);
                    setCurrentLesson(0);
                  }}
                >
                  {module.title}
                  <span>{module.lessons?.length || 0} сабақ</span>
                </div>
                
                {currentModule === moduleIndex && (
                  <div className="lessons-list">
                    {module.lessons?.map((lesson, lessonIndex) => (
                      <div
                        key={lesson.id}
                        className={`lesson-item ${currentLesson === lessonIndex ? 'active' : ''}`}
                        onClick={() => setCurrentLesson(lessonIndex)}
                      >
                        {lesson.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Оң жақ панель */}
          <div className="content-area">
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'theory' ? 'active' : ''}`}
                onClick={() => setActiveTab('theory')}
              >
                Теория
              </button>
              <button 
                className={`tab ${activeTab === 'practice' ? 'active' : ''} ${!course.isFree ? 'locked' : ''}`}
                onClick={() => handleTabChange('practice')}
              >
                Практика {!course.isFree && '🔒'}
              </button>
              <button 
                className={`tab ${activeTab === 'test' ? 'active' : ''} ${!course.isFree ? 'locked' : ''}`}
                onClick={() => handleTabChange('test')}
              >
                Тест {!course.isFree && '🔒'}
              </button>
            </div>

            <div className="tab-content">
              {/* ТЕОРИЯ */}
              {activeTab === 'theory' && currentLessonData && (
                <div className="theory-content">
                  <h2>{currentLessonData.title}</h2>
                  <div className="lesson-content">
                    {currentLessonData.content}
                  </div>
                  
                  {currentLessonData.codeExamples?.length > 0 && (
                    <div className="code-examples">
                      <h3>📝 Код мысалдары:</h3>
                      {currentLessonData.codeExamples.map((example, index) => (
                        <div key={index} className="code-example">
                          <h4>{example.title}</h4>
                          <pre className="example-code">
                            <code>{example.code}</code>
                          </pre>
                          <p className="example-description">{example.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ПРАКТИКА */}
              {activeTab === 'practice' && (
                <div className="practice-content">
                  <h2>👨‍💻 Код Жазу Алаңы</h2>
                  {currentLessonData && (
                    <div className="practice-instruction">
                      <h3>Тапсырма: {currentLessonData.title}</h3>
                      <p>{currentLessonData.practiceTask || 'Код жазып, нәтижесін көріңіз'}</p>
                    </div>
                  )}
                  
                  <div className="code-editor-container">
                    <div className="editor-header">
                      <h3>JavaScript Код редакторы</h3>
                      <div className="editor-actions">
                        <button className="run-btn" onClick={runCode}>
                          ▶ Кодты орындау
                        </button>
                        <button className="reset-btn" onClick={resetCode}>
                          🔄 Қалпына келтіру
                        </button>
                      </div>
                    </div>
                    
                    <textarea
                      className="code-editor"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="JavaScript код жазыңыз..."
                      spellCheck="false"
                    />
                    
                    <div className="output-container">
                      <h4>Нәтиже:</h4>
                      <pre className="output">{output || 'Нәтиже осы жерде пайда болады...'}</pre>
                    </div>
                  </div>
                </div>
              )}

              {/* ТЕСТ */}
              {activeTab === 'test' && (
                <div className="test-content">
                  <h2>🎯 Білімді тексеру</h2>
                  {currentModuleData?.moduleTest ? (
                    <div className="test-info">
                      <h3>{currentModuleData.moduleTest.title}</h3>
                      <p>{currentModuleData.moduleTest.description}</p>
                      <div className="test-meta">
                        <span>⏱️ Уақыт: {Math.round(currentModuleData.moduleTest.timeLimit / 60)} мин</span>
                        <span>🎯 Өту баллы: {currentModuleData.moduleTest.passingScore}%</span>
                        <span>🔄 Әрекет: {currentModuleData.moduleTest.maxAttempts} рет</span>
                        <span>❓ Сұрақтар: {currentModuleData.moduleTest.testQuestions?.length || 0}</span>
                      </div>
                      <button className="start-test-btn" onClick={startTest}>
                        Тестті бастау
                      </button>
                    </div>
                  ) : (
                    <div className="no-test">
                      <p>Осы модуль үшін әлі тест қосылмаған</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Төлем модалды терезесі */}
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="payment-modal">
            <div className="modal-header">
              <h2>Курсты сатып алу</h2>
              <button className="close-btn" onClick={() => setShowPaymentModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="course-preview">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-features">
                  <div className="feature">✅ Барлық модульдер</div>
                  <div className="feature">✅ Практикалық тапсырмалар</div>
                  <div className="feature">✅ Тесттер</div>
                  <div className="feature">✅ Қолдау қызметі</div>
                </div>
                <div className="price-section">
                  <span className="final-price">${course.price}</span>
                </div>
              </div>
              <div className="payment-actions">
                <button className="confirm-payment" onClick={handlePayment}>
                  💳 Сатып алу
                </button>
                <button className="cancel-payment" onClick={() => setShowPaymentModal(false)}>
                  Бас тарту
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;