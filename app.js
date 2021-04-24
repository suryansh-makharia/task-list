const input = document.querySelector('.task-input');
const taskButton = document.querySelector('.task-button');
const taskList = document.querySelector('.collection');
const taskForm = document.querySelector('.task-form');
const errorMsg = document.querySelector('.error');
const filter = document.querySelector('#filter-tasks');
document.addEventListener('DOMContentLoaded', getTask);
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);
filter.addEventListener('change', filterTasks);
function addTask(e){
    e.preventDefault();
    if(input.value === ''){
        errorMsg.innerHTML = `<i class="fas fa-exclamation-circle"></i> Please enter a task`;
        errorMsg.classList.add('error-msg');
    }else {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        const li = document.createElement('li');
        li.classList.add('task-item');
        li.innerText = input.value;
        const completeButton = document.createElement('button');
        completeButton.classList.add('complete-btn');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        taskDiv.appendChild(li);
        taskDiv.appendChild(completeButton);
        taskDiv.appendChild(deleteButton);
        taskList.appendChild(taskDiv);
        errorMsg.innerHTML = '';
        taskToLocalStorage(input.value);
    }
        input.value = '';
}
function deleteTask(e) {
    const item = e.target;
    if(item.classList.contains('delete-btn')){
       const todo = item.parentElement;
       todo.classList.add('fall');
        removeFromLocalStorage(todo);
       todo.addEventListener('transitioned', function (){
           todo.remove();
       });
    }
    if(item.classList.contains('complete-btn')){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}
function filterTasks(e){
    const task = taskList.childNodes;
    task.forEach(function (tasks){
        switch(e.target.value){
            case 'all':
                tasks.style.display = 'flex';
                break;
            case 'completed':
                if(tasks.classList.contains('completed')){
                    tasks.style.display = 'flex';
                }else{
                    tasks.style.display = 'none';
                }
                break;
            case 'incomplete':
                if(tasks.classList.contains('completed')){
                    tasks.style.display = 'none';
                }else{
                    tasks.style.display = 'flex';
                }
                break;
        }
    });
}
function taskToLocalStorage(value){
    let tasks;
    if(localStorage.getItem('tasksToDo') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasksToDo'));
    }
    tasks.push(value);
    localStorage.setItem('tasksToDo', JSON.stringify(tasks));
}
function getTask(){
    let tasks;
    if(localStorage.getItem('tasksToDo') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasksToDo'));
    }
    tasks.forEach(function (task){
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        const li = document.createElement('li');
        li.classList.add('task-item');
        li.innerText = task;
        const completeButton = document.createElement('button');
        completeButton.classList.add('complete-btn');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        taskDiv.appendChild(li);
        taskDiv.appendChild(completeButton);
        taskDiv.appendChild(deleteButton);
        taskList.appendChild(taskDiv);
    });
}
function removeFromLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasksToDo') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasksToDo'));
    }
    const todo = task.children[0].textContent;
     tasks.forEach(function (task, index){
            if(todo === task){
                tasks.splice(index, 1);
                localStorage.setItem('tasksToDo', JSON.stringify(tasks));
            }
        });
     // OR
    // const index = task.children[0].textContent;
    // tasks.splice(tasks.indexOf(index), 1);
    // localStorage.setItem('tasksToDo', JSON.stringify(tasks));
}
