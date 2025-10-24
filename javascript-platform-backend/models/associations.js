import Course from './Course.js';
import Module from './Module.js';
import Lesson from './Lesson.js';
import Test from './Test.js';
import Question from './Question.js';

// Курс - Модуль
Course.hasMany(Module, { foreignKey: 'courseId', as: 'modules' });
Module.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

// Модуль - Сабақ
Module.hasMany(Lesson, { foreignKey: 'moduleId', as: 'lessons' });
Lesson.belongsTo(Module, { foreignKey: 'moduleId', as: 'module' });

// Модуль - Тест
Module.hasOne(Test, { foreignKey: 'moduleId', as: 'moduleTest' }); // 'test' → 'moduleTest'
Test.belongsTo(Module, { foreignKey: 'moduleId', as: 'module' });

// Тест - Сұрақ (Атауын өзгерту)
Test.hasMany(Question, { 
  foreignKey: 'testId', 
  as: 'testQuestions' // 'questions' → 'testQuestions'
});
Question.belongsTo(Test, { 
  foreignKey: 'testId', 
  as: 'test' 
});

// Курс - Сабақ
Course.hasMany(Lesson, { foreignKey: 'courseId', as: 'courseLessons' });
Lesson.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

export { Course, Module, Lesson, Test, Question };