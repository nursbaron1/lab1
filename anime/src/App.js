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
import LessonPage from './components/LessonPage';
import PracticePage from './components/PracticePage';
import TestPage from './components/TestPage';
import Login from './pages/Login';
import Register from './pages/Register';

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
            <Route path="/lesson/:topicId" element={<LessonPage />} />
            <Route path="/practice/:topicId" element={<PracticePage />} />
            <Route path="/test/:topicId" element={<TestPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;