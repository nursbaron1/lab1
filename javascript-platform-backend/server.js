import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sequelize from './models/index.js';
import { Course, Module, Lesson, Test, Question, User } from './models/associations.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

app.use(cors());
app.use(express.json());

// ==================== АУТЕНТИФИКАЦИЯ МАРШРУТТАРЫ ====================

// Тіркелу
app.post('/api/auth/register', async (req, res) => {
  try {
    console.log('📝 Тіркелу сұранысы:', req.body);
    
    const { firstName, lastName, email, password } = req.body;

    // Мәліметтерді тексеру
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ 
        message: 'Барлық өрістерді толтырыңыз' 
      });
    }

    // Пользователь бар ма соны тексереміз
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ 
        message: 'Бұл пошта бойынша пайдаланушы тіркелген' 
      });
    }

    // Құпия сөзді хэштейміз
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Жаңа пайдаланушыны қосамыз
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    // JWT токен жасаймыз
    const token = jwt.sign(
      { userId: newUser.id },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    console.log('✅ Тіркелу сәтті:', newUser.email);

    res.json({
      token,
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      }
    });
  } catch (err) {
    console.error('❌ Тіркелу қатесі:', err);
    res.status(500).json({ 
      message: 'Сервер қатесі: ' + err.message 
    });
  }
});

// Кіру
app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('🔐 Кіру сұранысы:', req.body);
    
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Пошта мен құпия сөзді енгізіңіз' 
      });
    }

    // Пользовательді табамыз
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ 
        message: 'Қате пошта немесе құпия сөз' 
      });
    }

    // Құпия сөзді тексереміз
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ 
        message: 'Қате пошта немесе құпия сөз' 
      });
    }

    // JWT токен жасаймыз
    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    console.log('✅ Кіру сәтті:', user.email);

    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (err) {
    console.error('❌ Кіру қатесі:', err);
    res.status(500).json({ 
      message: 'Сервер қатесі: ' + err.message 
    });
  }
});

// Пользовательді алу (профиль үшін)
app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Токен жоқ' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь табылмады' });
    }

    res.json({ user });
  } catch (err) {
    console.error('❌ Профиль алу қатесі:', err);
    res.status(401).json({ message: 'Токен жарамсыз' });
  }
});

// Тест маршруты
app.get('/api/auth/test', (req, res) => {
  res.json({ message: 'Аутентификация сервері жұмыс істеуде!' });
});

