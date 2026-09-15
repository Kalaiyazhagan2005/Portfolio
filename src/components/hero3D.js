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

  // --- Architectural Floating Geometric Wireframe in Crisp Slate ---
  const geometry1 = new THREE.TorusGeometry(32, 0.35, 16, 120);
  const material1 = new THREE.MeshBasicMaterial({
    color: 0x828896,
    wireframe: true,
    transparent: true,
    opacity: isMobile() ? 0.18 : 0.35
  });
  const ring1 = new THREE.Mesh(geometry1, material1);
  ring1.rotation.x = Math.PI / 3;
  scene.add(ring1);

  const geometry2 = new THREE.IcosahedronGeometry(22, 1);
  const material2 = new THREE.MeshBasicMaterial({
    color: 0x9fa4b2,
    wireframe: true,
    transparent: true,
    opacity: isMobile() ? 0.14 : 0.28
  });
  const poly = new THREE.Mesh(geometry2, material2);
  poly.position.set(0, -2, -10);
  scene.add(poly);

  // Architectural perspective floor grid in subtle light platinum
  const gridHelper = new THREE.GridHelper(180, 45, 0xb0b5c0, 0xd8dce4);
  gridHelper.position.set(0, -35, -20);
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

  function handleResize() {
    const mobile = isMobile();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    targetZ = mobile ? 110 : 75;
    material1.opacity = mobile ? 0.18 : 0.35;
    material2.opacity = mobile ? 0.14 : 0.28;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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

    poly.rotation.x = elapsedTime * 0.025;
    poly.rotation.y = elapsedTime * 0.03;

    gridHelper.position.z = -20 + Math.sin(elapsedTime * 0.2) * 2;

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
