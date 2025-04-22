import { TodoList } from './todoList.js';
import { ThemeManager } from './themeManager.js';
import { DragAndDrop } from './dragAndDrop.js';

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the TodoList functionality
    const todoList = new TodoList();
    
    // Initialize the theme manager
    const themeManager = new ThemeManager();
    
    // Initialize drag and drop functionality
    const dragDrop = new DragAndDrop(todoList);
    
    // Initial render of todo items from localStorage
    todoList.renderTodos();
}); 