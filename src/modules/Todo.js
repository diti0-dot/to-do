export default class Task {
    constructor(title, description, dueDate, priority, projectId) {
      this.id = Date.now().toString(); // Unique task ID
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority; // 1-3 (low-high)
      this.projectId = projectId;
      this.completed = false;
    }
  
    toggleComplete() {
      this.completed = !this.completed; // Toggle task completion
    }
  }
  