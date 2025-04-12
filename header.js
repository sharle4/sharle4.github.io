document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.header');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const activeIndicator = document.querySelector('.active-indicator');
  
  // Set active indicator position initially
  setTimeout(() => {
    updateIndicatorVisibility();
  }, 100);
  
  // Hamburger menu toggle
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  
  // Nav links click event
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Remove active class from all links
      navLinks.forEach(link => link.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Set active indicator
      if (window.innerWidth > 991) {
        updateIndicatorVisibility();
      }
      
      // Close mobile menu if open
      if (hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
      
      // Smooth scroll to section
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Scroll events
  window.addEventListener('scroll', function() {
    // Header styling on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Update active link on scroll
    const scrollPosition = window.scrollY + header.offsetHeight + 100;
    
    const sections = document.querySelectorAll('.section');
    let inAccueilSection = false;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        if (sectionId === 'hero') {
          inAccueilSection = true;
          // Clear all active states when in accueil
          navLinks.forEach(link => link.classList.remove('active'));
        } else {
          inAccueilSection = false;
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      }
    });
    
    updateIndicatorVisibility(inAccueilSection);
  });
  
  // Function to update active indicator visibility and position
  function updateIndicatorVisibility(inAccueilSection = false) {
    if (inAccueilSection || window.innerWidth <= 991) {
      // Hide the indicator
      activeIndicator.style.width = '0';
      activeIndicator.style.opacity = '0';
    } else {
      const activeLink = document.querySelector('.nav-link.active');
      if (activeLink) {
        // Show and position the indicator
        const linkPosition = activeLink.getBoundingClientRect();
        const navPosition = document.querySelector('.nav-links').getBoundingClientRect();
        
        activeIndicator.style.width = `${linkPosition.width}px`;
        activeIndicator.style.left = `${linkPosition.left - navPosition.left}px`;
        activeIndicator.style.opacity = '1';
      } else {
        // No active link, hide the indicator
        activeIndicator.style.width = '0';
        activeIndicator.style.opacity = '0';
      }
    }
  }
  
  // Window resize event
  window.addEventListener('resize', function() {
    if (window.innerWidth > 991) {
      updateIndicatorVisibility();
    }
  });
});