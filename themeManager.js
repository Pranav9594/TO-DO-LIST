export class ThemeManager {
    constructor() {
        // DOM elements
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggle.querySelector('i');
        
        // Initialize theme from localStorage or system preference
        this.initTheme();
        
        // Add event listeners
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    
    initTheme() {
        // Check if user has previously selected a theme
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            // Apply saved theme preference
            this.setTheme(savedTheme);
        } else {
            // Check system preference
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (prefersDarkScheme) {
                this.setTheme('dark');
            } else {
                this.setTheme('light');
            }
        }
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        this.setTheme(newTheme);
    }
    
    setTheme(theme) {
        // Apply theme attribute to root element
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update icon
        if (theme === 'dark') {
            this.themeIcon.classList.remove('fa-moon');
            this.themeIcon.classList.add('fa-sun');
        } else {
            this.themeIcon.classList.remove('fa-sun');
            this.themeIcon.classList.add('fa-moon');
        }
        
        // Save theme preference
        localStorage.setItem('theme', theme);
    }
} 