// Section date
const dayOfWeek = document.querySelector('.dayOfWeek');
const currentDate = document.querySelector('.currentDate');

// Section Filter
const allFilterBtn = document.querySelector('.allFilterBtn'); // кнока фильтрации All
const activeFilterBtn = document.querySelector('.activeFilterBtn'); // кнока фильтрации Active
const completedFilterBtn = document.querySelector('.completedFilterBtn'); // кнока фильтрации Completed

// Форма, для создания тасков
const taskForm = document.querySelector('#taskForm');
const descriptionTaskInput = document.querySelector('#descriptionInput'); // инпут таска
const dateTaskInput = document.querySelector('#dateInput'); // инпут дата
// const addTaskBtn = document.querySelector('#addBtn') // кнопка при клике будет добавляться таск
const cancelTaskBtn = document.querySelector('#cancelBtn');
const toDolistInner = document.querySelector('.toDolistInner'); // родитель, где будет рендерится таск

// Открываем модальное окно
const createNewTaskBtn = document.querySelector('.createNewTaskBtn'); // Кнопка внизу экрана, которая открывает модальное окно
const modalOverlay = document.querySelector('.modalOverlay'); // Элемент overlay - темный экран под модальным окном
const modal = document.querySelector('.modal'); // Само модальное окно

// Достаем параграф дпты и текста у таска
const toDolistItemRightDate = document.querySelector('.toDolistItemRightDate');
const toDolistItemRightTask = document.querySelector('.toDolistItemRightTask');

// Присвамваем значение value переменным


// Читаем таски из localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Ищем текущий таск
// const currentTask = tasks.find((task) => task.id === tasks.id) || null;


// Получаем день недели
const date = new Date();
const options = {
  weekday: 'long',
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
});

// Событие при клике на Create Task, открываем модальное окно
createNewTaskBtn.addEventListener('click', () => {
  // при клике на кнопку Create Task карандашик, в углу жкрана, открываем модальное окно
  modalOverlay.classList.remove('hidden');
  modal.classList.remove('hidden');
});

// Функция, которая создает таски
function createTask() {
  const descriptionInputValue = descriptionTaskInput.value.trim();
  const dateInputValue = dateTaskInput.value.trim();
  
  if (descriptionInputValue && dateInputValue) {
    const newTask = {
      id: String(Math.random()),
      title: descriptionInputValue,
      data: dateInputValue,
      completed: false,
    };

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskForm.reset();
  }
}

// Закрывает модальное окно
cancelTaskBtn.addEventListener('click', () => {
  modalOverlay.classList.add('hidden');
  modal.classList.add('hidden');
});



// Событие, которое добавляет таски и дату
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  createTask();
});
