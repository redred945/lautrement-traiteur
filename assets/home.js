(function () {
  'use strict';

  // Sticky nav state
  var nav = document.querySelector('.site-nav');
  var onScroll = function () {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var burger = document.getElementById('burger');
  var mobilePanel = document.getElementById('mobile-panel');
  if (burger && mobilePanel) {
    var toggle = function () {
      var open = burger.classList.toggle('is-open');
      mobilePanel.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', toggle);
    mobilePanel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        burger.classList.remove('is-open');
        mobilePanel.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Ouvrir le menu');
        document.body.style.overflow = '';
      });
    });
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el, i) {
      el.style.setProperty('--i', i % 6);
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Menu filters
  var filterChips = document.querySelectorAll('[data-filter]');
  var menuCards = document.querySelectorAll('[data-category]');
  filterChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      filterChips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      var filter = chip.getAttribute('data-filter');
      menuCards.forEach(function (card) {
        var match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  // Contact form success banner (FormSubmit.co redirects back with ?envoye=1)
  var params = new URLSearchParams(window.location.search);
  if (params.get('envoye') === '1') {
    var successEl = document.getElementById('form-success');
    if (successEl) {
      successEl.classList.add('is-visible');
      var contactSection = document.getElementById('contact');
      if (contactSection) {
        window.setTimeout(function () {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    }
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
