# To-Do List Application

A clean, responsive, and visually appealing To-Do List web application built with vanilla HTML, CSS, and JavaScript.

# Application Screenshot[Preview](https://github.com/user-attachments/assets/eab60133-4416-4301-aa1b-ca72ac05b935)

## Features

- **Modern UI Design**: Clean interface with smooth animations and visual feedback
- **Task Management**: Add, edit, and delete tasks with ease
- **Task Status**: Mark tasks as completed with a visually appealing strikethrough effect
- **Filtering**: Filter tasks by All, Active, or Completed status
- **Drag and Drop**: Reorder tasks through intuitive drag and drop functionality
- **Data Persistence**: Tasks are saved to localStorage and persist between sessions
- **Dark/Light Theme**: Toggle between dark and light modes based on preference
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Accessibility**: Full keyboard navigation support and ARIA attributes

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone or download this repository:
   ```
   git clone https://github.com/yourusername/todo-list-app.git
   ```

2. Open the `index.html` file in your web browser:
   ```
   cd todo-list-app
   open index.html
   ```

3. Alternatively, you can use a simple local server:
   ```
   npx serve
   ```

## Usage

### Adding Tasks

1. Type your task in the input field at the top
2. Press `Enter` or click the "+" button to add the task

### Managing Tasks

- **Complete a task**: Click the checkbox next to a task
- **Edit a task**: Click the edit (pencil) icon, make changes, and save
- **Delete a task**: Click the delete (trash) icon
- **Reorder tasks**: Drag and drop tasks or use Alt+Up/Down with keyboard
- **Filter tasks**: Use the All/Active/Completed buttons
- **Clear completed**: Remove all completed tasks with one click
- **Switch themes**: Toggle between light and dark mode

### Keyboard Shortcuts

- `Enter` (in input field): Add new task
- `Enter` (in edit mode): Save changes
- `Esc` (in edit mode): Cancel editing
- `Alt` + `↑`/`↓`: Move task up/down in the list

## Project Structure

```
todo-list-app/
├── index.html         # Main HTML structure
├── css/
│   └── styles.css     # CSS styles and animations
├── js/
│   ├── app.js         # Main application entry point
│   ├── todoList.js    # Todo list functionality
│   ├── themeManager.js # Theme switching functionality
│   └── dragAndDrop.js # Drag and drop reordering
└── README.md          # This file
```

## Customization

### Changing Colors

The application uses CSS variables for easy customization. Open `css/styles.css` and modify the variables in the `:root` section:

```css
:root {
    --primary-color: #4a6fa5;
    --secondary-color: #7895cb;
    /* other variables */
}
```

### Adding Features

The modular JavaScript structure makes it easy to add new features:

1. Create a new module in the `js` folder
2. Import it in `app.js`
3. Initialize it in the DOMContentLoaded event listener

## Browser Support

This application works in all modern browsers that support ES6+ features

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)


