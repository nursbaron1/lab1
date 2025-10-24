import React, { useState, useEffect } from 'react';
import { lessonsAPI } from '../services/api';
import './Theory.css';

const Theory = () => {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await lessonsAPI.getLessons();
        setLessons(data);
        if (data.length > 0) setSelectedLesson(data[0]);
      } catch (error) {
        console.error('Сабақтарды алу қатесі:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  if (loading) return <div className="loading">Жүктелуде...</div>;

  return (
    <div className="theory-page">
      <div className="container">
        <h1>Теориялық Материалдар</h1>
        <div className="theory-layout">
          <div className="lessons-sidebar">
            <h3>Сабақтар тізімі</h3>
            {lessons.map(lesson => (
              <div
                key={lesson.id}
                className={`lesson-item ${selectedLesson?.id === lesson.id ? 'active' : ''}`}
                onClick={() => setSelectedLesson(lesson)}
              >
                <h4>{lesson.title}</h4>
                <span className="lesson-course">{lesson.module?.course?.title || 'JavaScript Курсы'}</span>
              </div>
            ))}
          </div>
          
          <div className="lesson-content">
            {selectedLesson ? (
              <>
                <h2>{selectedLesson.title}</h2>
                <div className="lesson-meta">
                  <span>Курс: {selectedLesson.module?.course?.title || 'JavaScript Негіздері'}</span>
                  <span>Модуль: {selectedLesson.module?.title || 'Кіріспе'}</span>
                </div>
                <div className="content">
                  {selectedLesson.content}
                </div>
              </>
            ) : (
              <div className="no-lesson">
                <p>Сабақ таңдаңыз</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Theory;