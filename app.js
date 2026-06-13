const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const tasks = document.querySelectorAll(".task");

let dragElement = null;

// Drag start event
tasks.forEach(task => {
    task.addEventListener("dragstart", () => {
        dragElement = task;
    });

    task.addEventListener("dragend", () => {
        dragElement = null;
    });
});

function addDragEvent(column) {

    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", (e) => {
        column.classList.remove("hover-over");
    });

    column.addEventListener("dragover", (e) => {
        e.preventDefault(); // Drop allow karne ke liye zaroori
    });

    column.addEventListener("drop", (e) => {
        e.preventDefault();

        if (dragElement) {
            column.appendChild(dragElement);
        }

        column.classList.remove("hover-over");
    });
}

addDragEvent(todo);
addDragEvent(progress);
addDragEvent(done);