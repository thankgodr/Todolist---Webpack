import TaskManager from '../controllers/taskmanager';
import Todo from '../models/todo';

// Mockng local storage
global.localStorage = {
  state: {},

  setItem(key, item) {
    this.state[key] = item;
  },
  getItem(key) {
    return this.state[key];
  },
  clear() {
    this.state = {};
  },
};

describe('Test editTaskDescription, clearAll and changeStatus', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Test EditTaskDescription', () => {
    // Arrange
    const newDescription = 'Infomation';
    const taskmanager = new TaskManager();
    const task1 = new Todo('testtitel', false, 3);
    taskmanager.addTask(task1);

    // Act
    task1.description = newDescription;
    taskmanager.editTask(task1);

    // Assert
    expect(taskmanager.taskList[0].description).toBe(newDescription);
  });

  test('Test EditTaskstatus', () => {
    // Arrange
    const taskmanager = new TaskManager();
    const task1 = new Todo('testtitel', false, 3);
    taskmanager.addTask(task1);

    // Act
    task1.completed = true;
    taskmanager.editTask(task1);

    // Assert
    expect(taskmanager.taskList[0].completed).toBe(true);
  });

  test('Test ClearAllCompletedTasks', () => {
    // Arrange
    const taskmanager = new TaskManager();
    const task1 = new Todo('testtitel', false, 3);
    const task2 = new Todo('testtitel', true, 4);
    const task3 = new Todo('testtitel', false, 9);
    taskmanager.addTask(task1);
    taskmanager.addTask(task2);
    taskmanager.addTask(task3);

    // Act
    taskmanager.clearAllCompleted();

    // Assert
    expect(taskmanager.taskList.length).toBe(2);
  });
});

describe('Testing HTML Dom manipulation', () => {
  // Arange
  localStorage.clear();

  // Mocking HTMl ements
  document.body.innerHTML = `<div class="content">
  <input type="text" placeholder="Add to your list" class="form-control" name="task" id="newTask" />
  <ul id="taskList" class="list-group"></ul>
  <button id="delete_btn" class="btn btn-disabled">Clear all completed</button></div>`;
  const taskmanager = new TaskManager();
  const task1 = new Todo('testtitel', false, 3);
  const task2 = new Todo('testtitel', true, 4);
  const task3 = new Todo('testtitel', false, 9);
  taskmanager.addTask(task1);
  taskmanager.addTask(task2);
  taskmanager.addTask(task3);

  // Act
  require('../index'); // eslint-disable-line global-require

  test('Test All todos are added to the ul with id taskList', () => {
    // Assert
    expect(document.getElementById('taskList').children.length).toBe(3);
  });

  test('Test delete all completed btn clicked', () => {
    // Act
    document.getElementById('delete_btn').click();

    // Assert
    expect(document.getElementById('taskList').children.length).toBe(2);
  });
});