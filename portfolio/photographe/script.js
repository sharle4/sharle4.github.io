// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loader
    setTimeout(function() {
        const loader = document.querySelector('.loader');
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.style.display = 'none';
            document.body.style.overflow = '';
        }, 500);
    }, 2000);
    
    // Custom cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Add a slight delay to the outline cursor for a smooth follow effect
            setTimeout(function() {
                cursorOutline.style.left = `${posX}px`;
                cursorOutline.style.top = `${posY}px`;
            }, 50);
        });
        
        // Apply different cursor styles on interactive elements
        const hoverables = document.querySelectorAll('a, button, .gallery-item, .service-card, .timeline-item');
        
        hoverables.forEach(hoverable => {
            hoverable.addEventListener('mouseenter', function() {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.borderColor = 'var(--color-accent)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });
            
            hoverable.addEventListener('mouseleave', function() {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = 'var(--color-accent)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }
    
    // Side navigation
    const sideNav = document.querySelector('.side-nav');
    const navHandle = document.querySelector('.nav-handle');
    
    navHandle.addEventListener('click', function() {
        sideNav.classList.toggle('active');
    });
    
    // Toggle active class on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const offsetTop = document.querySelector(href).offsetTop;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close side navigation on mobile
            if (window.innerWidth <= 576) {
                sideNav.classList.remove('active');
            }
        });
    });
    
    // Showcase slider functionality
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-pagination');
    const dots = document.querySelectorAll('.pagination-dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const counter = document.querySelector('.slider-counter .current');
    const slideInfo = document.querySelector('.slide-info');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    function showSlide(index) {
        if (index < 0) {
            currentSlide = slideCount - 1;
        } else if (index >= slideCount) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        // Update slide display
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
        
        // Update counter
        counter.textContent = (currentSlide + 1).toString().padStart(2, '0');
        
        // Update info text
        slideInfo.textContent = slides[currentSlide].getAttribute('data-info');
    }
    
    // Initialize slider
    showSlide(0);
    
    // Event listeners for slider controls
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    
    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-slide
    let slideInterval = setInterval(() => showSlide(currentSlide + 1), 6000);
    
    // Pause slideshow on hover
    const showcaseSlider = document.querySelector('.showcase-slider');
    
    showcaseSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    showcaseSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => showSlide(currentSlide + 1), 6000);
    });
    
    // Portfolio filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
    
    // Portfolio view options
    const viewBtns = document.querySelectorAll('.view-btn');
    const galleryContainer = document.querySelector('.gallery-container');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            viewBtns.forEach(viewBtn => viewBtn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const view = this.getAttribute('data-view');
            galleryContainer.setAttribute('data-view', view);
        });
    });
    
    // Gallery modal
    const galleryModal = document.querySelector('.gallery-modal');
    const modalImage = document.querySelector('.modal-image');
    const modalTitle = document.querySelector('.modal-info h3');
    const modalCategory = document.querySelector('.modal-info span');
    const modalClose = document.querySelector('.modal-close');
    const modalNext = document.querySelector('.modal-nav.next');
    const modalPrev = document.querySelector('.modal-nav.prev');
    const expandBtns = document.querySelectorAll('.gallery-expand');
    
    let currentImageIndex = 0;
    
    expandBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const item = this.closest('.gallery-item');
            const image = item.querySelector('img').src;
            const title = item.querySelector('h3').textContent;
            const category = item.querySelector('span').textContent;
            
            modalImage.src = image;
            modalTitle.textContent = title;
            modalCategory.textContent = category;
            
            currentImageIndex = index;
            galleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    modalClose.addEventListener('click', function() {
        galleryModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside content
    galleryModal.addEventListener('click', function(e) {
        if (e.target === galleryModal) {
            galleryModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Modal navigation
    modalNext.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        updateModalContent();
    });
    
    modalPrev.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        updateModalContent();
    });
    
    function updateModalContent() {
        const item = galleryItems[currentImageIndex];
        const image = item.querySelector('img').src;
        const title = item.querySelector('h3').textContent;
        const category = item.querySelector('span').textContent;
        
        modalImage.src = image;
        modalTitle.textContent = title;
        modalCategory.textContent = category;
    }
    
    // Testimonial slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const testimonialPrev = document.querySelector('.testimonial-btn.prev');
    const testimonialNext = document.querySelector('.testimonial-btn.next');
    
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        if (index < 0) {
            currentTestimonial = testimonialItems.length - 1;
        } else if (index >= testimonialItems.length) {
            currentTestimonial = 0;
        } else {
            currentTestimonial = index;
        }
        
        // Update testimonial display
        testimonialItems.forEach(item => item.classList.remove('active'));
        testimonialItems[currentTestimonial].classList.add('active');
        
        // Update dots
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        testimonialDots[currentTestimonial].classList.add('active');
    }
    
    // Initialize testimonial slider
    showTestimonial(0);
    
    // Event listeners for testimonial controls
    testimonialPrev.addEventListener('click', () => showTestimonial(currentTestimonial - 1));
    testimonialNext.addEventListener('click', () => showTestimonial(currentTestimonial + 1));
    
    // Testimonial dots navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto-slide testimonials
    let testimonialInterval = setInterval(() => showTestimonial(currentTestimonial + 1), 5000);
    
    // Pause testimonial slideshow on hover
    const testimonialSlider = document.querySelector('.testimonials-slider');
    
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => showTestimonial(currentTestimonial + 1), 5000);
    });
    
    // Google Map interaction
    const mapOverlay = document.querySelector('.map-overlay');
    const mapBtn = document.querySelector('.map-btn');
    
    mapBtn.addEventListener('click', function() {
        mapOverlay.classList.add('hidden');
    });
    
    // Animate stats counter
    const stats = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const count = parseInt(stat.textContent);
            const increment = target / 50; // Divide by the number of steps
            
            if (count < target) {
                stat.textContent = Math.ceil(count + increment);
                setTimeout(animateStats, 50);
            } else {
                stat.textContent = target;
            }
        });
    }
    
    // Start animation when scrolled into view
    let statsAnimated = false;
    window.addEventListener('scroll', function() {
        if (!statsAnimated) {
            const aboutStats = document.querySelector('.about-stats');
            const position = aboutStats.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (position < screenPosition) {
                animateStats();
                statsAnimated = true;
            }
        }
    });
    
    // Contact form submission
    const contactForm = document.getElementById('quote-form');
    const formSuccess = document.querySelector('.form-success');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        let valid = true;
        const requiredInputs = contactForm.querySelectorAll('[required]');
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (valid) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.innerHTML = '<span class="btn-text">Envoi en cours...</span>';
            
            setTimeout(() => {
                formSuccess.classList.add('active');
                
                // Reset form
                contactForm.reset();
            }, 1500);
        }
    });
    
    // Parallax effect for about image
    const imageParallax = document.querySelector('.image-parallax');
    const imageWrapper = document.querySelector('.image-wrapper');
    
    imageWrapper.addEventListener('mousemove', function(e) {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
        
        imageParallax.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
    
    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Parallax scrolling effect for sections
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Parallax for home section
        const homeSection = document.querySelector('.home-section');
        const slideImages = document.querySelectorAll('.slide-image');
        
        if (scrollPosition <= homeSection.offsetHeight) {
            slideImages.forEach(image => {
                image.style.transform = `scale(1.1) translateY(${scrollPosition * 0.2}px)`;
            });
        }
        
        // Parallax for other sections
        document.querySelectorAll('.section-title').forEach(title => {
            const titlePosition = title.getBoundingClientRect().top;
            if (titlePosition < window.innerHeight) {
                title.style.transform = `translateX(${(window.innerHeight - titlePosition) * 0.05}px)`;
            }
        });
    });
    
    // Loading animations for elements as they scroll into view
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    function handleScrollAnimations() {
        // Animate service cards
        document.querySelectorAll('.service-card').forEach((card, index) => {
            if (isInViewport(card)) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
            }
        });
        
        // Animate timeline items
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            if (isInViewport(item)) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 200);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-30px)';
            }
        });
        
        // Animate contact items
        document.querySelectorAll('.contact-item').forEach((item, index) => {
            if (isInViewport(item)) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 200);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
            }
        });
    }
    
    // Apply initial styles for animation
    document.querySelectorAll('.service-card, .timeline-item, .contact-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'var(--transition)';
    });
    
    document.querySelectorAll('.timeline-item').forEach(element => {
        element.style.transform = 'translateX(-30px)';
    });
    
    document.querySelectorAll('.service-card, .contact-item').forEach(element => {
        element.style.transform = 'translateY(30px)';
    });
    
    // Handle animations on scroll
    window.addEventListener('scroll', handleScrollAnimations);
    window.addEventListener('resize', handleScrollAnimations);
    
    // Call once on load after a small delay to ensure elements are rendered
    setTimeout(handleScrollAnimations, 500);
    
    // Load more button for portfolio
    const loadMoreBtn = document.querySelector('.load-more-btn');
    let itemsToShow = 9; // Initial number of items shown
    
    loadMoreBtn.addEventListener('click', function() {
        const hiddenItems = Array.from(galleryItems).slice(itemsToShow);
        
        if (hiddenItems.length > 0) {
            const itemsToReveal = hiddenItems.slice(0, 3); // Show 3 more items
            
            itemsToReveal.forEach((item, index) => {
                setTimeout(() => {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 200);
            });
            
            itemsToShow += 3;
            
            // Hide load more button if all items are shown
            if (itemsToShow >= galleryItems.length) {
                loadMoreBtn.textContent = 'Tous affichés';
                loadMoreBtn.disabled = true;
            }
        }
    });
    
    // Initially hide items beyond the initial count
    Array.from(galleryItems).slice(itemsToShow).forEach(item => {
        item.style.display = 'none';
        item.style.opacity = '0';
    });
    
    // Keyboard navigation for gallery modal
    document.addEventListener('keydown', function(e) {
        if (galleryModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                galleryModal.classList.remove('active');
                document.body.style.overflow = '';
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
                updateModalContent();
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
                updateModalContent();
            }
        }
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const submitBtn = this.querySelector('button');
        
        if (emailInput.value.trim() !== '') {
            // Simulate form submission
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                emailInput.value = '';
                
                // Reset after a moment
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
                }, 2000);
            }, 1500);
        }
    });
});