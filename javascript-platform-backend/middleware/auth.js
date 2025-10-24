import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Тіркелу қажет' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Пайдаланушы табылмады' });
    }

    req.userId = user._id;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Жарамсыз token' });
  }
};

export default auth;