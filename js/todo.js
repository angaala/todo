const field = document.querySelector('.field');
const button = document.querySelector('.add');
const list = document.querySelector('.list');

function createTask(value) {
    task = document.createElement('div');
    task.textContent = value;
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