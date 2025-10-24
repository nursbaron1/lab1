import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const UserProgress = sequelize.define('UserProgress', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  timeSpent: {
    type: DataTypes.INTEGER, // секундпен
    defaultValue: 0
  },
  lastAccessed: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

export default UserProgress;