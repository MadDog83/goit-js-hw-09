
// Отримуємо елементи інтерфейсу
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

// Створюємо змінну для ідентифікатора інтервалу
let intervalId = null;

// Функція для генерування випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

// Функція для запуску зміни кольору
function startChangeColor() {
  // Запускаємо інтервал з кроком в одну секунду
  intervalId = setInterval(() => {
    // Змінюємо колір фону на випадкове значення
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  // Робимо кнопку "Start" неактивною
  startButton.disabled = true;
}

// Функція для зупинки зміни кольору
function stopChangeColor() {
  // Зупиняємо інтервал
  clearInterval(intervalId);
  intervalId = null;

  // Робимо кнопку "Start" активною
  startButton.disabled = false;
}

// Додаємо слухача події на кнопку "Start"
startButton.addEventListener('click', startChangeColor);

// Додаємо слухача події на кнопку "Stop"
stopButton.addEventListener('click', stopChangeColor);
