// script.js - Complete Enhanced Portfolio with all features

const API_URL = 'http://localhost:5000/api';

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

// ========== MOBILE MENU TOGGLE ==========
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ========== ACTIVE NAVIGATION LINK ==========
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========== PARTICLE BACKGROUND ==========
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticles() {
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        particles = [];
        createParticles();
    });
    
    resizeCanvas();
    createParticles();
    animateParticles();
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

// ========== SKILL BARS ANIMATION ==========
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// ========== SCROLL REVEAL ANIMATION ==========
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

// ========== PROJECT FILTERS ==========
let allProjects = [];

function setupFilters(projects) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    allProjects = projects;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // For demo purposes, show all projects
            // You can enhance this to filter by category later
            displayProjects(allProjects);
        });
    });
}

// ========== LOAD PROJECTS FROM DATABASE ==========
async function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    try {
        const response = await fetch(`${API_URL}/projects`);
        const data = await response.json();
        
        if (data.success && data.projects.length > 0) {
            displayProjects(data.projects);
            setupFilters(data.projects);
        } else {
            projectsGrid.innerHTML = '<div class="loading">✨ No projects yet. Add some to your database!</div>';
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsGrid.innerHTML = '<div class="loading">⚠️ Error loading projects. Make sure your backend is running!</div>';
    }
}

function displayProjects(projects) {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';
    
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`;
        projectCard.innerHTML = `
            <img src="${project.image_url || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500'}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description || 'An amazing project built with modern technologies.'}</p>
            <a href="${project.project_url || '#'}" class="project-link" target="_blank">
                View Project <i class="fas fa-arrow-right"></i>
            </a>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// ========== HANDLE CONTACT FORM SUBMISSION ==========
async function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const formMessage = document.getElementById('formMessage');
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Validate
    if (!formData.name || !formData.email || !formData.message) {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Please fill in all fields!';
        setTimeout(() => {
            formMessage.className = '';
            formMessage.textContent = '';
        }, 3000);
        return;
    }
    
    // Disable button while sending
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    try {
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            formMessage.className = 'form-message success';
            formMessage.innerHTML = '<i class="fas fa-check-circle"></i> ' + result.message;
            form.reset();
        } else {
            formMessage.className = 'form-message error';
            formMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + (result.message || 'Something went wrong!');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        formMessage.className = 'form-message error';
        formMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Could not connect to server!';
    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        
        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.className = '';
            formMessage.innerHTML = '';
        }, 5000);
    }
}

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

// ========== INITIALIZE EVERYTHING ON PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', () => {
    // Load projects from database
    loadProjects();
    
    // Animate skill bars when they come into view
    setTimeout(() => {
        animateSkillBars();
    }, 500);
    
    // Setup scroll reveal
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    
    // Setup contact form handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});

// ========== PARALLAX EFFECT ON HERO ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});