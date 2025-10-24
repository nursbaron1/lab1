import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const Course = sequelize.define('Course', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  shortDescription: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
  level: { type: DataTypes.STRING, defaultValue: 'beginner' },
  duration: { type: DataTypes.INTEGER, defaultValue: 0 },
  price: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
  isFree: { type: DataTypes.BOOLEAN, defaultValue: true },
  tags: { type: DataTypes.JSON, defaultValue: [] },
  order: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
});

export default Course;