import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import Features from '../components/Features/Features';
import LearningSection from '../components/LearningSection/LearningSection';
import IntelligenceSection from '../components/IntelligenceSection/IntelligenceSection';


const Home = () => {
  return (
    <div className="home">
      <HeroSection />
      <Features />
      <LearningSection />
      <IntelligenceSection />
    </div>
  );
};

export default Home;