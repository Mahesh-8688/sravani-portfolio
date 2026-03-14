// Background Particles
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 157, 0, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(handleParticles);
}

init();
for (let i = 0; i < 100; i++) particles.push(new Particle());
handleParticles();

// Typing Effect
const textArr = ["BBA Student", "Systems Applications Specialist", "Survey Leader"];
let textIdx = 0;
let charIdx = 0;
const typingSpeed = 100;
const target = document.getElementById('typing-text');

function type() {
    if (charIdx < textArr[textIdx].length) {
        target.innerHTML += textArr[textIdx].charAt(charIdx);
        charIdx++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIdx > 0) {
        target.innerHTML = textArr[textIdx].substring(0, charIdx - 1);
        charIdx--;
        setTimeout(erase, 50);
    } else {
        textIdx = (textIdx + 1) % textArr.length;
        setTimeout(type, 500);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 1000, once: true });
    type();
});