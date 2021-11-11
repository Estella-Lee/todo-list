const todoInput = document.querySelector('.todoInput');
const todoBtn = document.querySelector('.todoBtn');
const todoList = document.querySelector('.todoList');


// Event Listeners
todoBtn.addEventListener('click', addTodo);


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
