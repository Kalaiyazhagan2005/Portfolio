import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { portfolioData } from './config/portfolioData.js';
import { initCustomCursor } from './components/cursor.js';
import { initHero3D } from './components/hero3D.js';
import { initService3D } from './components/service3D.js';
import { initProjects } from './components/projects.js';
import { initContact } from './components/contact.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Custom Cursor & Hero 3D background
  const cursor = initCustomCursor();
  initHero3D();

  // 2. Render Marquee Ticker
  renderMarquee();

  // 3. Render Services Section & Initialize 3D Viewports
  renderServices(cursor);

  // 4. Render Tech Stack
  renderTechStack();

  // 5. Initialize Works / Projects Showcase (with 3D perspective slider)
  initProjects();

  // 6. Initialize Contact, Clock, & Toasts
  initContact();

  // 7. Navigation & Mobile Menu
  initNavigation();

  // 8. Re-bind cursor hover listeners on newly rendered DOM elements
  if (cursor && cursor.attachHoverListeners) {
    cursor.attachHoverListeners();
  }

  // 9. GSAP Smooth Page Entrance
  runEntranceAnimations();

  // 10. GSAP 3D Scroll Perspective Animations
  init3DScrollAnimations();
});

/**
 * Render Infinite Marquee Ticker
 */
function renderMarquee() {
  const marqueeTrack = document.querySelector('.marquee-track');
  if (!marqueeTrack) return;

  const items = portfolioData.tickerItems;
  const combined = [...items, ...items, ...items];

  marqueeTrack.innerHTML = combined
    .map((item) => `<div class="marquee-item">${item}</div>`)
    .join('');
}

/**
 * Render Services Cards & Attach Three.js 3D Viewports
 */
function renderServices(cursor) {
  const container = document.querySelector('.services-list');
  if (!container) return;

  container.innerHTML = portfolioData.services
    .map(
      (s, idx) => `
    <div class="service-card ${idx === 0 ? 'is-expanded' : ''}" data-service-id="${s.id}">
      <div class="service-header">
        <div class="service-meta-left">
          <span class="service-id">${s.id}</span>
          <h3 class="service-title">${s.title}</h3>
        </div>
        <div class="service-expand-indicator">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      <div class="service-body-collapse">
        <div class="service-content-grid">
          <div class="service-desc-wrap">
            <p class="service-tagline">${s.tagline}</p>
            <p class="service-desc">${s.description}</p>
            <ul class="deliverables-list">
              ${s.deliverables.map((d) => `<li>${d}</li>`).join('')}
            </ul>
          </div>
          <div class="service-3d-viewport">
            <canvas class="service-3d-canvas" id="canvas-service-${s.id}"></canvas>
            <span class="service-canvas-hint">Drag to inspect 3D model</span>
          </div>
        </div>
      </div>
    </div>
  `
    )
    .join('');

  const serviceCanvases = {};
  portfolioData.services.forEach((s, idx) => {
    const canvas = document.getElementById(`canvas-service-${s.id}`);
    if (canvas) {
      const instance = initService3D(canvas, s.shapeType, s.accentColor);
      serviceCanvases[s.id] = instance;
      // Pause collapsed cards on load to save GPU/CPU
      if (idx > 0 && instance && instance.pause) {
        instance.pause();
      }
    }
  });

  const cards = document.querySelectorAll('.service-card');
  cards.forEach((card) => {
    const header = card.querySelector('.service-header');
    header.addEventListener('click', () => {
      const isCurrentlyExpanded = card.classList.contains('is-expanded');

      // Pause all cards on state change
      cards.forEach((c) => {
        c.classList.remove('is-expanded');
        const id = c.getAttribute('data-service-id');
        if (serviceCanvases[id] && serviceCanvases[id].pause) {
          serviceCanvases[id].pause();
        }
      });

      if (!isCurrentlyExpanded) {
        card.classList.add('is-expanded');
        const sId = card.getAttribute('data-service-id');
        if (serviceCanvases[sId]) {
          if (serviceCanvases[sId].resume) serviceCanvases[sId].resume();
          if (serviceCanvases[sId].resize) {
            setTimeout(() => serviceCanvases[sId].resize(), 200);
          }
        }
      }

      if (cursor && cursor.attachHoverListeners) {
        cursor.attachHoverListeners();
      }
    });
  });
}

/**
 * Render Categorized Tech Stack Grid
 */
function renderTechStack() {
  const container = document.querySelector('.tech-stack-grid');
  if (!container) return;

  container.innerHTML = portfolioData.techStack
    .map(
      (group) => `
    <div class="tech-group-card">
      <h4 class="tech-group-title">${group.category}</h4>
      <div class="tech-badges-list">
        ${group.items.map((item) => `<span class="tech-badge-item">${item}</span>`).join('')}
      </div>
    </div>
  `
    )
    .join('');
}

