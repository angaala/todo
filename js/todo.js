'use strict';

const field = document.querySelector('.field');
const button = document.querySelector('.add');
const tasksList = document.querySelector('.tasks');
const filter = document.querySelector('.filter');

function createTask(value) {
    const task = document.createElement('div');
    const taskText = document.createElement('div');
    const inputBlock = document.createElement('div');
    const checkbox = document.createElement('input');
    const deleteButton = document.createElement('input');

    task.classList.add('task', 'non-success');

    taskText.classList.add('task-text');
    taskText.textContent = value;

    inputBlock.classList.add('input-block');

    checkbox.type = 'checkbox';
    checkbox.classList.add('status', 'form-check-input');

    deleteButton.type = 'button';
    deleteButton.classList.add('btn', 'btn-primary', 'delete');
    deleteButton.value = '×';

    inputBlock.append(checkbox);
    inputBlock.append(deleteButton);

    checkbox.addEventListener("click", completeTask);
    deleteButton.addEventListener("click", deleteTask);

    task.append(taskText);
    task.append(inputBlock);

    if(filter.value == 'success')task.style.display = 'none';

    return task;
}

function addTask() {
    if(field.value) {
        const newTask = createTask(field.value);
        tasksList.append(newTask);
        field.value = '';
        saveTasks();
    }
}

function completeTask(e) {
    const inputBlock = e.target.parentElement;
    const task = inputBlock.parentElement;
    if(task.classList.contains('success')) {
        task.classList.remove('success');
        task.classList.add('non-success');
        if(filter.value == 'success')task.style.display = 'none';
    } else {
        task.classList.add('success');
        task.classList.remove('non-success');
        if(filter.value == 'non-success')task.style.display = 'none';
    }
    saveTasks();    
}

function deleteTask(e) {
    const inputBlock = e.target.parentElement;
    const task = inputBlock.parentElement;
    task.parentElement.removeChild(task);
    saveTasks();
}

function filterTasks(e) {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(function(task) {
        if (task.classList.contains(e.target.value)) {
            task.style.display = 'flex';
          } else {
            task.style.display = 'none';
          }
    });
}

function saveTasks() {
    const tasks = document.querySelectorAll('.task');
    const tasksData = Array.from(tasks).map(function(task, index) {
        return {"id": index, "text" : task.textContent, "status": task.querySelector('.status').checked};
    });

    localStorage.setItem('tasks', JSON.stringify(tasksData));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.forEach(function(task) {
        const newTask = createTask(task.text);
        if(task.status) {
            newTask.classList.add('success');
            newTask.classList.remove('non-success');
            newTask.querySelector('.status').checked = true;
        }
        tasksList.append(newTask);
    });
}

document.querySelector('.field').addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      addTask(this.value);
    }
  });

  field.value = '';
  filter.selectedIndex = 0;

  button.addEventListener("click", addTask);

  filter.addEventListener("change", filterTasks);

  document.addEventListener("DOMContentLoaded", loadTasks);