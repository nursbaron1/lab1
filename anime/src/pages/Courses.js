import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { coursesAPI } from '../services/api';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await coursesAPI.getCourses();
        setCourses(data);
      } catch (error) {
        console.error('Курстарды алу қатесі:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleStartCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  if (loading) return <div className="loading">Жүктелуде...</div>;

  return (
    <div className="courses-page">
      <div className="container">
        <h1>Барлық Курстар</h1>
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-meta">
                <span className="level">{course.level}</span>
                <span className="duration">{Math.round(course.duration / 60)} сағат</span>
              </div>
              <div className="course-actions">
                <button 
                  className="btn-primary"
                  onClick={() => handleStartCourse(course.id)}
                >
                  Курсты бастау
                </button>
                <button className="btn-secondary">
                  Толығырақ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;