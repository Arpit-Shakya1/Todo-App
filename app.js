let tasksData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const columns = [todo, progress, done];

let dragElement = null;

// Save tasks to localStorage
function saveTasks() {
    tasksData = {};

    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");

        tasksData[col.id] = Array.from(tasks).map(task => ({
            title: task.querySelector("h2").innerText,
            desc: task.querySelector("p").innerText
        }));

        const count = col.querySelector(".right");
        if (count) {
            count.innerText = tasks.length;
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasksData));
}

// Add drag events
function addTaskDragEvents(task) {
    task.addEventListener("dragstart", () => {
        dragElement = task;
    });

    task.addEventListener("dragend", () => {
        dragElement = null;
    });
}

// Create task element
function createTask(title, desc) {
    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button class="delete-btn">Delete</button>
    `;

    addTaskDragEvents(div);

    div.querySelector(".delete-btn").addEventListener("click", () => {
        div.remove();
        saveTasks();
    });

    return div;
}

// Load tasks from localStorage
if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));

    for (const col in data) {
        const column = document.querySelector(`#${col}`);

        if (!column) continue;

        data[col].forEach(task => {
            const taskElement = createTask(task.title, task.desc);
            column.appendChild(taskElement);
        });
    }
}

// Make columns droppable
function addDragEvent(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    column.addEventListener("dragleave", () => {
        column.classList.remove("hover-over");
    });

    column.addEventListener("drop", (e) => {
        e.preventDefault();

        if (dragElement) {
            column.appendChild(dragElement);
            saveTasks();
        }

        column.classList.remove("hover-over");
    });
}

columns.forEach(column => addDragEvent(column));

// Update counts on page load
saveTasks();

// Modal Elements
const toggleModalButton = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".bg");
const addTaskButton = document.querySelector("#add-new-task");

// Open Modal
toggleModalButton.addEventListener("click", () => {
    modal.classList.add("active");
});

// Close Modal
modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});

// Add New Task
addTaskButton.addEventListener("click", () => {
    const taskTitle = document
        .querySelector("#task-title-input")
        .value.trim();

    const taskDesc = document
        .querySelector("#task-desc-input")
        .value.trim();

    if (taskTitle === "") {
        alert("Please enter task title");
        return;
    }

    const taskElement = createTask(taskTitle, taskDesc);

    todo.appendChild(taskElement);

    saveTasks();

    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-desc-input").value = "";

    modal.classList.remove("active");
});