// 1. Smooth Scroll on Navigation Click
document.querySelectorAll('header nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// 2. Animated Button Hover Effects
const buttons = document.querySelectorAll('.hero-buttons .btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.transition = 'transform 0.3s ease';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
});

// 3. Background Animation for Hero Section
let colors = ['#3498db', '#8e44ad', '#f39c12', '#2c3e50'];
let i = 0;
const heroSection = document.querySelector('.hero');
setInterval(() => {
    heroSection.style.background = `linear-gradient(135deg, ${colors[i]}, ${colors[(i + 1) % colors.length]})`;
    i = (i + 1) % colors.length;
}, 5000);

// 4. Scroll Reveal Effect for Features Section
const features = document.querySelectorAll('.feature');
window.addEventListener('scroll', () => {
    features.forEach(feature => {
        const rect = feature.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            feature.classList.add('reveal');
        }
    });
});

// 5. Show/Hide Navigation Bar on Scroll
const navbar = document.querySelector('header');
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        navbar.style.top = '-80px';  // Hide navbar on scroll down
    } else {
        navbar.style.top = '0';  // Show navbar on scroll up
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll
});
