// Seleciona elementos
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Carregar tarefas salvas
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.textContent = taskText;

  // Botão de deletar
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  // Marcar como concluída
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  saveTasks();
}

// Salvar no localStorage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Carregar do localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) li.classList.add("completed");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.onclick = () => {
      li.remove();
      saveTasks();
    };

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}