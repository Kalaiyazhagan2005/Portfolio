import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * About Section 3D AI & Data Science Neural Matrix Core
 * Interactive Three.js WebGL canvas featuring:
 * 1. Colorful Shatter & Reassemble Iridescent Crystal Core (Hover triggered)
 * 2. Glowing Geodesic Wireframe Outer Cage
 * 3. Holographic Orbital Data Rings with dynamic counter-rotation
 * 4. Floating Neural Data Nodes (Particle Constellation)
 * 5. Real-Time 3D Scroll Perspective Animation linked to GSAP ScrollTrigger
 * 6. Interactive Mouse / Touch Drag & Tilt Inspection
 * 7. IntersectionObserver auto-pause for 60FPS battery & GPU efficiency
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

  // 2. Studio Lighting (Rich Colorful Light Mode Aesthetic)
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.6);
  dirLight1.position.set(6, 8, 6);
  scene.add(dirLight1);

  // Vibrant point lights to bring out jewel facet reflections
  const cyanLight = new THREE.PointLight(0x00f0ff, 4.0, 22);
  cyanLight.position.set(-6, -4, 4);
  scene.add(cyanLight);

  const violetLight = new THREE.PointLight(0xa855f7, 3.8, 20);
  violetLight.position.set(5, 6, -3);
  scene.add(violetLight);

  const emeraldLight = new THREE.PointLight(0x10b981, 3.5, 18);
  emeraldLight.position.set(4, -5, -3);
  scene.add(emeraldLight);

  // 3. Central Neural Core Object Group
  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // Layer A: Colorful Shatterable Crystal Core
  const coreGroup = new THREE.Group();
  masterGroup.add(coreGroup);

  // Inner Glowing Nucleus (Illuminates floating shards when shattered)
  const nucleusGeom = new THREE.SphereGeometry(0.35, 16, 16);
  const nucleusMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.95
  });
  const nucleusMesh = new THREE.Mesh(nucleusGeom, nucleusMat);
  coreGroup.add(nucleusMesh);

  const nucleusLight = new THREE.PointLight(0x00f0ff, 1.8, 8);
  nucleusMesh.add(nucleusLight);

  // Palette of rich, vibrant metallic facet materials
  const facetMaterials = [
    new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Vivid Electric Cyan
      roughness: 0.12,
      metalness: 0.88,
      emissive: 0x0284c7,
      emissiveIntensity: 0.38,
      flatShading: true
    }),
    new THREE.MeshStandardMaterial({
      color: 0x8b5cf6, // Ultraviolet Purple
      roughness: 0.14,
      metalness: 0.86,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.38,
      flatShading: true
    }),
    new THREE.MeshStandardMaterial({
      color: 0x10b981, // Neon Emerald
      roughness: 0.13,
      metalness: 0.86,
      emissive: 0x059669,
      emissiveIntensity: 0.4,
      flatShading: true
    }),
    new THREE.MeshStandardMaterial({
      color: 0xec4899, // Radiant Magenta / Pink
      roughness: 0.15,
      metalness: 0.84,
      emissive: 0xdb2777,
      emissiveIntensity: 0.36,
      flatShading: true
    }),
    new THREE.MeshStandardMaterial({
      color: 0x2563eb, // Royal Sapphire
      roughness: 0.12,
      metalness: 0.9,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.38,
      flatShading: true
    }),
    new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Golden Amber
      roughness: 0.16,
      metalness: 0.85,
      emissive: 0xd97706,
      emissiveIntensity: 0.36,
      flatShading: true
    })
  ];

  // Construct 20 solid crystal shard pyramids that seamlessly lock into an icosahedron
  const baseGeom = new THREE.IcosahedronGeometry(1.4, 0);
  const posAttr = baseGeom.attributes.position;
  const shards = [];

  for (let i = 0; i < posAttr.count; i += 3) {
    const vA = new THREE.Vector3().fromBufferAttribute(posAttr, i);
    const vB = new THREE.Vector3().fromBufferAttribute(posAttr, i + 1);
    const vC = new THREE.Vector3().fromBufferAttribute(posAttr, i + 2);

    const faceCentroid = new THREE.Vector3().add(vA).add(vB).add(vC).divideScalar(3);
    const normal = faceCentroid.clone().normalize();

    // Local coordinates relative to faceCentroid
    const pA = vA.clone().sub(faceCentroid);
    const pB = vB.clone().sub(faceCentroid);
    const pC = vC.clone().sub(faceCentroid);
    // Apex connects into the center origin (0, 0, 0)
    const apex = new THREE.Vector3().sub(faceCentroid);

    const shardGeom = new THREE.BufferGeometry();
    const shardVertices = new Float32Array([
      // Outer face (A, B, C)
      pA.x, pA.y, pA.z,
      pB.x, pB.y, pB.z,
      pC.x, pC.y, pC.z,
      // Side face 1 (apex, B, A)
      apex.x, apex.y, apex.z,
      pB.x, pB.y, pB.z,
      pA.x, pA.y, pA.z,
      // Side face 2 (apex, C, B)
      apex.x, apex.y, apex.z,
      pC.x, pC.y, pC.z,
      pB.x, pB.y, pB.z,
      // Side face 3 (apex, A, C)
      apex.x, apex.y, apex.z,
      pA.x, pA.y, pA.z,
      pC.x, pC.y, pC.z
    ]);

    shardGeom.setAttribute('position', new THREE.BufferAttribute(shardVertices, 3));
    shardGeom.computeVertexNormals();

    const mat = facetMaterials[(i / 3) % facetMaterials.length];
    const shardMesh = new THREE.Mesh(shardGeom, mat);
    shardMesh.position.copy(faceCentroid);

    // Initial and dynamic trajectory offsets for hover shatter
    shardMesh.userData = {
      basePos: faceCentroid.clone(),
      normal: normal.clone(),
      explodeDist: 1.15 + Math.random() * 0.85, // Scatter radius
      tumbleX: (Math.random() - 0.5) * 2.4,
      tumbleY: (Math.random() - 0.5) * 2.4,
      tumbleZ: (Math.random() - 0.5) * 2.4
    };

    coreGroup.add(shardMesh);
    shards.push(shardMesh);
  }

  // Layer B: Glowing Geodesic Wireframe Sphere Cage
  const cageGeometry = new THREE.IcosahedronGeometry(2.0, 1);
  const cageMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.42
  });
  const cageMesh = new THREE.Mesh(cageGeometry, cageMaterial);
  masterGroup.add(cageMesh);

  // Layer C: Concentric Holographic Orbital Data Rings
  // Ring 1: Vibrant Emerald
  const ring1Geom = new THREE.TorusGeometry(2.5, 0.024, 16, 100);
  const ring1Mat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0x10b981,
    emissiveIntensity: 0.45
  });
  const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
  ring1.rotation.x = Math.PI * 0.28;
  ring1.rotation.y = Math.PI * 0.12;
  masterGroup.add(ring1);

  // Ring 2: Electric Cyan
  const ring2Geom = new THREE.TorusGeometry(2.85, 0.022, 16, 100);
  const ring2Mat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    metalness: 0.85,
    roughness: 0.22,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.45
  });
  const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
  ring2.rotation.x = -Math.PI * 0.35;
  ring2.rotation.z = Math.PI * 0.2;
  masterGroup.add(ring2);

  // Ring 3: Radiant Purple
  const ring3Geom = new THREE.TorusGeometry(3.15, 0.018, 16, 100);
  const ring3Mat = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    metalness: 0.82,
    roughness: 0.25,
    emissive: 0x8b5cf6,
    emissiveIntensity: 0.4
  });
  const ring3 = new THREE.Mesh(ring3Geom, ring3Mat);
  ring3.rotation.x = Math.PI * 0.45;
  ring3.rotation.y = -Math.PI * 0.25;
  masterGroup.add(ring3);

  // Layer D: Floating Neural Data Nodes (Particle Constellation)
  const particleCount = 56;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const radius = 2.05 + (Math.random() - 0.5) * 0.35;

    particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i * 3 + 2] = radius * Math.cos(phi);
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x00f0ff,
    size: 0.085,
    transparent: true,
    opacity: 0.9
  });
  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  masterGroup.add(particleSystem);

  // 4. Shatter & Reassemble Physics Controller
  const shatterState = { progress: 0 };

  function triggerShatter(shatter) {
    if (shatter) {
      // Shatter explosion outward with dynamic bounce
      gsap.to(shatterState, {
        progress: 1,
        duration: 0.75,
        ease: 'power2.out',
        overwrite: true
      });
      gsap.to(nucleusLight, {
        intensity: 4.2,
        duration: 0.6,
        overwrite: true
      });
      gsap.to(cageMesh.scale, {
        x: 1.18,
        y: 1.18,
        z: 1.18,
        duration: 0.7,
        ease: 'power2.out',
        overwrite: true
      });
    } else {
      // Reassemble smoothly back into solid crystal
      gsap.to(shatterState, {
        progress: 0,
        duration: 0.95,
        ease: 'elastic.out(1, 0.75)',
        overwrite: true
      });
      gsap.to(nucleusLight, {
        intensity: 1.8,
        duration: 0.8,
        overwrite: true
      });
      gsap.to(cageMesh.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: true
      });
    }
  }

  // 5. Interactive Drag & Mouse Tilt State
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

  // 6. Real-Time 3D Scroll State
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
      targetScrollRotY = p * Math.PI * 2.8;
      targetScrollRotX = (p - 0.5) * Math.PI * 0.9;
      currentScrollZoom = Math.sin(p * Math.PI) * 0.45;
    }
  });

  // Attach hover detection to the 3D card wrap
  const hoverTarget = container.closest('.about-3d-card-wrap') || container;

  function onMouseEnter() {
    isHovered = true;
    triggerShatter(true);
  }

  function onMouseLeave() {
    isHovered = false;
    targetTiltX = 0;
    targetTiltY = 0;
    triggerShatter(false);
  }

  hoverTarget.addEventListener('mouseenter', onMouseEnter);
  hoverTarget.addEventListener('mouseleave', onMouseLeave);

  // Mobile Touch Toggle Support
  let touchShattered = false;
  function onTouchStart() {
    touchShattered = !touchShattered;
    triggerShatter(touchShattered);
  }
  hoverTarget.addEventListener('touchstart', onTouchStart, { passive: true });

  // Pointer / Touch Listeners for Drag & Inspection
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

  canvasElement.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // 7. Responsive Auto-Resizing
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

  // 8. Render Loop with Inertia, Shatter Physics & 3D Scroll
  let isRunning = false;
  let rafId = null;
  let clock = new THREE.Clock();
  let prevSp = -1;

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

    // Counter-rotating orbital rings
    ring1.rotation.z += delta * 0.5;
    ring2.rotation.y -= delta * 0.4;
    ring3.rotation.z += delta * 0.35;

    // Gentle core idle rotation
    coreGroup.rotation.y += delta * 0.22;

    // Update Shatter / Reassemble Shards Position & Tumble only when animating or shattered
    const sp = shatterState.progress;
    if (sp > 0.0001 || prevSp > 0.0001) {
      for (let i = 0; i < shards.length; i++) {
        const s = shards[i];
        const d = sp * s.userData.explodeDist;

        // Move along normal vector outward
        s.position.x = s.userData.basePos.x + s.userData.normal.x * d;
        s.position.y = s.userData.basePos.y + s.userData.normal.y * d;
        s.position.z = s.userData.basePos.z + s.userData.normal.z * d;

        // 3D tumble rotation when shattered, locks to 0 when assembled
        s.rotation.x = s.userData.tumbleX * sp * Math.PI * 1.5;
        s.rotation.y = s.userData.tumbleY * sp * Math.PI * 1.5;
        s.rotation.z = s.userData.tumbleZ * sp * Math.PI * 1.5;
      }
      prevSp = sp;
    }

    // Floating sinusoidal levitation
    masterGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.12;

    // Dynamic depth zoom on scroll
    camera.position.z = 7.2 - currentScrollZoom;

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(animate);
  }

  // 9. IntersectionObserver Auto-Pause for Battery Efficiency
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
      hoverTarget.removeEventListener('mouseenter', onMouseEnter);
      hoverTarget.removeEventListener('mouseleave', onMouseLeave);
      hoverTarget.removeEventListener('touchstart', onTouchStart);
      canvasElement.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('resize', resize);
      renderer.dispose();
    }
  };
}
