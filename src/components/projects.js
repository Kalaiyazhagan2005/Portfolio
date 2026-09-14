import { portfolioData } from '../config/portfolioData.js';
import { init3DSlider } from './slider3D.js';

/**
 * Projects Showcase Component
 * Features dual showcase:
 * 1. Interactive 3D Perspective Card Slider on top
 * 2. Editorial table list below with cursor-following thumbnail preview
 * 3. Full architectural drawer/modal
 */
export function initProjects() {
  const tableContainer = document.querySelector('.works-table');
  const previewBox = document.querySelector('.floating-project-preview');
  const previewImg = document.querySelector('.floating-project-preview .preview-img');
  const previewMetric = document.querySelector('.floating-project-preview .preview-metrics-text');

  const modalBackdrop = document.querySelector('.project-modal-backdrop');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const modalImage = document.querySelector('.modal-image');
  const modalCategory = document.querySelector('.modal-category-tag');
  const modalTitle = document.querySelector('.modal-title');
  const modalSummary = document.querySelector('.modal-summary');
  const modalArchList = document.querySelector('.modal-arch-list');
  const modalLiveBtn = document.querySelector('.modal-live-btn');
  const modalGithubBtn = document.querySelector('.modal-github-btn');

  // Modal Functions
  function openProjectModal(project) {
    if (!modalBackdrop || !project) return;

    modalImage.src = project.image;
    modalCategory.textContent = `${project.number} / ${project.category} • ${project.year}`;
    modalTitle.textContent = project.title;
    modalSummary.textContent = project.summary;

    modalArchList.innerHTML = project.architecture
      .map((item) => `<li>${item}</li>`)
      .join('');

    if (project.liveUrl && project.liveUrl !== '#') {
      modalLiveBtn.href = project.liveUrl;
      modalLiveBtn.style.display = 'inline-flex';
    } else {
      modalLiveBtn.style.display = 'none';
    }

    if (project.githubUrl) {
      modalGithubBtn.href = project.githubUrl;
      modalGithubBtn.style.display = 'inline-flex';
    }

    modalBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 1. Initialize 3D Perspective Card Slider
  init3DSlider(openProjectModal);

  // 2. Render Editorial Table List
  if (tableContainer) {
    tableContainer.innerHTML = portfolioData.projects
      .map(
        (p) => `
      <div class="project-row" data-project-id="${p.id}">
        <span class="project-num">${p.number}</span>
        <div class="project-name-wrap">
          <h3 class="project-title">${p.title}</h3>
          <span class="project-category">${p.category}</span>
        </div>
        <div class="project-tags-wrap">
          ${p.tags.slice(0, 3).map((t) => `<span class="project-tag-pill">${t}</span>`).join('')}
        </div>
        <span class="project-year">${p.year}</span>
        <div class="project-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </div>
      </div>
    `
      )
      .join('');

    // Floating cursor follower physics
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHovering = false;
    const ease = 0.15;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateFloatingPreview() {
      if (previewBox && isHovering) {
        currentX += (mouseX - currentX) * ease;
        currentY += (mouseY - currentY) * ease;

        const tilt = (mouseX - currentX) * 0.06;
        previewBox.style.transform = `translate(${currentX + 25}px, ${currentY - 140}px) rotate(${tilt}deg)`;
      }
      requestAnimationFrame(updateFloatingPreview);
    }
    requestAnimationFrame(updateFloatingPreview);

    // Row hover & click listeners
    const rows = document.querySelectorAll('.project-row');
    rows.forEach((row) => {
      const projectId = row.getAttribute('data-project-id');
      const project = portfolioData.projects.find((p) => p.id === projectId);

      row.addEventListener('mouseenter', () => {
        if (!project || !previewBox) return;
        previewImg.src = project.image;
        previewImg.alt = project.title;
        previewMetric.textContent = project.metrics;
        previewBox.style.opacity = '1';
        isHovering = true;
      });

      row.addEventListener('mouseleave', () => {
        if (previewBox) {
          previewBox.style.opacity = '0';
          isHovering = false;
        }
      });

      row.addEventListener('click', () => {
        openProjectModal(project);
      });
    });
  }

  return { openProjectModal };
}
