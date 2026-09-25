import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { portfolioData } from './config/portfolioData.js';
import { initCustomCursor } from './components/cursor.js';
import { initHero3D } from './components/hero3D.js';
import { initService3D } from './components/service3D.js';
import { initProjects } from './components/projects.js';
import { initContact } from './components/contact.js';
import { initTravelingLetters } from './components/travelingLetters.js';
import { initAbout3D } from './components/about3D.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Custom Cursor, Hero 3D background & Kinetic Traveling Letters
  const cursor = initCustomCursor();
  initHero3D();
  initTravelingLetters();

  // 1b. Initialize About Section 3D Neural Matrix Canvas
  const aboutCanvas = document.getElementById('about-3d-canvas');
  if (aboutCanvas) {
    initAbout3D(aboutCanvas);
  }

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

  // 11. Refresh ScrollTrigger when images, fonts, and window finish loading
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  });
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
      const wasExpanded = card.classList.contains('is-expanded');
      const serviceId = card.getAttribute('data-service-id');

      // Accordion mode: collapse others
      cards.forEach((c) => {
        c.classList.remove('is-expanded');
        const cId = c.getAttribute('data-service-id');
        if (serviceCanvases[cId] && serviceCanvases[cId].pause) {
          serviceCanvases[cId].pause();
        }
      });

      if (!wasExpanded) {
        card.classList.add('is-expanded');
        if (serviceCanvases[serviceId] && serviceCanvases[serviceId].resume) {
          serviceCanvases[serviceId].resume();
        }
        // Refresh ScrollTrigger as accordion expansion changes page height
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 320);
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

    const mobileLinks = mobileOverlay.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileOverlay.classList.remove('is-open');
        mobileToggle.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }
}

/**
 * Smooth GSAP Page Entrance Choreography
 */
function runEntranceAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.site-header', {
    y: -40,
    opacity: 0,
    duration: 0.9,
    delay: 0.1
  });

  tl.from(
    '.hero-portrait-wrap',
    {
      scale: 0.94,
      opacity: 0,
      duration: 1.1
    },
    '-=0.8'
  );

  tl.from(
    '.hero-left-col > *',
    {
      y: 28,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08
    },
    '-=0.9'
  );

  tl.from(
    '.hero-skills-strip .skill-pill, .hero-location-badge',
    {
      scale: 0.88,
      y: 14,
      opacity: 0,
      duration: 0.8,
      stagger: 0.06,
      ease: 'back.out(1.4)'
    },
    '-=0.5'
  );
}

/**
 * GSAP 3D Scroll Perspective Animations
 * Gracefully adapts between full 3D desktop perspective and rock-solid 2D mobile readability
 */
