import * as THREE from 'three';

/**
 * Service 3D Canvases (Light Mode Studio Lighting)
 * Interactive 3D glossy metallic geometric artifacts inside service capsules.
 */
export function initService3D(canvasElement, shapeType, accentHex) {
  if (!canvasElement) return null;

  const width = canvasElement.clientWidth || 360;
  const height = canvasElement.clientHeight || 220;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    alpha: true,
    antialias: true,
    powerPreference: 'default'
  });

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // High-End Studio Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.6);
  dirLight1.position.set(5, 8, 6);
  scene.add(dirLight1);

  const accentColor = new THREE.Color(accentHex || '#16a34a');
  const dirLight2 = new THREE.PointLight(accentColor, 4.0, 20);
  dirLight2.position.set(-6, -4, 4);
  scene.add(dirLight2);

  // Geometry selector
  let geometry;
  switch (shapeType) {
    case 'torusKnot':
      geometry = new THREE.TorusKnotGeometry(1.5, 0.42, 128, 32);
      break;
    case 'octahedron':
      geometry = new THREE.OctahedronGeometry(2.0, 0);
      break;
    case 'icosahedron':
      geometry = new THREE.IcosahedronGeometry(2.0, 1);
      break;
    case 'torus':
    default:
      geometry = new THREE.TorusGeometry(1.8, 0.52, 32, 100);
      break;
  }

  // Glossy high-tech titanium material
  const material = new THREE.MeshStandardMaterial({
    color: 0x222430,
    roughness: 0.18,
    metalness: 0.85,
    wireframe: false,
    emissive: accentColor,
    emissiveIntensity: 0.2
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Outer wireframe highlight ring
  const cageMaterial = new THREE.MeshBasicMaterial({
    color: 0x4a5060,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const cageMesh = new THREE.Mesh(geometry.clone(), cageMaterial);
  cageMesh.scale.set(1.06, 1.06, 1.06);
  scene.add(cageMesh);

  // Drag interaction
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let rotSpeedX = 0.005;
  let rotSpeedY = 0.008;

  canvasElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevMouseX;
    const deltaY = e.clientY - prevMouseY;
    mesh.rotation.y += deltaX * 0.01;
    mesh.rotation.x += deltaY * 0.01;
    cageMesh.rotation.y = mesh.rotation.y;
    cageMesh.rotation.x = mesh.rotation.x;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  // Touch controls
  canvasElement.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    },
    { passive: true }
  );

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener(
    'touchmove',
    (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      mesh.rotation.y += deltaX * 0.01;
      mesh.rotation.x += deltaY * 0.01;
      cageMesh.rotation.y = mesh.rotation.y;
      cageMesh.rotation.x = mesh.rotation.x;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    },
    { passive: true }
  );

  let isRunning = true;
  let animId = null;

  function render() {
    if (!isRunning) {
      animId = null;
      return;
    }
    animId = requestAnimationFrame(render);

    if (!isDragging) {
      mesh.rotation.y += rotSpeedY;
      mesh.rotation.x += rotSpeedX;
      cageMesh.rotation.y = mesh.rotation.y;
      cageMesh.rotation.x = mesh.rotation.x;
    }

    renderer.render(scene, camera);
  }

  function pause() {
    isRunning = false;
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  function resume() {
    if (!isRunning) {
      isRunning = true;
      animId = requestAnimationFrame(render);
    }
  }

  // Viewport & visibility awareness: pause WebGL render loop when not intersecting
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const card = canvasElement.closest('.service-card');
          if (card && card.classList.contains('is-expanded')) {
            resume();
          }
        } else {
          pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(canvasElement);
  }

  animId = requestAnimationFrame(render);

  function resize() {
    const parent = canvasElement.parentElement;
    if (!parent) return;
    const newWidth = parent.clientWidth || 360;
    const newHeight = parent.clientHeight || 220;
    if (newWidth > 0 && newHeight > 0) {
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    }
  }

  window.addEventListener('resize', resize, { passive: true });

  return {
    resize,
    pause,
    resume,
    destroy() {
      pause();
      window.removeEventListener('resize', resize);
      renderer.dispose();
    }
  };
}
