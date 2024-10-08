const addTaskTD = document.getElementById('addTaskTD')
const toDo = document.getElementById('toDo')

class Task {
  constructor(id) {
    this.title = this.title;
    this.description = this.description;
    this.items = this.items;
    this.users = this.users;
    this.id = id;
  }

  createTask() {
    //create input area
    const inputArea = document.createElement('div')
    inputArea.id = `inputArea${this.id}`;
    inputArea.classList.add('card')
    //create title
    const inputTitle = document.createElement('input')
    inputTitle.type = 'text';
    inputTitle.id = `inputTitle${this.id}`;
    //create description
    const inputDescription = document.createElement('textarea')
    inputDescription.id = `inputDescription${this.id}`;
    //create save button
    const inputSave = document.createElement('button')
    inputSave.id - `inputSave${this.id}`
    //append inputs to input area
    inputArea.innerHTML += inputTitle;
    inputArea.innerHTML += inputDescription;
    inputArea.innerHTML += inputSave;
    //return inputArea
    return(inputArea)
  }

  addTask() {
    const task = document.createElement('div');
    task.classList.add('taskCard');
    task.id.add(`task${this.index}`)
    const taskTitle = document.createElement('h5')

  }

  editTask() {
    
  }

  removeTask() {

  }

  moveTask() {

  }
}

let inputId = 0;

addTaskTD.addEventListener('click', function(){
  let taskInput = new Task(inputId);
  let newTaskInput = taskInput.createTask();
  console.log(newTaskInput)
  toDo.innerHTML += `${newTaskInput}`;
  inputId ++
})