function init3DScrollAnimations() {
  const isMobile = window.innerWidth <= 820;

  // 1. Hero 3D Depth & Tilt on Scroll

  if (!isMobile) {
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
  }

  // 2. Perspective Roll & Depth Arrival for Section Headlines & Labels
  document.querySelectorAll('.section-wrapper').forEach((section) => {
    const label = section.querySelector('.section-label-tag');
    const headline = section.querySelector('.section-headline');
    const subP = section.querySelector('.section-sub-p, .section-subheadline');

    if (label && !label.classList.contains('about-flight-dock')) {
      gsap.fromTo(
        label,
        { y: 14, opacity: isMobile ? 0.6 : 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: isMobile ? 'all' : '',
          scrollTrigger: {
            trigger: label,
            start: 'top 96%',
            once: true
          }
        }
      );
    }

    if (headline) {
      if (isMobile) {
        // Fail-safe smooth fade on mobile that never leaves text hidden or tilted
        gsap.fromTo(
          headline,
          { y: 18, opacity: 0.5 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: headline,
              start: 'top 95%',
              once: true
            }
          }
        );
      } else {
        gsap.fromTo(
          headline,
          { y: 20, opacity: 0.7 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: headline,
              start: 'top 95%',
              once: true
            }
          }
        );
      }
    }

    if (subP) {
      gsap.fromTo(
        subP,
        { y: 14, opacity: isMobile ? 0.6 : 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power2.out',
          clearProps: isMobile ? 'all' : '',
          scrollTrigger: {
            trigger: subP,
            start: 'top 95%',
            once: true
          }
        }
      );
    }
  });

  // 3. About Section Sub-elements Scroll & 3D Cards
  const aboutLead = document.querySelector('.about-lead-p');
  const aboutHighlights = document.querySelector('.about-highlights-row');

  if (aboutLead) {
    gsap.fromTo(
      aboutLead,
      { y: 16, opacity: isMobile ? 0.6 : 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: isMobile ? 'all' : '',
        scrollTrigger: {
          trigger: aboutLead,
          start: 'top 95%',
          once: true
        }
      }
    );
  }

  if (aboutHighlights) {
    gsap.fromTo(
      aboutHighlights,
      { y: 14, opacity: isMobile ? 0.6 : 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: 'power2.out',
        clearProps: isMobile ? 'all' : '',
        scrollTrigger: {
          trigger: aboutHighlights,
          start: 'top 95%',
          once: true
        }
      }
    );
  }

  // 3D Perspective Roll on Resume & Info Cards
  const resumeCards = document.querySelectorAll('.resume-exp-card, .resume-info-card');
  if (resumeCards.length > 0) {
    if (isMobile) {
      gsap.fromTo(
        resumeCards,
        { y: 18, opacity: 0.6 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.about-cards-col',
            start: 'top 92%',
            once: true
          }
        }
      );
    } else {
      gsap.from(resumeCards, {
        scrollTrigger: {
          trigger: '.about-cards-col',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 28,
        rotateX: 12,
        opacity: 0,
        stagger: 0.14,
        duration: 0.8,
        ease: 'power3.out',
        transformPerspective: 1000
      });
    }
  }

  // 3D Stagger Entrance on Technical Skill Matrix Pills
  const techPills = document.querySelectorAll('.about-tech-pills-grid .tech-item-pill');
  if (techPills.length > 0) {
    gsap.from(techPills, {
      scrollTrigger: {
        trigger: '.about-tech-pills-grid',
        start: 'top 92%',
        toggleActions: 'play none none reverse'
      },
      scale: 0.85,
      y: 12,
      opacity: 0,
      stagger: 0.03,
      duration: 0.5,
      ease: 'back.out(1.4)'
    });
  }

  // About 3D Sticky Viewport Card Entrance
  const about3DCard = document.querySelector('.about-3d-card-wrap');
  if (about3DCard && !isMobile) {
    gsap.from(about3DCard, {
      scrollTrigger: {
        trigger: '.about-main-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 40,
      rotateY: 8,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      transformPerspective: 1200
    });
  }

  const approachCards = document.querySelectorAll('.approach-step-card');
  if (approachCards.length > 0) {
    if (isMobile) {
      gsap.fromTo(
        approachCards,
        { y: 16, opacity: 0.6 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.about-approach-cards-grid',
            start: 'top 96%',
            once: true
          }
        }
      );
    } else {
      gsap.from(approachCards, {
        scrollTrigger: {
          trigger: '.about-approach-cards-grid',
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        },
        y: 32,
        rotateX: 18,
        z: -25,
        opacity: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power3.out',
        transformPerspective: 1000
      });
    }
  }

  // 4. Services 3D Pill Cards Entrance Tilt
  document.querySelectorAll('.service-card').forEach((card) => {
    if (isMobile) {
      gsap.fromTo(
        card,
        { y: 16, opacity: 0.6 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: card,
            start: 'top 96%',
            once: true
          }
        }
      );
    } else {
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
    }
  });

  // 6. Works 3D Slider Stage Dynamic Tilt on Scroll (Desktop only)
  if (!isMobile) {
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
  }


  // 8. FAQ Items 3D Perspective Tilt on Scroll
  document.querySelectorAll('.faq-item').forEach((item) => {
    if (isMobile) {
      gsap.fromTo(
        item,
        { y: 14, opacity: 0.6 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: item,
            start: 'top 96%',
            once: true
          }
        }
      );
    } else {
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
    }
  });
}
