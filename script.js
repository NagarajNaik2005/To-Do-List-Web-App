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
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Show toast popup
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;

  if (type === "success") toast.style.background = "green";
  if (type === "error") toast.style.background = "red";

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 2000);
}

// Create a new task
function createTask(taskText, isCompleted = false) {
  const li = document.createElement('li');

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  if (isCompleted) {
    checkbox.checked = true;
    li.classList.add("completed");
  }

  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed', checkbox.checked);
    saveTasks();
  });

  // Task text
  const span = document.createElement("span");
  span.textContent = taskText;

  // Remove button
  const removeBtn = document.createElement('button');
  removeBtn.textContent = "X";
  removeBtn.classList.add('remove-btn');
  removeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    taskList.removeChild(li);
    saveTasks();
    showToast("Task deleted ❌", "error");
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(removeBtn);
  taskList.appendChild(li);
  saveTasks();
}

// Add new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTask(taskText);
  taskInput.value = "";

  showToast("Task added successfully ✅", "success");
}

// Events
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === "Enter") addTask();
});
