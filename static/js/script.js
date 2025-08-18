// Theme Toggle Functionality
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.body = document.body;
        this.init();
    }

    init() {
        // Check for saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);

        this.initStarAnimation();

        
        // Add event listener for theme toggle
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    // Add this method to the ThemeManager class
    initStarAnimation() {
        // Only create stars in dark mode
        if (this.body.getAttribute('data-theme') === 'dark') {
            this.createStarfield();
        }
    }

    // Important 
    // Add this method to handle star creation
    createStarfield() {
        const stars = document.createElement('div');
        stars.className = 'starfield';
        document.body.appendChild(stars);
        
        // Generate stars
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.width = `${Math.random() * 2}px`;
            star.style.height = star.style.width;
            star.style.animationDelay = `${Math.random() * 10}s`;
            stars.appendChild(star);
        }
        
        // Add shooting stars periodically
        setInterval(() => {
            if (this.body.getAttribute('data-theme') === 'dark') {
                this.createShootingStar();
            }
        }, 3000);
    }

    createShootingStar() {
        const shooter = document.createElement('div');
        shooter.className = 'shooting-star';
        shooter.style.left = `${Math.random() * 100}%`;
        shooter.style.top = `${Math.random() * 100}%`;
        document.querySelector('.starfield')?.appendChild(shooter);
        setTimeout(() => shooter.remove(), 5000);
    }

    //Important

    // setTheme(theme) {
    //     this.body.setAttribute('data-theme', theme);
    //     localStorage.setItem('theme', theme);
        
    //     // Update toggle icon
    //     const icon = this.themeToggle.querySelector('i');
    //     if (theme === 'dark') {
    //         icon.className = 'fas fa-sun';
    //     } else {
    //         icon.className = 'fas fa-moon';
    //     }
    // }
     setTheme(theme) {
        this.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update toggle icon
        const icon = this.themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            this.initStarAnimation(); // Add stars when switching to dark
        } else {
            icon.className = 'fas fa-moon';
            // Remove stars when switching to light
            document.querySelector('.starfield')?.remove();
        }
    }

    toggleTheme() {
        const currentTheme = this.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// Mobile Navigation
class MobileNavigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.hamburger.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close menu when clicking on nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        
        // Animate hamburger
        const spans = this.hamburger.querySelectorAll('span');
        if (this.navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        
        // Reset hamburger animation
        const spans = this.hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Smooth Scrolling for Navigation Links
class SmoothScrolling {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Active Navigation Link Highlighting
class ActiveNavigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.updateActiveLink();
        });
    }

    updateActiveLink() {
        const scrollPosition = window.scrollY + 100;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        // Create intersection observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, this.observerOptions);

        // Observe elements for animation
        this.observeElements();
    }

    observeElements() {
        const animatedElements = document.querySelectorAll(
            '.skill-category, .service-card, .portfolio-item, .timeline-item, .contact-info, .contact-form'
        );

        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            this.observer.observe(el);
        });
    }
}

// Flash Message Handler
class FlashMessageHandler {
    constructor() {
        this.init();
    }

    init() {
        // Auto-hide flash messages after 5 seconds
        const flashMessages = document.querySelectorAll('.flash-message');
        flashMessages.forEach(message => {
            setTimeout(() => {
                this.hideMessage(message);
            }, 5000);
        });

        // Add click handlers for close buttons
        document.querySelectorAll('.flash-close').forEach(button => {
            button.addEventListener('click', (e) => {
                const message = e.target.closest('.flash-message');
                this.hideMessage(message);
            });
        });
    }

    hideMessage(message) {
        message.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            message.remove();
        }, 300);
    }
}

class DownloadHandler {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[download]').forEach(link => {
            link.addEventListener('click', (e) => {
                // You could add analytics or confirmation here
                console.log('Downloading resume...');
            });
        });
    }
}

