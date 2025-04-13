import './styles/main.css';
import { saveProjects, loadProjects } from './modules/storage.js';
import Project from './modules/Project.js'; // Make sure the path is correct
import Task from './modules/Todo.js'; // Make sure the path is correct

let projects = loadProjects(); // Load projects from localStorage

// Function to render a project in the project list and dropdown
function renderProject(project) {
  // 1. Add project to the project list
  const projectDiv = document.createElement('button');
  projectDiv.classList.add('project-item');
  projectDiv.textContent = project.name;
  projectDiv.dataset.id = project.id;

  projectDiv.addEventListener('click', () => {
    displayTasksForProject(project.id); // Display tasks for the clicked project
  });

  document.getElementById('projects-list').appendChild(projectDiv);

  // 2. Add project to the dropdown
  const projectSelect = document.getElementById('project-select');
  const option = document.createElement('option');
  option.value = project.id;
  option.textContent = project.name;
  projectSelect.appendChild(option);
}

// Add project form submission event listener
document.getElementById('project-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const projectNameInput = this.elements['project_name'];
  const projectName = projectNameInput.value.trim();

  if (projectName === '') return;

  // Create a new project and add it to the projects array
  const newProject = new Project(projectName);
  projects.push(newProject);
  saveProjects(projects); // Save updated projects to localStorage

  // Render the new project
  renderProject(newProject);

  // Reset the project input field
  projectNameInput.value = '';
});

// Task form submission event listener
document.getElementById('todo-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const title = this.elements['title'].value.trim();
    const description = this.elements['description'].value.trim();
    const dueDate = this.elements['dueDate'].value;
    const priority = this.elements['priority'].value;
    const projectId = this.elements['project'].value;
  
    if (!title || !dueDate || !projectId) return;
  
    const newTask = new Task(title, description, dueDate, priority, projectId);
    const project = projects.find(p => p.id === projectId);
  
    if (project && typeof project.addTask === 'function') {
      project.addTask(newTask);
      saveProjects(projects);
      console.log(`Task added to project "${project.name}"`);
    } else {
      console.error('Invalid project or addTask not available');
    }
  
    this.reset();
  });

  function displayTasksForProject(projectId) {
    const tasksContainer = document.getElementById('tasks-container');
    tasksContainer.innerHTML = ''; // Clear old tasks
  
    // Highlight the selected project button
    document.querySelectorAll('.project-item').forEach(btn => {
      if (btn.dataset.id === projectId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  
    const project = projects.find(p => p.id === projectId);
    if (!project || project.tasks.length === 0) {
      tasksContainer.innerHTML = '<p>No tasks for this project.</p>';
      return;
    }
  
    project.tasks.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task-item');
  
      // You can use classes here too if you want
      taskDiv.style.backgroundColor = task.completed ? '#008000' : '#FF0000';
  
      const toggleBtn = document.createElement('button');
      toggleBtn.textContent = task.completed ? 'Mark as Incomplete' : 'Mark as Complete';
      toggleBtn.addEventListener('click', () => {
        task.toggleComplete();
        saveProjects(projects);
        displayTasksForProject(projectId);
      });
  
      taskDiv.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Due: ${task.dueDate}</p>
        <p>Priority: ${['Low', 'Medium', 'High'][task.priority - 1]}</p>
      `;
  
      taskDiv.appendChild(toggleBtn);
      tasksContainer.appendChild(taskDiv);
    });
  }
  
  

// On page load, render all projects from localStorage
projects.forEach(renderProject);
