const toDo = document.getElementById('toDo')
const addTaskTD = document.getElementById('addTaskTD')
const addTaskIP = document.getElementById('addTaskIP')
const addTaskNR = document.getElementById('addTaskNR')
const addTaskDone = document.getElementById('addTaskDone')
const inputAreaTD = document.getElementById('inputAreaTD')
const inputTitleTD = document.getElementById('inputTitleTD')
const inputDescriptionTD = document.getElementById('inputDescriptionTD')
const inputSaveTD = document.getElementById('inputSaveTD')

class Task {
  constructor(title, description, section, id) {
    this.title = title;
    this.description = description;
    this.section = section;
    this.items = this.items;
    this.users = this.users;
    this.id = id;
  }

  addTask() {
    //task card
    const task = document.createElement('div');
    task.classList.add('tasks');
    task.classList.add('card');
    task.id = (`task${this.section}${this.id}`);
    //task content
    const taskTitle = document.createElement('h4');
    taskTitle.textContent = this.title;
    const taskDescription = document.createElement('p');
    taskDescription.textContent = this.description;
    //append content to card
    task.appendChild(taskTitle);
    task.appendChild(taskDescription)
    //append card to DOM
    this.section.appendChild(task);
  }

  editTask() {
    
  }

  removeTask() {

  }

  moveTask() {

  }
}

let idEnding;

addTaskTD.addEventListener('click', function(){
  idEnding = 'TD'
  toggleTaskInput(idEnding)
})

addTaskIP.addEventListener('click', function(){
  idEnding = 'IP'
  toggleTaskInput(idEnding)
})

addTaskNR.addEventListener('click', function(){
  idEnding = 'NR'
  toggleTaskInput(idEnding)
})

addTaskDone.addEventListener('click', function(){
  idEnding = 'Done'
  toggleTaskInput(idEnding)
})

function toggleTaskInput(idKey){
  const inputArea = document.getElementById(`inputArea${idKey}`)
  inputArea.classList.toggle('toggleDisplay')
  document.getElementById(`addTask${idKey}`).classList.toggle('toggleDisplay')
}

let idTD = 0;

inputSaveTD.addEventListener('click', function(){
  let title = inputTitleTD.value;
  let description = inputDescriptionTD.value;
  let section = toDo;
  let toDoTask = new Task(title, description, section, idTD);
  idTD++ ;
  console.log(toDoTask);
  
  toggleTaskInput('TD')
  toDoTask.addTask();
})