/**
 * Navigation Bar Scroll Observer & Mobile Menu
 */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.querySelector('.mobile-toggle-btn');
  const mobileOverlay = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((sec) => {
      const sectionTop = sec.offsetTop - 180;
      if (window.scrollY >= sectionTop) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileOverlay.classList.toggle('is-open');
      mobileToggle.classList.toggle('is-active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileOverlay.classList.remove('is-open');
        mobileToggle.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }
}

/**
 * GSAP Entrance Animations
 */
function runEntranceAnimations() {
  gsap.from('.site-header', {
    y: -40,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
  });

  gsap.from('.giant-line', {
    y: 80,
    opacity: 0,
    duration: 1.4,
    stagger: 0.15,
    ease: 'power4.out',
    delay: 0.2
  });

  gsap.from('.hero-portrait-wrap', {
    y: 80,
    opacity: 0,
    duration: 1.4,
    ease: 'power3.out',
    delay: 0.4
  });

  gsap.from('.hero-left-col > *', {
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.12,
    ease: 'power3.out',
    delay: 0.6
  });

  gsap.from('.floating-hero-badge', {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'back.out(1.5)',
    delay: 0.9
  });
}

/**
 * GSAP 3D Scroll Perspective Animations
 */
function init3DScrollAnimations() {
  // 1. Hero 3D Depth & Tilt on Scroll
  gsap.to('.hero-giant-bg-text', {
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: 100,
    rotateX: 18,
    scale: 0.94,
    transformPerspective: 1000,
    opacity: 0.25
  });

  gsap.to('.hero-portrait-wrap', {
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2
    },
    y: -30,
    rotateY: -6,
    transformPerspective: 1200
  });

  // 2. 3D Perspective Roll & Depth Arrival for Section Headlines & Labels
  document.querySelectorAll('.section-wrapper').forEach((section) => {
    const label = section.querySelector('.section-label-tag');
    const headline = section.querySelector('.section-headline');
    const subP = section.querySelector('.section-sub-p, .section-subheadline');

    if (label) {
      gsap.from(label, {
        scrollTrigger: {
          trigger: label,
          start: 'top 92%',
          toggleActions: 'play none none reverse'
        },
        rotateX: 25,
        y: 20,
        z: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        transformPerspective: 1000
      });
    }

    if (headline) {
      gsap.from(headline, {
        scrollTrigger: {
          trigger: headline,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        },
        rotateX: 30,
        y: 45,
        z: -60,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        transformPerspective: 1200,
        transformOrigin: '50% 100% -50px'
      });

      // Subtle dynamic 3D tilt tracking during scroll
      gsap.to(headline, {
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        rotateX: -4,
        z: 10,
        transformPerspective: 1200
      });
    }

    if (subP) {
      gsap.from(subP, {
        scrollTrigger: {
          trigger: subP,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        rotateX: 18,
        y: 25,
        z: -20,
        opacity: 0,
        duration: 0.9,
        delay: 0.1,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    }
  });

  // 3. About Page 3D Text & Pillars Perspective Scroll
  const aboutLead = document.querySelector('.about-lead-statement');
  const aboutBody = document.querySelector('.about-body-statement');
  if (aboutLead) {
    gsap.from(aboutLead, {
      scrollTrigger: {
        trigger: aboutLead,
        start: 'top 88%',
        toggleActions: 'play none none reverse'
      },
      rotateX: 20,
      y: 30,
      z: -30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      transformPerspective: 1000
    });
  }

  if (aboutBody) {
    gsap.from(aboutBody, {
      scrollTrigger: {
        trigger: aboutBody,
        start: 'top 88%',
        toggleActions: 'play none none reverse'
      },
      rotateX: 16,
      y: 25,
      opacity: 0,
      duration: 1,
      delay: 0.15,
      ease: 'power3.out',
      transformPerspective: 1000
    });
  }

  const pillars = document.querySelectorAll('.engineering-pillars-grid .pillar-item');
  if (pillars.length > 0) {
    gsap.from(pillars, {
      scrollTrigger: {
        trigger: '.engineering-pillars-grid',
        start: 'top 86%',
        toggleActions: 'play none none reverse'
      },
      rotateX: 22,
      y: 40,
      z: -40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out',
      transformPerspective: 1000
    });
  }

  // 4. Kinetic Watermarks Smooth Horizontal Scrub on Scroll
  document.querySelectorAll('.kinetic-watermark').forEach((mark, idx) => {
    gsap.to(mark, {
      scrollTrigger: {
        trigger: mark.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      },
      x: idx % 2 === 0 ? -90 : 90
    });
  });

  // 5. Services 3D Pill Cards Entrance Tilt
  document.querySelectorAll('.service-card').forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        end: 'top 65%',
        scrub: 0.8
      },
      rotateX: 12,
      y: 40,
      opacity: 0.5,
      transformPerspective: 1000
    });
  });

  // 6. Works 3D Slider Stage Dynamic Tilt on Scroll
  gsap.fromTo(
    '.slider-3d-stage',
    { rotateX: 16, scale: 0.94, transformPerspective: 1200 },
    {
      scrollTrigger: {
        trigger: '#works',
        start: 'top 85%',
        end: 'top 35%',
        scrub: 1
      },
      rotateX: 0,
      scale: 1,
      ease: 'power2.out'
    }
  );

  // 7. Spec Card 3D Scroll Float
  const specCard = document.querySelector('.spec-card');
  if (specCard) {
    gsap.from(specCard, {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 75%',
        end: 'top 40%',
        scrub: 0.8
      },
      rotateY: 10,
      y: 40,
      opacity: 0.5,
      transformPerspective: 1000
    });
  }

  // 8. FAQ Items 3D Perspective Tilt on Scroll
  document.querySelectorAll('.faq-item').forEach((item) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 92%',
        end: 'top 75%',
        scrub: 0.6
      },
      rotateX: 8,
      y: 24,
      opacity: 0.6,
      transformPerspective: 1000
    });
  });
}
