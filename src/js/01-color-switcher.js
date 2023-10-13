// Отримуємо доступ до кнопок
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

// Встановлюємо початковий стан кнопок
startButton.disabled = false;
stopButton.disabled = true;

let intervalId = null;

// Функція для зміни кольору фону
function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

// Обробник подій для кнопки "Start"
startButton.addEventListener('click', () => {
  intervalId = setInterval(changeBackgroundColor, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
});

// Обробник подій для кнопки "Stop"
stopButton.addEventListener('click', () => {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
});

// Функція для генерації випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
