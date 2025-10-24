import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Theory from './pages/Theory';
import Profile from './pages/Profile';
import './App.css';
import CourseDetail from './pages/CourseDetail';
import Test from './pages/Test';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/theory" element={<Theory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/test/:id" element={<Test />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;