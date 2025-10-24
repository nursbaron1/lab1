import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const Module = sequelize.define('Module', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  order: { type: DataTypes.INTEGER, defaultValue: 0 },
  duration: { type: DataTypes.INTEGER, defaultValue: 0 }
});

export default Module;