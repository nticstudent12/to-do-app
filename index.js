const input = document.getElementById("input-box");
const button = document.getElementById("button");
const list = document.getElementById("list");
const tasksCounter = document.getElementById("tasks-counter");
const completionDate = document.getElementById("completion-date");
const allButton = document.getElementById("all");
const activeButton = document.getElementById("active");
const completedButton = document.getElementById("completed");
const clearCompletedButton = document.getElementById("clear-completed");

let tasks = [];

function updateTasksCounter() {
    const activeTasks = tasks.filter(task => !task.completed).length;
    tasksCounter.textContent = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} left`;
}

function updateCompletionDate() {
    const date = new Date();
    completionDate.textContent = `Last updated: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

function createTaskElement(taskText, isCompleted = false) {
    const li = document.createElement("li");
    li.innerHTML = taskText;
    if (isCompleted) li.classList.add("checked");
    
    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    
    return li;
}

function addTask() {
    if (input.value.trim() === "") {
        alert("Please enter a task");
        return;
    }
    
    const task = {
        id: Date.now(),
        text: input.value,
        completed: false
    };
    
    tasks.push(task);
    const li = createTaskElement(task.text);
    list.appendChild(li);
    
    input.value = "";
    updateTasksCounter();
    updateCompletionDate();
    saveTasks();
}

function toggleTask(taskElement) {
    const taskText = taskElement.childNodes[0].textContent;
    const task = tasks.find(t => t.text === taskText);
    if (task) {
        task.completed = !task.completed;
        taskElement.classList.toggle("checked");
        updateTasksCounter();
        updateCompletionDate();
        saveTasks();
    }
}

function deleteTask(taskElement) {
    const taskText = taskElement.childNodes[0].textContent;
    tasks = tasks.filter(task => task.text !== taskText);
    taskElement.remove();
    updateTasksCounter();
    updateCompletionDate();
    saveTasks();
}

function filterTasks(filter) {
    list.innerHTML = '';
    let filteredTasks = tasks;
    
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    filteredTasks.forEach(task => {
        const li = createTaskElement(task.text, task.completed);
        list.appendChild(li);
    });
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    filterTasks('all');
    updateTasksCounter();
    updateCompletionDate();
    saveTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        filterTasks('all');
        updateTasksCounter();
        updateCompletionDate();
    }
}

// Event Listeners
button.addEventListener("click", addTask);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

list.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        toggleTask(e.target);
    } else if (e.target.tagName === "SPAN") {
        deleteTask(e.target.parentElement);
    }
});

allButton.addEventListener("click", () => {
    document.querySelector(".filters .active")?.classList.remove("active");
    allButton.classList.add("active");
    filterTasks('all');
});

activeButton.addEventListener("click", () => {
    document.querySelector(".filters .active")?.classList.remove("active");
    activeButton.classList.add("active");
    filterTasks('active');
});

completedButton.addEventListener("click", () => {
    document.querySelector(".filters .active")?.classList.remove("active");
    completedButton.classList.add("active");
    filterTasks('completed');
});

clearCompletedButton.addEventListener("click", clearCompleted);

// Initialize app
loadTasks();