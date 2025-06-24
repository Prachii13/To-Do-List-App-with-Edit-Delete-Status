let tasks = JSON.parse(localStorage.getItem("todos")) || [];

function saveTasks() {
  localStorage.setItem("todos", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    list.innerHTML += `
      <li>
        <span class="${task.done ? 'done' : ''}">${task.text}</span>
        <div>
          <button class="check-btn" onclick="toggleStatus(${index})">✓</button>
          <button class="edit-btn" onclick="editTask(${index})">✎</button>
          <button onclick="deleteTask(${index})">🗑</button>
        </div>
      </li>
    `;
  });
}

function addTask() {
  const input = document.getElementById("todo-input");
  if (input.value.trim() !== "") {
    tasks.push({ text: input.value, done: false });
    input.value = "";
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleStatus(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newTask = prompt("Edit your task:", tasks[index].text);
  if (newTask) {
    tasks[index].text = newTask;
    saveTasks();
    renderTasks();
  }
}

renderTasks();
