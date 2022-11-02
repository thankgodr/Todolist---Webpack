import TaskManager from './controllers/taskmanager';
import Todo from './models/todo';
import '../css/style.css';

const taskmanager = new TaskManager();

const compare = (current, next) => {
  if (current.index < next.index) {
    return -1;
  }
  if (current.index < next.index) {
    return 1;
  }
  return 0;
};
const printAllTasks = () => {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = "";
  const sorted = taskmanager.taskList.sort(compare);
  sorted.forEach((task) => {
    const listViewItem = document.createElement('li');
    listViewItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    console.log(task)
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'name';

    checkbox.className = 'form-check-input pull-left';
    checkbox.style.marginRight = '17px';
    checkbox.checked = task.completed;
    checkbox.addEventListener("change",(event) => {
        if(event.currentTarget.checked){
            task.updateStatus(true)
        }else{
            task.updateStatus(false)
        }
        taskmanager.editTask(task)
    })

    const span = document.createElement('span');
    span.className = 'fas fa-ellipsis-v pull-right';
    listViewItem.appendChild(checkbox);
    listViewItem.appendChild(document.createTextNode(task.description));
    listViewItem.appendChild(span);
    taskList.appendChild(listViewItem);
  });

  //Add a new task
  document.getElementById("newTask").addEventListener("keypress", (event) =>{
    if(event.key == "Enter"){
        const description = document.getElementById("newTask").value;
        event.preventDefault();
        if(description.length > 0){
            const newTodo = new Todo(description, false, 0);

            console.log(newTodo);
            taskmanager.addTask(newTodo);
            document.getElementById("newTask").value = "";
            printAllTasks()
        }
    }
  })

  //Delete task
  document.getElementById("delete_btn").addEventListener("click", (event) => {
    event.preventDefault()
    taskmanager.taskList.forEach((task) => {
        if(task.completed){
            taskmanager.remveTask(task);
        }
    })
    printAllTasks()
  })
};


printAllTasks();


