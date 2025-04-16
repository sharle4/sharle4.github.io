document.addEventListener('DOMContentLoaded', () => {

    // --- Sélection des éléments ---
    const legalModal = document.getElementById('legal-modal');
    const privacyModal = document.getElementById('privacy-modal');
    const portfolioModal = document.getElementById('portfolio-modal'); // Nouvelle modale
  
    const closeLegalBtn = document.getElementById('close-legal-popup');
    const closePrivacyBtn = document.getElementById('close-privacy-popup');
    const closePortfolioBtn = document.getElementById('close-portfolio-popup'); // Nouveau bouton
  
    const openLegalLink = document.getElementById('open-legal-popup');
    const openPrivacyLink = document.getElementById('open-privacy-popup');
    const openPortfolioButtons = document.querySelectorAll('.open-portfolio-popup'); // Nouveaux déclencheurs
  
    // --- Conteneurs et état ---
    const legalModalBody = legalModal ? legalModal.querySelector('.modal-body') : null;
    const privacyModalBody = privacyModal ? privacyModal.querySelector('.modal-body') : null;
    const portfolioModalBody = portfolioModal ? portfolioModal.querySelector('.modal-body') : null;
    const portfolioIframe = portfolioModal ? portfolioModal.querySelector('iframe') : null;
  
    let legalContentLoaded = false;
    let privacyContentLoaded = false;
  
    // --- Fonctions ---
  
    // Fonction pour charger le contenu HTML (pour légal/privacy)
    async function loadHtmlContent(modalBody, url) {
      if (!modalBody) return false;
      modalBody.innerHTML = '<p class="loading-indicator">Chargement...</p>';
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
        const content = await response.text();
        modalBody.innerHTML = content;
        return true;
      } catch (error) {
        console.error("Erreur chargement contenu HTML:", error);
        modalBody.innerHTML = `<p class="loading-indicator error">Impossible de charger le contenu. Détail: ${error.message}</p>`;
        return false;
      }
    }
  
    // Fonction pour charger le contenu dans l'iframe (pour portfolio)
    function loadIframeContent(modalBody, iframe, url) {
       if (!iframe || !modalBody) return false;
  
       // Afficher l'indicateur de chargement et masquer l'iframe potentiellement
       modalBody.classList.add('loading');
       iframe.style.opacity = '0'; // Cacher pendant le chargement
  
       iframe.onload = () => {
           // Une fois chargé, cacher l'indicateur et afficher l'iframe
           modalBody.classList.remove('loading');
           iframe.style.opacity = '1';
           console.log(`Iframe chargé: ${url}`);
       };
       iframe.onerror = () => {
          console.error(`Erreur chargement iframe: ${url}`);
          modalBody.classList.remove('loading');
          // Optionnel: Afficher un message d'erreur dans la modale
          modalBody.innerHTML = '<p class="loading-indicator error">Impossible de charger l\'aperçu du site.</p>';
       };
  
       // Définir la source pour démarrer le chargement
       iframe.src = url;
       return true;
    }
  
    // Fonction générique pour ouvrir une modale
    async function openModal(modal) {
      if (!modal) return;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  
    // Fonction générique pour fermer une modale
    function closeModal(modal) {
      if (modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
  
        // Si c'est la modale portfolio, vider l'iframe
        if (modal.id === 'portfolio-modal' && portfolioIframe) {
          portfolioIframe.src = 'about:blank'; // Important pour arrêter le contenu de l'iframe
           if (portfolioModalBody) portfolioModalBody.classList.remove('loading'); // Reset indicateur
        }
      }
    }
  
    // --- Écouteurs d'événements ---
  
    // Mentions Légales
    if (openLegalLink && legalModal && legalModalBody) {
      openLegalLink.addEventListener('click', async (e) => {
        e.preventDefault();
        const url = openLegalLink.getAttribute('data-content-url');
        if (url) {
          if (!legalContentLoaded) {
            const success = await loadHtmlContent(legalModalBody, url);
            if (success) legalContentLoaded = true;
          }
          if (legalContentLoaded || !legalContentLoaded) { // Ouvre même si erreur de chargement pour voir msg
             openModal(legalModal);
          }
        }
      });
    }
  
    // Politique de Confidentialité
    if (openPrivacyLink && privacyModal && privacyModalBody) {
      openPrivacyLink.addEventListener('click', async (e) => {
        e.preventDefault();
        const url = openPrivacyLink.getAttribute('data-content-url');
        if (url) {
          if (!privacyContentLoaded) {
            const success = await loadHtmlContent(privacyModalBody, url);
            if (success) privacyContentLoaded = true;
          }
           if (privacyContentLoaded || !privacyContentLoaded) { // Ouvre même si erreur de chargement
             openModal(privacyModal);
           }
        }
      });
    }
  
    // Aperçu Portfolio (Nouveau)
    if (openPortfolioButtons.length > 0 && portfolioModal && portfolioIframe && portfolioModalBody) {
       openPortfolioButtons.forEach(button => {
           button.addEventListener('click', () => {
               const targetModalId = button.getAttribute('data-popup-target'); // Doit être #portfolio-modal
               const contentUrl = button.getAttribute('data-content-url');
               const targetModal = document.querySelector(targetModalId);
  
               if (targetModal && contentUrl) {
                   const success = loadIframeContent(portfolioModalBody, portfolioIframe, contentUrl);
                   if (success) {
                       openModal(targetModal);
                   }
               } else {
                   console.error("Attributs manquants ou modale cible non trouvée pour le bouton portfolio.");
               }
           });
       });
    }
  
    // Fermeture des modales
    if (closeLegalBtn) closeLegalBtn.addEventListener('click', () => closeModal(legalModal));
    if (closePrivacyBtn) closePrivacyBtn.addEventListener('click', () => closeModal(privacyModal));
    if (closePortfolioBtn) closePortfolioBtn.addEventListener('click', () => closeModal(portfolioModal)); // Nouveau
  
    // Fermeture en cliquant en dehors
    window.addEventListener('click', (event) => {
      if (event.target === legalModal) closeModal(legalModal);
      if (event.target === privacyModal) closeModal(privacyModal);
      if (event.target === portfolioModal) closeModal(portfolioModal); // Nouveau
    });
  
    // Fermeture avec Échap
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeModal(legalModal);
        closeModal(privacyModal);
        closeModal(portfolioModal); // Nouveau
      }
    });
  
  }); // Fin de DOMContentLoaded