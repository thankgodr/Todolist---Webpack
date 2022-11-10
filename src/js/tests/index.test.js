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

describe('Testing add and delete method', () => {
  // Clear the localstorage before each tets
  beforeEach(() => {
    localStorage.clear();
  });

  test('Test Add Task', () => {
    // Arrange
    const taskmanager = new TaskManager();
    const task1 = new Todo('testtitel', false, 3);
    const task2 = new Todo('testtitel', false, 4);
    const task3 = new Todo('testtitel', false, 9);

    // Act
    taskmanager.addTask(task1);
    taskmanager.addTask(task2);
    taskmanager.addTask(task3);
    taskmanager.addTask(task3);

    // Assert
    expect(taskmanager.taskList.length).toBe(4);
  });

  test('Test delete task', () => {
    // Arrange
    const taskmanager = new TaskManager();
    const task1 = new Todo('testtitel', false, 3);

    // Act
    taskmanager.addTask(task1);
    taskmanager.remveTask(task1);

    // Assert
    expect(taskmanager.taskList.length).toBe(0);
  });
});