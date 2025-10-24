import express from 'express';
import Lesson from '../models/Lesson.js';
import UserProgress from '../models/UserProgress.js';

const router = express.Router();

// Барлық сабақтарды алу
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find().populate('course').sort({ order: 1 });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Бір сабақты алу
router.get('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('course');
    if (!lesson) {
      return res.status(404).json({ error: 'Сабақ табылмады' });
    }
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Сабақты аяқтау
router.post('/:id/complete', async (req, res) => {
  try {
    const userId = req.userId;
    const { score = 0, timeSpent = 0 } = req.body;

    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: 'Сабақ табылмады' });
    }

    // Прогресс жасау/жаңарту
    let progress = await UserProgress.findOne({
      user: userId,
      lesson: req.params.id
    });

    if (progress) {
      progress.completed = true;
      progress.score = score;
      progress.timeSpent = timeSpent;
      progress.lastAccessed = new Date();
    } else {
      progress = new UserProgress({
        user: userId,
        lesson: req.params.id,
        course: lesson.course,
        completed: true,
        score,
        timeSpent,
        lastAccessed: new Date()
      });
    }

    await progress.save();

    res.json({
      message: 'Сабақ сәтті аяқталды',
      progress
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;