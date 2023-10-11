// Імпортуємо бібліотеку flatpickr і її стилі
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Імпортуємо бібліотеку Notiflix
import Notiflix from "notiflix";

// Отримуємо елементи інтерфейсу
const [input, button, timer, ...fields] = [
  "#datetime-picker",
  "[data-start]",
  ".timer",
  ".field .value",
].map(selector => document.querySelector(selector));

button.disabled = true;

// Створюємо змінну для ідентифікатора інтервалу
let intervalId = null;

// Створюємо об'єкт параметрів для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen() {
    // Зупиняємо таймер, коли вікно вибору дати відкрите
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  },
  onClose([selectedDate]) { // деструктуризація масиву selectedDates
    // Перевіряємо, чи дата в майбутньому
    if (selectedDate.getTime() > Date.now()) {
      // Активуємо кнопку "Start"
      button.disabled = false;
      // Зберігаємо обрану дату в атрибуті кнопки
      button.setAttribute("data-endtime", selectedDate.getTime());
    } else {
      // Показуємо повідомлення про помилку
      Notiflix.Notify.Failure('Please choose a date in the future');
    }
  },
};

// Ініціалізуємо flatpickr на елементі input
flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// Функція для додавання нуля перед числом, якщо воно менше двох символів
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

// Функція для оновлення інтерфейсу таймера
function updateTimer({ days = '00', hours = '00', minutes = '00', seconds = '00' }) {
    // Отримуємо масив значень часових одиниць
    const values = [days.toString(), hours.toString(), minutes.toString(), seconds.toString()].map(addLeadingZero);

    // Об'єднуємо значення у формат xx:xx:xx:xx
    const timeString = values.join(':');

    // Виводимо рядок часу на таймер
    timer.textContent = timeString;
}

// Функція для запуску таймера
function startTimer() {
    // Отримуємо кінцевий час з атрибута кнопки
    const endTime = Number(button.getAttribute("data-endtime"));

    // Створюємо функцію для виконання на кожному кроці інтервалу
    function step() {
        // Обчислюємо залишок часу до кінцевого часу в мілісекундах
        const deltaTime = endTime - Date.now();
        const time = convertMs(deltaTime);

        updateTimer(time);

        if (deltaTime <= 0) {
            // Зупиняємо таймер
            clearInterval(intervalId);
            intervalId = null;
            // Оновлюємо інтерфейс таймера до 00:00:00:00
            updateTimer({});
        }
    }

    // Викликаємо функцію кроку один раз перед запуском інтервалу
    step();

    // Запускаємо інтервал з кроком в одну секунду
    intervalId = setInterval(step, 1000);
}

// Додаємо слухача події на кнопку "Start"
button.addEventListener("click", startTimer);
