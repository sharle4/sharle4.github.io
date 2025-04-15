document.addEventListener('DOMContentLoaded', () => {
  const sectionTitles = document.querySelectorAll('section h2'); // Cible les H2 dans les sections

  if (sectionTitles.length > 0) {
    const handleScrollParallax = () => {
      sectionTitles.forEach(title => {
        const rect = title.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Vérifie si le titre est dans la vue (ou proche)
        if (rect.top < windowHeight && rect.bottom > 0) {
          // Calcule un décalage basé sur la position dans la fenêtre
          // 0.5 = centre de la fenêtre. La valeur va de ~1 (haut) à ~0 (bas)
          const scrollRatio = rect.top / windowHeight;

          // Calcule le décalage X (plus fort au milieu de l'écran)
          // La valeur '50' détermine l'amplitude du mouvement. Ajustez.
          // La formule (0.5 - scrollRatio) donne 0 au centre, négatif en haut, positif en bas.
          const offsetX = (0.5 - scrollRatio) * -50; // Inverse le sens si besoin

          // Applique le décalage via les variables CSS
          // Titre principal
          title.style.setProperty('--scroll-offset-x', `${offsetX}px`);
          // Soulignement (avec un facteur de réduction pour le parallaxe)
          const underlineOffsetX = offsetX * 0.6; // Facteur de 0.6 pour le parallaxe
          title.style.setProperty('--underline-scroll-offset-x', `${underlineOffsetX}px`);

        } else {
           // Optionnel : Réinitialiser quand hors écran si nécessaire
          // title.style.setProperty('--scroll-offset-x', '0px');
          // title.style.setProperty('--underline-scroll-offset-x', '0px');
        }
      });
    };

    // Exécute au scroll (avec throttle pour la performance)
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScrollParallax();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Appel initial pour positionner correctement au chargement
    handleScrollParallax();
  }
});