// Section date
const dayOfWeek = document.querySelector('.dayOfWeek');
const currentDate = document.querySelector('.currentDate');

// Section Filter
const allFilterBtn = document.querySelector('.allFilterBtn');
const activeFilterBtn = document.querySelector('.activeFilterBtn');
const completedFilterBtn = document.querySelector('.completedFilterBtn');

// Получаем день недели
const date = new Date();
const options = { 
  weekday: 'long' 
};

// Получаем текущее число и месяц
const dateOfMonth = new Date();
const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

const dayOfMonth = date.getDate(); // Получить число месяца (от 1 до 31)
const monthName = months[date.getMonth()]; // Получить название месяца (месяцы нумеруются от 0 до 11)

// Меняем день недели и дату на текущую через событие при загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
  dayOfWeek.textContent = date.toLocaleString('en-US', options);
  currentDate.textContent = `${dayOfMonth} ${monthName}`;
})