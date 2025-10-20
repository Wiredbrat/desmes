const toggler = document.querySelector('.toggler');
const sidebar = document.querySelector('.sidebar');
const todoTasks = document.querySelector('.to-do');
const addTasks = document.querySelector('.add-task');
const modal = document.querySelector('.modal');
const addTasksBtn = document.querySelector('.add-task-btn');
const writeTask = document.querySelector('.write-task');
const columns = document.querySelectorAll(".task-column");
const tasks = document.querySelectorAll(".task");

// window.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

columns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    if(e.dataTransfer.types.includes("task")) {
      e.preventDefault();
    }
  })

  column.addEventListener("drop", (e) => {
    e.preventDefault();

    const draggedTask = document.getElementById('dragged-task');
    draggedTask.remove();
    column.children[1].appendChild(draggedTask);
    // saveTasks();
  })
})

let rotated = false;
toggler?.addEventListener('click', (e) => {
  rotated = !rotated;
  toggler.style.transform = rotated ? "rotate(270deg)" : "rotate(0deg)";
  sidebar.classList.toggle('show');
})

addTasks.addEventListener('click', (e) => {
  modal.classList.add("visible");
})

addTasksBtn.addEventListener('click', addTaskToList)
document.addEventListener('keyup', (e) => {
  if(e.key == 'Enter') {
    addTaskToList();
  }
})

document.addEventListener('click', (e) => {
  if(e.target.classList.contains('modal')) {
    e.target.classList.remove('visible');
  }

  if(e.target.classList.contains('delete-btn')) {
    e.target.parentElement.remove();
  }
})

function addTaskToList() {
  if (writeTask.value.trim() === '') {
    alert('write some task to add');
    return;
  }

  const text = writeTask.value;
  writeTask.value = '';
  modal.classList.remove("visible");

  const newTask = document.createElement("li");
  newTask.setAttribute("draggable", "true");
  newTask.classList.add("task");
  const deleteBtn = document.createElement('div');
  deleteBtn.classList.add("delete-btn");
  deleteBtn.classList.add("transition");
  deleteBtn.innerHTML = "X";
  deleteBtn.setAttribute("title", "deleteTask");
  newTask.innerHTML = `<p>${text}</p>`;
  newTask.appendChild(deleteBtn);

  // Attach drag events to the new task
  newTask.addEventListener("dragstart", (e) => {
    newTask.id = 'dragged-task';
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("task", "");
    newTask.classList.remove(newTask.parentElement.id);
  });

  newTask.addEventListener("dragend", (e) => {
    newTask.removeAttribute("id");
    newTask.classList.add(newTask.parentElement.id);
  });

  todoTasks.appendChild(newTask);
  newTask.classList.add(newTask.parentElement.id);
  // saveTasks();
}

// function saveTasks() {
//   const allTasks = [];

//   columns.forEach((column) => {
//     const columnId = column.children[1].id;
//     const tasks = column.querySelectorAll(".task"); 

//     tasks.forEach((task) => {
//       allTasks.push({
//         text: task.textContent,
//         columnId: columnId
//       });
//     });
//   });

//   localStorage.setItem("tasks", JSON.stringify(allTasks));
// }

// function loadTasksFromLocalStorage() {
//   const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

//   tasks.forEach(({ text, columnId }) => {
//     const column = document.getElementById(columnId);
//     if (!column) return;

//     const taskList = column; // adjust if needed
//     const newTask = document.createElement("li");
//     newTask.classList.add("task");
//     newTask.setAttribute("draggable", "true");
//     newTask.textContent = text;

//     attachDragEvents(newTask); // make sure this is defined
//     taskList.appendChild(newTask);
//   });
// }

function attachDragEvents(task) {
  task.addEventListener("dragstart", (e) => {
    task.id = 'dragged-task';
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("task", "");
    newTask.classList.remove(newTask.parentElement.id);
  });

  task.addEventListener("dragend", () => {
    task.removeAttribute("id");
    newTask.classList.add(newTask.parentElement.id);
  });
}

