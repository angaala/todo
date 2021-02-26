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

    inputBlock.appendChild(checkbox);
    inputBlock.appendChild(deleteButton);

    checkbox.addEventListener("click", completeTask);
    deleteButton.addEventListener("click", deleteTask);

    task.appendChild(taskText);
    task.appendChild(inputBlock);

    if(filter.value == 'success')task.style.display = 'none';

    return task;
}

function addTask() {
    if(field.value) {
        const newTask = createTask(field.value);
        tasksList.append(newTask);
        field.value = '';
        SaveTasks();
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
    SaveTasks();    
}

function deleteTask(e) {
    const inputBlock = e.target.parentElement;
    const task = inputBlock.parentElement;
    task.parentElement.removeChild(task);
    SaveTasks();
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

function SaveTasks() {
    const tasks = document.querySelectorAll('.task');
    const tasksData = [...tasks].map(function(task, index) {
        return {"id": index, "text" : task.textContent, "status": task.querySelector('.status').checked};
    });

    localStorage.setItem('tasks', JSON.stringify(tasksData));
}

document.querySelector('.field').addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      addTask(this.value);
    }
  });

  button.addEventListener("click", addTask);

  filter.addEventListener("change", filterTasks);

  field.value = '';
  filter.selectedIndex = 0;