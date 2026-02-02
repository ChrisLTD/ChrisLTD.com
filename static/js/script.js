// ChrisLTD.com - Minimal JavaScript
// Vanilla JS replacement for jQuery-based functionality

(function() {
  'use strict';

  // Simple slideshow for homepage (if present)
  function initSlideshow() {
    const slideshow = document.getElementById('slideshow');
    if (!slideshow) return;

    const slides = slideshow.querySelectorAll('.slide');
    if (slides.length <= 1) return;

    let currentIndex = 0;
    const interval = 3500;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }

    // Initialize
    showSlide(0);
    setInterval(nextSlide, interval);
  }

  // Lazy loading for images (native browser support fallback)
  function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
      });
    }
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Mobile menu toggle (if needed)
  function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        this.setAttribute('aria-expanded',
          this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
      });
    }
  }

  // Initialize all functionality when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initSlideshow();
    initLazyLoading();
    initSmoothScroll();
    initMobileMenu();
  }
})();
