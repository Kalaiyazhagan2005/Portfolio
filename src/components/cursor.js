/**
 * Custom Cursor Component
 * High-performance dual-element cursor with spring physics and magnetic hover.
 */

export function initCustomCursor() {
  // Disable on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.querySelector('.custom-cursor-dot');
  const follower = document.querySelector('.custom-cursor-follower');
  if (!dot || !follower) return;

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;
  let isVisible = false;

  const spring = 0.18;

  let isRunning = false;

  function wakeFollower() {
    if (!isRunning) {
      isRunning = true;
      requestAnimationFrame(renderCursor);
    }
  }

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      dot.style.opacity = '1';
      follower.style.opacity = '1';
      followerX = mouseX;
      followerY = mouseY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      isVisible = true;
    } else {
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      wakeFollower();
    }
  }, { passive: true });

  window.addEventListener('mousedown', () => {
    document.body.classList.add('cursor-active');
  });

  window.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-active');
  });

  // Attach hover detection to interactive elements
  const attachHoverListeners = () => {
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, .service-card, .project-row, .metric-pill-card'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  };

  attachHoverListeners();

  // Animation Loop for smooth follower physics with idle auto-pause
  function renderCursor() {
    const dx = mouseX - followerX;
    const dy = mouseY - followerY;

    if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2) {
      followerX = mouseX;
      followerY = mouseY;
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      isRunning = false;
      return;
    }

    followerX += dx * spring;
    followerY += dy * spring;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(renderCursor);
  }

  return { attachHoverListeners };
}
