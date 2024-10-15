// Todo class
class Todo {
  constructor(description, completed = false) {
    this.description = description;
    this.completed = completed;
  }
  toggleCompletion() {
    this.completed = !this.completed;
  }
}

// TodoList class
class TodoList {
  constructor() {
    this.todos = this.loadTodos();
  }

  addTodo(description) {
    const todo = new Todo(description);
    this.todos.push(todo);
    this.saveTodos();
    this.displayTodos();
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
    this.saveTodos();
    this.displayTodos();
  }

  toggleTodoCompletion(index) {
    this.todos[index].toggleCompletion();
    this.saveTodos();
    this.displayTodos();
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadTodos() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos).map((todo) => new Todo(todo.description, todo.completed)) : [];
  }

  displayTodos() {
    const todoListElement = document.getElementById('todo-list');
    todoListElement.innerHTML = '';

    this.todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.className = 'todo-item';
      li.innerHTML = `
                        <span class="description ${todo.completed ? 'completed' : ''}">
                        ${todo.description}
                        </span>
                        <div class="button-group">
                        <button class="complete-button">Complete</button>
                        <button class="delete-button">Delete</button>
                        </div>
                `;

      // Append to DOM
      todoListElement.appendChild(li);

      // Event Listener for complete and delete buttons
      li.querySelector('.complete-button').addEventListener('click', () => {
        this.toggleTodoCompletion(index);
      });
      li.querySelector('.delete-button').addEventListener('click', () => {
        this.removeTodo(index);
      });
    });
  }
}

// App Initialization
const todoList = new TodoList();
todoList.displayTodos();

const addTodoButton = document.getElementById('add-task');
const todoInput = document.getElementById('todo-input');

// Add todo event listener
addTodoButton.addEventListener('click', (event) => {
  event.preventDefault();
  const description = todoInput.value.trim();
  if (description) {
    todoList.addTodo(description);
    todoInput.value = '';
  }
});
