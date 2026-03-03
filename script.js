// hawi-new-script.js — external JavaScript for Hawi Terfessa portfolio

document.addEventListener('DOMContentLoaded', () => {
  // ========== HAMBURGER MENU ==========
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
  
  // close menu when link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

  // ========== TYPING ANIMATION ==========
  const typedContainer = document.querySelector('.typed-container');
  if (typedContainer) {
    const words = ['creates.', 'builds.', 'designs.', 'learns.'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
      const currentWord = words[wordIndex];
      if (!isDeleting && charIndex <= currentWord.length) {
        typedContainer.textContent = currentWord.substring(0, charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
      } else if (isDeleting && charIndex >= 0) {
        typedContainer.textContent = currentWord.substring(0, charIndex);
        charIndex--;
        setTimeout(typeEffect, 60);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 1200);
      }
    }
    typeEffect();
  }

  // ========== ACTIVE LINK HIGHLIGHT (scroll spy) ==========
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active-link');
      }
    });
  });

  // ========== SKILL BARS ANIMATION ==========
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const observerBar = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
        observerBar.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });
  
  skillBars.forEach(bar => observerBar.observe(bar));

  // ========== SCROLL FADE-IN ==========
  const fadeElements = document.querySelectorAll('.scroll-fade');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  fadeElements.forEach(el => fadeObserver.observe(el));

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('✨ Thanks for your message — Hawi will reply within 24 hours.');
      contactForm.reset();
    });
  }

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});