import Todo from '../models/todo';

export default class TaskManager {
  constructor() {
    const dbObject = localStorage.getItem('tasksListDb');
    const tempArr = dbObject === undefined ? null : JSON.parse(dbObject);
    if (tempArr == null) {
      this.taskList = [];
    } else {
      this.taskList = [];
      tempArr.forEach((element) => {
        const tempV = Object.assign(new Todo(), element);
        this.taskList.push(tempV);
      });
    }
  }

  addTask(task) {
    let nextIndex = -1;
    if (this.taskList.length > 0) {
      if (this.taskList.length === 1) {
        nextIndex = 1;
      } else {
        nextIndex = this.taskList.length;
      }
    } else {
      nextIndex = 0;
    }
    task.updateIndex(nextIndex);
    this.taskList.push(task);
    this.#updateTaskStorage();
  }

  editTask(task) {
    const index = this.taskList.findIndex((currentTask) => currentTask.id === task.id);
    this.taskList[index] = task;
    this.#updateTaskStorage();
  }

  remveTask(task) {
    this.taskList = this.taskList.filter((currentTask) => currentTask.id !== task.id);
    this.#updateIndexes();
    this.#updateTaskStorage();
  }

  clearAllCompleted() {
    this.taskList = this.taskList.filter((task) => !task.completed);
    this.#updateIndexes();
    this.#updateTaskStorage();
  }

    #updateTaskStorage() {
    localStorage.setItem('tasksListDb', JSON.stringify(this.taskList));
  }

    static #compare(current, next) {
      if (current.index < next.index) {
        return -1;
      }
      if (current.index < next.index) {
        return 1;
      }
      return 0;
    }

  #updateIndexes() {
      const sorted = this.taskList.sort(TaskManager.#compare);
      sorted.forEach((task, index) => {
        task.index = index;
      });
      this.taskList = sorted;
    }
}