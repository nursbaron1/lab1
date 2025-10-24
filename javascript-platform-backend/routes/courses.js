import express from 'express';
import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';
import UserProgress from '../models/UserProgress.js';

const router = express.Router();

// Барлық курсарды алу
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).sort({ order: 1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Бір курс туралы ақпарат
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Курс табылмады' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Курстың сабақтарын алу
router.get('/:id/lessons', async (req, res) => {
  try {
    const lessons = await Lesson.find({ 
      course: req.params.id 
    }).sort({ order: 1 });

    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Курс бойынша прогресті алу
router.get('/:id/progress', async (req, res) => {
  try {
    const userId = req.userId; // Middleware арқылы алынады
    
    const progress = await UserProgress.find({
      user: userId,
      course: req.params.id
    }).populate('lesson');

    const totalLessons = await Lesson.countDocuments({ course: req.params.id });
    const completedLessons = progress.filter(p => p.completed).length;
    const progressPercentage = totalLessons > 0 
      ? Math.round((completedLessons / totalLessons) * 100) 
      : 0;

    res.json({
      progress,
      statistics: {
        totalLessons,
        completedLessons,
        progressPercentage,
        totalScore: progress.reduce((sum, p) => sum + p.score, 0)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;