// ==================== БАСТАПҚЫ ДЕРЕКТЕР ====================
const initializeData = async () => {
  try {
    // Барлық курстарды санау
    const courseCount = await Course.count();
    console.log(`📊 Ағымдағы курс саны: ${courseCount}`);
    
    if (courseCount === 0) {
      console.log('✅ Бастапқы деректер қосылуда...');
      
      // 6 КУРС ЖАСАУ (барлығы қосылады)
      const courses = await Course.bulkCreate([
        {
          title: "JavaScript Негіздері",
          description: "JavaScript тілінің негізгі ұғымдарын үйреніз. Айнымалылар, функциялар, циклдар және басқа негізгі ұғымдар.",
          level: "beginner",
          duration: 1200,
          isFree: true,
          order: 1
        },
        {
          title: "React.js - Заманауи Frontend",
          description: "React.js көмегімен заманауи веб-қолданбаларды әзірлеу. Компоненттер, state, props және routing.",
          level: "intermediate",
          duration: 1800,
          isFree: true,
          order: 2
        },
        {
          title: "Node.js Бэкенд Әзірлеу",
          description: "Node.js және Express.js көмегімен серверлік қолданбаларды әзірлеу. API, дерекқорлармен жұмыс, аутентификация.",
          level: "advanced",
          duration: 2000,
          isFree: false,
          price: 29.99,
          order: 3
        },
        {
          title: "Vue.js - Progressive Framework",
          description: "Vue.js фреймворкімен заманауи веб-қолданбаларды әзірлеу. Vue 3, Composition API, Vue Router.",
          level: "intermediate", 
          duration: 1600,
          isFree: true,
          order: 4
        },
        {
          title: "TypeScript - Кеңейтілген JavaScript",
          description: "TypeScript көмегімен типтік қауіпсіз JavaScript код жазу. Интерфейстер, дженериктер, декораторлар.",
          level: "intermediate",
          duration: 1400,
          isFree: true,
          order: 5
        },
        {
          title: "Python Бағдарламалау",
          description: "Python тілінде бағдарламалауды үйреніз. Деректерді талдау, веб-әзірлеу, автоматтау.",
          level: "beginner",
          duration: 1500, 
          isFree: true,
          order: 6
        }
      ], { returning: true });

      console.log(`✅ ${courses.length} курс сәтті қосылды`);

      // БІРІНШІ КУРС: JavaScript Негіздері
      const jsCourse = courses[0];
      console.log(`📝 JavaScript курсы жасалды: ${jsCourse.id}`);

      // JavaScript модулі
      const jsModule = await Module.create({
        title: "JavaScript Кіріспе", 
        description: "JavaScript тіліне кіріспе",
        order: 1,
        courseId: jsCourse.id
      });
      console.log(`✅ JavaScript модулі жасалды: ${jsModule.id}`);

      // JavaScript сабақтары
      const jsLessons = await Lesson.bulkCreate([
        {
          title: "JavaScript деген не?",
          content: "JavaScript - бұл веб-браузерлерде орындалатын бағдарламалау тілі. Ол веб-беттерді интерактивті ету үшін қолданылады.",
          order: 1,
          moduleId: jsModule.id,
          courseId: jsCourse.id
        },
        {
          title: "Айнымалылар және типтер",
          content: "JavaScript-те айнымалыларды жасау және деректер типтері: string, number, boolean, object, array.",
          order: 2,
          moduleId: jsModule.id,
          courseId: jsCourse.id
        },
        {
          title: "Функциялар",
          content: "Функциялар - бұл қайта қолдануға болатын код блогы. Function declaration, expression, arrow functions.",
          order: 3,
          moduleId: jsModule.id,
          courseId: jsCourse.id
        }
      ]);
      console.log(`✅ ${jsLessons.length} JavaScript сабағы жасалды`);

      // JavaScript тесті
      const jsTest = await Test.create({
        title: "JavaScript Негіздері Тесті",
        description: "JavaScript негізгі ұғымдары бойынша тест",
        timeLimit: 1800,
        passingScore: 70,
        maxAttempts: 3,
        moduleId: jsModule.id
      });
      console.log(`✅ JavaScript тесті жасалды: ${jsTest.id}`);

      // JavaScript тест сұрақтары
      const jsQuestions = await Question.bulkCreate([
        {
          question: "JavaScript қандай тіл?",
          type: "single",
          options: ["Компиляциялық", "Интерпретациялық", "Белгілеу тілі", "Стиль тілі"],
          correctAnswers: [1],
          explanation: "JavaScript - интерпретациялық тіл, браузерде орындалады",
          difficulty: "easy",
          points: 1,
          testId: jsTest.id
        },
        {
          question: "Қайсысы JavaScript айнымайлысын жасайды?",
          type: "multiple",
          options: ["var", "let", "const", "variable"],
          correctAnswers: [0, 1, 2],
          explanation: "JavaScript-те var, let, const арқылы айнымалы жасалады",
          difficulty: "easy",
          points: 2,
          testId: jsTest.id
        },
        {
          question: "JavaScript қай жылы жасалды?",
          type: "single",
          options: ["1995", "2000", "2010", "1990"],
          correctAnswers: [0],
          explanation: "JavaScript 1995 жылы Brendan Eich жасаған",
          difficulty: "easy",
          points: 1,
          testId: jsTest.id
        },
        {
          question: "Қай функция дұрыс жасалған?",
          type: "single",
          options: [
            "function myFunc() {}",
            "def myFunc():",
            "func myFunc() {}",
            "function = myFunc()"
          ],
          correctAnswers: [0],
          explanation: "JavaScript-те функция function keyword арқылы жасалады",
          difficulty: "medium",
          points: 1,
          testId: jsTest.id
        },
        {
          question: "Қайсысы массив әдісі емес?",
          type: "single",
          options: ["push()", "pop()", "shift()", "get()"],
          correctAnswers: [3],
          explanation: "get() - массив әдісі емес, Map объектісінің әдісі",
          difficulty: "medium",
          points: 1,
          testId: jsTest.id
        }
      ]);
      console.log(`✅ ${jsQuestions.length} JavaScript сұрағы жасалды`);

      // ЕКІНШІ КУРС: React.js
      const reactCourse = courses[1];
      console.log(`📝 React курсы жасалды: ${reactCourse.id}`);

      // React.js модульдері
      const reactModule1 = await Module.create({
        title: "React.js Кіріспе", 
        description: "React.js негіздері мен негізгі ұғымдары",
        order: 1,
        courseId: reactCourse.id
      });

      const reactModule2 = await Module.create({
        title: "Компоненттер және JSX", 
        description: "React компоненттерін жасау және JSX синтаксисі",
        order: 2,
        courseId: reactCourse.id
      });

      const reactModule3 = await Module.create({
        title: "State және Props", 
        description: "State басқару және компоненттер арасында деректер тасымалдау",
        order: 3,
        courseId: reactCourse.id
      });

      console.log(`✅ ${3} React модулі жасалды`);

      // React.js сабақтары
      const reactLessons = await Lesson.bulkCreate([
        // Модуль 1: React.js Кіріспе
        {
          title: "React.js деген не?",
          content: "React.js - бұл Facebook әзірлеген пайдаланушы интерфейсін жасауға арналған JavaScript кітапханасы. Ол компонент негізіндегі архитектураны қолданады және виртуалды DOM технологиясы арқылы жоғары өнімділікке ие.",
          order: 1,
          moduleId: reactModule1.id,
          courseId: reactCourse.id
        },
        {
          title: "React орнату және баптау",
          content: "React жобасын құру үшін Create React App қолдануға болады. Бұл барлық қажетті баптауларды автоматты түрде жасайды: npm create react-app my-app",
          order: 2,
          moduleId: reactModule1.id,
          courseId: reactCourse.id
        },
        
        // Модуль 2: Компоненттер және JSX
        {
          title: "JSX синтаксисі",
          content: "JSX - бұл JavaScript кодына HTML-ге ұқсас синтаксис қосуға мүмкіндік беретін кеңейту. Ол React-те компоненттерді жазуға ыңғайлы. Мысалы: const element = <h1>Сәлем, әлем!</h1>;",
          order: 1,
          moduleId: reactModule2.id,
          courseId: reactCourse.id
        },
        {
          title: "Функционалды компоненттер",
          content: "Функционалды компоненттер - бұл функция ретінде жазылатын компоненттер. Олар Hook-тарды қолдана алады және қазіргі уақытта ең танымал әдіс. Мысалы: function MyComponent() { return <div>Менің компонентім</div>; }",
          order: 2,
          moduleId: reactModule2.id,
          courseId: reactCourse.id
        },
        
        // Модуль 3: State және Props
        {
          title: "useState Hook",
          content: "useState Hook - бұл функционалды компоненттерде state басқаруға мүмкіндік беретін React Hook. Ол компоненттің ішкі күйін басқаруға көмектеседі. Мысалы: const [count, setCount] = useState(0);",
          order: 1,
          moduleId: reactModule3.id,
          courseId: reactCourse.id
        },
        {
          title: "Props - қасиеттер",
          content: "Props - бұл компонентке деректерді беру әдісі. Олар компоненттің параметрлері сияқты және тек оқуға болады (read-only). Мысалы: function Welcome(props) { return <h1>Сәлем, {props.name}!</h1>; }",
          order: 2,
          moduleId: reactModule3.id,
          courseId: reactCourse.id
        }
      ]);
      console.log(`✅ ${reactLessons.length} React сабағы жасалды`);

      // React.js тесті (6 сұрақ - 3 жаңа сұрақ қосылды)
      const reactTest = await Test.create({
        title: "React.js Негіздері Тесті",
        description: "React.js негізгі ұғымдары бойынша тест",
        timeLimit: 1800,
        passingScore: 70,
        maxAttempts: 3,
        moduleId: reactModule3.id
      });

      // React.js тест сұрақтары (6 сұрақ)
      const reactQuestions = await Question.bulkCreate([
        {
          question: "React.js не үшін қолданылады?",
          type: "single",
          options: [
            "Бэкенд әзірлеу үшін",
            "Пайдаланушы интерфейсін әзірлеу үшін", 
            "Дерекқор басқару үшін",
            "Сервер конфигурациясы үшін"
          ],
          correctAnswers: [1],
          explanation: "React.js - пайдаланушы интерфейсін әзірлеуге арналған JavaScript кітапханасы",
          difficulty: "easy",
          points: 1,
          testId: reactTest.id
        },
        {
          question: "Қайсысы React Hook емес?",
          type: "single",
          options: ["useState", "useEffect", "useContext", "useFunction"],
          correctAnswers: [3],
          explanation: "useFunction - React Hook емес, useState, useEffect, useContext - ресми React Hook-тар",
          difficulty: "easy",
          points: 1,
          testId: reactTest.id
        },
        {
          question: "JSX деген не?",
          type: "single",
          options: [
            "Жаңа бағдарламалау тілі",
            "JavaScript кеңейтуі",
            "HTML тілінің бір түрі",
            "CSS фреймворкі"
          ],
          correctAnswers: [1],
          explanation: "JSX - JavaScript кодына HTML-ге ұқсас синтаксис қосатын кеңейту",
          difficulty: "medium",
          points: 1,
          testId: reactTest.id
        },
        // ЖАҢА СҰРАҚТАР (3 сұрақ)
        {
          question: "React-те компонент қалай жасалады?",
          type: "single",
          options: [
            "class Component extends React.Component",
            "function Component() { return <div>...</div> }",
            "const Component = () => <div>...</div>",
            "Барлығы дұрыс"
          ],
          correctAnswers: [3],
          explanation: "React-те компоненттерді әртүрлі әдістермен жасауға болады: класс компоненттері, функционалды компоненттер, arrow функциялар",
          difficulty: "medium",
          points: 1,
          testId: reactTest.id
        },
        {
          question: "useState Hook қандай мәнді қайтарады?",
          type: "single",
          options: [
            "Тек ағымдағы state мәні",
            "Тек state өзгертетін функция",
            "Массив [currentState, setStateFunction]",
            "Объект {state, setState}"
          ],
          correctAnswers: [2],
          explanation: "useState Hook массив қайтарады, бірінші элемент - ағымдағы state, екінші элемент - state өзгертетін функция",
          difficulty: "medium",
          points: 1,
          testId: reactTest.id
        },
        {
          question: "React-те props қалай жұмыс істейді?",
          type: "multiple",
          options: [
            "Props тек оқуға болады (read-only)",
            "Props компонент ішінде өзгертілуі мүмкін",
            "Props ата-ана компоненттен бала компонентке деректер береді",
            "Props тек класс компоненттерінде қолданылады"
          ],
          correctAnswers: [0, 2],
          explanation: "Props - бұл тек оқуға болатын (read-only) деректер және олар ата-ана компоненттен бала компонентке деректер тасымалдау үшін қолданылады",
          difficulty: "hard",
          points: 2,
          testId: reactTest.id
        }
      ]);
      console.log(`✅ ${reactQuestions.length} React сұрағы жасалды`);

      // ҚАЛҒАН КУРСТАР ҮШІН НЕГІЗГІ МОДУЛЬДЕР
      for (let i = 2; i < courses.length; i++) {
        const course = courses[i];
        const module = await Module.create({
          title: `${course.title} Кіріспе`,
          description: `${course.title} курсына кіріспе`,
          order: 1,
          courseId: course.id
        });
        
        // Әр курс үшін бір сабақ қосу
        await Lesson.create({
          title: `${course.title} негіздері`,
          content: `${course.title} курсының негізгі ұғымдары мен ерекшеліктері.`,
          order: 1,
          moduleId: module.id,
          courseId: course.id
        });
        
        console.log(`✅ ${course.title} модулі және сабағы жасалды`);
      }

      console.log('✅ Барлық бастапқы деректер сәтті қосылды!');
      console.log(`🎓 Барлық курс: 6 курс`);
      console.log(`📚 Сабақтар: ${jsLessons.length + reactLessons.length + 4} сабақ`);
      console.log(`🧪 Тесттер: 2 тест (JavaScript: 5 сұрақ, React: 6 сұрақ)`);
      console.log(`⭐ React.js курсында енді 6 тест сұрағы бар!`);
      
    } else {
      console.log('✅ Дерекқорда курс бар, бастапқы деректер қосылмайды');
    }
  } catch (error) {
    console.log('❌ Бастапқы деректер қатесі:', error);
  }
};

