const todoInput = document.querySelector('.todoInput');
const todoBtn = document.querySelector('.todoBtn');
const todoList = document.querySelector('.todoList');
const filterOption = document.querySelector('.filterTodo');


// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteComplete);
filterOption.addEventListener('click', filterTodo);


//Functions
function addTodo(e) {
    e.preventDefault();
    // div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todoItem');
    todoDiv.appendChild(newTodo);
    
    // todo를 로컬저장소에 저장
    saveLocalTodos(todoInput.value);

    // 체크 버튼
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"><i>';
    completeBtn.classList.add('completeBtn');
    todoDiv.appendChild(completeBtn);

    // 휴지통 버튼
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash-alt"><i>';
    trashBtn.classList.add('trashBtn');
    todoDiv.appendChild(trashBtn);

    // li를 div안에 넣기
    todoList.appendChild(todoDiv);

    // 입력 후 입력창 클리어
    todoInput.value ='';
}

function deleteComplete(e) {
    const item = e.target;
    // 삭제 버튼
    if (item.classList[0] === 'trashBtn') {
       const todo = item.parentElement;
       todo.classList.add('fall');
       removeLocalTodos(todo);
       todo.addEventListener('transitionend', function() {
           todo.remove();
       });
    }

    // 완료 버튼
    if (item.classList[0] === 'completeBtn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

// 로컬 저장
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 새로운 아이템 저장
function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todoItem');
    todoDiv.appendChild(newTodo);

    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"><i>';
    completeBtn.classList.add('completeBtn');
    todoDiv.appendChild(completeBtn);

    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash-alt"><i>';
    trashBtn.classList.add('trashBtn');
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);
    })
}

// 삭제된 아이템 반영
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}