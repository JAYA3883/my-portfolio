// Graphics-Rich Portfolio Effects

// ========== 3D ORB CANVAS ==========
const orbCanvas = document.getElementById('orbCanvas');
if (orbCanvas) {
    const ctx = orbCanvas.getContext('2d');
    let orbWidth, orbHeight;
    let time = 0;
    
    function resizeOrb() {
        const rect = orbCanvas.parentElement.getBoundingClientRect();
        orbCanvas.width = rect.width;
        orbCanvas.height = rect.height;
        orbWidth = rect.width;
        orbHeight = rect.height;
    }
    
    function drawOrb() {
        if (!ctx) return;
        ctx.clearRect(0, 0, orbCanvas.width, orbCanvas.height);
        
        const centerX = orbCanvas.width / 2;
        const centerY = orbCanvas.height / 2;
        const radius = Math.min(orbCanvas.width, orbCanvas.height) * 0.3;
        
        // Draw glowing orb
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, 'rgba(168, 85, 247, 0.8)');
        gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.3)');
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw rotating particles
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2 + time;
            const particleRadius = radius * 0.8;
            const x = centerX + Math.cos(angle) * particleRadius;
            const y = centerY + Math.sin(angle) * particleRadius;
            
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + Math.sin(time * 2 + i) * 0.3})`;
            ctx.fill();
        }
        
        time += 0.02;
        requestAnimationFrame(drawOrb);
    }
    
    window.addEventListener('resize', () => {
        resizeOrb();
    });
    
    resizeOrb();
    drawOrb();
}

// ========== CUSTOM CURSOR ==========
const cursorGlow = document.querySelector('.cursor-glow');
const cursorTrail = document.querySelector('.cursor-trail');

if (cursorGlow && cursorTrail) {
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorGlow.style.transform = `translate(${mouseX - 15}px, ${mouseY - 15}px)`;
    });
    
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.2;
        trailY += (mouseY - trailY) * 0.2;
        cursorTrail.style.transform = `translate(${trailX - 4}px, ${trailY - 4}px)`;
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
    
    document.querySelectorAll('a, button, .btn-primary, .btn-outline, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorGlow.style.transform = `scale(1.5)`;
            cursorGlow.style.background = `radial-gradient(circle, rgba(168, 85, 247, 0.6), transparent)`;
        });
        el.addEventListener('mouseleave', () => {
            cursorGlow.style.transform = `scale(1)`;
            cursorGlow.style.background = `radial-gradient(circle, rgba(168, 85, 247, 0.8), transparent)`;
        });
    });
}

// ========== COUNTUP ANIMATION ==========
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target;
            }
        };
        updateNumber();
    });
}

// ========== SKILL BARS ANIMATION ==========
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 100);
    });
}

// ========== TYPING ANIMATION ==========
const typedElement = document.getElementById('typed-text');
if (typedElement) {
    const words = ['Creative Developer', 'Problem Solver', 'Tech Enthusiast', 'Web Builder'];
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

// ========== SCROLL REVEAL ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// ========== LOAD PROJECTS ==========
const projects = [
    {
        title: "E-Commerce Platform",
        description: "Full-featured online store with cart and payment integration",
        image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500",
        link: "#"
    },
    {
        title: "Social Dashboard",
        description: "Analytics dashboard for social media metrics",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
        link: "#"
    },
    {
        title: "Task Manager App",
        description: "Productivity app with real-time updates",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500",
        link: "#"
    },
    {
        title: "Weather App",
        description: "Real-time weather data using OpenWeather API",
        image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=500",
        link: "#"
    },
    {
        title: "Blog Platform",
        description: "Full-featured blog with comments and categories",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500",
        link: "#"
    },
    {
        title: "Portfolio 2025",
        description: "Modern portfolio with 3D effects and animations",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500",
        link: "#"
    }
];

function displayProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" class="project-link" target="_blank">
                View Project <i class="fas fa-arrow-right"></i>
            </a>
        `;
        projectsGrid.appendChild(card);
    });
}

// ========== CONTACT FORM ==========
async function handleContactSubmit(event) {
    event.preventDefault();
    
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.querySelector('.btn-submit');
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    
    setTimeout(() => {
        formMessage.className = 'form-message success';
        formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
        document.getElementById('contactForm').reset();
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        
        setTimeout(() => {
            formMessage.className = '';
            formMessage.innerHTML = '';
        }, 5000);
    }, 1500);
}

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    displayProjects();
    animateSkillBars();
    animateNumbers();
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingElements = document.querySelector('.floating-elements');
    if (floatingElements) {
        floatingElements.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});