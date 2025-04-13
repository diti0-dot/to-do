export default class Project {
    constructor(name) {
      this.id = Date.now().toString(); // Unique project ID
      this.name = name;
      this.tasks = []; // Tasks associated with this project
    }
  
    addTask(task) {
      this.tasks.push(task); // Add a task to the project
    }
  
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId); // Remove a task by ID
    }
  }
  