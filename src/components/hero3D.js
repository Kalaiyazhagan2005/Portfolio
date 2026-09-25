import * as THREE from 'three';

/**
 * Three.js Architectural 3D Background (Premium Light Mode)
 * Pristine architectural drafting aesthetic: metallic titanium wireframe lattice and clean perspective floor grid.
 */
export function initHero3D() {
  const container = document.getElementById('hero-canvas-container');
  const canvas = document.getElementById('hero-canvas');
  if (!container || !canvas) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const isMobile = () => window.innerWidth < 768;
  let targetZ = isMobile() ? 110 : 75;
  camera.position.set(0, 0, targetZ);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // --- Architectural Floating Geometric Wireframe in Crisp Slate (Refined & Compact) ---
  const ringRadius = 21;
  const geometry1 = new THREE.TorusGeometry(ringRadius, 0.28, 16, 120);
  const material1 = new THREE.MeshBasicMaterial({
    color: 0x828896,
    wireframe: true,
    transparent: true,
    opacity: isMobile() ? 0.12 : 0.22
  });
  const ring1 = new THREE.Mesh(geometry1, material1);
  ring1.rotation.x = Math.PI / 3;
  scene.add(ring1);

  // --- Tech Sticker Badges Orbiting Along the 3D Kinetic Ring (Pure Logos Only - Zero Circle Background) ---
  const stickersData = [
    {
      label: 'HTML5',
      color: '#E34F26',
      iconSvg: `
        <path d="M7 5l3.8 42L26 52l15.2-5L45 5H7z" fill="#E34F26"/>
        <path d="M26 9v39l11.6-3.8 3-35.2H26z" fill="#EF652A"/>
        <path d="M15 15h22l-.6 6.5H16l.8 8h19.4l-1.2 13.5-8.2 2.5-8.2-2.5-.6-6.5h5.8l.3 2.8 2.8.8 2.8-.8.5-5H14.5l-1.5-17.8z" fill="#FFFFFF"/>
      `
    },
    {
      label: 'CSS3',
      color: '#1572B6',
      iconSvg: `
        <path d="M7 5l3.8 42L26 52l15.2-5L45 5H7z" fill="#1572B6"/>
        <path d="M26 9v39l11.6-3.8 3-35.2H26z" fill="#33A9DC"/>
        <path d="M15 15h22l-.6 6.5H16l.8 8h19.4l-1.2 13.5-8.2 2.5-8.2-2.5-.6-6.5h5.8l.3 2.8 2.8.8 2.8-.8.5-5H14.5l-1.5-17.8z" fill="#FFFFFF"/>
      `
    },
    {
      label: 'React',
      color: '#087EA4',
      iconSvg: `
        <circle cx="26" cy="26" r="5.2" fill="#007799"/>
        <ellipse cx="26" cy="26" rx="23" ry="9" fill="none" stroke="#007799" stroke-width="3"/>
        <ellipse cx="26" cy="26" rx="23" ry="9" fill="none" stroke="#007799" stroke-width="3" transform="rotate(60 26 26)"/>
        <ellipse cx="26" cy="26" rx="23" ry="9" fill="none" stroke="#007799" stroke-width="3" transform="rotate(120 26 26)"/>
      `
    },
    {
      label: 'Python',
      color: '#3776AB',
      iconSvg: `
        <path d="M25.5 6c-8.5 0-8 3.7-8 3.7l.01 3.8h8.2v1.2H14.3c-3.8 0-6.9 2.2-6.9 6.9 0 4.7 2.8 6.8 6.9 6.8h4v-5.8c0-4.1 3.6-7.7 7.7-7.7h8.2c3.3 0 6-2.8 6-6.1s-2.9-5.9-6.2-5.9h-8.5zm-3.1 2.3c.8 0 1.3.6 1.3 1.3s-.6 1.3-1.3 1.3-1.3-.6-1.3-1.3.5-1.3 1.3-1.3z" fill="#2B5B84"/>
        <path d="M26.5 46c8.5 0 8-3.7 8-3.7l-.01-3.8h-8.2v-1.2h11.4c3.8 0 6.9-2.2 6.9-6.9 0-4.7-2.8-6.8-6.9-6.8h-4v5.8c0 4.1-3.6 7.7-7.7 7.7h-8.2c-3.3 0-6 2.8-6 6.1s2.9 5.9 6.2 5.9h8.5zm3.1-2.3c-.8 0-1.3-.6-1.3-1.3s.6-1.3 1.3-1.3 1.3.6 1.3 1.3-.5 1.3-1.3 1.3z" fill="#E5A800"/>
      `
    },
    {
      label: 'JavaScript',
      color: '#F7DF1E',
      iconSvg: `
        <rect x="3" y="3" width="46" height="46" rx="7" fill="#F7DF1E"/>
        <path d="M22 40c-2.6 0-4.6-1.2-5.8-3.3l3.8-2.4c.8 1.2 1.6 1.9 3 1.9 1.2 0 2.1-.6 2.1-1.8v-11.5h4.7v11.5c0 3.5-2.5 5.6-6.2 5.6zm16.5-.1c-4.6 0-7.5-2.5-8.1-5.3l4.2-2.2c.6 1.7 1.8 2.9 3.7 2.9 1.7 0 2.9-.8 2.9-1.8 0-1.2-1-1.7-3-2.4l-1.3-.6c-3.3-1.2-5.5-3-5.5-6.2 0-3.3 2.6-5.6 6.5-5.6 3.4 0 5.9 1.7 6.9 4.2l-3.9 2.2c-.4-1.2-1.3-2-2.6-2-1.3 0-2.2.8-2.2 1.7 0 1.1.9 1.5 2.5 2.1l1.4.6c3.7 1.5 5.8 3.1 5.8 6.4 0 3.9-3.1 6.4-7.3 6.4z" fill="#000000"/>
      `
    },
    {
      label: 'PostgreSQL',
      color: '#2C5E8A',
      iconSvg: `
        <path d="M26 3C13.3 3 3 13.3 3 26s10.3 23 23 23 23-10.3 23-23S38.7 3 26 3z" fill="#2C5E8A"/>
        <path d="M15 19c0-4 4.5-7 11-7 7.5 0 12 4 12 9 0 3-1.5 5.5-3 7l3 11h-4.5l-2-8h-4.5v8H22v-11c-3.5 0-7-2-7-3z" fill="#ffffff"/>
        <circle cx="22" cy="20" r="2" fill="#2C5E8A"/>
      `
    },
    {
      label: 'SQL',
      color: '#0284C7',
      iconSvg: `
        <ellipse cx="26" cy="12" rx="21" ry="7" fill="#0284C7"/>
        <path d="M5 12v11c0 3.9 9.4 7 21 7s21-3.1 21-7V12" fill="none" stroke="#0284C7" stroke-width="4.2" stroke-linecap="round"/>
        <path d="M5 23v11c0 3.9 9.4 7 21 7s21-3.1 21-7V23" fill="none" stroke="#0284C7" stroke-width="4.2" stroke-linecap="round"/>
        <path d="M5 34v11c0 3.9 9.4 7 21 7s21-3.1 21-7V34" fill="none" stroke="#0284C7" stroke-width="4.2" stroke-linecap="round"/>
      `
    },
    {
      label: 'REST API',
      color: '#7C3AED',
      iconSvg: `
        <rect x="3" y="3" width="46" height="46" rx="10" fill="#7C3AED"/>
        <path d="M11 26h8l4 10 7-20 4 10h9" fill="none" stroke="#ffffff" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round"/>
      `
    },
    {
      label: 'Docker',
      color: '#0073EC',
      iconSvg: `
        <g fill="#0073EC">
          <rect x="13" y="17" width="6" height="5.5" rx="1"/>
          <rect x="22" y="17" width="6" height="5.5" rx="1"/>
          <rect x="31" y="17" width="6" height="5.5" rx="1"/>
          <rect x="22" y="9" width="6" height="5.5" rx="1"/>
          <rect x="31" y="9" width="6" height="5.5" rx="1"/>
          <path d="M50 26c-1.9-1.3-5-1.5-7-.6-1.9-4.5-7-7-13.4-7H6c-1.3 0-2.3 1.1-2.3 2.3 0 7 4.5 15.3 15.3 15.3 10.2 0 17.9-3.8 23.6-8.3 1.1.2 2.6.6 4.5-.4 1.1-.6 1.9-1.5 2.3-1.9H50z"/>
        </g>
      `
    },
    {
      label: 'Kubernetes',
      color: '#2557C7',
      iconSvg: `
        <path d="M26 3C13.3 3 3 13.3 3 26s10.3 23 23 23 23-10.3 23-23S38.7 3 26 3z" fill="#2557C7"/>
        <circle cx="26" cy="26" r="8.5" fill="#ffffff"/>
        <circle cx="26" cy="26" r="4.8" fill="#2557C7"/>
        <path d="M26 8v8M26 36v8M8 26h8M36 26h8M13.3 13.3l5.7 5.7M33 33l5.7 5.7M13.3 38.7l5.7-5.7M33 19l5.7-5.7" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      `
    }
  ];

  function createSvgStickerSprite(tech, isMobileView) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    // Transparent canvas - PURE LOGO ONLY, ZERO circle background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    // Load pure vector SVG logo with rich contrast filter
    const svgMarkup = `
      <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 52 52">
        <defs>
          <filter id="logoContrast" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.3" />
            <feDropShadow dx="0" dy="0" stdDeviation="1.2" flood-color="#ffffff" flood-opacity="0.9" />
          </filter>
        </defs>
        <g filter="url(#logoContrast)">
          ${tech.iconSvg}
        </g>
      </svg>
    `;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 128, 128);
      texture.needsUpdate = true;
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgMarkup);

    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 1.0,
      depthTest: true,
      depthWrite: false
    });

    const sprite = new THREE.Sprite(spriteMaterial);
    const spriteSize = isMobileView ? 3.4 : 4.8;
    sprite.scale.set(spriteSize, spriteSize, 1);
    return sprite;
  }

  const stickerGroup = new THREE.Group();
  stickerGroup.rotation.x = Math.PI / 3;
  scene.add(stickerGroup);

  const stickerSprites = [];
  const numStickers = stickersData.length;
  stickersData.forEach((tech, i) => {
    const angle = (i / numStickers) * Math.PI * 2;
    const sprite = createSvgStickerSprite(tech, isMobile());
    const baseX = Math.cos(angle) * (ringRadius + 0.3);
    const baseY = Math.sin(angle) * (ringRadius + 0.3);
    sprite.position.set(baseX, baseY, 0);

    sprite.userData = { angle, baseX, baseY, index: i };
    stickerGroup.add(sprite);
    stickerSprites.push(sprite);
  });

  const geometry2 = new THREE.IcosahedronGeometry(11, 1);
  const material2 = new THREE.MeshBasicMaterial({
    color: 0x9fa4b2,
    wireframe: true,
    transparent: true,
    opacity: isMobile() ? 0.10 : 0.18
  });
  const poly = new THREE.Mesh(geometry2, material2);
  poly.position.set(0, -2, -10);
  scene.add(poly);

  // Architectural perspective floor grid in subtle light platinum (Compact)
  const gridHelper = new THREE.GridHelper(110, 28, 0xb0b5c0, 0xd8dce4);
  gridHelper.position.set(0, -26, -18);
  gridHelper.rotation.x = 0.08;
  scene.add(gridHelper);

  // Mouse tilt interaction with fluid damping
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Touch tilt for mobile
  window.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches.length > 0) {
        mouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    },
    { passive: true }
  );

  let isVisible = true;
  let animationFrameId = null;

  // --- Dynamic 3D Kinetic Ring Behind-Text Collision Detection ---
  // Pre-generate sample points along the circumference of ring1
  const NUM_RING_SAMPLES = 84;
  const ringSamplePoints = [];
  for (let i = 0; i < NUM_RING_SAMPLES; i++) {
    const theta = (i / NUM_RING_SAMPLES) * Math.PI * 2;
    ringSamplePoints.push(
      new THREE.Vector3(
        Math.cos(theta) * ringRadius,
        Math.sin(theta) * ringRadius,
        0
      )
    );
  }

  // Cache DOM text targets for zero-reflow 60fps collision detection
  const blurTargets = Array.from(document.querySelectorAll('.ring-blur-target'));
  let cachedTargetRects = [];

  function updateTargetRects() {
    cachedTargetRects = blurTargets.map((el) => ({
      el,
      rect: el.getBoundingClientRect()
    }));
  }

  updateTargetRects();
  setTimeout(updateTargetRects, 300);
  window.addEventListener('scroll', updateTargetRects, { passive: true });

  const tempWorldPos = new THREE.Vector3();
  const tempProjPos = new THREE.Vector3();
  const hitTargets = new Set();

  function handleResize() {
    const mobile = isMobile();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    targetZ = mobile ? 100 : 75;
    material1.opacity = mobile ? 0.12 : 0.22;
    material2.opacity = mobile ? 0.10 : 0.18;
    stickerSprites.forEach((sprite) => {
      const spriteSize = mobile ? 3.0 : 4.4;
      sprite.scale.set(spriteSize, spriteSize, 1);
      sprite.material.opacity = 1.0;
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    updateTargetRects();
  }
  window.addEventListener('resize', handleResize, { passive: true });

  function animate() {
    if (!isVisible) {
      animationFrameId = null;
      return;
    }
    animationFrameId = requestAnimationFrame(animate);
    const elapsedTime = performance.now() * 0.001;

    // Smooth inertia tracking
    targetX += (mouseX * 5 - targetX) * 0.04;
    targetY += (-mouseY * 4 - targetY) * 0.04;

    camera.position.x = targetX;
    camera.position.y = targetY;
    camera.position.z = targetZ;
    camera.lookAt(0, 0, 0);

    // Subtle, architectural kinetic motion
    ring1.rotation.z = elapsedTime * 0.035;
    ring1.rotation.y = elapsedTime * 0.02;

    // Orbit tech stickers locked with the ring
    stickerGroup.rotation.z = ring1.rotation.z;
    stickerGroup.rotation.y = ring1.rotation.y;

    poly.rotation.x = elapsedTime * 0.025;
    poly.rotation.y = elapsedTime * 0.03;

    gridHelper.position.z = -20 + Math.sin(elapsedTime * 0.2) * 2;

    // --- Real-Time Dynamic Occlusion: Check if 3D ring is backside of specific text ---
    ring1.updateMatrixWorld(true);
    stickerGroup.updateMatrixWorld(true);

    hitTargets.clear();
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    // 1. Test points along the kinetic ring
    for (let i = 0; i < NUM_RING_SAMPLES; i++) {
      tempWorldPos.copy(ringSamplePoints[i]).applyMatrix4(ring1.matrixWorld);

      // Only test points physically in the 3D background / backside (z < 0)
      if (tempWorldPos.z < 0) {
        tempProjPos.copy(tempWorldPos).project(camera);

        if (tempProjPos.z >= -1 && tempProjPos.z <= 1) {
          const screenX = ((tempProjPos.x + 1) / 2) * winW;
          const screenY = ((-tempProjPos.y + 1) / 2) * winH;

          for (let j = 0; j < cachedTargetRects.length; j++) {
            const target = cachedTargetRects[j];
            const r = target.rect;
            const pad = target.el.classList.contains('hero-bio-p') ? 3 : 12;
            if (
              screenX >= r.left - pad &&
              screenX <= r.right + pad &&
              screenY >= r.top - pad &&
              screenY <= r.bottom + pad
            ) {
              hitTargets.add(target.el);
            }
          }
        }
      }
    }

    // 2. Test orbiting sticker badge positions
    for (let i = 0; i < stickerSprites.length; i++) {
      stickerSprites[i].getWorldPosition(tempWorldPos);
      if (tempWorldPos.z < 0) {
        tempProjPos.copy(tempWorldPos).project(camera);
        if (tempProjPos.z >= -1 && tempProjPos.z <= 1) {
          const screenX = ((tempProjPos.x + 1) / 2) * winW;
          const screenY = ((-tempProjPos.y + 1) / 2) * winH;

          for (let j = 0; j < cachedTargetRects.length; j++) {
            const target = cachedTargetRects[j];
            const r = target.rect;
            const pad = target.el.classList.contains('hero-bio-p') ? 3 : 12;
            if (
              screenX >= r.left - pad &&
              screenX <= r.right + pad &&
              screenY >= r.top - pad &&
              screenY <= r.bottom + pad
            ) {
              hitTargets.add(target.el);
            }
          }
        }
      }
    }

    // Apply or remove the blur class specifically for each reached text
    for (let j = 0; j < cachedTargetRects.length; j++) {
      const el = cachedTargetRects[j].el;
      const isOccluded = hitTargets.has(el);
      if (isOccluded && !el.classList.contains('is-occluded')) {
        el.classList.add('is-occluded');
      } else if (!isOccluded && el.classList.contains('is-occluded')) {
        el.classList.remove('is-occluded');
      }
    }

    renderer.render(scene, camera);
  }

  // Viewport-aware rendering: pause WebGL render loop when hero is off-screen
  const heroSection = document.getElementById('home');
  if (heroSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(animate);
        } else if (!isVisible && animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(heroSection);
  }

  animationFrameId = requestAnimationFrame(animate);
}
