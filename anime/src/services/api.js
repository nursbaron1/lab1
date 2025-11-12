const API_BASE_URL = 'https://js-course.vercel.app/api';

// Жалпы API функциясы
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API қатесі: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API қатесі:', error);
    throw error;
  }
};

// API функциялары
export const apiService = {
  // Курстарды алу
  getCourses: () => apiRequest('/courses'),
  
  // Бір курс алу - БҰЛ ЖОҚ ЕДІ!
  getCourse: (id) => apiRequest(`/courses/${id}`),
  
  // Сабақтарды алу
  getLessons: () => apiRequest('/lessons'),
  
  // Тесттерді алу
  getTests: () => apiRequest('/tests'),
  
  // Бір тест алу
  getTest: (id) => apiRequest(`/tests/${id}`),
  
  // Тіркелу
  register: (userData) => 
    apiRequest('/auth/register', { 
      method: 'POST', 
      body: JSON.stringify(userData) 
    }),
  
  // Кіру
  login: (credentials) => 
    apiRequest('/auth/login', { 
      method: 'POST', 
      body: JSON.stringify(credentials) 
    }),
  
  // Тест нәтижесін жіберу
  submitTest: (testId, answers) => 
    apiRequest(`/tests/${testId}/submit`, {
      method: 'POST',
      body: JSON.stringify(answers)
    })
};

// Ескі кодпен үйлесімділік үшін
export const coursesAPI = {
  getCourses: () => apiRequest('/courses'),
  getCourse: (id) => apiRequest(`/courses/${id}`) // БҰЛ ЖОҚ ЕДІ!
};

export const lessonsAPI = {
  getLessons: () => apiRequest('/lessons')
};

export const testsAPI = {
  getTests: () => apiRequest('/tests'),
  getTest: (id) => apiRequest(`/tests/${id}`),
  submitTest: (testId, answers) => 
    apiRequest(`/tests/${testId}/submit`, {
      method: 'POST',
      body: JSON.stringify(answers)
    })
};

export default apiService;



