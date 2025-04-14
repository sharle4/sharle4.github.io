// Helper function pour retarder l'exécution (Debounce)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fonction pour définir le type de scroll snap approprié
function updateScrollSnapBehavior() {
    // Définir le point de bascule (en pixels) entre mobile et desktop
    // 768px est courant pour les tablettes en mode portrait. Vous pouvez ajuster.
    const desktopBreakpoint = 768;
    let targetSnapType = 'none'; // Par défaut 'none'

    if (window.innerWidth >= desktopBreakpoint) {
        // Écran large (Desktop) -> Utiliser 'mandatory'
        targetSnapType = 'y mandatory';
        console.log(`Largeur >= ${desktopBreakpoint}px - Activation Snap: mandatory`);
    } else {
        // Écran petit (Mobile/Tablette) -> Utiliser 'proximity'
        targetSnapType = 'y proximity';
        console.log(`Largeur < ${desktopBreakpoint}px - Activation Snap: proximity`);
    }

    // Appliquer le style uniquement s'il a changé
    if (document.documentElement.style.scrollSnapType !== targetSnapType) {
        document.documentElement.style.scrollSnapType = targetSnapType;
    }
}

// Créer une version "debounced" de la fonction pour l'événement resize
// Cela évite d'exécuter la logique trop souvent lors du redimensionnement
const debouncedUpdateScrollSnap = debounce(updateScrollSnapBehavior, 250); // Délai de 250ms

// --- Activation Initiale (Utilise la stratégie de délai au chargement) ---

// S'assurer que le snap est désactivé au départ (au cas où la règle CSS serait restée)
document.documentElement.style.scrollSnapType = 'none';

// Activer le comportement de snap après le chargement complet + délai
window.addEventListener('load', () => {
    setTimeout(updateScrollSnapBehavior, 100); // Vérification initiale
});

// Optionnel: Garder le fallback au cas où 'load' serait très long
// setTimeout(updateScrollSnapBehavior, 2000);

// --- Mise à jour lors du Redimensionnement ---

// Écouter les changements de taille de la fenêtre
window.addEventListener('resize', debouncedUpdateScrollSnap);