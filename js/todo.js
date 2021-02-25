const field = document.querySelector('.field');
const button = document.querySelector('.add');
const list = document.querySelector('.list');

function createTask(value) {
    const task = document.createElement('div');
    const taskText = document.createElement('div');
    const inputBlock = document.createElement('div');
    const checkbox = document.createElement('input');
    const deleteButton = document.createElement('input');

    task.classList.add('list-item', 'non-success');

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

    return task;
}

function addTask() {
    if(field.value) {
        const newTask = createTask(field.value);
        list.append(newTask);
        field.value = '';
    }
}

button.addEventListener("click", addTask);

function completeTask(e) {
    const inputBlock = e.target.parentElement;
    const taskText = inputBlock.parentElement;
    if(taskText.classList.contains('completed')) {
        taskText.classList.remove('completed');
    } else {
        taskText.classList.add('completed');
    }
    
}

function deleteTask(e) {
    const inputBlock = e.target.parentElement;
    const task = inputBlock.parentElement;
    task.parentElement.removeChild(task);
}