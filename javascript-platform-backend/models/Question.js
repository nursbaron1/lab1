import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const Question = sequelize.define('Question', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  question: { type: DataTypes.TEXT, allowNull: false },
  type: { type: DataTypes.ENUM('single', 'multiple', 'code'), defaultValue: 'single' },
  options: { type: DataTypes.JSON, allowNull: false }, // Нұсқалар
  correctAnswers: { type: DataTypes.JSON, allowNull: false }, // Дұрыс жауаптар
  explanation: { type: DataTypes.TEXT }, // Түсіндірме
  codeTemplate: { type: DataTypes.TEXT }, // Код шаблоны
  difficulty: { type: DataTypes.ENUM('easy', 'medium', 'hard'), defaultValue: 'easy' },
  points: { type: DataTypes.INTEGER, defaultValue: 1 }
});

export default Question;