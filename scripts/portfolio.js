document.addEventListener('DOMContentLoaded', function() { // Assure que le DOM est prêt

    // --- Portfolio Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0 && portfolioItems.length > 0) { // Vérifie que les éléments existent
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Gérer la classe 'active' sur les boutons
                filterBtns.forEach(el => el.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                // Filtrer les éléments du portfolio
                portfolioItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        // Afficher l'élément (avec un petit effet de fondu)
                        item.style.opacity = '0';
                        item.style.display = 'block'; // ou 'grid' ou 'flex' selon votre layout
                        setTimeout(() => { item.style.opacity = '1'; }, 50); // Léger délai pour l'effet
                        item.style.transform = 'translateY(0)'; // Assurez-vous qu'il est visible

                    } else {
                        // Masquer l'élément (avec un petit effet de fondu)
                        item.style.opacity = '0';
                         item.style.transform = 'translateY(20px)'; // Optionnel: petit effet de sortie
                        setTimeout(() => { item.style.display = 'none'; }, 300); // Délai pour que l'opacité agisse
                    }
                });
            });
        });
    }
    // --- Fin Portfolio Filter ---

}); // Fin de DOMContentLoaded