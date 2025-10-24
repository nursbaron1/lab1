import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Тіркелу
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Пайдаланушының бар-жоғын тексеру
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'Пайдаланушы бұрыннан тіркелген'
      });
    }

    // Жаңа пайдаланушыны жасау
    const user = await User.create({
      username,
      email,
      password
    });

    // Token жасау
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'Тіркелу сәтті аяқталды',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Кіру
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Пайдаланушыны табу
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Қате email немесе пароль' });
    }

    // Парольді тексеру
    const isPasswordCorrect = await user.correctPassword(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Қате email немесе пароль' });
    }

    // Token жасау
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Кіру сәтті аяқталды',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile,
        progress: user.progress
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Token тексеру
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Token жоқ' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ error: 'Пайдаланушы табылмады' });
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: 'Жарамсыз token' });
  }
});

export default router;