window.onload = loadTasks;

const toDo = document.getElementById("toDo");
const addTaskTD = document.getElementById("addTaskTD");
const addTaskIP = document.getElementById("addTaskIP");
const addTaskNR = document.getElementById("addTaskNR");
const addTaskDone = document.getElementById("addTaskDone");
const inputAreaTD = document.getElementById("inputAreaTD");
const inputTitleTD = document.getElementById("inputTitleTD");
const inputDescriptionTD = document.getElementById("inputDescriptionTD");
const inputSaveTD = document.getElementById("inputSaveTD");
const inputTitleIP = document.getElementById("inputTitleIP");
const inputDescriptionIP = document.getElementById("inputDescriptionIP");
const inputSaveIP = document.getElementById("inputSaveIP");
const inputTitleNR = document.getElementById("inputTitleNR");
const inputDescriptionNR = document.getElementById("inputDescriptionNR");
const inputSaveNR = document.getElementById("inputSaveNR");
const inputTitleDone = document.getElementById("inputTitleDone");
const inputDescriptionDone = document.getElementById("inputDescriptionDone");
const inputSaveDone = document.getElementById("inputSaveDone");


const addTaskButtons = document.querySelectorAll(".addTaskButton");
const saveTasks = document.querySelectorAll("saveTask");
const inputDescriptions = document.querySelectorAll("inputDescription");
const inputTitles = document.querySelectorAll("inputTitle")

class Task {
  constructor(title, description, status, id) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.items = this.items;
    this.users = this.users;
    this.id = id || Math.floor(Math.random() * 100000);
  }

  addTask() {
    //task card
    const task = document.createElement("div");
    task.classList.add("tasks", "card");
    task.id = `task${this.id}`;
    //task content
    const header = document.createElement('div')
    header.classList.add('taskHead')
    const title = document.createElement("h4");
    title.textContent = this.title;
        //menu drop down
    const menuButton = document.createElement("i");
    menuButton.classList.add("fa-solid", "fa-ellipsis-vertical", "menuButton");
    const menu = document.createElement("div");
    menu.classList.add("toggleDisplay", "menu");
    menu.id = `menu${this.id}`;
        //menu content
    const edit = document.createElement("p");
    edit.textContent = "Edit Task";
    edit.id = `edit${this.id}`;
    const trash = document.createElement("p");
    trash.textContent = "Discard Task";
    menu.appendChild(edit);
    menu.appendChild(trash);
    //content continued
    const taskDescription = document.createElement("p");
    taskDescription.textContent = this.description;
    //append content to header
    header.appendChild(title)
    header.appendChild(menuButton)
    header.appendChild(menu);
    //append content to card
    task.appendChild(header);
    task.appendChild(taskDescription);
    //append card to DOM
    document.getElementById(`${this.status}`).appendChild(task);
    //Add event listener to menu button
    menuButton.addEventListener("click", function () {
      menu.classList.toggle("toggleDisplay");
    });
    //Add event listener to edit and delete buttons
    edit.addEventListener("click", () => {
      this.editTask(task);
    });
    trash.addEventListener("click", () => {
      this.removeTask(task);
    });
  }

  saveTask() {
    let tasks = JSON.parse(localStorage.getItem(`tasks`)) || [];
    tasks.push({
      id: this.id,
      status: this.status,
      title: this.title,
      description: this.description,
    });

    localStorage.setItem(`tasks`, JSON.stringify(tasks));
  }

  editTask() {
    //set editor values to current task values. 

    //open editor
  }

  removeTask(domElement) {
    //remove from storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const index = tasks.findIndex((taskData) => taskData.id === this.id);

    if (index !== -1) {
      tasks.splice(index, 1);
    }
    console.log(tasks);

    localStorage.setItem(`tasks`, JSON.stringify(tasks));

    //remove dom Element
    if (domElement) {
      domElement.remove();
    }
  }

  moveTask() {}
}

let idEnding;

addTaskButtons.forEach(taskButton => {
  taskButton.addEventListener('click', function(){
    const parentDiv = taskButton.parentElement;
    const inputArea = parentDiv.querySelector('.inputArea')

    console.log(inputArea)
    inputArea.classList.toggle("toggleDisplay");
    taskButton.classList.toggle("toggleDisplay");
  })
})

// addTaskTD.addEventListener("click", function () {
//   idEnding = "TD";
//   toggleTaskInput(idEnding);
// });

// addTaskIP.addEventListener("click", function () {
//   idEnding = "IP";
//   toggleTaskInput(idEnding);
// });

// addTaskNR.addEventListener("click", function () {
//   idEnding = "NR";
//   toggleTaskInput(idEnding);
// });

// addTaskDone.addEventListener("click", function () {
//   idEnding = "Done";
//   toggleTaskInput(idEnding);
// });

// function toggleTaskInput(idKey) {
//   const inputArea = document.getElementById(`inputArea${idKey}`);
//   inputArea.classList.toggle("toggleDisplay");
//   document.getElementById(`addTask${idKey}`).classList.toggle("toggleDisplay");
// }

//Save Task by Section

saveTasks.forEach(saveButton => {
  saveButton.addEventListener('click', function(){
    const title = saveButton.closest('.inputTitle');
    const description = saveButton.closest('.inputDescription');
    const status = saveButton.parentElement.parentElement.id
    
    let newTask = new Task(title, description, status)
    console.log(newTask);

    //toggle display??
    newTask.addTask();
    newTask.saveTask();

    //empty the input area
    saveButton.closest('.inputTitle').value = '';
    saveButton.closest('.inputDescription').value = '';
  })
})

inputSaveTD.addEventListener("click", function () {
  let title = inputTitleTD.value;
  let description = inputDescriptionTD.value;
  let status = "toDo";
  let toDoTask = new Task(title, description, status);
  console.log(toDoTask);

  toggleTaskInput("TD");
  toDoTask.addTask();
  toDoTask.saveTask();

  //empty input area
  inputTitleTD.value = "";
  inputDescriptionTD.value = "";
});

inputSaveIP.addEventListener("click", function () {
  let title = inputTitleIP.value;
  let description = inputDescriptionIP.value;
  let status = "inProgress";
  let inProgressTask = new Task(title, description, status);
  console.log(inProgressTask);

  toggleTaskInput("IP");
  inProgressTask.addTask();
  inProgressTask.saveTask();

  //empty input area
  inputTitleIP.value = "";
  inputDescriptionIP.value = "";
});

inputSaveNR.addEventListener("click", function () {
  let title = inputTitleNR.value;
  let description = inputDescriptionNR.value;
  let status = "needsReview";
  let needsReviewTask = new Task(title, description, status);
  console.log(needsReviewTask);

  toggleTaskInput("NR");
  needsReviewTask.addTask();
  needsReviewTask.saveTask();

  //empty input area
  inputTitleNR.value = "";
  inputDescriptionNR.value = "";
});

inputSaveDone.addEventListener("click", function () {
  let title = inputTitleDone.value;
  let description = inputDescriptionDone.value;
  let status = "done";
  let doneTask = new Task(title, description, status);
  console.log(doneTask);

  toggleTaskInput("Done");
  doneTask.addTask();
  doneTask.saveTask();

  //empty input area
  inputTitleDone.value = "";
  inputDescriptionDone.value = "";
});

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((taskData) => {
    let loadTask = new Task(
      taskData.title,
      taskData.description,
      taskData.status,
      taskData.id
    );
    loadTask.addTask();
  });
}