// Contact Form Enhancement
class ContactFormHandler {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                this.handleSubmit(e);
            });

            // Add real-time validation
            this.addValidation();
        }
    }

    handleSubmit(e) {
        // Basic client-side validation before form submission
        const name = this.form.querySelector('#name').value.trim();
        const email = this.form.querySelector('#email').value.trim();
        const message = this.form.querySelector('#message').value.trim();

        if (!name || !email || !message) {
            e.preventDefault();
            this.showError('All fields are required.');
            return;
        }

        if (!this.isValidEmail(email)) {
            e.preventDefault();
            this.showError('Please enter a valid email address.');
            return;
        }

        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Re-enable button after 3 seconds (in case of slow response)
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 3000);
    }

    addValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('placeholder') || field.name;

        if (!value) {
            this.setFieldError(field, `${fieldName} is required.`);
            return false;
        }

        if (field.type === 'email' && !this.isValidEmail(value)) {
            this.setFieldError(field, 'Please enter a valid email address.');
            return false;
        }

        this.clearFieldError(field);
        return true;
    }

    setFieldError(field, message) {
        this.clearFieldError(field);
        field.style.borderColor = '#ef4444';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showError(message) {
        // Create and show a temporary error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'flash-message flash-error';
        errorDiv.innerHTML = `
            ${message}
            <button class="flash-close">&times;</button>
        `;

        const flashContainer = document.querySelector('.flash-messages') || 
                             this.createFlashContainer();
        flashContainer.appendChild(errorDiv);

        // Add close functionality
        errorDiv.querySelector('.flash-close').addEventListener('click', () => {
            errorDiv.remove();
        });

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    createFlashContainer() {
        const container = document.createElement('div');
        container.className = 'flash-messages';
        document.body.appendChild(container);
        return container;
    }
}

// Navbar Scroll Effect
class NavbarScrollEffect {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.style.backgroundColor = 'rgba(248, 250, 252, 0.95)';
            this.navbar.style.backdropFilter = 'blur(10px)';
        } else {
            this.navbar.style.backgroundColor = 'var(--surface-color)';
            this.navbar.style.backdropFilter = 'blur(10px)';
        }
    }
}

// Typing Animation for Hero Section
class TypingAnimation {
    constructor() {
        this.init();
    }

    init() {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            const text = heroSubtitle.textContent;
            heroSubtitle.textContent = '';
            heroSubtitle.style.borderRight = '2px solid var(--primary-color)';
            
            this.typeText(heroSubtitle, text, 100);
        }
    }

    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                // Remove cursor after typing is complete
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, speed);
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ThemeManager();
    new MobileNavigation();
    new SmoothScrolling();
    new ActiveNavigation();
    new ScrollAnimations();
    new FlashMessageHandler();
    new ContactFormHandler();
    new NavbarScrollEffect();
    new DownloadHandler();
    
    // Add typing animation with a delay to let the page settle
    setTimeout(() => {
        new TypingAnimation();
    }, 500);
});

// Add CSS for slide out animation
// const style = document.createElement('style');
// style.textContent = `
//     @keyframes slideOut {
//         to {
//             transform: translateX(100%);
//             opacity: 0;
//         }
//     }
    
//     .field-error {
//         animation: fadeIn 0.3s ease-out;
//     }
// `;
// document.head.appendChild(style);
// Add CSS for slide out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .field-error {
        animation: fadeIn 0.3s ease-out;
    }

    /* Star Animation Styles */
    .starfield {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    }

    .star {
        position: absolute;
        background: white;
        border-radius: 50%;
        animation: twinkle 5s infinite alternate;
        opacity: 0.8;
    }

    @keyframes twinkle {
        0% { opacity: 0.3; }
        100% { opacity: 1; }
    }

    .shooting-star {
        position: absolute;
        width: 100px;
        height: 2px;
        background: linear-gradient(to right, transparent, white);
        border-radius: 50%;
        animation: shoot 3s linear;
        transform-origin: left center;
    }

    @keyframes shoot {
        0% {
            transform: scaleX(0) rotate(45deg);
            opacity: 1;
        }
        100% {
            transform: scaleX(50) rotate(45deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    // Any additional scroll-based functionality can be added here
}, 10));
