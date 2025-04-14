const backToTopButton = document.getElementById('backToTopBtn');

if (backToTopButton) { // Vérifie si le bouton existe
  const scrollThreshold = 300; // Seuil en pixels pour afficher le bouton

  const checkScrollTop = () => {
    if (window.scrollY > scrollThreshold) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  };

  // Vérifie au chargement et au scroll
  window.addEventListener('scroll', checkScrollTop);
  checkScrollTop(); // Appel initial

  // Action au clic
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Défilement fluide
    });
  });
}