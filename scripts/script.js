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
const cancelTaskBtn = document.querySelector('#cancelBtn');
const toDolistInner = document.querySelector('.toDolistInner'); // родитель, где будет рендерится таск

// Открываем модальное окно
const createNewTaskBtn = document.querySelector('.createNewTaskBtn'); // Кнопка внизу экрана, которая открывает модальное окно
const modalOverlay = document.querySelector('.modalOverlay'); // Элемент overlay - темный экран под модальным окном
const modal = document.querySelector('.modal'); // Само модальное окно

// Достаем параграф дпты и текста у таска
const toDolistItemRightDate = document.querySelector('.toDolistItemRightDate');
const toDolistItemRightTask = document.querySelector('.toDolistItemRightTask');

// Достаем данные для изменения состояния таска
const checkboxInput = document.querySelector('.checkboxInput');
const toDolistItemRight = document.querySelector('.toDolistItemRight');

// Читаем таски из localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Создаем переменную currentFilter и присваиваем строку all
let currentFilter = 'all';

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
  renderTasks();
});

// Событие при клике на Create Task, открываем модальное окно
createNewTaskBtn.addEventListener('click', () => {
  // при клике на кнопку Create Task карандашик, в углу жкрана, открываем модальное окно
  modalOverlay.classList.remove('hidden');
  modal.classList.remove('hidden');
});

// Функция, которая создает таски
function createTask() {
  // Получаем данные value из инпутов
  const descriptionInputValue = descriptionTaskInput.value.trim();
  const dateInputValue = dateTaskInput.value.trim();
  
  // Если данные инпутов таск и даты возвращают true, создаем новый объект
  if (descriptionInputValue && dateInputValue) {
    const newTask = {
      id: String(Math.random()),
      title: descriptionInputValue,
      date: dateInputValue,
      completed: false,
    };

    // Пушим объект в массив
    tasks.push(newTask);
    // Сохраняем объект в localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Делаем ресет для формы, после отправки данных
    taskForm.reset();
  }
}

// Функция, которая рендерит таски
function renderTasks() {
  toDolistInner.innerHTML = '';

  // Получаем массив тасков
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Фильтрация
  let filteredTasks = tasks.filter((task) => {
    if (currentFilter === 'active') return task.completed === false;
    if (currentFilter === 'completed') return task.completed === true;
    return true; // all
  });

  // Рендерим только отфильтрованные таски
  filteredTasks.forEach((task) => {
    // Создаем div
    const taskEl = document.createElement('div');
    // Даем ему класс toDolistItem
    taskEl.classList.add('toDolistItem');
    // Добавляем data-id внутрь элемента, чтобы находить таск по id (при клике, при удалении, при чекбоксе)
    taskEl.dataset.id = task.id;

    // Создаем разметку для рендера таска
    taskEl.innerHTML = `
      <div class="toDolistItemLeft">
        <label class="checkbox">
          <input type="checkbox" class="taskCheckbox" ${task.completed ? 'checked' : ''}/>
          <span class="custom-checkbox"></span>
        </label>
      </div>

      <div class="toDolistItemRight ${task.completed ? 'isTaskCompleted' : ''}">
        <p class="toDolistItemRightDate">${task.date}</p>
        <p class="toDolistItemRightTask">${task.title}</p>
      </div>
    `;

    // Рендерим таск в самое начало
    toDolistInner.prepend(taskEl);
  });
}

// Закрывает модальное окно
cancelTaskBtn.addEventListener('click', () => {
  modalOverlay.classList.add('hidden');
  modal.classList.add('hidden');
});

// Событие, которое добавляет таски и дату
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // const desc = descriptionTaskInput.value.trim();
  // const date = dateTaskInput.value.trim();

  // if (!desc || !date) {
  //   // можно подсветить поля
  //   if (!desc) alert('Необходимо написать таск');
  //   if (!date) alert('Необходимо выбрать дату');
  //   return; 
  // }


  createTask();
  renderTasks();

  // После того как нажимаем кнопку Add task, закрываем модальное окно
  modalOverlay.classList.add('hidden');
  modal.classList.add('hidden');
});

// Обрабатываем клик по чекбоксам
 toDolistInner.addEventListener('click', (event) => {
   //Проверяем если клинк был именно по элементу с классом taskCheckbox
   if (!event.target.classList.contains('taskCheckbox')) return;

   // Находим карточку задачи, где был клик
   const taskElement = event.target.closest('.toDolistItem');
   // Берём ID этого таска
   const taskId = taskElement.dataset.id;
   // Находим таск в массиве по id
   const task = tasks.find((t) => t.id === taskId);
   // Обновляем completed внутри JS-объекта
   task.completed = event.target.checked;
   // Сохраняем обновлённый массив в localStorage
   localStorage.setItem('tasks', JSON.stringify(tasks));
   // Находим блок с текстом
   const rightBlock = taskElement.querySelector('.toDolistItemRight');
   // Добавляем / убираем класс isTaskCompleted
   if (task.completed) {
     rightBlock.classList.add('isTaskCompleted');
   } else {
     rightBlock.classList.remove('isTaskCompleted');
   }
 })

 // Функция, которая устанавливает классы для кнопок, в соотвествии с текущим состоянием
function setActiveFilterButton(button) {
  // Находим все кнопки фильтра и перебираем каждую кнопку
  document.querySelectorAll('.filerInner button').forEach((btn) => {
    // Удаляем у каждой класс isActiveFilterBtn
    btn.classList.remove('isActiveFilterBtn');
  });
  // Добавляем этот класс на текущую кнопку
  button.classList.add('isActiveFilterBtn');
}

// Обрабатываем клик по кнопке All
allFilterBtn.addEventListener('click', () => {
  // Устанавливаем значение All
  currentFilter = 'all';
  // Вывызываем функцию выбор текущего состояния
  setActiveFilterButton(allFilterBtn);
  // Вызываем функцию рендер таска
  renderTasks();
});

// Обрабатываем клик по кнопке Active
activeFilterBtn.addEventListener('click', () => {
  // Устанавливаем значение Active
  currentFilter = 'active';
  // Вывызываем функцию выбор текущего состояния
  setActiveFilterButton(activeFilterBtn);
  // Вызываем функцию рендер таска
  renderTasks();
});

// Обрабатываем клик по кнопке Completed
completedFilterBtn.addEventListener('click', () => {
  // Устанавливаем значение Completed
  currentFilter = 'completed';
  // Вывызываем функцию выбор текущего состояния
  setActiveFilterButton(completedFilterBtn);
  // Вызываем функцию рендер таска
  renderTasks();
});