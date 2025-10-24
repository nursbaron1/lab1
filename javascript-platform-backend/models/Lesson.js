import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const Lesson = sequelize.define('Lesson', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  videoUrl: { type: DataTypes.STRING },
  codeExamples: { type: DataTypes.JSON, defaultValue: [] },
  order: { type: DataTypes.INTEGER, defaultValue: 0 },
  duration: { type: DataTypes.INTEGER, defaultValue: 0 },
  isFree: { type: DataTypes.BOOLEAN, defaultValue: true }
});

export default Lesson;