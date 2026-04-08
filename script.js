/* ====================================
   Custom Cursor Glow
==================================== */
const cursorGlow = document.querySelector('.cursor-glow');
const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
});

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorGlow.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorGlow.classList.remove('hovering'));
});


/* ====================================
   Navigation
==================================== */
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.classList.add('glass');
    } else {
        navbar.classList.remove('scrolled');
        navbar.classList.remove('glass');
    }
});

mobileMenuBtn.addEventListener('click', () => {
    const icon = mobileMenuBtn.querySelector('i');
    navLinks.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.remove('fa-xmark');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    });
});


/* ====================================
   Dark/Light Mode Toggle
==================================== */
const themeToggle = document.getElementById('theme-toggle');
const htmlTag = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check local storage for theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlTag.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlTag.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlTag.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        themeIcon.className = 'fa-solid fa-moon';
    }
}


/* ====================================
   Typing Animation
==================================== */
const textArray = ["Learning, Coding, and Growing Every Day", "Turning Ideas into Reality", "Building Modern Web Experiences"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

const typewriterSpan = document.getElementById("typewriter");

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typewriterSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typewriterSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if(textArray.length) setTimeout(type, newTextDelay + 250);
});


/* ====================================
   Scroll Reveal & Progress Bars
==================================== */
const hiddenElements = document.querySelectorAll('.hidden-element');

const observerOptions = {
    threshold: 0.2, // Trigger when 20% of element is visible
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-element');
            
            // Animate progress bars if the parent is intersecting
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.progress-bar');
                const targetWidth = progressBar.getAttribute('data-progress');
                progressBar.style.width = targetWidth;
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

hiddenElements.forEach(el => observer.observe(el));


/* ====================================
   Background Particles Canvas
==================================== */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    
    update() {
        // Bounce off screen edges
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    const numberOfParticles = (canvas.height * canvas.width) / 10000;
    
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) - 0.5;
        // The neon blue color
        let color = "rgba(0, 243, 255, 0.4)";
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

initParticles();
animateParticles();

// Resize canvas handling
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    initParticles();
});
// ✅ TEST (IMPORTANT)
console.log("JS Loaded ✅");

// 🔥 Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔐 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBf6WqZL-i51K00VNFWjmomS3jf5AUvb5w",
  authDomain: "portfolio-5468c.firebaseapp.com",
  projectId: "portfolio-5468c",
  storageBucket: "portfolio-5468c.firebasestorage.app",
  messagingSenderId: "880290426170",
  appId: "1:880290426170:web:2f4bbed78a12bb63fc3403"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 📩 FORM LOGIC
const form = document.getElementById("contactForm");
const status = document.getElementById("form-status");

if (!form) {
  console.error("Form NOT FOUND ❌");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("Form Submitted ✅");

  const name = form.name.value;
  const email = form.email.value;
  const message = form.message.value;

  try {
    await addDoc(collection(db, "messages"), {
      name,
      email,
      message,
      createdAt: new Date()
    });

    console.log("Saved to Firebase ✅");

    status.innerText = "✅ Message sent!";
    form.reset();

  } catch (error) {
    console.error("Firebase Error ❌:", error);
    status.innerText = "❌ Error sending message!";
  }
});
