// src/data/lessonsData.js
export const lessonsData = {
  "javascript-basics": {
    id: "javascript-basics",
    title: "JavaScript Негіздері",
    description: "Айнымалылар, функциялар, циклдар және басқа негізгі ұғымдар",
    level: "Бастауыш",
    color: "#f7df1e",
    content: {
      theory: `
        JavaScript - бұл веб-браузерлерде орындалатын бағдарламалау тілі. 
        Ол веб-беттерді интерактивті ету үшін қолданылады.
        
        Негізгі ұғымдар:
        • Айнымалылар - деректерді сақтау үшін
        • Функциялар - қайта қолданылатын код блоктары
        • Шартты операторлар - бағдарлама жолын басқару
        • Циклдар - қайталанатын операциялар
        • Массивтер - деректерді тізім түрінде сақтау
        • Объектілер - күрделі деректер құрылымдары

        JavaScript 1995 жылы Brendan Eich ойлап тапқан және қазіргі уақытта 
        веб-әзірлеудің ең маңызды тілдерінің бірі болып табылады.
      `,
      codeExamples: [
        {
          title: "Айнымалыларды жасау",
          code: `// let және const арқылы айнымалы жасау
let name = "John";
const age = 25;
var city = "Almaty"; // ескі әдіс

console.log(name); // "John"
console.log(age);  // 25`,
          result: "John\n25"
        },
        {
          title: "Функциялар",
          code: `// Функцияны жасау
function greet(name) {
  return "Сәлем, " + name + "!";
}

// Arrow function
const multiply = (a, b) => a * b;

// Функцияны шақыру
console.log(greet("Айгерім"));
console.log(multiply(5, 3));`,
          result: "Сәлем, Айгерім!\n15"
        },
        {
          title: "Шартты операторлар",
          code: `let temperature = 25;

if (temperature > 30) {
  console.log("Әдемі ауа райы!");
} else if (temperature > 20) {
  console.log("Жылы ауа райы");
} else {
  console.log("Суық ауа райы");
}

// Үштік оператор
let message = temperature >= 20 ? "Жылы" : "Суық";
console.log(message);`,
          result: "Жылы ауа райы\nЖылы"
        },
        {
          title: "Циклдар",
          code: `// for циклы
for (let i = 1; i <= 5; i++) {
  console.log("Қадам: " + i);
}

// while циклы
let count = 3;
while (count > 0) {
  console.log("Санау: " + count);
  count--;
}

// for...of циклы (массивтер үшін)
let fruits = ["алма", "алмұрт", "банан"];
for (let fruit of fruits) {
  console.log(fruit);
}`,
          result: "Қадам: 1\nҚадам: 2\nҚадам: 3\nҚадам: 4\nҚадам: 5\nСанау: 3\nСанау: 2\nСанау: 1\nалма\nalmurt\nbanan"
        }
      ],
      terminologies: [
        {
          term: "Айнымалы (Variable)",
          definition: "Деректерді уақытша сақтауға арналған жад бөлігі. let, const, var арқылы жасалады."
        },
        {
          term: "Функция (Function)",
          definition: "Қайта қолдануға болатын код блогы. Параметрлер қабылдап, мән қайтара алады."
        },
        {
          term: "Массив (Array)",
          definition: "Бір атау астында бірнеше мәндерді сақтайтын деректер құрылымы."
        },
        {
          term: "Объект (Object)",
          definition: "Қасиеттер мен әдістерден тұратын күрделі деректер типі."
        },
        {
          term: "Цикл (Loop)",
          definition: "Кодты бірнеше рет қайталап орындауға мүмкіндік беретін конструкция."
        },
        {
          term: "Шартты оператор (Conditional)",
          definition: "Белгілі бір шарт орындалған жағдайда ғана кодты орындайтын оператор."
        }
      ],
      exercises: [
        {
          id: 1,
          title: "Айнымалыларды жасау",
          description: "Атыңызды, жасыңызды және қалаңызды айнымалы ретінде жазыңыз",
          starterCode: `let name = ""; // Атыңызды жазыңыз
let age = ; // Жасыңызды жазыңыз
let city = ""; // Қалаңызды жазыңыз

// Нәтижені шығарыңыз
console.log("Атым: " + name);
console.log("Жасым: " + age);
console.log("Қалам: " + city);`,
          expectedOutput: "Атым: [Атыңыз]\\nЖасым: [Жасыңыз]\\nҚалам: [Қалаңыз]",
          hint: "Айнымалы мәндерін дұрыс тағайындаңыз. Мысалы: let name = 'Алия';"
        },
        {
          id: 2,
          title: "Қарапайым функция",
          description: "Екі санды қосатын функция жазыңыз",
          starterCode: `function addNumbers(a, b) {
  // Функцияны аяқтаңыз
}

// Функцияны тексеру
console.log(addNumbers(5, 3)); // 8 шығуы керек
console.log(addNumbers(10, 7)); // 17 шығуы керек`,
          expectedOutput: "8\\n17",
          hint: "return a + b; қолданыңыз"
        },
        {
          id: 3,
          title: "Шартты оператор",
          description: "Санның жұп немесе тақ екенін анықтайтын функция жазыңыз",
          starterCode: `function checkEvenOdd(number) {
  // Функцияны аяқтаңыз
  // Егер сан жұп болса "жұп", тақ болса "тақ" деп қайтарыңыз
}

console.log(checkEvenOdd(4)); // "жұп" шығуы керек
console.log(checkEvenOdd(7)); // "тақ" шығуы керек
console.log(checkEvenOdd(0)); // "жұп" шығуы керек`,
          expectedOutput: "жұп\\nтақ\\nжұп",
          hint: "% операторын қолданыңыз. Сан 2-ге бөлгенде қалдық 0 болса, онда жұп."
        },
        {
          id: 4,
          title: "Цикл арқылы есептеу",
          description: "1-ден 10-ға дейінгі сандардың қосындысын есептеңіз",
          starterCode: `let sum = 0;

// Циклды аяқтаңыз

console.log("Қосынды: " + sum); // 55 шығуы керек`,
          expectedOutput: "Қосынды: 55",
          hint: "for циклын қолданып, 1-ден 10-ға дейін қосыңыз"
        }
      ],
      tests: [
        {
          id: 1,
          question: "Қайсысы JavaScript айнымайлысын дұрыс жасайды?",
          type: "single",
          options: [
            "var myVar = 10;",
            "let myVar = 10;", 
            "const myVar = 10;",
            "Барлығы дұрыс"
          ],
          correctAnswer: 3,
          explanation: "JavaScript-те үш түрлі айнымалы жасау әдісі бар: var, let, const"
        },
        {
          id: 2,
          question: "Қай функция дұрыс жазылған?",
          type: "multiple",
          options: [
            "function myFunc() {}",
            "const myFunc = function() {}",
            "const myFunc = () => {}",
            "function = myFunc() {}"
          ],
          correctAnswers: [0, 1, 2],
          explanation: "Алғашқы үш әдіс дұрыс, соңғысы қате синтаксис"
        },
        {
          id: 3,
          question: "Төмендегі кодтың нәтижесі не болады?\nlet x = 5;\nlet y = '5';\nconsole.log(x == y);",
          type: "single",
          options: ["true", "false", "undefined", "Қате"],
          correctAnswer: 0,
          explanation: "== операторы типті түрлендіреді, сондықтан true қайтарады"
        },
        {
          id: 4,
          question: "const арқылы жасалған айнымалыны қайта тағайындауға бола ма?",
          type: "single",
          options: [
            "Ия, әр уақытта",
            "Жоқ, ешқашан",
            "Тек объекттер мен массивтерді жағдайда",
            "Тек сандар жағдайда"
          ],
          correctAnswer: 1,
          explanation: "const арқылы жасалған айнымалыны қайта тағайындауға болмайды"
        },
        {
          id: 5,
          question: "Қайсысы дұрыс массив жасайды?",
          type: "multiple",
          options: [
            "let arr = [1, 2, 3];",
            "let arr = new Array(1, 2, 3);",
            "let arr = (1, 2, 3);",
            "let arr = Array(1, 2, 3);"
          ],
          correctAnswers: [0, 1, 3],
          explanation: "Бірінші, екінші және төртінші нұсқалар дұрыс"
        }
      ]
    }
  },
  "objects-arrays": {
    id: "objects-arrays",
    title: "Объектілер және Массивтер",
    description: "Күрделі деректер құрылымдарымен жұмыс",
    level: "Орташа",
    color: "#61dafb",
    content: {
      theory: `
        Объектілер және массивтер - JavaScript-тегі ең маңызды деректер құрылымдары.
        
        Объектілер:
        • Кілт-мән жұптарынан тұрады
        • Күрделі деректерді ұсынуға арналған
        • JSON форматына негізделген
        • Методтарға ие бола алады

        Массивтер:
        • Реттелген элементтер тізімі
        • Әртүрлі әдістерге ие (push, pop, map, filter, reduce, т.б.)
        • Индекс арқылы элементтерге қол жеткізу
        • Динамикалық өлшем

        Осы құрылымдарды меңгеру JavaScript-те тиімді бағдарламалау үшін өте маңызды.
      `,
      codeExamples: [
        {
          title: "Объект жасау",
          code: `// Объект жасау
let student = {
  name: "Алия",
  age: 20,
  grade: "A",
  courses: ["Математика", "Физика", "Программалау"],
  
  // Метод
  getInfo: function() {
    return this.name + ", " + this.age + " жаста";
  }
};

// Қасиеттерге қол жеткізу
console.log(student.name);
console.log(student["age"]);
console.log(student.getInfo());

// Жаңа қасиет қосу
student.university = "КазНУ";
console.log(student.university);`,
          result: "Алия\n20\nАлия, 20 жаста\nКазНУ"
        },
        {
          title: "Массив әдістері",
          code: `let numbers = [1, 2, 3, 4, 5];

// push() - соңына қосу
numbers.push(6);
console.log("push қосқаннан кейін:", numbers);

// pop() - соңынан алу
let last = numbers.pop();
console.log("pop алынған:", last);
console.log("pop алынғаннан кейін:", numbers);

// map() - әр элементті өзгерту
let doubled = numbers.map(num => num * 2);
console.log("map қолданғаннан кейін:", doubled);

// filter() - сүзгілеу
let evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("filter қолданғаннан кейін:", evenNumbers);`,
          result: "push қосқаннан кейін: [1,2,3,4,5,6]\npop алынған: 6\npop алынғаннан кейін: [1,2,3,4,5]\nmap қолданғаннан кейін: [2,4,6,8,10]\nfilter қолданғаннан кейін: [2,4]"
        },
        {
          title: "Деструктуризация",
          code: `// Объект деструктуризациясы
let person = { name: "Бахыт", age: 30, city: "Астана" };
let { name, age, city } = person;
console.log(name, age, city);

// Массив деструктуризациясы
let colors = ["қызыл", "жасыл", "көк"];
let [firstColor, secondColor] = colors;
console.log(firstColor, secondColor);

// Қалған элементтер
let [first, ...rest] = colors;
console.log("Бірінші:", first);
console.log("Қалғандары:", rest);`,
          result: "Бахыт 30 Астана\nқызыл жасыл\nБірінші: қызыл\nҚалғандары: ['жасыл', 'көк']"
        },
        {
          title: "JSON жұмысы",
          code: `// Объектті JSON түріне түрлендіру
let book = {
  title: "JavaScript бастауыштар үшін",
  author: "Айгерім Смағұлова",
  year: 2024,
  available: true
};

let jsonString = JSON.stringify(book);
console.log("JSON түрінде:", jsonString);

// JSON-ды объектке түрлендіру
let parsedBook = JSON.parse(jsonString);
console.log("Объект түрінде:", parsedBook.title);`,
          result: "JSON түрінде: {\"title\":\"JavaScript бастауыштар үшін\",\"author\":\"Айгерім Смағұлова\",\"year\":2024,\"available\":true}\nОбъект түрінде: JavaScript бастауыштар үшін"
        }
      ],
      terminologies: [
        {
          term: "JSON (JavaScript Object Notation)",
          definition: "Деректер алмасу форматы. Объектілер мен массивтерді мәтін түрінде көрсетуге мүмкіндік береді."
        },
        {
          term: "Метод (Method)",
          definition: "Объектіге тиесілі функция. Объект ішінде анықталады және this көмегімен объектке қол жеткізе алады."
        },
        {
          term: "Деструктуризация (Destructuring)",
          definition: "Массив немесе объекттен мәндерді бөліп алуға мүмкіндік беретін синтаксис."
        },
        {
          term: "Spread операторы (...)",
          definition: "Массивті немесе объектті жайып, оның элементтерін/қасиеттерін бөлек алуға мүмкіндік береді."
        },
        {
          term: "Қалдық параметрлер (Rest parameters)",
          definition: "Функцияға берілген қалған аргументтерді массив ретінде жинауға мүмкіндік береді."
        }
      ],
      exercises: [
        {
          id: 1,
          title: "Объект жасау",
          description: "Өзіңіз туралы объект жасаңыз",
          starterCode: `let myInfo = {
  // Объект қасиеттерін толтырыңыз
  name: "",
  age: ,
  education: "",
  hobbies: [] // қызығушылықтар тізімі
};

// Метод қосыңыз
myInfo.introduce = function() {
  return "Менің атым " + this.name + ", мен " + this.age + " жастамын.";
};

console.log(myInfo.introduce());
console.log("Білімім: " + myInfo.education);
console.log("Қызығушылықтарым: " + myInfo.hobbies.join(", "));`,
          expectedOutput: "Менің атым [Атыңыз], мен [Жасыңыз] жастамын.\\nБілімім: [Біліміңіз]\\nҚызығушылықтарым: [Қызығушылықтарыңыз]",
          hint: "name, age, education және hobbies қасиеттерін толтырыңыз"
        },
        {
          id: 2,
          title: "Массив әдістері",
          description: "Сандар массивін өңдеу",
          starterCode: `let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Тек жұп сандарды сүзгілеңіз
let evenNumbers = numbers.filter(/* код жазыңыз */);

// 2. Әр санды квадраттаңыз
let squaredNumbers = numbers.map(/* код жазыңыз */);

// 3. Барлық сандардың қосындысын табыңыз
let sum = numbers.reduce(/* код жазыңыз */);

console.log("Жұп сандар:", evenNumbers);
console.log("Квадраттары:", squaredNumbers);
console.log("Қосындысы:", sum);`,
          expectedOutput: "Жұп сандар: [2,4,6,8,10]\\nКвадраттары: [1,4,9,16,25,36,49,64,81,100]\\nҚосындысы: 55",
          hint: "filter(num => num % 2 === 0), map(num => num * num), reduce((acc, num) => acc + num, 0)"
        },
        {
          id: 3,
          title: "Объекттер массиві",
          description: "Оқушылар тізімін өңдеу",
          starterCode: `let students = [
  { name: "Алия", grade: 85 },
  { name: "Бахыт", grade: 92 },
  { name: "Сәния", grade: 78 },
  { name: "Дәулет", grade: 95 }
];

// 4.0-ден жоғары баға алған оқушыларды сүзгілеңіз
let topStudents = students.filter(/* код жазыңыз */);

// 5. Әр оқушыға "status" қасиетін қосыңыз (grade > 90 болса "excellent", әйтпесе "good")
let studentsWithStatus = students.map(/* код жазыңыз */);

// 6. Орташа бағаны есептеңіз
let averageGrade = students.reduce(/* код жазыңыз */) / students.length;

console.log("Үздік оқушылар:", topStudents);
console.log("Статустарымен:", studentsWithStatus);
console.log("Орташа баға:", averageGrade);`,
          expectedOutput: "Үздік оқушылар: [{name:'Алия',grade:85},{name:'Бахыт',grade:92},{name:'Сәния',grade:78},{name:'Дәулет',grade:95}]\\nСтатустарымен: [{name:'Алия',grade:85,status:'good'},{name:'Бахыт',grade:92,status:'excellent'},{name:'Сәния',grade:78,status:'good'},{name:'Дәулет',grade:95,status:'excellent'}]\\nОрташа баға: 87.5",
          hint: "filter(student => student.grade > 80), map(student => ({...student, status: student.grade > 90 ? 'excellent' : 'good'})), reduce((sum, student) => sum + student.grade, 0)"
        }
      ],
      tests: [
        {
          id: 1,
          question: "Массивке жаңа элемент қосу үшін қай әдіс қолданылады?",
          type: "single",
          options: ["push()", "add()", "insert()", "append()"],
          correctAnswer: 0,
          explanation: "push() әдісі массивтің соңына жаңа элемент қосады"
        },
        {
          id: 2,
          question: "Объекттен қасиетке қол жеткізу үшін қайсысы дұрыс?",
          type: "multiple",
          options: [
            "obj.property",
            "obj['property']",
            "obj.{property}",
            "obj->property"
          ],
          correctAnswers: [0, 1],
          explanation: "Нүкте белгісімен (obj.property) немесе жақшамен (obj['property']) қол жеткізуге болады"
        },
        {
          id: 3,
          question: "Төмендегі кодтың нәтижесі не болады?\nlet arr = [1, 2, 3];\nlet [a, b] = arr;\nconsole.log(a, b);",
          type: "single",
          options: ["1 2", "1 3", "2 3", "Қате шығады"],
          correctAnswer: 0,
          explanation: "Деструктуризация арқылы бірінші екі элемент a және b айнымалыларына тағайындалады"
        },
        {
          id: 4,
          question: "JSON.stringify() функциясы не істейді?",
          type: "single",
          options: [
            "Объектті JSON тіркесіне түрлендіреді",
            "JSON тіркесін объектке түрлендіреді",
            "Объектті HTML түріне түрлендіреді",
            "Объектті XML түріне түрлендіреді"
          ],
          correctAnswer: 0,
          explanation: "JSON.stringify() функциясы JavaScript объектісін JSON тіркесіне түрлендіреді"
        },
        {
          id: 5,
          question: "Қайсысы массивті дұрыс сүзгілейді?",
          type: "single",
          options: [
            "arr.filter(item => item > 5)",
            "arr.filter(item > 5)",
            "arr.filter(function(item) { return item > 5 })",
            "arr.filter(item => { return item > 5 })"
          ],
          correctAnswers: [0, 2, 3],
          explanation: "Бірінші, үшінші және төртінші нұсқалар дұрыс filter() әдісін қолдану"
        }
      ]
    }
  },
  "async-javascript": {
    id: "async-javascript",
    title: "Асинхронды JavaScript",
    description: "Promise, async/await және API шалу",
    level: "Кеңейтілген",
    color: "#ff6b6b",
    content: {
      theory: `
        Асинхронды JavaScript - бұл кодтың бөліктерін күтіп тұрмай орындауға мүмкіндік беретін технология.
        
        Негізгі ұғымдар:
        • Callback функциялар - асинхронды операция аяқталғаннан кейін орындалатын функциялар
        • Promise - асинхронды операцияның нәтижесін ұсынатын объект
        • async/await - Promise-термен жұмысты жеңілдететін синтаксис
        • fetch API - желілік сұраулар жасау

        Асинхронды бағдарламалау веб-қосымшалардың өнімділігін арттыру үшін өте маңызды.
      `,
      codeExamples: [
        {
          title: "Promise қолдану",
          code: `// Promise жасау
let promise = new Promise((resolve, reject) => {
  let success = true;
  
  setTimeout(() => {
    if (success) {
      resolve("Операция сәтті аяқталды!");
    } else {
      reject("Операция сәтсіз аяқталды");
    }
  }, 2000);
});

// Promise-ті қолдану
promise
  .then(result => {
    console.log("Сәтті:", result);
  })
  .catch(error => {
    console.log("Қате:", error);
  })
  .finally(() => {
    console.log("Операция аяқталды");
  });`,
          result: "Сәтті: Операция сәтті аяқталды!\\nОперация аяқталды"
        },
        {
          title: "async/await",
          code: `// async функция
async function fetchData() {
  try {
    console.log("Деректер алынуда...");
    
    // Күтуді елестету
    let data = await new Promise(resolve => {
      setTimeout(() => {
        resolve({ name: "Алия", age: 25 });
      }, 1000);
    });
    
    console.log("Деректер алынды:", data);
    return data;
  } catch (error) {
    console.log("Қате орын алды:", error);
  }
}

// Функцияны шақыру
fetchData().then(result => {
  console.log("Соңғы нәтиже:", result);
});`,
          result: "Деректер алынуда...\\nДеректер алынды: {name: 'Алия', age: 25}\\nСоңғы нәтиже: {name: 'Алия', age: 25}"
        },
        {
          title: "fetch API",
          code: `// API-ден деректер алу
async function getUserData() {
  try {
    let response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    
    if (!response.ok) {
      throw new Error('Желілік қате');
    }
    
    let user = await response.json();
    console.log("Пайдаланушы деректері:");
    console.log("Аты:", user.name);
    console.log("Электронды пошта:", user.email);
    console.log("Қала:", user.address.city);
    
  } catch (error) {
    console.log("Қате:", error.message);
  }
}

// Функцияны шақыру
getUserData();`,
          result: "Пайдаланушы деректері:\\nАты: Leanne Graham\\nЭлектронды пошта: Sincere@april.biz\\nҚала: Gwenborough"
        },
        {
          title: "Бірнеше Promise бірге",
          code: `// Бірнеше API сұрауларды бірге орындау
async function fetchMultipleData() {
  try {
    let [userResponse, postsResponse] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users/1'),
      fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
    ]);
    
    let user = await userResponse.json();
    let posts = await postsResponse.json();
    
    console.log("Пайдаланушы:", user.name);
    console.log("Посттар саны:", posts.length);
    console.log("Бірінші пост:", posts[0].title);
    
  } catch (error) {
    console.log("Қате:", error);
  }
}

fetchMultipleData();`,
          result: "Пайдаланушы: Leanne Graham\\nПосттар саны: 10\\nБірінші пост: sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
        }
      ],
      terminologies: [
        {
          term: "Promise",
          definition: "Асинхронды операцияның болашақтағы нәтижесін ұсынатын объект. Түйінделу (pending), орындалу (fulfilled) немесе қате (rejected) күйлерінде бола алады."
        },
        {
          term: "Async/Await",
          definition: "Асинхронды кодты синхронды түрде жазуға мүмкіндік беретін синтаксис. async функция ішінде await кілт сөзі Promise-тің орындалуын күтеді."
        },
        {
          term: "Callback",
          definition: "Басқа функцияға аргумент ретінде берілетін функция. Асинхронды операция аяқталғаннан кейін орындалады."
        },
        {
          term: "Fetch API",
          definition: "Желілік сұраулар жасауға арналған заманауи интерфейс. XMLHttpRequest-тен гөрі қарапайым және күшті."
        },
        {
          term: "Then/Catch/Finally",
          definition: "Promise әдістері. then - сәтті орындалғанда, catch - қате кезінде, finally - әр жағдайда орындалады."
        }
      ],
      exercises: [
        {
          id: 1,
          title: "Promise жасау",
          description: "Кездейсоқ сан генераторын Promise ретінде жазыңыз",
          starterCode: `function randomNumberGenerator() {
  // Promise қайтарыңыз
  // 50% ықтималдықпен сәтті орындалуы немесе қате болуы керек
  // Сәтті жағдайда 1-100 аралығында кездейсоқ сан қайтарыңыз
  // Қате жағдайда "Кездейсоқ қате орын алды" деген хабар қайтарыңыз
}

// Функцияны тексеру
randomNumberGenerator()
  .then(number => {
    console.log("Сәтті! Сан: " + number);
  })
  .catch(error => {
    console.log("Қате: " + error);
  });`,
          expectedOutput: "Сәтті! Сан: [1-100 аралығындағы сан] немесе Қате: Кездейсоқ қате орын алды",
          hint: "Math.random() қолданыңыз. 0.5-тен үлкен болса resolve, кіші болса reject қолданыңыз."
        },
        {
          id: 2,
          title: "async/await қолдану",
          description: "Бірнеше асинхронды операцияларды тізбектей орындаңыз",
          starterCode: `async function sequentialOperations() {
  // 1. Бірінші операция: 1 секунд күтіп, "Бірінші аяқталды" деп шығарыңыз
  // 2. Екінші операция: 2 секунд күтіп, "Екінші аяқталды" деп шығарыңыз
  // 3. Үшінші операция: 1 секунд күтіп, "Үшінші аяқталды" деп шығарыңыз
  
  console.log("Барлық операциялар аяқталды!");
}

sequentialOperations();`,
          expectedOutput: "Бірінші аяқталды\\nЕкінші аяқталды\\nҮшінші аяқталды\\nБарлық операциялар аяқталды!",
          hint: "await new Promise(resolve => setTimeout(resolve, уақыт)) қолданыңыз"
        },
        {
          id: 3,
          title: "API сұрау жасау",
          description: "JSONPlaceholder API арқылы деректер алыңыз",
          starterCode: `async function fetchTodo() {
  try {
    // 1. https://jsonplaceholder.typicode.com/todos/1 API-ден деректер алыңыз
    // 2. Деректерді JSON түріне түрлендіріңіз
    // 3. Төмендегі форматта шығарыңыз:
    //    "Тапсырма: [title]"
    //    "Орындалды: [completed]"
    //    "Пайдаланушы ID: [userId]"
    
  } catch (error) {
    console.log("API қатесі: " + error.message);
  }
}

fetchTodo();`,
          expectedOutput: "Тапсырма: delectus aut autem\\nОрындалды: false\\nПайдаланушы ID: 1",
          hint: "fetch().then(response => response.json()) қолданыңыз"
        }
      ],
      tests: [
        {
          id: 1,
          question: "Promise қандай үш күйде бола алады?",
          type: "multiple",
          options: [
            "Түйінделу (pending)",
            "Орындалу (fulfilled)", 
            "Қате (rejected)",
            "Аяқталған (finished)"
          ],
          correctAnswers: [0, 1, 2],
          explanation: "Promise түйінделу, орындалу немесе қате күйлерінде бола алады"
        },
        {
          id: 2,
          question: "async функция әрқашан қайтарады:",
          type: "single",
          options: [
            "Promise",
            "Объект",
            "Массив", 
            "Тіркес"
          ],
          correctAnswer: 0,
          explanation: "async функция әрқашан Promise қайтарады, тіпті ол басқа типтегі мән қайтарса да"
        },
        {
          id: 3,
          question: "Төмендегі кодтың нәтижесі не болады?\nasync function test() {\n  return 'Сәлем!';\n}\ntest().then(console.log);",
          type: "single",
          options: [
            "Сәлем!",
            "Promise {<resolved>: 'Сәлем!'}",
            "undefined",
            "Қате"
          ],
          correctAnswer: 0,
          explanation: "async функция Promise қайтарса да, .then() арқылы оның мәніне қол жеткізуге болады"
        },
        {
          id: 4,
          question: "fetch() функциясы қайтарады:",
          type: "single",
          options: [
            "Promise",
            "JSON объект",
            "Тіркес",
            "Массив"
          ],
          correctAnswer: 0,
          explanation: "fetch() функциясы Response объектісін қамтитын Promise қайтарады"
        },
        {
          id: 5,
          question: "Қайсысы дұрыс async функцияны анықтайды?",
          type: "multiple",
          options: [
            "async function myFunc() {}",
            "const myFunc = async function() {}",
            "const myFunc = async () => {}",
            "function async myFunc() {}"
          ],
          correctAnswers: [0, 1, 2],
          explanation: "Бірінші үш әдіс дұрыс, соңғысы қате синтаксис"
        }
      ]
    }
  },
  "dom-manipulation": {
    id: "dom-manipulation",
    title: "DOM Манипуляциясы",
    description: "Web беттерін динамикалық түрде өзгерту",
    level: "Орташа",
    color: "#4ecdc4",
    content: {
      theory: `
        DOM (Document Object Model) - веб-беттің құрылымдық көрінісі.
        Бұл HTML құжатының объектілік көрінісі, оны JavaScript арқылы өзгертуге болады.
        
        Негізгі операциялар:
        • Элементтерді табу
        • Элементтерді өзгерту
        • Жаңа элементтер қосу
        • Элементтерді жою
        • Оқиғаларды басқару
        • Стильдерді өзгерту

        DOM манипуляциясы интерактивті веб-қосымшалар жасау үшін негіз болып табылады.
      `,
      codeExamples: [
        {
          title: "Элементтерді табу және өзгерту",
          code: `// Элементтерді табу
let header = document.getElementById('main-header');
let paragraphs = document.getElementsByClassName('text');
let firstDiv = document.querySelector('div.container');
let allButtons = document.querySelectorAll('button');

// Элементтерді өзгерту
if (header) {
  header.textContent = "Жаңа тақырып";
  header.style.color = "blue";
  header.classList.add('highlight');
}

// Атрибуттарды өзгерту
let image = document.querySelector('img');
if (image) {
  image.setAttribute('alt', 'Сурет сипаттамасы');
  image.src = 'new-image.jpg';
}`,
          result: "Элементтер өзгертілді"
        },
        {
          title: "Жаңа элемент қосу",
          code: `// Жаңа элемент жасау
let newDiv = document.createElement('div');
newDiv.innerHTML = '<p>Бұл жаңа параграф</p>';
newDiv.className = 'new-element';
newDiv.style.border = '2px solid green';
newDiv.style.padding = '10px';

// Элементті қосу
document.body.appendChild(newDiv);

// Басқа элементке қосу
let container = document.querySelector('.container');
if (container) {
  let newButton = document.createElement('button');
  newButton.textContent = 'Жаңа түйме';
  newButton.onclick = function() {
    alert('Түйме басылды!');
  };
  container.appendChild(newButton);
}`,
          result: "Жаңа элементтер қосылды"
        },
        {
          title: "Оқиғаларды басқару",
          code: `// Түймеге оқиға тыңдаушысын қосу
let button = document.querySelector('#myButton');

function handleClick() {
  console.log('Түйме басылды!');
  this.style.backgroundColor = 'green';
}

function handleMouseOver() {
  this.style.transform = 'scale(1.1)';
}

function handleMouseOut() {
  this.style.transform = 'scale(1)';
}

if (button) {
  button.addEventListener('click', handleClick);
  button.addEventListener('mouseover', handleMouseOver);
  button.addEventListener('mouseout', handleMouseOut);
}

// Форма оқиғалары
let form = document.querySelector('#myForm');
if (form) {
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Форманың әдеттегі әрекетін тоқтату
    let input = this.querySelector('input');
    console.log('Енгізілген мән:', input.value);
  });
}`,
          result: "Оқиғалар бапталды"
        },
        {
          title: "Динамикалық тізім",
          code: `// Тізім элементтерін динамикалық түрде басқару
let itemList = document.getElementById('itemList');
let addButton = document.getElementById('addItem');
let clearButton = document.getElementById('clearList');

let itemCount = 0;

function addListItem() {
  itemCount++;
  let newItem = document.createElement('li');
  newItem.textContent = 'Элемент ' + itemCount;
  newItem.className = 'list-item';
  
  // Жою түймесін қосу
  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'Жою';
  deleteButton.onclick = function() {
    newItem.remove();
  };
  
  newItem.appendChild(deleteButton);
  itemList.appendChild(newItem);
}

function clearList() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  itemCount = 0;
}

// Түймелерге оқиғаларды қосу
if (addButton && clearButton) {
  addButton.addEventListener('click', addListItem);
  clearButton.addEventListener('click', clearList);
}`,
          result: "Тізім басқару функциялары әзірленді"
        }
      ],
      terminologies: [
        {
          term: "DOM (Document Object Model)",
          definition: "HTML құжатының объектілік көрінісі. Веб-беттің құрылымдық моделі ретінде әрекет етеді және программалық түрде өзгертуге мүмкіндік береді."
        },
        {
          term: "Event Listener",
          definition: "Пайдаланушы әрекеттерін (тышқан, перне, т.б.) тыңдайтын функция. addEventListener() әдісі арқылы қосылады."
        },
        {
          term: "Query Selector",
          definition: "CSS селекторлары арқылы элементтерді табу әдісі. querySelector() бірінші сәйкес келетін элементті, querySelectorAll() барлық сәйкес келетін элементтерді қайтарады."
        },
        {
          term: "Event Bubbling",
          definition: "Оқиғаның элементтен оның ата-ана элементтеріне таралу процесі. Оқиға ең ішкі элементтен басталып, сыртқы элементтерге дейін жетеді."
        },
        {
          term: "Event Delegation",
          definition: "Бір ата-ана элементке оқиға тыңдаушысын қосып, оның бала элементтерінің оқиғаларын өңдеу әдісі. Динамикалық контентпен жұмыс істеуге ыңғайлы."
        }
      ],
      exercises: [
        {
          id: 1,
          title: "Элемент жасау және қосу",
          description: "Жаңа карточка элементін жасап, оны бетке қосыңыз",
          starterCode: `// 1. Жаңа div элементін жасаңыз
// 2. Оның ішіне тақырып (h3), сипаттама (p) және түйме (button) қосыңыз
// 3. Стильдерді орнатыңыз (border, padding, margin, background)
// 4. Элементті body-ге қосыңыз
// 5. Түймеге оқиға тыңдаушысын қосыңыз

function createCard() {
  // Код жазыңыз
}

createCard();`,
          expectedOutput: "Жаңа карточка жасалып, бетке қосылды",
          hint: "document.createElement(), element.appendChild(), element.style, addEventListener() қолданыңыз"
        },
        {
          id: 2,
          title: "Тізім басқару",
          description: "Элементтерді қосу/жою мүмкіндігі бар тізім жасаңыз",
          starterCode: `let todoList = document.getElementById('todoList');
let addButton = document.getElementById('addTodo');
let todoInput = document.getElementById('todoInput');

function addTodo() {
  // 1. input-тан мәнді алыңыз
  // 2. Егер мән бос болмаса, жаңа тізім элементін жасаңыз
  // 3. Әр элементке жою түймесін қосыңыз
  // 4. Тізімге қосыңыз
  // 5. Input-ты тазалаңыз
}

function removeTodo(element) {
  // Элементті тізімнен жойыңыз
}

// Оқиға тыңдаушыларын қосыңыз`,
          expectedOutput: "Тізім басқару функциялары әзірленді",
          hint: "element.value, element.remove(), event.preventDefault() қолданыңыз"
        },
        {
          id: 3,
          title: "Форманы тексеру",
          description: "Пайдаланушы формасын тексеру функциясын жазыңыз",
          starterCode: `let contactForm = document.getElementById('contactForm');

function validateForm(event) {
  event.preventDefault();
  
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let message = document.getElementById('message').value;
  
  let errors = [];
  
  // Валидация ережелерін жазыңыз:
  // 1. Аты кемінде 2 таңбадан тұруы керек
  // 2. Электронды пошта @ белгісін қамтуы керек
  // 3. Хабар кемінде 10 таңбадан тұруы керек
  
  if (errors.length > 0) {
    // Қателерді көрсету
  } else {
    // Форманы жіберу
    console.log("Форма сәтті жіберілді!");
    event.target.reset();
  }
}

// Формаға оқиға тыңдаушысын қосыңыз`,
          expectedOutput: "Форма тексеру функциясы әзірленді",
          hint: "string.length, string.includes(), array.push() қолданыңыз"
        }
      ],
      tests: [
        {
          id: 1,
          question: "Элементті ID бойынша табу үшін қай әдіс қолданылады?",
          type: "single",
          options: [
            "getElementById()",
            "querySelector()", 
            "getElementsByClassName()",
            "findElement()"
          ],
          correctAnswer: 0,
          explanation: "getElementById() әдісі элементті ID бойынша табады"
        },
        {
          id: 2,
          question: "Жаңа элемент қосу үшін қай әдіс қолданылады?",
          type: "multiple",
          options: [
            "appendChild()",
            "insertBefore()",
            "append()",
            "addElement()"
          ],
          correctAnswers: [0, 1, 2],
          explanation: "appendChild(), insertBefore() және append() әдістері жаңа элемент қосу үшін қолданылады"
        },
        {
          id: 3,
          question: "Төмендегі код не істейді?\ndocument.querySelector('button').addEventListener('click', function() {\n  console.log('Тышқан басылды');\n});",
          type: "single",
          options: [
            "Бірінші түймеге тышқан басу оқиғасын қосады",
            "Барлық түймелерге оқиғаны қосады",
            "Қате шығарады",
            "Ештеңе істемейді"
          ],
          correctAnswer: 0,
          explanation: "querySelector() бірінші сәйкес келетін элементті табады"
        },
        {
          id: 4,
          question: "Event bubbling деген не?",
          type: "single",
          options: [
            "Оқиғаның ішкі элементтен сыртқы элементтерге таралуы",
            "Оқиғаның сыртқы элементтен ішкі элементтерге таралуы",
            "Бір уақытта бірнеше оқиғаларды өңдеу",
            "Оқиғаны тоқтату"
          ],
          correctAnswer: 0,
          explanation: "Event bubbling - оқиғаның ішкі элементтен басталып, ата-ана элементтерге таралу процесі"
        },
        {
          id: 5,
          question: "Қайсысы дұрыс элемент стилін өзгертеді?",
          type: "multiple",
          options: [
            "element.style.color = 'red';",
            "element.style.backgroundColor = 'blue';",
            "element.style = 'color: red;';",
            "element.css('color', 'red');"
          ],
          correctAnswers: [0, 1],
          explanation: "style қасиеті арқылы тікелей стильдерді өзгертуге болады"
        }
      ]
    }
  }
};