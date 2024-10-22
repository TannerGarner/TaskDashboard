window.onload = loadTasks;

const toDo = document.getElementById("toDo");
const inProgress = document.getElementById("inProgress");
const needsReview = document.getElementById("needsReview");
const done = document.getElementById('done');
const statusSections = document.querySelectorAll('.status');

const addTaskButtons = document.querySelectorAll(".addTaskButton");
const saveTasks = document.querySelectorAll(".saveTask");
const cancelTasks = document.querySelectorAll(".cancelTask");
const inputDescriptions = document.querySelectorAll(".inputDescription");
const inputTitles = document.querySelectorAll(".inputTitle")

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
    task.id = this.id;
    task.draggable = true;
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
      this.editTask(task, edit);
    });
    trash.addEventListener("click", () => {
      this.removeTask(task);
    });
    //Add event listener to add drag and drop for element
    task.addEventListener('dragstart', function(event){
      event.dataTransfer.setData('text', event.target.id);
    })
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

  editTask(task, editButton) {
    //set editor values to current task values. 
    let sectionDiv = editButton.parentElement.parentElement.parentElement.parentElement;
    let inputArea = sectionDiv.querySelector('.inputArea');
    inputArea.querySelector('.inputTitle').value = this.title
    inputArea.querySelector('.inputDescription').value = this.description

    //delete current task
    this.removeTask(task);

    //open editor, toggle displays
    let addButton = sectionDiv.querySelector('.addTaskButton');
    toggleDisplay(inputArea, addButton);
  }

  removeTask(domElement) {
    //remove from storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const index = tasks.findIndex((taskData) => taskData.id === this.id);

    if (index !== -1) {
      tasks.splice(index, 1);
    }

    localStorage.setItem(`tasks`, JSON.stringify(tasks));

    //remove dom Element
    if (domElement) {
      domElement.remove();
    }
  }

  // moveTask() {
  //   let task = document.getElementById(this.id);

  //   task.addEventListener('dragstart', function(event) {
  //     event.dataTransfer.setData('text', event.target.id);
  //   })


  // }
}

function toggleDisplay (inputArea, addButton){
  inputArea.classList.toggle("toggleDisplay");
  addButton.classList.toggle("toggleDisplay")
}

addTaskButtons.forEach(addButton => {
  addButton.addEventListener('click', function(){
    const parentDiv = addButton.parentElement;
    const inputArea = parentDiv.querySelector('.inputArea')
    //toggle Display
    toggleDisplay(inputArea, addButton);
  })
})

//Save Task button event listener

saveTasks.forEach(saveButton => {
  saveButton.addEventListener('click', function(){
    //get Inputs
    const inputArea = saveButton.parentElement;
    const title = inputArea.querySelector('.inputTitle').value;
    const description = inputArea.querySelector('.inputDescription').value;
    const status = inputArea.parentElement.id
    
    let newTask = new Task(title, description, status)

    //toggle display
    const addButton = inputArea.parentElement.querySelector('.addTaskButton');
    toggleDisplay(inputArea, addButton);

    //Handle task
    newTask.addTask();
    newTask.saveTask();

    //empty the input area
    inputArea.querySelector('.inputTitle').value = '';
    inputArea.querySelector('.inputDescription').value = '';
  })
})

//Cancel Task Button Event Listener
cancelTasks.forEach(cancelButton => {
  cancelButton.addEventListener('click', function(){
    //toggle display
    const inputArea = cancelButton.parentElement;
    const addButton = inputArea.parentElement.querySelector('.addTaskButton');
    toggleDisplay(inputArea, addButton);
    inputArea.querySelector('.inputTitle').value = '';
    inputArea.querySelector('.inputDescription').value = '';
  })
})

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

statusSections.forEach((section) => {
  section.addEventListener('dragover', function(event){
    event.preventDefault();
  })
});

statusSections.forEach((section) => {
  section.addEventListener('drop', function(event){
    event.preventDefault();
    const taskID = event.dataTransfer.getData('text');
    const task = document.getElementById(taskID);
    section.appendChild(task);
  })
})