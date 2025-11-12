import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/api/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }
      } catch (err) {
        setError('Профильді алу кезінде қате пайда болды');
        console.error('Профиль қатесі:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="loading">Жүктелуде...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>Жеке Кабинет</h1>
          <button className="btn-logout" onClick={handleLogout}>
            Шығу
          </button>
        </div>

        {user ? (
          <div className="profile-content">
            {/* Пайдаланушы ақпараты */}
            <div className="user-info-card">
              <div className="user-avatar">
                <div className="avatar-placeholder">
                  {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                </div>
              </div>
              <div className="user-details">
                <h2>{user.firstName} {user.lastName}</h2>
                <p className="user-email">{user.email}</p>
                <p className="member-since">
                  Тіркелген: {new Date(user.createdAt).toLocaleDateString('kk-KZ')}
                </p>
              </div>
            </div>

            {/* Прогресс статистикасы */}
            <div className="progress-section">
              <h3>Оқу Прогрессі</h3>
              <div className="progress-stats">
                <div className="stat-card">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Аяқталған Курстар</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Аяқталған Сабақтар</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Тапсырылған Тесттер</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">0%</div>
                  <div className="stat-label">Жалпы Прогресс</div>
                </div>
              </div>
            </div>

            {/* Соңғы белсенділік */}
            <div className="activity-section">
              <h3>Соңғы Белсенділік</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">📚</div>
                  <div className="activity-content">
                    <p>Сіз әлі сабақ оқып бастамадыңыз</p>
                    <span className="activity-time">Жаңадан бастаңыз</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">🎯</div>
                  <div className="activity-content">
                    <p>Бірінші тестіңізді тапсырыңыз</p>
                    <span className="activity-time">Тесттер бетіне өтіңіз</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ұсынылған курстар */}
            <div className="recommended-section">
              <h3>Сізге Ұсынылатын Курстар</h3>
              <div className="course-suggestions">
                <div className="course-suggestion">
                  <h4>JavaScript Негіздері</h4>
                  <p>Бастапқы деңгей</p>
                  <button 
                    className="btn-start-course"
                    onClick={() => navigate('/courses')}
                  >
                    Бастау
                  </button>
                </div>
                <div className="course-suggestion">
                  <h4>React.js - Заманауи Frontend</h4>
                  <p>Орташа деңгей</p>
                  <button 
                    className="btn-start-course"
                    onClick={() => navigate('/courses')}
                  >
                    Бастау
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="not-authorized">
            <h2>Профильді көру үшін кіріңіз</h2>
            <button 
              className="btn-login"
              onClick={() => navigate('/login')}
            >
              Кіру
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;