let tasksData = {}
const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

let dragElement = null;

// Existing tasks ke liye drag events
document.querySelectorAll(".task").forEach(task => {
    addTaskDragEvents(task);
});

// Function to add drag events
function addTaskDragEvents(task) {
    task.addEventListener("dragstart", () => {
        dragElement = task;
    });

    task.addEventListener("dragend", () => {
        dragElement = null;
    });
}

// Function to make column droppable
function addDragEvent(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", () => {
        column.classList.remove("hover-over");
    });

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    column.addEventListener("drop", (e) => {
        e.preventDefault();

        if (dragElement) {
            column.appendChild(dragElement);
        }

        column.classList.remove("hover-over");
        [todo ,progress,done].forEach(col=>{
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");
            count.innerText = tasks.length;
        })
    });
}

addDragEvent(todo);
addDragEvent(progress);
addDragEvent(done);

// Modal Elements
const toggleModalButton = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".bg");
const addTaskButton = document.querySelector("#add-new-task");

// Open Modal
toggleModalButton.addEventListener("click", () => {
    modal.classList.add("active");
});

// Close Modal on background click
modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});

// Add New Task
addTaskButton.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title-input").value.trim();
    const taskDesc = document.querySelector("#task-desc-input").value.trim();

    if (taskTitle === "") {
        alert("Please enter task title");
        return;
    }

    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h2>${taskTitle}</h2>
        <p>${taskDesc}</p>
        <button class="delete-btn">Delete</button>
    `;

    // Drag events add karo
    addTaskDragEvents(div);
     [todo ,progress,done].forEach(col=>{
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");
            count.innerText = tasks.length;
        })


    // Delete button
    div.querySelector(".delete-btn").addEventListener("click", () => {
        div.remove();
    });

    // Todo column me add karo
    todo.appendChild(div);

    // Inputs clear karo
    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-desc-input").value = "";

    // Modal close karo
    modal.classList.remove("active");
});

// Existing delete buttons ke liye
document.querySelectorAll(".task button").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.parentElement.remove();
    });
});