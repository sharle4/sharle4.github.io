// Wait for DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loader animation
    setTimeout(() => {
        const loader = document.querySelector('.loader-container');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            
            // Animate elements with data-aos attribute
            document.querySelectorAll('[data-aos]').forEach(element => {
                element.classList.add('aos-animate');
            });

        }, 500);
    }, 2000);

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    
    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Change cursor size on hoverable elements
        const hoverables = document.querySelectorAll('a, button, .menu-item, .concept-card, .info-card');
        
        hoverables.forEach(hoverable => {
            hoverable.addEventListener('mouseenter', () => {
                cursor.style.width = '50px';
                cursor.style.height = '50px';
                cursor.style.backgroundColor = 'rgba(255, 107, 53, 0.2)';
            });
            
            hoverable.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'rgba(255, 107, 53, 0.3)';
            });
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile navigation toggle
    const burgerMenu = document.querySelector('.burger-menu');
    const mainNav = document.querySelector('.main-nav');
    
    burgerMenu.addEventListener('click', () => {
        header.classList.toggle('mobile-nav-active');
        mainNav.classList.toggle('mobile-nav-active');
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (header.classList.contains('mobile-nav-active')) {
                    header.classList.remove('mobile-nav-active');
                    mainNav.classList.remove('mobile-nav-active');
                }
            }
        });
    });

    // Menu filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            // Show/hide menu items based on filter
            menuItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Reservation form tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Image slider
    const sliderItems = document.querySelectorAll('.slider-item');
    const sliderDots = document.querySelectorAll('.slider-dots .dot');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        sliderItems.forEach(item => item.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        sliderItems[index].classList.add('active');
        sliderDots[index].classList.add('active');
    }
    
    sliderNext.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % sliderItems.length;
        showSlide(currentSlide);
    });
    
    sliderPrev.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + sliderItems.length) % sliderItems.length;
        showSlide(currentSlide);
    });
    
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto slide
    setInterval(() => {
        currentSlide = (currentSlide + 1) % sliderItems.length;
        showSlide(currentSlide);
    }, 5000);

    // Testimonial slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => card.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        // Show current testimonial
        testimonialCards[index].classList.add('active');
        testimonialDots[index].classList.add('active');
    }
    
    testimonialNext.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    });
    
    testimonialPrev.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    });
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Auto testimonial slide
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 7000);

    // Parallax effect on hero section
    const heroSection = document.querySelector('.hero');
    const plate = document.querySelector('.plate');
    const ingredients = document.querySelectorAll('.ingredient');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;
        
        if (scrollPosition <= heroHeight) {
            const parallaxValue = scrollPosition * 0.5;
            plate.style.transform = `translateY(-${parallaxValue * 0.2}px) rotate(${parallaxValue * 0.05}deg)`;
            
            ingredients.forEach(ingredient => {
                const speed = ingredient.dataset.speed;
                ingredient.style.transform = `translateY(-${parallaxValue * speed}px)`;
            });
        }
    });

    // Scroll reveal animation
    function revealOnScroll() {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Shopping cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCartButton = document.querySelector('.close-cart');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total .price');
    const emptyCart = document.querySelector('.empty-cart');
    let cart = [];
    
    // Add to cart
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const menuItem = button.closest('.menu-item');
            const itemName = menuItem.querySelector('h3').textContent;
            const itemPrice = parseFloat(menuItem.querySelector('.menu-price').textContent.replace('€', ''));
            const itemImage = menuItem.querySelector('img').src;
            
            // Check if item is already in cart
            const existingItem = cart.find(item => item.name === itemName);
            
            if (existingItem) {
                existingItem.quantity++;
                updateCartUI();
            } else {
                const newItem = {
                    name: itemName,
                    price: itemPrice,
                    image: itemImage,
                    quantity: 1
                };
                
                cart.push(newItem);
                updateCartUI();
            }
            
            // Open cart
            openCart();
            
            // Animation for button
            button.innerHTML = 'Ajouté!';
            button.style.backgroundColor = 'var(--success)';
            button.style.color = 'var(--white)';
            button.style.borderColor = 'var(--success)';
            
            setTimeout(() => {
                button.innerHTML = 'Ajouter';
                button.style.backgroundColor = '';
                button.style.color = '';
                button.style.borderColor = '';
            }, 1500);
        });
    });
    
    // Update cart UI
    function updateCartUI() {
        if (cart.length === 0) {
            emptyCart.style.display = 'flex';
            cartTotal.textContent = '0.00 €';
            return;
        }
        
        emptyCart.style.display = 'none';
        
        // Clear cart items
        cartItems.innerHTML = '';
        
        // Calculate total
        let total = 0;
        
        // Add items to cart
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">${item.price.toFixed(2)} €</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-index="${index}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;
            
            cartItems.appendChild(cartItemElement);
        });
        
        // Update total
        cartTotal.textContent = total.toFixed(2) + ' €';
        
        // Add event listeners to newly created buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                
                if (button.classList.contains('minus')) {
                    if (cart[index].quantity > 1) {
                        cart[index].quantity--;
                    } else {
                        cart.splice(index, 1);
                    }
                } else {
                    cart[index].quantity++;
                }
                
                updateCartUI();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                cart.splice(index, 1);
                updateCartUI();
            });
        });
    }
    
    // Open cart
    function openCart() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close cart
    function closeCart() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Open cart button (we'll use the add to cart button for now)
    const cartButtons = document.querySelectorAll('.reservation-btn a');
    
    cartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.textContent === 'Commander') {
                e.preventDefault();
                openCart();
            }
        });
    });
    
    // Close cart button
    closeCartButton.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Form submission (mock)
    const submitButtons = document.querySelectorAll('form .btn-primary');
    
    submitButtons.forEach(button => {
        button.addEventListener('click', () => {
            const form = button.closest('form');
            const inputs = form.querySelectorAll('input, select, textarea');
            let valid = true;
            
            inputs.forEach(input => {
                if (input.required && !input.value) {
                    input.style.borderColor = 'var(--error)';
                    valid = false;
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (valid) {
                button.innerHTML = '<i class="fas fa-check"></i> Envoyé!';
                button.style.backgroundColor = 'var(--success)';
                
                setTimeout(() => {
                    inputs.forEach(input => {
                        input.value = '';
                    });
                    button.innerHTML = 'Envoyer';
                    button.style.backgroundColor = '';
                }, 2000);
            }
        });
    });

    // Initialize GSAP animations
    if (typeof gsap !== 'undefined') {
        // Stagger animation for concept cards
        gsap.fromTo('.concept-card', {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.concept',
                start: 'top 80%'
            }
        });
        
        // Menu items animation
        gsap.fromTo('.menu-item', {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.menu',
                start: 'top 80%'
            }
        });
    }

    // Active nav highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});

// Add CSS rules dynamically for cart items (since they're created dynamically)
const style = document.createElement('style');
style.textContent = `
    .cart-item {
        display: flex;
        gap: 1.5rem;
        padding: 1.5rem 0;
        border-bottom: 1px solid var(--border);
    }
    
    .cart-item-image {
        width: 60px;
        height: 60px;
        border-radius: var(--border-radius);
        overflow: hidden;
    }
    
    .cart-item-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .cart-item-details {
        flex: 1;
    }
    
    .cart-item-details h4 {
        font-size: 1.6rem;
        margin-bottom: 0.5rem;
    }
    
    .cart-item-price {
        font-weight: 600;
        color: var(--primary);
        margin-bottom: 0.5rem;
    }
    
    .cart-item-quantity {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .quantity-btn {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: var(--light-bg);
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-weight: 600;
        transition: var(--transition);
    }
    
    .quantity-btn:hover {
        background-color: var(--primary);
        color: var(--white);
    }
    
    .remove-item {
        background: none;
        border: none;
        color: var(--text-light);
        cursor: pointer;
        transition: var(--transition);
    }
    
    .remove-item:hover {
        color: var(--error);
    }
`;
document.head.appendChild(style);