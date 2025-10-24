import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartCourse = () => {
    navigate('/courses');
  };

  const handleFreeLesson = () => {
    navigate('/theory');
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">JavaScript Master</h1>
          <p className="hero-subtitle">Болашақты кодтау - бізбен басталады</p>
          <p className="hero-description">
            JavaScript-ті нөлден бастап профессионалды деңгейге дейін үйреніңіз. 
            Іс-тәжірибеге негізделген курстар, нақты жобалар және қазіргі заманғы 
            әдістер.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={handleStartCourse}>
              Курсты бастау
            </button>
            <button className="btn-secondary" onClick={handleFreeLesson}>
              Теориялармен танысу
            </button>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="code-sphere">
            <div className="sphere"></div>
            <div className="orbiting-element el1">const</div>
            <div className="orbiting-element el2">function</div>
            <div className="orbiting-element el3">return</div>
            <div className="orbiting-element el4">async</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;