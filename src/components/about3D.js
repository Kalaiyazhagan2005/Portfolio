import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * About Section 3D AI & Data Science Neural Matrix Core
 * Interactive Three.js WebGL canvas featuring:
 * 1. Faceted Obsidian Inner Core & Glowing Geodesic Outer Cage
 * 2. Holographic Orbital Data Rings with dynamic counter-rotation
 * 3. Real-Time 3D Scroll Perspective Animation linked to GSAP ScrollTrigger
 * 4. Interactive Mouse / Touch Drag Inspection
 * 5. IntersectionObserver auto-pause for 60FPS battery & GPU efficiency
 */
export function initAbout3D(canvasElement) {
  if (!canvasElement) return null;

  const container = canvasElement.parentElement || canvasElement;
  let width = canvasElement.clientWidth || 380;
  let height = canvasElement.clientHeight || 380;

  // 1. Scene, Camera, & High-Performance Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 7.2);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 2. Studio Lighting (Clean Light Mode Aesthetic)
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.8);
  dirLight1.position.set(6, 8, 6);
  scene.add(dirLight1);

  const cyanLight = new THREE.PointLight(0x0284c7, 3.5, 20);
  cyanLight.position.set(-6, -4, 4);
  scene.add(cyanLight);

  const emeraldLight = new THREE.PointLight(0x16a34a, 3.0, 18);
  emeraldLight.position.set(4, -5, -3);
  scene.add(emeraldLight);

  // 3. Central Neural Core Object Group
  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // Layer A: Inner Faceted Obsidian Core
  const coreGeometry = new THREE.IcosahedronGeometry(1.4, 0);
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: 0x12131a,
    roughness: 0.15,
    metalness: 0.88,
    emissive: 0x0284c7,
    emissiveIntensity: 0.18,
    flatShading: true
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  masterGroup.add(coreMesh);

  // Layer B: Glowing Geodesic Wireframe Sphere Cage
  const cageGeometry = new THREE.IcosahedronGeometry(1.95, 1);
  const cageMaterial = new THREE.MeshBasicMaterial({
    color: 0x0284c7,
    wireframe: true,
    transparent: true,
    opacity: 0.38
  });
  const cageMesh = new THREE.Mesh(cageGeometry, cageMaterial);
  masterGroup.add(cageMesh);

  // Layer C: Concentric Orbital Data Rings
  const ring1Geom = new THREE.TorusGeometry(2.45, 0.022, 16, 100);
  const ring1Mat = new THREE.MeshStandardMaterial({
    color: 0x16a34a,
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0x16a34a,
    emissiveIntensity: 0.3
  });
  const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
  ring1.rotation.x = Math.PI * 0.28;
  ring1.rotation.y = Math.PI * 0.12;
  masterGroup.add(ring1);

  const ring2Geom = new THREE.TorusGeometry(2.8, 0.018, 16, 100);
  const ring2Mat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    metalness: 0.85,
    roughness: 0.25,
    emissive: 0x0284c7,
    emissiveIntensity: 0.25
  });
  const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
  ring2.rotation.x = -Math.PI * 0.35;
  ring2.rotation.z = Math.PI * 0.2;
  masterGroup.add(ring2);

  // Layer D: Floating Neural Data Nodes (Particle Constellation)
  const particleCount = 48;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const radius = 1.95 + (Math.random() - 0.5) * 0.25;

    particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i * 3 + 2] = radius * Math.cos(phi);
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 0.08,
    transparent: true,
    opacity: 0.85
  });
  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  masterGroup.add(particleSystem);

  // 4. Interactive Drag & Mouse Tilt State
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let mouseVelX = 0;
  let mouseVelY = 0;
  let dragRotX = 0;
  let dragRotY = 0;

  let isHovered = false;
  let targetTiltX = 0;
  let targetTiltY = 0;

  // 5. Real-Time 3D Scroll State
  let targetScrollRotX = 0;
  let targetScrollRotY = 0;
  let currentScrollRotX = 0;
  let currentScrollRotY = 0;
  let currentScrollZoom = 0;

  // Hook into GSAP ScrollTrigger for smooth 3D scroll progression
  const scrollTriggerInstance = ScrollTrigger.create({
    trigger: '#about',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress; // 0.0 to 1.0
      // 3D rotation proportional to page scroll
      targetScrollRotY = p * Math.PI * 2.8;
      targetScrollRotX = (p - 0.5) * Math.PI * 0.9;
      currentScrollZoom = Math.sin(p * Math.PI) * 0.45;
    }
  });

  // Pointer / Touch Listeners on canvas container
  function onPointerDown(e) {
    isDragging = true;
    prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    mouseVelX = 0;
    mouseVelY = 0;
  }

  function onPointerMove(e) {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    if (isDragging) {
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;
      mouseVelX = deltaX * 0.006;
      mouseVelY = deltaY * 0.006;
      dragRotY += mouseVelX;
      dragRotX += mouseVelY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    } else {
      const rect = canvasElement.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
      targetTiltX = normY * 0.35;
      targetTiltY = normX * 0.35;
    }
  }

  function onPointerUp() {
    isDragging = false;
  }

  canvasElement.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove, { passive: true });
  window.addEventListener('mouseup', onPointerUp);

  canvasElement.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  canvasElement.addEventListener('mouseenter', () => { isHovered = true; });
  canvasElement.addEventListener('mouseleave', () => {
    isHovered = false;
    targetTiltX = 0;
    targetTiltY = 0;
  });

  // 6. Responsive Auto-Resizing
  function resize() {
    if (!canvasElement) return;
    const newWidth = canvasElement.clientWidth || 380;
    const newHeight = canvasElement.clientHeight || 380;
    if (newWidth !== width || newHeight !== height) {
      width = newWidth;
      height = newHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  }

  window.addEventListener('resize', resize);

  // 7. Render Loop with Inertia, Auto-Rotation & 3D Scroll
  let isRunning = true;
  let rafId = null;
  let clock = new THREE.Clock();

  function animate() {
    if (!isRunning) return;

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Inertia damping on drag velocity
    if (!isDragging) {
      mouseVelX *= 0.94;
      mouseVelY *= 0.94;
      dragRotY += mouseVelX;
      dragRotX += mouseVelY;
    }

    // Smooth lerp to scroll target rotations
    currentScrollRotX += (targetScrollRotX - currentScrollRotX) * 0.08;
    currentScrollRotY += (targetScrollRotY - currentScrollRotY) * 0.08;

    // Base procedural rotation + scroll rotation + drag rotation + tilt
    masterGroup.rotation.x = currentScrollRotX + dragRotX + targetTiltX;
    masterGroup.rotation.y = currentScrollRotY + dragRotY + targetTiltY + elapsedTime * 0.18;

    // Counter-rotating orbital rings for high-tech kinetic feel
    ring1.rotation.z += delta * 0.45;
    ring2.rotation.y -= delta * 0.35;
    coreMesh.rotation.y += delta * 0.25;

    // Subtle sinusoidal levitation
    masterGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.12;

    // Dynamic depth zoom on scroll
    camera.position.z = 7.2 - currentScrollZoom;

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(animate);
  }

  // 8. IntersectionObserver Auto-Pause for Battery Efficiency
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isRunning) {
            isRunning = true;
            clock.start();
            animate();
          }
        } else {
          isRunning = false;
          if (rafId) cancelAnimationFrame(rafId);
        }
      });
    },
    { threshold: 0.05 }
  );

  observer.observe(canvasElement);
  animate();

  return {
    pause: () => {
      isRunning = false;
      if (rafId) cancelAnimationFrame(rafId);
    },
    resume: () => {
      if (!isRunning) {
        isRunning = true;
        clock.start();
        animate();
      }
    },
    destroy: () => {
      isRunning = false;
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      window.removeEventListener('resize', resize);
      renderer.dispose();
    }
  };
}
