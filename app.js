const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();
function loadEventListeners() {
  // Loading the tasks while loading the document
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  // Removing single list items
  taskList.addEventListener("click", removeTask);
  // Remove all tasks
  clearBtn.addEventListener("click", removeAll);
  // Filtering the list otems
  filter.addEventListener("keyup", filterTasks);
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.append(li);
  });
}

// Add a Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add a task");
  } else {
    // create a li node
    const list = document.createElement("li");
    // Add a class
    list.className = "collection-item";
    // Add a text node and append
    list.appendChild(document.createTextNode(taskInput.value));
    // Create a link item
    const link = document.createElement("a");
    // Add a class to the link
    link.className = "delete-item secondary-content";
    // Add delete icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Add the link to the li
    list.appendChild(link);
    // Add the list to the ul
    taskList.appendChild(list);

    storeTaskInLocalStorage(taskInput.value);
    // Clear the list Input
    taskInput.value = "";
    e.preventDefault();
  }
}

// persist to local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Removing tasks
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      removeElementFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
  e.preventDefault();
}

// remove element from local storage
function removeElementFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove all tasks
function removeAll(e) {
  taskList.innerHTML = "";
  // remove all tasks from local storage
  clearTasksFromLocalStorage();
  e.preventDefault();
}

// clear all tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter the list items
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
  e.preventDefault();
}
