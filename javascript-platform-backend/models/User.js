import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 30]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 100]
    }
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  level: {
    type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
    defaultValue: 'beginner'
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 12);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    }
  }
});

// Парольді тексеру әдісі
User.prototype.correctPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default User;