// ==================== API МАРШРУТТАРЫ ====================

// Негізгі API
app.get('/api', (req, res) => {
  res.json({ 
    message: 'JavaScript Learning Platform API is running!',
    version: '1.0.0',
    endpoints: [
      '/api/auth/register',
      '/api/auth/login',
      '/api/auth/me',
      '/api/courses',
      '/api/courses/:id',
      '/api/lessons', 
      '/api/tests',
      '/api/tests/:id',
      '/api/tests/:id/submit'
    ]
  });
});

// КУРСТАР - барлық курстарды көрсету
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.findAll({ 
      order: [['order', 'ASC']],
      include: [
        { 
          model: Module, 
          as: 'modules', 
          include: [
            { model: Lesson, as: 'lessons' },
            { model: Test, as: 'moduleTest' }
          ]
        }
      ]
    });
    console.log(`📊 API: ${courses.length} курс жіберілді`);
    res.json(courses);
  } catch (error) {
    console.error('Курстарды алу қатесі:', error);
    res.status(500).json({ error: error.message });
  }
});

// Бір курс алу
app.get('/api/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        { 
          model: Module, 
          as: 'modules', 
          include: [
            { model: Lesson, as: 'lessons', order: [['order', 'ASC']] },
            { 
              model: Test, 
              as: 'moduleTest', 
              include: [{ model: Question, as: 'testQuestions' }] 
            }
          ],
          order: [['order', 'ASC']]
        }
      ]
    });
    
    if (!course) {
      return res.status(404).json({ error: 'Курс табылмады' });
    }
    
    res.json(course);
  } catch (error) {
    console.error('Курсты алу қатесі:', error);
    res.status(500).json({ error: error.message });
  }
});

