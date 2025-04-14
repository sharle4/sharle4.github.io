document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.header');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const activeIndicator = document.querySelector('.active-indicator');
  // Sélectionne uniquement les sections qui ont un ID (pour la navigation)
  const sections = document.querySelectorAll('section[id]');

  // Fonction pour vérifier le scroll et appliquer la classe .scrolled au header
  function checkHeaderScroll() {
    // Vérifie si l'élément header existe
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Fonction pour mettre à jour la position/visibilité de l'indicateur actif
  function updateIndicatorVisibility(inAccueilSection = false) {
    // Vérifie si l'indicateur existe
    if (!activeIndicator) return;

    if (inAccueilSection || window.innerWidth <= 991) {
      // Cache l'indicateur sur mobile ou dans la section accueil
      activeIndicator.style.width = '0';
      activeIndicator.style.opacity = '0';
    } else {
      const activeLink = document.querySelector('.nav-link.active');
      const navLinksContainer = document.querySelector('.nav-links'); // Le conteneur UL

      if (activeLink && navLinksContainer) {
        // Calcule la position et la largeur par rapport au conteneur UL
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = navLinksContainer.getBoundingClientRect();
        const indicatorLeft = linkRect.left - navRect.left;

        // Applique la position et la largeur
        activeIndicator.style.width = `${linkRect.width}px`;
        activeIndicator.style.left = `${indicatorLeft}px`;
        activeIndicator.style.opacity = '1';
      } else {
        // Cache l'indicateur si aucun lien n'est actif (ou si conteneur non trouvé)
        activeIndicator.style.width = '0';
        activeIndicator.style.opacity = '0';
      }
    }
  }

  // --- NOUVELLE FONCTION ---
  // Fonction principale pour déterminer le lien actif et mettre à jour l'indicateur
  function updateActiveState() {
    // Vérifie si l'élément header existe pour le calcul de hauteur
    if (!header) return;
    const headerHeight = header.offsetHeight;
    // Point de déclenchement pour l'activation (juste sous le header + marge)
    const scrollPosition = window.scrollY + headerHeight + 50; // Ajustez le 50 si besoin

    let currentActiveSectionId = null;

    // Trouve la section actuellement visible
    sections.forEach(section => {
      // Vérifie si la section a bien un ID
      if (!section.id) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentActiveSectionId = section.id;
      }
    });

    // Détermine si on est dans la section "Accueil" (ou tout en haut)
    // On considère 'accueil' si aucune autre section n'est active et qu'on est près du haut,
    // ou si la section active détectée est explicitement 'accueil'.
    const isAccueil = (!currentActiveSectionId && window.scrollY < 150) || currentActiveSectionId === 'accueil'; // Ajustez 150 si besoin

    // Met à jour les classes 'active' sur les liens de navigation
    navLinks.forEach(link => {
      // Assurez-vous que le lien a un attribut href
      const linkHref = link.getAttribute('href');
      if (!linkHref) return;

      // Enlève 'active' par défaut
      link.classList.remove('active');

      // Ajoute 'active' si le href correspond à la section active ET si ce n'est pas l'accueil
      if (linkHref === `#${currentActiveSectionId}` && !isAccueil) {
        link.classList.add('active');
      }
    });

    // Met à jour l'indicateur visuel
    updateIndicatorVisibility(isAccueil);
  }
  // --- FIN NOUVELLE FONCTION ---


  // --- APPELS INITIAUX ---
  checkHeaderScroll();       // Vérifie le style du header au chargement
  updateActiveState();       // Met à jour le lien actif et l'indicateur au chargement

  // --- ÉVÉNEMENTS ---

  // Hamburger menu toggle
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Nav links click event (gestion du scroll fluide)
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      // Vérifie si href commence par # et cible une section existante
      if (targetId && targetId.startsWith('#')) {
         const targetSection = document.querySelector(targetId);
         if (targetSection) {
             e.preventDefault();

             // Ferme le menu mobile si ouvert
             if (hamburger.classList.contains('active')) {
               hamburger.classList.remove('active');
               navMenu.classList.remove('active');
               document.body.classList.remove('menu-open');
             }

             // Calcul de la position cible pour le scroll
             const headerHeight = header ? header.offsetHeight : 0;
             const targetPosition = targetSection.offsetTop - headerHeight;

             window.scrollTo({
               top: targetPosition,
               behavior: 'smooth'
             });

             // Note : l'état actif sera mis à jour par l'événement 'scroll' déclenché par scrollTo
         }
      }
    });
  });

  // Événement de scroll
  window.addEventListener('scroll', function() {
    checkHeaderScroll();
    updateActiveState(); // Met à jour l'état actif en scrollant
  });

  // Événement de redimensionnement de la fenêtre
  window.addEventListener('resize', function() {
    // Met à jour l'état actif au cas où les positions changent
    updateActiveState();
  });

  // Initialisations des bibliothèques
  if (typeof AOS !== 'undefined') { // Vérifie si AOS est chargé
    AOS.init();
  }
  if (typeof Rellax !== 'undefined' && document.querySelector('.parallax')) { // Vérifie Rellax et l'élément
      var rellax = new Rellax('.parallax');
  }
});