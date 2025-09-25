const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load saved tasks from localStorage
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => createTask(task.text, task.completed));
};

// Function to save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to create a new task
function createTask(taskText, isCompleted = false) {
  const li = document.createElement('li');
  li.textContent = taskText;

  if (isCompleted) {
    li.classList.add("completed");
  }

  // Toggle complete on click
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  // Remove button
  const removeBtn = document.createElement('button');
  removeBtn.textContent = "X";
  removeBtn.classList.add('remove-btn');
  removeBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent toggle
    taskList.removeChild(li);
    saveTasks();
  });

  li.appendChild(removeBtn);
  taskList.appendChild(li);
  saveTasks();
}

// Function to handle add button
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return; // ignore empty input

  createTask(taskText);
  taskInput.value = ""; // clear input
}

// Event listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === "Enter") addTask();
});
