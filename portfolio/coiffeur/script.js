// Mobile Menu Toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('nav').classList.toggle('active');
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Hero Slider
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-nav-item');
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 5000);

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Add click events to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        slideInterval = setInterval(nextSlide, 5000);
    });
});

// Gallery Filter
const galleryTabs = document.querySelectorAll('.gallery-tab');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        galleryTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        const filter = tab.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

document.querySelector('.next-btn').addEventListener('click', () => {
    testimonials[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
});

document.querySelector('.prev-btn').addEventListener('click', () => {
    testimonials[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
});

// Booking Form Submit
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Merci pour votre demande de rendez-vous ! Nous vous contacterons rapidement pour confirmer.');
    this.reset();
});

// Gallery Lightbox Effect (simplified version)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').getAttribute('src');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${imgSrc}" alt="Lightbox Image">
                <button class="close-lightbox">&times;</button>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Style for lightbox
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
        lightbox.style.display = 'flex';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.zIndex = '2000';
        
        // Style for lightbox content
        lightbox.querySelector('.lightbox-content').style.position = 'relative';
        lightbox.querySelector('.lightbox-content').style.maxWidth = '90%';
        lightbox.querySelector('.lightbox-content').style.maxHeight = '90%';
        
        // Style for image
        lightbox.querySelector('img').style.maxWidth = '100%';
        lightbox.querySelector('img').style.maxHeight = '90vh';
        lightbox.querySelector('img').style.display = 'block';
        
        // Style for close button
        lightbox.querySelector('.close-lightbox').style.position = 'absolute';
        lightbox.querySelector('.close-lightbox').style.top = '-40px';
        lightbox.querySelector('.close-lightbox').style.right = '0';
        lightbox.querySelector('.close-lightbox').style.fontSize = '30px';
        lightbox.querySelector('.close-lightbox').style.color = 'white';
        lightbox.querySelector('.close-lightbox').style.background = 'none';
        lightbox.querySelector('.close-lightbox').style.border = 'none';
        lightbox.querySelector('.close-lightbox').style.cursor = 'pointer';
        
        // Close lightbox on button click or outside click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.classList.contains('close-lightbox')) {
                document.body.removeChild(lightbox);
            }
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu if open
        document.getElementById('nav').classList.remove('active');
    });
});