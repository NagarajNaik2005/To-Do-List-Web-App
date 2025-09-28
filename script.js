const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load saved tasks from localStorage
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => createTask(task.text, task.completed));
};

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector(".task-text").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Create a task with checkbox
function createTask(taskText, isCompleted = false) {
  const li = document.createElement('li');

  // Checkbox
  const checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.checked = isCompleted;

  // Task text
  const span = document.createElement('span');
  span.textContent = taskText;
  span.classList.add("task-text");

  // Apply completed style if already done
  if (isCompleted) li.classList.add("completed");

  // Toggle complete when checkbox changes
  checkbox.addEventListener('change', () => {
    li.classList.toggle("completed", checkbox.checked);
    saveTasks();
  });

  // Remove button
  const removeBtn = document.createElement('button');
  removeBtn.textContent = "X";
  removeBtn.classList.add('remove-btn');
  removeBtn.addEventListener('click', () => {
    taskList.removeChild(li);
    saveTasks();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(removeBtn);
  taskList.appendChild(li);

  saveTasks();
}

// Add task handler
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;
  createTask(taskText);
  taskInput.value = "";
}

// Event listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === "Enter") addTask();
});
