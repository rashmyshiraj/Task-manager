const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("task-input-button");
const taskList = document.getElementById("task-list");

// Load tasks when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    addTaskToDOM(task);
    saveTask(task);

    taskInput.value = "";
}

// Add task to the UI
function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
        li.classList.add("completed");
    }

    // Toggle completion
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        updateTaskStatus(task.text);
    });

    // Delete task
    li.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        li.remove();
        deleteTask(task.text);
    });

    taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get all tasks from localStorage
function getTasks() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

// Load tasks on page load
function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(addTaskToDOM);
}

// Update completion status
function updateTaskStatus(taskText) {
    const tasks = getTasks();
    tasks.forEach(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete task from storage
function deleteTask(taskText) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
