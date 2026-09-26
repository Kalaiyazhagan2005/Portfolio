import { portfolioData } from '../config/portfolioData.js';

/**
 * 3D Interactive Project Slides
 * Real perspective 3D card deck with multi-input cycling:
 * - Touching/clicking anywhere on cards changes to next/prev card
 * - Drag/swipe with touch physics
 * - Mouse wheel scrolling on stage cycles cards
 * - Inspect Architecture button explicitly opens modal
 */
export function init3DSlider(onProjectSelect) {
  const container = document.querySelector('.slider-3d-stage');
  const track = document.querySelector('.slider-3d-track');
  const prevBtn = document.querySelector('.slider-btn-prev');
  const nextBtn = document.querySelector('.slider-btn-next');
  const counterEl = document.querySelector('.slider-counter-current');
  const totalEl = document.querySelector('.slider-counter-total');
  const dotsContainer = document.querySelector('.slider-dots-list');

  if (!container || !track) return;

  const projects = portfolioData.projects;
  let activeIndex = 0;
  const totalSlides = projects.length;

  if (totalEl) totalEl.textContent = `0${totalSlides}`;

  // Render 3D Cards
  track.innerHTML = projects
    .map(
      (p, idx) => `
    <div class="slider-3d-card" data-index="${idx}" data-project-id="${p.id}">
      <div class="card-inner-shell">
        <div class="card-visual-header">
          <img class="card-hero-img" src="${p.image}" alt="${p.title}" width="480" height="240" loading="lazy" decoding="async" />
          <div class="card-badge-row">
            <span class="card-num-badge">${p.number}</span>
            <span class="card-cat-badge">${p.category}</span>
          </div>
        </div>
        <div class="card-content-pane">
          <div class="card-meta-top">
            <span class="card-metric-tag">
              <span class="metric-live-dot"></span>
              ${p.metrics}
            </span>
            <span class="card-year-tag">${p.year}</span>
          </div>
          <h3 class="card-project-title">${p.title}</h3>
          <p class="card-project-desc">${p.summary}</p>
          <div class="card-tags-list">
            ${p.tags.map((t) => `<span class="card-tag">${t}</span>`).join('')}
          </div>
          <div class="card-action-bar">
            ${p.liveUrl && p.liveUrl !== '#' ? `
              <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="card-action-btn card-live-btn" aria-label="Visit live website for ${p.title}">
                <span>Live Website</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            ` : ''}
            ${p.githubUrl ? `
              <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="card-action-btn card-github-btn" aria-label="View source code on GitHub for ${p.title}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                <span>Code</span>
              </a>
            ` : ''}
            <button class="card-action-btn card-inspect-btn" type="button" data-project-id="${p.id}" aria-label="View architecture case study for ${p.title}">
              <span>Case Study</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
    )
    .join('');

  // Render Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = projects
      .map(
        (_, i) => `
      <button class="slider-dot ${i === 0 ? 'is-active' : ''}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>
    `
      )
      .join('');
  }

  const cards = track.querySelectorAll('.slider-3d-card');
  const dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot') : [];

  function updateSlider() {
    if (counterEl) {
      counterEl.textContent = `0${activeIndex + 1}`;
    }

    dots.forEach((dot, idx) => {
      dot.classList.toggle('is-active', idx === activeIndex);
    });

    cards.forEach((card, idx) => {
      const diff = idx - activeIndex;

      card.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden');

      const isMobile = window.innerWidth <= 680;

      if (diff === 0) {
        card.classList.add('is-active');
        card.style.transform = `translateX(0%) translateZ(0px) rotateY(0deg) scale(1)`;
        card.style.opacity = '1';
        card.style.zIndex = '10';
        card.style.pointerEvents = 'auto';
      } else if (diff === -1 || (activeIndex === 0 && idx === totalSlides - 1 && totalSlides > 2)) {
        card.classList.add('is-prev');
        const xOffset = isMobile ? '-14%' : '-55%';
        const zOffset = isMobile ? '-70px' : '-160px';
        const rotY = isMobile ? '12deg' : '25deg';
        const scale = isMobile ? '0.91' : '0.86';
        card.style.transform = `translateX(${xOffset}) translateZ(${zOffset}) rotateY(${rotY}) scale(${scale})`;
        card.style.opacity = isMobile ? '0.35' : '0.5';
        card.style.zIndex = '5';
        card.style.pointerEvents = 'auto';
      } else if (diff === 1 || (activeIndex === totalSlides - 1 && idx === 0 && totalSlides > 2)) {
        card.classList.add('is-next');
        const xOffset = isMobile ? '14%' : '55%';
        const zOffset = isMobile ? '-70px' : '-160px';
        const rotY = isMobile ? '-12deg' : '-25deg';
        const scale = isMobile ? '0.91' : '0.86';
        card.style.transform = `translateX(${xOffset}) translateZ(${zOffset}) rotateY(${rotY}) scale(${scale})`;
        card.style.opacity = isMobile ? '0.35' : '0.5';
        card.style.zIndex = '5';
        card.style.pointerEvents = 'auto';
      } else {
        card.classList.add('is-hidden');
        const xOffset = diff > 0 ? (isMobile ? '35%' : '90%') : (isMobile ? '-35%' : '-90%');
        const zOffset = isMobile ? '-140px' : '-300px';
        const scale = isMobile ? '0.78' : '0.7';
        card.style.transform = `translateX(${xOffset}) translateZ(${zOffset}) scale(${scale})`;
        card.style.opacity = '0';
        card.style.zIndex = '1';
        card.style.pointerEvents = 'none';
      }
    });
  }

  function goToSlide(index) {
    activeIndex = (index + totalSlides) % totalSlides;
    updateSlider();
  }

  function nextSlide() {
    goToSlide(activeIndex + 1);
  }

  function prevSlide() {
    goToSlide(activeIndex - 1);
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(parseInt(dot.getAttribute('data-index'), 10));
    });
  });

  // Dedicated "Case Study" button explicitly opens the modal
  const inspectBtns = track.querySelectorAll('.card-inspect-btn');
  inspectBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent triggering card advance
      const projectId = btn.getAttribute('data-project-id');
      const project = projects.find((p) => p.id === projectId);
      if (project && onProjectSelect) {
        onProjectSelect(project);
      }
    });
  });

  // Action links stop propagation
  const actionLinks = track.querySelectorAll('.card-action-btn');
  actionLinks.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  // Touching or Clicking ANYWHERE on a card changes/cycles the cards
  cards.forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      // If action buttons or links were clicked, don't change slide
      if (e.target.closest('.card-action-btn') || e.target.closest('a') || e.target.closest('button')) return;

      if (idx !== activeIndex) {
        goToSlide(idx);
      } else {
        // If clicking the active card: click on right half goes next, left half goes prev
        const rect = card.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        if (clickX < rect.width * 0.4) {
          prevSlide();
        } else {
          nextSlide();
        }
      }
    });
  });

  // Touch Swipe & Drag Physics for Mobile and Desktop
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let isSwiping = false;

  container.addEventListener(
    'touchstart',
    (e) => {
      if (e.target.closest('.card-action-btn') || e.target.closest('a') || e.target.closest('button')) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      currentX = startX;
      isSwiping = true;
    },
    { passive: true }
  );

  container.addEventListener(
    'touchmove',
    (e) => {
      if (!isSwiping) return;
      currentX = e.touches[0].clientX;
    },
    { passive: true }
  );

  container.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    const diffX = currentX - startX;
    // If swipe horizontal distance is greater than 30px
    if (Math.abs(diffX) > 30) {
      if (diffX < 0) nextSlide();
      else prevSlide();
    }
    isSwiping = false;
  });

  // Mouse Drag Support
  let isMouseDown = false;
  let mouseStartX = 0;
  let mouseCurrentX = 0;

  container.addEventListener('mousedown', (e) => {
    if (e.target.closest('.card-action-btn') || e.target.closest('a') || e.target.closest('button')) return;
    isMouseDown = true;
    mouseStartX = e.clientX;
    mouseCurrentX = mouseStartX;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    mouseCurrentX = e.clientX;
  });

  window.addEventListener('mouseup', () => {
    if (!isMouseDown) return;
    const diff = mouseCurrentX - mouseStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
    isMouseDown = false;
  });

  // Mouse Wheel on 3D Stage smoothly switches cards
  let wheelTimeout = null;
  container.addEventListener(
    'wheel',
    (e) => {
      // Horizontal or vertical tilt scroll on the stage
      if (Math.abs(e.deltaX) > 25 || Math.abs(e.deltaY) > 40) {
        if (!wheelTimeout) {
          if (e.deltaX > 0 || e.deltaY > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
          wheelTimeout = setTimeout(() => {
            wheelTimeout = null;
          }, 350);
        }
      }
    },
    { passive: true }
  );

  // Initial state & responsive viewport listener
  updateSlider();
  window.addEventListener('resize', updateSlider);

  return { goToSlide, nextSlide, prevSlide };
}
