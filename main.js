const newTodoForm = document.getElementById('new-todo-form');
const todoList = document.getElementById('todo-list');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

newTodoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const todo = {
        content: e.target.elements.content.value,
        category: e.target.elements.category.value,
        done: false,
        createdAt: new Date().getTime()
    }

    todos.unshift(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

    e.target.reset();
    e.target.content.focus();

    DisplayTodos();
    // createTask(todo);
});

DisplayTodos();
// createTask(todo);

function DisplayTodos () {
    todoList.innerHTML = '';

    todos.forEach(function (todo) {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        span.classList.add('bubble');

        const content = document.createElement('div');
        content.classList.add('todo-content');
        
        const actions = document.createElement('div');
        actions.classList.add('actions');
        const edit = document.createElement('button');
        edit.classList.add('edit');
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');



        if (todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }

        content.innerHTML = `
        <label>
            <span>${todo.category}</span>
        </label>
        <input type="text" value="${todo.content}" readonly>
        `;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);

        todoList.appendChild(todoItem);
        
        input.type = 'checkbox';
        input.checked = todo.done;

        if (todo.done) {
            todoItem.classList.add('done');
        }

        input.addEventListener('click', function (e) {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
            
            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }
            
            DisplayTodos();
        })

        edit.addEventListener('click', function (e) {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', function (e) {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })

        deleteButton.addEventListener('click', function () {
            todos.splice(todos.indexOf(todo), 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })


    });

}


function createTask(todo) {

    // todoList.innerHTML = '';

    const todoItem = document.createElement('div');

    todoItem.setAttribute('createdAt', todo.createdAt)



    const taskElement = `
    <div class="todo-item">
        <label>
            <input type="checkbox" />
            <span>${todo.category}</span>
        </label>

        <div class="todo-content">
            <input type="text" value="${todo.content}" />
        </div>

        <div class="actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    </div>
    `;

    // edit.innerHTML = 'Edit';
    // deleteButton.innerHTML = 'Delete';

    // input.type = 'checkbox';
    // input.checked = todo.done;

    // if (todo.done) {
    //     todoItem.classList.add('done');
    // }

    // if (todo.category == 'personal') {
    //     span.classList.add('personal');
    // } else {
    //     span.classList.add('business');
    // }

    // input.addEventListener('click', function (e) {
    //     todo.done = e.target.checked;
    //     localStorage.setItem('todos', JSON.stringify(todos));
        
    //     if (todo.done) {
    //         todoItem.classList.add('done');
    //     } else {
    //         todoItem.classList.remove('done');
    //     }
        
    //     createTask(todo);
    // })

    todoItem.innerHTML = taskElement;

    todoList.appendChild(todoItem);
}