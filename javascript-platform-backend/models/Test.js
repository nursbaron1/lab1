import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const Test = sequelize.define('Test', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  timeLimit: { type: DataTypes.INTEGER, defaultValue: 1800 },
  passingScore: { type: DataTypes.INTEGER, defaultValue: 70 },
  maxAttempts: { type: DataTypes.INTEGER, defaultValue: 3 }
  // "questions" өрісін ЖОЮ - ол ассоциация арқылы қосылады
});

export default Test;