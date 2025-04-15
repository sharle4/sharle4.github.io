document.addEventListener('DOMContentLoaded', () => {
  const sectionTitles = document.querySelectorAll('section h2');

  if (sectionTitles.length > 0) {
    const handleScrollParallax = () => {
      sectionTitles.forEach(title => {
        const rect = title.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
            const scrollRatio = rect.top / windowHeight;
            const amplitude = 200;
            const titleFactor = 1;
            const underlineFactor = 2;
            const baseOffsetX = (0.5 - scrollRatio) * amplitude;    
            const titleOffsetX = baseOffsetX * titleFactor;
            const underlineOffsetX = baseOffsetX * underlineFactor;
            console.log(`Titre: ${title.id || title.textContent.substring(0,15)}, TitleX: ${titleOffsetX.toFixed(1)}, UnderlineX: ${underlineOffsetX.toFixed(1)}`);
            title.style.setProperty('--scroll-offset-x', `${titleOffsetX}px`);
            title.style.setProperty('--underline-scroll-offset-x', `${underlineOffsetX}px`);
  
        } else {
           // Optionnel : Réinitialiser quand hors écran si nécessaire
            title.style.setProperty('--scroll-offset-x', '0px');
            title.style.setProperty('--underline-scroll-offset-x', '0px');
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