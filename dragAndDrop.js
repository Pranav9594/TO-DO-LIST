export class DragAndDrop {
    constructor(todoList) {
        this.todoList = todoList;
        this.list = document.getElementById('todo-list');
        this.draggedItem = null;
        this.draggedIndex = null;
        
        // Initialize event listeners
        this.initEventListeners();
    }
    
    initEventListeners() {
        // Use event delegation for dynamically created todo items
        this.list.addEventListener('dragstart', this.handleDragStart.bind(this));
        this.list.addEventListener('dragover', this.handleDragOver.bind(this));
        this.list.addEventListener('dragenter', this.handleDragEnter.bind(this));
        this.list.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.list.addEventListener('drop', this.handleDrop.bind(this));
        this.list.addEventListener('dragend', this.handleDragEnd.bind(this));
        
        // Add keyboard accessibility for reordering
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
    
    handleDragStart(e) {
        // Check if the target or its parent is a list item
        const item = e.target.closest('.todo-item');
        if (!item) return;
        
        // Set dragged item and its original index
        this.draggedItem = item;
        this.draggedIndex = Array.from(this.list.children).indexOf(item);
        
        // Add visual feedback
        setTimeout(() => {
            item.classList.add('dragging');
        }, 0);
        
        // Set the drag effect and transfer data
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', item.getAttribute('data-id'));
    }
    
    handleDragOver(e) {
        // Prevent default to allow drop
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    }
    
    handleDragEnter(e) {
        // Check if the target or its parent is a list item
        const item = e.target.closest('.todo-item');
        if (item && item !== this.draggedItem) {
            item.classList.add('drag-over');
        }
    }
    
    handleDragLeave(e) {
        // Check if the target or its parent is a list item
        const item = e.target.closest('.todo-item');
        if (item) {
            item.classList.remove('drag-over');
        }
    }
    
    handleDrop(e) {
        // Prevent default action
        e.preventDefault();
        
        // Check if the target or its parent is a list item
        const dropTarget = e.target.closest('.todo-item');
        
        if (dropTarget && this.draggedItem && dropTarget !== this.draggedItem) {
            // Remove visual feedback
            dropTarget.classList.remove('drag-over');
            
            // Get the index of the drop target
            const dropIndex = Array.from(this.list.children).indexOf(dropTarget);
            
            // Call the reorderTodos method of the TodoList instance
            this.todoList.reorderTodos(this.draggedIndex, dropIndex);
        }
        
        return false;
    }
    
    handleDragEnd(e) {
        // Remove visual feedback from all items
        const todoItems = document.querySelectorAll('.todo-item');
        todoItems.forEach(item => {
            item.classList.remove('dragging');
            item.classList.remove('drag-over');
        });
        
        // Reset dragged item
        this.draggedItem = null;
        this.draggedIndex = null;
    }
    
    handleKeyDown(e) {
        // Check if an element with focus is a todo item
        const focusedElement = document.activeElement;
        const todoItem = focusedElement.closest('.todo-item');
        
        if (!todoItem) return;
        
        const items = Array.from(this.list.children);
        const currentIndex = items.indexOf(todoItem);
        
        // Handle arrow keys for moving items up and down
        if (e.key === 'ArrowUp' && e.altKey && currentIndex > 0) {
            e.preventDefault();
            this.todoList.reorderTodos(currentIndex, currentIndex - 1);
            items[currentIndex - 1].focus();
        } else if (e.key === 'ArrowDown' && e.altKey && currentIndex < items.length - 1) {
            e.preventDefault();
            this.todoList.reorderTodos(currentIndex, currentIndex + 1);
            items[currentIndex + 1].focus();
        }
    }
} 