// САБАКТАР (Теория беті үшін)
app.get('/api/lessons', async (req, res) => {
  try {
    const lessons = await Lesson.findAll({
      include: [
        { model: Module, as: 'module', include: [{ model: Course, as: 'course' }] }
      ],
      order: [['order', 'ASC']]
    });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Бір сабақ алу
app.get('/api/lessons/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id, {
      include: [
        { model: Module, as: 'module', include: [{ model: Course, as: 'course' }] }
      ]
    });
    if (!lesson) {
      return res.status(404).json({ error: 'Сабақ табылмады' });
    }
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ТЕСТТЕР
app.get('/api/tests', async (req, res) => {
  try {
    const tests = await Test.findAll({
      include: [
        { model: Module, as: 'module', include: [{ model: Course, as: 'course' }] },
        { model: Question, as: 'testQuestions' }
      ]
    });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Бір тест алу
app.get('/api/tests/:id', async (req, res) => {
  try {
    const test = await Test.findByPk(req.params.id, {
      include: [{ model: Question, as: 'testQuestions' }]
    });
    if (!test) return res.status(404).json({ error: 'Тест табылмады' });
    res.json(test);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Тест нәтижесін сақтау
app.post('/api/tests/:id/submit', async (req, res) => {
  try {
    const { answers, timeSpent } = req.body;
    const test = await Test.findByPk(req.params.id, {
      include: [{ model: Question, as: 'testQuestions' }]
    });

    if (!test) return res.status(404).json({ error: 'Тест табылмады' });

    let score = 0;
    let totalPoints = 0;

    test.testQuestions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];
      const correctAnswers = question.correctAnswers;

      if (JSON.stringify(userAnswer) === JSON.stringify(correctAnswers)) {
        score += question.points;
      }
    });

    const percentage = Math.round((score / totalPoints) * 100);
    const passed = percentage >= test.passingScore;

    res.json({
      score,
      totalPoints,
      percentage,
      passed,
      timeSpent,
      answers: test.testQuestions.map(q => ({
        id: q.id,
        question: q.question,
        correctAnswers: q.correctAnswers,
        explanation: q.explanation,
        userAnswer: answers[q.id]
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Жаңа курс қосу
app.post('/api/courses', async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Курсты жаңарту
app.put('/api/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Курс табылмады' });
    }
    
    await course.update(req.body);
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Курсты жою
app.delete('/api/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Курс табылмады' });
    }
    
    await course.destroy();
    res.json({ message: 'Курс сәтті жойылды' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== СЕРВЕРДІ БАСТАУ ====================

// Кестелерді синхрондау
sequelize.sync({ force: true })
  .then(async () => {
    console.log('✅ Кестелер сәтті синхрондалды');
    await initializeData();
    
    // Серверді іске қосу
    app.listen(PORT, () => {
      console.log(`\n🚀 Сервер ${PORT} портында жұмыс істеп тұр`);
      console.log(`🔐 Аутентификация API: http://localhost:${PORT}/api/auth`);
      console.log(`📊 Курстар API: http://localhost:${PORT}/api/courses`);
      console.log(`📚 Сабақтар: http://localhost:${PORT}/api/lessons`);
      console.log(`🧪 Тесттер: http://localhost:${PORT}/api/tests`);
      console.log(`\n📊 Жиынтық:`);
      console.log(`   • 6 курс (барлығы тегін)`);
      console.log(`   • JavaScript: 3 модуль, 5 сабақ, 5 тест сұрағы`);
      console.log(`   • React: 3 модуль, 6 сабақ, 6 тест сұрағы`);
      console.log(`   • Барлығы: 15 сабақ, 11 тест сұрағы`);
      console.log(`\n⭐ React.js курсында енді 6 тест сұрағы бар!`);
      console.log(`\n🔐 Аутентификация эндпоинттері:`);
      console.log(`   POST /api/auth/register - Тіркелу`);
      console.log(`   POST /api/auth/login - Кіру`);
      console.log(`   GET  /api/auth/me - Профиль алу`);
    });
  })
  .catch(err => {
    console.log('❌ Кестелер қатесі:', err);
    process.exit(1);
  });

// Қателерді ұстау
process.on('uncaughtException', (error) => {
  console.error('❌ Қолданба қатесі:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Қолданба қатесі (Promise):', reason);
});