document.addEventListener('DOMContentLoaded', function() {
    const customCursor = document.querySelector('.custom-cursor');

    // N'active le curseur personnalisé que sur les écrans larges
    if (window.matchMedia("(min-width: 1024px)").matches) {

        // Met à jour la position du curseur
        document.addEventListener('mousemove', (e) => {
            if (customCursor) {
                // Utilise requestAnimationFrame pour une meilleure performance
                requestAnimationFrame(() => {
                    customCursor.style.left = e.clientX + 'px';
                    customCursor.style.top = e.clientY + 'px';
                });
            }
        });

        // Définit les éléments qui déclencheront l'effet de survol
        // Adaptez cette liste à VOS éléments interactifs spécifiques
        const hoverables = document.querySelectorAll(
            'a, button, .logo, .nav-link, .hamburger, .cta-button, .filter-btn, .portfolio-item, .portfolio-action-btn, .contact-link, .back-to-top, .modal-close, .badge'
        );

        // Ajoute/Retire la classe pour l'effet de survol
        hoverables.forEach(hoverable => {
            hoverable.addEventListener('mouseenter', () => {
                if (customCursor) {
                    customCursor.classList.add('hover-effect');
                }
            });

            hoverable.addEventListener('mouseleave', () => {
                if (customCursor) {
                    customCursor.classList.remove('hover-effect');
                }
            });
        });

    } else {
        // Si l'écran est trop petit, s'assurer que le curseur custom est caché
        if (customCursor) {
            customCursor.style.display = 'none';
        }
        // Et s'assurer que le curseur par défaut est visible
         document.body.style.cursor = 'auto';
         document.querySelectorAll('a, button, .logo, .nav-link, .hamburger, .cta-button, .filter-btn, .portfolio-item, .portfolio-action-btn, .contact-link, .back-to-top, .modal-close, .badge').forEach(el => {
             el.style.cursor = 'pointer'; // Ou 'auto' selon l'élément
         });
    }
});

// Optionnel : Gérer le redimensionnement pour activer/désactiver le curseur
window.addEventListener('resize', () => {
    // Vous pourriez relancer la logique ici si nécessaire,
    // mais le rechargement de la page est souvent suffisant.
    // Pour une approche plus dynamique, il faudrait détacher/rattacher les écouteurs.
});