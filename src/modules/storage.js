import Project from './Project.js';
import Task from './Todo.js';

export function saveProjects(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}

export function loadProjects() {
  const stored = localStorage.getItem('projects');
  if (!stored) return [];

  const plainProjects = JSON.parse(stored);
  return plainProjects.map(p => {
    const project = new Project(p.name);
    project.id = p.id;

    // Convert plain tasks into Task instances
    project.tasks = p.tasks.map(t => {
      const task = new Task(t.title, t.description, t.dueDate, t.priority, t.projectId);
      task.id = t.id;
      task.completed = t.completed;
      return task;
    });

    return project;
  });
}
