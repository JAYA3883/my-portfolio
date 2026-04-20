// script.js - Portfolio with hardcoded projects (no database needed)

// ========== PROJECTS (Hardcoded - No Database Required) ==========
const projects = [
    {
        title: "My Portfolio Website",
        description: "A beautiful personal portfolio website built with Node.js, Express, and modern HTML/CSS.",
        image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500",
        project_url: "https://github.com/JAYA3883/my-portfolio"
    },
    {
        title: "Weather App",
        description: "Check weather in any city using OpenWeatherMap API. Built with JavaScript and API integration.",
        image_url: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=500",
        project_url: "https://github.com/JAYA3883/weather-app"
    },
    {
        title: "Task Manager",
        description: "Keep track of your daily tasks with this simple and elegant task management app.",
        image_url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500",
        project_url: "https://github.com/JAYA3883/task-manager"
    },
    {
        title: "E-commerce Dashboard",
        description: "Admin dashboard for managing products, orders, and customers.",
        image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
        project_url: "https://github.com/JAYA3883/ecommerce-dashboard"
    },
    {
        title: "Chat Application",
        description: "Real-time chat app using WebSockets. Perfect for team communication.",
        image_url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500",
        project_url: "https://github.com/JAYA3883/chat-app"
    },
    {
        title: "Blog Platform",
        description: "Full-featured blog with comments, categories, and user authentication.",
        image_url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500",
        project_url: "https://github.com/JAYA3883/blog-platform"
    }
];

// ========== DISPLAY PROJECTS ==========
function displayProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`;
        projectCard.innerHTML = `
            <img src="${project.image_url}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.project_url}" class="project-link" target="_blank">
                View Project <i class="fas fa-arrow-right"></i>
            </a>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// ========== HANDLE CONTACT FORM (Stores in localStorage for now) ==========
async function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const formMessage = document.getElementById('formMessage');
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        date: new Date().toLocaleString()
    };
    
    // Validate
    if (!formData.name || !formData.email || !formData.message) {
        showMessage(formMessage, 'Please fill in all fields!', 'error');
        return;
    }
    
    // Disable button
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate sending (store in localStorage for demo)
    setTimeout(() => {
        // Save to localStorage
        let messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
        messages.push(formData);
        localStorage.setItem('portfolio_messages', JSON.stringify(messages));
        
        showMessage(formMessage, 'Message sent successfully! I will get back to you soon.', 'success');
        form.reset();
        
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }, 1000);
}

function showMessage(element, message, type) {
    element.className = `form-message ${type}`;
    element.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
    
    setTimeout(() => {
        element.className = '';
        element.innerHTML = '';
    }, 5000);
}

// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 80);
    });
    
    document.querySelectorAll('a, button, .btn, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// ========== MOBILE MENU ==========
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// ========== TYPING ANIMATION ==========
const typedElement = document.getElementById('typed-text');
if (typedElement) {
    const words = ['Full-Stack Developer', 'Creative Coder', 'Problem Solver', 'Tech Enthusiast'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }
    
    typeEffect();
}

// ========== SKILL BARS ==========
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// ========== SCROLL REVEAL ==========
function revealOnScroll() {
    const reveals = document.querySelectorAll('.skill-card, .project-card, .contact-item');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial styles for scroll reveal
document.querySelectorAll('.skill-card, .project-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
});

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    displayProjects();
    animateSkillBars();
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});

// ========== PARTICLE BACKGROUND ==========
// Enhanced Starry Background with Twinkling Stars
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createStars() {
        const starCount = 200;
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                alpha: Math.random(),
                alphaChange: (Math.random() * 0.02) + 0.005
            });
        }
    }
    
    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            // Twinkling effect
            star.alpha += star.alphaChange;
            if (star.alpha >= 1 || star.alpha <= 0.2) {
                star.alphaChange *= -1;
            }
            
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animateStars);
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        stars = [];
        createStars();
    });
    
    resizeCanvas();
    createStars();
    animateStars();
}