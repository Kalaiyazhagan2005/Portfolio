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
          <div class="card-tap-hint">
            <span>Tap to Switch</span>
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
            <button class="card-inspect-btn" type="button" data-project-id="${p.id}">
              <span>Inspect Architecture</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </button>
            <span class="card-click-advance-label">Click card to advance →</span>
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

  // Dedicated "Inspect Architecture" button explicitly opens the modal
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

  // Touching or Clicking ANYWHERE on a card changes/cycles the cards
  cards.forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      // If inspect button was clicked, don't change slide
      if (e.target.closest('.card-inspect-btn')) return;

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
    if (e.target.closest('.card-inspect-btn')) return;
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
