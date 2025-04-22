export class TodoList {
    constructor() {
        // DOM elements
        this.todoInput = document.getElementById('todo-input');
        this.addTodoBtn = document.getElementById('add-todo-btn');
        this.todoList = document.getElementById('todo-list');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.tasksCounter = document.getElementById('tasks-counter');
        this.clearCompletedBtn = document.getElementById('clear-completed-btn');
        this.editModal = document.getElementById('edit-modal');
        this.editInput = document.getElementById('edit-input');
        this.saveEditBtn = document.getElementById('save-edit-btn');
        this.cancelEditBtn = document.getElementById('cancel-edit-btn');
        
        // State
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.currentFilter = 'all';
        this.editingTodoId = null;
        
        // Initialize event listeners
        this.initEventListeners();
    }
    
    initEventListeners() {
        // Add new todo when clicking the add button
        this.addTodoBtn.addEventListener('click', () => this.addTodo());
        
        // Add new todo when pressing Enter in the input field
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        
        // Filter todo items
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.filter;
                this.renderTodos();
            });
        });
        
        // Clear completed todos
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        
        // Handle edit modal events
        this.saveEditBtn.addEventListener('click', () => this.saveEdit());
        this.cancelEditBtn.addEventListener('click', () => this.closeEditModal());
        
        // Close modal when clicking outside
        this.editModal.addEventListener('click', (e) => {
            if (e.target === this.editModal) this.closeEditModal();
        });
    }
    
    // Generate a unique ID for todo items
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
    
    // Add a new todo item
    addTodo() {
        const text = this.todoInput.value.trim();
        if (text) {
            const newTodo = {
                id: this.generateId(),
                text: text,
                completed: false,
                createdAt: Date.now()
            };
            
            this.todos.push(newTodo);
            this.saveTodos();
            this.renderTodos();
            this.todoInput.value = '';
            this.todoInput.focus();
        }
    }
    
    // Toggle completed status of a todo item
    toggleTodo(id) {
        this.todos = this.todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        this.saveTodos();
        this.renderTodos();
    }
    
    // Delete a todo item
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.renderTodos();
    }
    
    // Open edit modal for a todo item
    editTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            this.editingTodoId = id;
            this.editInput.value = todo.text;
            this.editModal.classList.add('active');
            this.editInput.focus();
        }
    }
    
    // Save edited todo item
    saveEdit() {
        const newText = this.editInput.value.trim();
        if (newText && this.editingTodoId) {
            this.todos = this.todos.map(todo => 
                todo.id === this.editingTodoId ? { ...todo, text: newText } : todo
            );
            this.saveTodos();
            this.renderTodos();
            this.closeEditModal();
        }
    }
    
    // Close edit modal
    closeEditModal() {
        this.editModal.classList.remove('active');
        this.editingTodoId = null;
    }
    
    // Clear all completed todos
    clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveTodos();
        this.renderTodos();
    }
    
    // Save todos to localStorage
    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    
    // Reorder todos (used by drag and drop functionality)
    reorderTodos(fromIndex, toIndex) {
        // Get the filtered and visible todos based on current filter
        const visibleTodos = this.getFilteredTodos();
        
        // Get the todo item being moved
        const movedTodo = visibleTodos[fromIndex];
        
        // Get the original index in the full todos array
        const originalFromIndex = this.todos.findIndex(todo => todo.id === movedTodo.id);
        
        // Remove the todo from its original position
        const [removed] = this.todos.splice(originalFromIndex, 1);
        
        // Find the target todo in the full todos array
        const targetTodo = visibleTodos[toIndex];
        const targetIndex = this.todos.findIndex(todo => todo.id === targetTodo.id);
        
        // Insert the todo at the new position
        this.todos.splice(targetIndex, 0, removed);
        
        this.saveTodos();
        this.renderTodos();
    }
    
    // Get filtered todos based on current filter
    getFilteredTodos() {
        switch(this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return [...this.todos];
        }
    }
    
    // Update tasks counter
    updateTasksCounter() {
        const activeTodos = this.todos.filter(todo => !todo.completed).length;
        this.tasksCounter.textContent = `${activeTodos} task${activeTodos !== 1 ? 's' : ''} left`;
    }
    
    // Render todo items based on current filter
    renderTodos() {
        const filteredTodos = this.getFilteredTodos();
        
        // Clear the current list
        this.todoList.innerHTML = '';
        
        // Render each todo item
        filteredTodos.forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.classList.add('todo-item');
            todoItem.setAttribute('data-id', todo.id);
            todoItem.setAttribute('draggable', 'true');
            
            if (todo.completed) {
                todoItem.classList.add('completed');
            }
            
            todoItem.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} aria-label="${todo.completed ? 'Mark as incomplete' : 'Mark as complete'}">
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <div class="todo-actions">
                    <button class="edit-btn" aria-label="Edit task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" aria-label="Delete task">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            
            // Add event listeners to the todo item
            const checkbox = todoItem.querySelector('.todo-checkbox');
            checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
            
            const editBtn = todoItem.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => this.editTodo(todo.id));
            
            const deleteBtn = todoItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));
            
            this.todoList.appendChild(todoItem);
        });
        
        // Update tasks counter
        this.updateTasksCounter();
    }
    
    // Helper method to escape HTML (prevent XSS)
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
} 