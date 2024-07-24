const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const submitButton = document.getElementById('submit');
const resultElement = document.getElementById('result');

let currentQuiz;
let score = 0;

// Fetch quiz data from JSON file
fetch('quizzes.json')
  .then(response => response.json())
  .then(data => {
    quizzes = data;
    startQuiz();
  });

function startQuiz() {
  // Get a random quiz
  currentQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];

  // Display the question
  questionElement.textContent = currentQuiz.question;

  // Create option elements
  optionsElement.innerHTML = '';
  currentQuiz.options.forEach((option, index) => {
    const li = document.createElement('li');
    li.textContent = option;
    li.dataset.index = index;
    optionsElement.appendChild(li);
  });
}

submitButton.addEventListener('click', () => {
  const selectedOption = document.querySelector('li.selected');
  if (selectedOption) {
    const userAnswer = selectedOption.dataset.index;
    if (userAnswer === currentQuiz.answer) {
      score++;
      resultElement.textContent = 'Correct!';
    } else {
      resultElement.textContent = 'Incorrect. The correct answer is: ' + currentQuiz.answer;
    }
    startQuiz(); // Start a new quiz
  }
});

optionsElement.addEventListener('click', event => {
  const selectedOption = event.target;
  if (selectedOption.tagName === 'LI') {
    const selectedOptions = document.querySelectorAll('li');
    selectedOptions.forEach(option => option.classList.remove('selected'));
    selectedOption.classList.add('selected');
  }
});
