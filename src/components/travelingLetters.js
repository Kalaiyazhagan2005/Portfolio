import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * Kinetic Letters Mapping:
 * - 'a': from "Kalaiyazhagan" (headline)
 * - 'b': from "build" (bio)
 * - 'o': from "modern" (bio)
 * - 'u': from "build" (bio)
 * - 't': from "development" (status pill)
 * - 'm': from "systems" (bio)
 * - 'e': from "are" (bio)
 *
 * Elastic Trailing Inertia Physics & Procedural 3D Flight:
 * - Each letter has its own inertia mass (baseLerpRate: 0.046 to 0.072), creating a
 *   graceful staggered flock trailing effect when scrolling fast or flicking.
 * - Procedural Chaos Seed Generator generates randomized 3D trajectory curves
 *   (amplitudes, frequencies, phase shifts, 3D tumbling angles, and Z-depth plunge)
 *   fresh each time the letters lift off from home, while guaranteeing 100% magnetic
 *   docking precision into the About tag.
 */
const LETTERS_CONFIG = [
  { key: 'a', upper: 'A', lower: 'a', glow: '#00d8ff', baseLerpRate: 0.068 },
  { key: 'b', upper: 'B', lower: 'b', glow: '#38bdf8', baseLerpRate: 0.052 },
  { key: 'o', upper: 'O', lower: 'o', glow: '#60a5fa', baseLerpRate: 0.060 },
  { key: 'u', upper: 'U', lower: 'u', glow: '#818cf8', baseLerpRate: 0.046 },
  { key: 't', upper: 'T', lower: 't', glow: '#a78bfa', baseLerpRate: 0.072 },
  { key: 'm', upper: 'M', lower: 'm', glow: '#c084fc', baseLerpRate: 0.049 },
  { key: 'e', upper: 'E', lower: 'e', glow: '#38bdf8', baseLerpRate: 0.058 }
];

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

/**
 * Generates fresh procedural 3D randomized coefficients for each flight cycle.
 */
function generateSeeds() {
  const seeds = {};
  LETTERS_CONFIG.forEach((cfg) => {
    const signX = Math.random() > 0.5 ? 1 : -1;
    const signY = Math.random() > 0.5 ? 1 : -1;
    const signZ = Math.random() > 0.5 ? 1 : -1;

    seeds[cfg.key] = {
      // X-curve parametric coefficients (-180 to +180 px)
      ampX1: randomRange(75, 175) * signX,
      ampX2: randomRange(30, 85) * -signX,
      freqX1: randomRange(1.1, 1.8),
      freqX2: randomRange(2.0, 3.2),
      phaseX: randomRange(0, Math.PI * 0.5),

      // Y-curve parametric coefficients (-160 to +160 px)
      ampY1: randomRange(65, 155) * signY,
      ampY2: randomRange(30, 75) * -signY,
      freqY1: randomRange(1.1, 1.6),
      freqY2: randomRange(1.8, 3.0),
      phaseY: randomRange(0, Math.PI * 0.5),

      // Z-depth swing (-80 to +180 px)
      ampZ1: randomRange(-60, 160),
      ampZ2: randomRange(40, 110) * signZ,
      freqZ1: randomRange(1.1, 2.2),

      // 3D rotation tumbling (-90deg to +90deg)
      rotX: randomRange(35, 85) * (Math.random() > 0.5 ? 1 : -1),
      rotY: randomRange(40, 90) * (Math.random() > 0.5 ? 1 : -1),
      rotZ: randomRange(30, 80) * (Math.random() > 0.5 ? 1 : -1),
      freqRotX: randomRange(1.2, 2.4),
      freqRotY: randomRange(1.2, 2.5),
      freqRotZ: randomRange(1.0, 2.2),

      // Dynamic scale bulge in flight
      scalePeak: randomRange(0.55, 0.85),

      // Per-letter inertia damping coefficient (0.045 to 0.075)
      lerpRate: Math.max(0.045, Math.min(0.075, cfg.baseLerpRate + randomRange(-0.005, 0.005)))
    };
  });
  return seeds;
}

/**
 * Calculates randomized 3D chaos trajectory offsets for a given letter and progress.
 */
function calculateChaos(p, scaleFactor, seed) {
  const pPi = p * Math.PI;

  const x = (
    seed.ampX1 * Math.sin(p * seed.freqX1 * Math.PI + seed.phaseX) +
    seed.ampX2 * Math.sin(p * seed.freqX2 * Math.PI)
  ) * scaleFactor;

  const y = (
    seed.ampY1 * Math.sin(p * seed.freqY1 * Math.PI + seed.phaseY) +
    seed.ampY2 * Math.cos(p * seed.freqY2 * Math.PI)
  ) * scaleFactor;

  const z = (
    seed.ampZ1 * Math.sin(pPi) +
    seed.ampZ2 * Math.sin(p * seed.freqZ1 * Math.PI)
  );

  const rotX = seed.rotX * Math.cos(p * seed.freqRotX * Math.PI);
  const rotY = seed.rotY * Math.sin(p * seed.freqRotY * Math.PI);
  const rotZ = seed.rotZ * Math.sin(p * seed.freqRotZ * Math.PI);

  const scale = 1.0 + seed.scalePeak * Math.sin(pPi);

  return { x, y, z, rotX, rotY, rotZ, scale };
}

export function initTravelingLetters() {
  const flightStage = document.getElementById('flight-stage');
  const aboutTag = document.getElementById('about-label-tag');
  const dockWrap = document.getElementById('about-dock-letters');

  if (!flightStage || !aboutTag || !dockWrap) {
    return;
  }

  // Find source elements in Hero section by data-char-key
  const sourceElements = {};
  document.querySelectorAll('.kinetic-source-char').forEach((el) => {
    const k = el.getAttribute('data-char-key');
    if (k) sourceElements[k] = el;
  });

  // Find dock target elements in About section by data-dock-key
  const dockElements = {};
  dockWrap.querySelectorAll('.dock-char').forEach((el) => {
    const k = el.getAttribute('data-dock-key');
    if (k) dockElements[k] = el;
  });

  // Find flight character elements in flight stage by data-char-key
  const flightElements = {};
  flightStage.querySelectorAll('.flight-char').forEach((el) => {
    const k = el.getAttribute('data-char-key');
    if (k) flightElements[k] = el;
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let cachedMeasurements = {};
  let currentSeeds = generateSeeds();

  // Progress state management:
  // flightState: 'home' | 'flying_to_dock' | 'docked' | 'flying_to_home'
  // autoProgress: Autonomous progress driver that ensures letters complete their journey even if user stops scrolling
  let flightState = 'home';
  let autoProgress = 0;
  let targetProgress = 0;
  const currentProgress = {};
  LETTERS_CONFIG.forEach((cfg) => {
    currentProgress[cfg.key] = 0;
  });

  let hasLiftedOff = false;
  let isDockedState = false;
  let isHomeState = null;
  let rafId = null;
  let rafRunning = false;
  let lastTime = 0;

  function measureCoordinates() {
    cachedMeasurements = {};
    const scrollX = window.scrollX || window.pageXOffset || 0;
    const scrollY = window.scrollY || window.pageYOffset || 0;

    LETTERS_CONFIG.forEach((cfg) => {
      let srcEl = sourceElements[cfg.key];
      if (!srcEl) {
        srcEl = document.querySelector(`.kinetic-source-char[data-char-key="${cfg.key}"]`);
        if (srcEl) sourceElements[cfg.key] = srcEl;
      }
      const dockEl = dockElements[cfg.key];
      const flightEl = flightElements[cfg.key];

      if (!srcEl || !dockEl || !flightEl) return;

      const srcRect = srcEl.getBoundingClientRect();
      const dockRect = dockEl.getBoundingClientRect();
      const srcComputed = window.getComputedStyle(srcEl);
      const dockComputed = window.getComputedStyle(dockEl);

      cachedMeasurements[cfg.key] = {
        srcDocX: srcRect.left + scrollX,
        srcDocY: srcRect.top + scrollY,
        srcWidth: srcRect.width,
        srcHeight: srcRect.height,
        srcFontSize: parseFloat(srcComputed.fontSize) || 16,
        srcFontWeight: srcComputed.fontWeight || '700',
        srcFontFamily: srcComputed.fontFamily,

        dockDocX: dockRect.left + scrollX,
        dockDocY: dockRect.top + scrollY,
        dockWidth: dockRect.width,
        dockHeight: dockRect.height,
        dockFontSize: parseFloat(dockComputed.fontSize) || 16,
        dockFontWeight: dockComputed.fontWeight || '800',
        dockFontFamily: dockComputed.fontFamily
      };
    });
  }

  measureCoordinates();

  /**
   * Main render tick called by requestAnimationFrame loop.
   * Performs autonomous forward progression to destination even if user stops scrolling,
   * coupled with per-letter inertia mass physics for trailing flock flight.
   */
  function tick() {
    if (prefersReducedMotion) {
      if (targetProgress >= 0.5) {
        aboutTag.classList.add('is-docked');
        flightStage.style.display = 'none';
      } else {
        aboutTag.classList.remove('is-docked');
        flightStage.style.display = 'none';
      }
      rafRunning = false;
      rafId = null;
      return;
    }

    if (Object.keys(cachedMeasurements).length !== LETTERS_CONFIG.length) {
      measureCoordinates();
    }

    // Delta-time calculation for frame-rate independent autonomous flight
    const now = performance.now();
    const dt = lastTime > 0 ? Math.min(0.05, (now - lastTime) / 1000) : 0.016;
    lastTime = now;

    // Autonomous progress driver:
    // When flying to dock, continue advancing towards 1.0 even if user stopped scrolling!
    if (flightState === 'flying_to_dock') {
      autoProgress += dt * 0.90; // ~1.1s total flight time
      const scrollP = trigger ? trigger.progress : 0;
      if (scrollP > autoProgress) {
        autoProgress = scrollP;
      }
      if (autoProgress >= 0.96) {
        autoProgress = 1.0;
        targetProgress = 1.0;
      } else {
        targetProgress = autoProgress;
      }
    } else if (flightState === 'flying_to_home') {
      autoProgress -= dt * 1.10; // ~0.9s return flight time
      const scrollP = trigger ? trigger.progress : 0;
      if (scrollP < autoProgress) {
        autoProgress = scrollP;
      }
      if (autoProgress <= 0.02) {
        autoProgress = 0.0;
        targetProgress = 0.0;
      } else {
        targetProgress = autoProgress;
      }
    }

    let allSettled = true;
    const epsilon = 0.0003;

    // 1. Advance inertia physics for each individual letter
    LETTERS_CONFIG.forEach((cfg) => {
      const current = currentProgress[cfg.key];
      const diff = targetProgress - current;
      const rate = currentSeeds[cfg.key]?.lerpRate || cfg.baseLerpRate;

      if (Math.abs(diff) > epsilon) {
        currentProgress[cfg.key] += diff * rate;
        allSettled = false;
      } else {
        currentProgress[cfg.key] = targetProgress;
      }
    });

    // Ensure RAF cannot terminate while in autonomous flight
    if (flightState === 'flying_to_dock' && targetProgress < 1.0) {
      allSettled = false;
    }
    if (flightState === 'flying_to_home' && targetProgress > 0.0) {
      allSettled = false;
    }

    // 2. Check flock state: All at home, all docked, or currently in flight
    const allAtHome = LETTERS_CONFIG.every((cfg) => currentProgress[cfg.key] <= 0.015);
    const allDocked = LETTERS_CONFIG.every((cfg) => currentProgress[cfg.key] >= 0.948);
    const targetAtHome = targetProgress <= 0.015;
    const targetAtDock = targetProgress >= 0.95;

    if (allAtHome && targetAtHome) {
      // 1. HOME RESTING STATE
      flightState = 'home';
      if (isHomeState !== true) {
        isHomeState = true;
        isDockedState = false;
        aboutTag.classList.remove('is-docked');
        flightStage.style.opacity = '0';
        flightStage.style.display = 'none';

        // Re-solidify mother letters in Hero
        Object.values(sourceElements).forEach((el) => {
          el.classList.remove('is-extracted');
        });

        // Whenever letters return home, generate a brand new set of procedural seeds!
        if (hasLiftedOff) {
          currentSeeds = generateSeeds();
          hasLiftedOff = false;
        }
      }

      if (!allSettled) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafRunning = false;
        rafId = null;
      }
      return;
    }

    if (allDocked && targetAtDock) {
      // 2. DOCKED IN ABOUT STATE
      flightState = 'docked';
      if (isDockedState !== true) {
        isDockedState = true;
        isHomeState = false;
        aboutTag.classList.add('is-docked');
        flightStage.style.opacity = '0';
        flightStage.style.display = 'none';

        // Keep mother letters as faint silhouettes
        Object.values(sourceElements).forEach((el) => {
          el.classList.add('is-extracted');
        });
      }

      if (!allSettled) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafRunning = false;
        rafId = null;
      }
      return;
    }

    // 3. FLIGHT STAGE ACTIVE (Letters airborne with elastic trailing inertia)
    hasLiftedOff = true;

    if (isDockedState) {
      isDockedState = false;
      aboutTag.classList.remove('is-docked');
    }
    if (isHomeState !== false) {
      isHomeState = false;
      Object.values(sourceElements).forEach((el) => {
        el.classList.add('is-extracted');
      });
    }

    flightStage.style.opacity = '1';
    flightStage.style.display = 'block';

    const currentScrollX = window.scrollX || window.pageXOffset || 0;
    const currentScrollY = window.scrollY || window.pageYOffset || 0;
    const screenWidth = window.innerWidth || document.documentElement.clientWidth;
    // Scale flight arcs down gracefully on mobile screens so letters never fly offscreen
    const scaleFactor = Math.min(1.0, Math.max(0.42, screenWidth / 1100));

    LETTERS_CONFIG.forEach((cfg) => {
      const data = cachedMeasurements[cfg.key];
      const flightEl = flightElements[cfg.key];
      const seed = currentSeeds[cfg.key];

      if (!data || !flightEl || !seed) return;

      const p = Math.max(0, Math.min(1, currentProgress[cfg.key]));

      // Current viewport positions of origin letter and destination dock slot
      const srcVpX = data.srcDocX - currentScrollX;
      const srcVpY = data.srcDocY - currentScrollY;
      const dockVpX = data.dockDocX - currentScrollX;
      const dockVpY = data.dockDocY - currentScrollY;

      // Map progress to normalized flight range [0.015 -> 0.95]
      const normP = Math.max(0, Math.min(1, (p - 0.015) / (0.95 - 0.015)));

      // Smooth hermite base interpolation along document scroll vector
      const easedP = normP < 0.5
        ? 2 * normP * normP
        : 1 - Math.pow(-2 * normP + 2, 2) / 2;

      const baseVpX = srcVpX + (dockVpX - srcVpX) * easedP;
      const baseVpY = srcVpY + (dockVpY - srcVpY) * easedP;

      // Liftoff factor (0 to 1 over first 12% of scroll) ensures buttery smooth peel-off
      const liftoffFactor = Math.min(1.0, Math.max(0.0, (p - 0.015) / 0.12));

      // Magnetic attractor factor (1 down to 0 over final 18% of approach) dampens all chaos to 0 at dock
      let magneticFactor = 1.0;
      if (p > 0.77) {
        magneticFactor = Math.max(0.0, Math.pow((0.95 - p) / 0.18, 2));
      }

      // Combined chaos multiplier
      const chaosWeight = liftoffFactor * magneticFactor;

      // Compute this letter's unique procedural 3D vector
      const c = calculateChaos(p, scaleFactor, seed);

      // Apply chaos weight (full in mid-air, 0 at liftoff and landing)
      const finalX = baseVpX + c.x * chaosWeight;
      const finalY = baseVpY + c.y * chaosWeight;
      const finalZ = c.z * chaosWeight;
      const rotX = c.rotX * chaosWeight;
      const rotY = c.rotY * chaosWeight;
      const rotZ = c.rotZ * chaosWeight;

      // Font size interpolation from mother letter size to dock size
      const targetScale = data.dockFontSize / data.srcFontSize;
      const currentScale = (1.0 + (targetScale - 1.0) * easedP) * (1.0 + (c.scale - 1.0) * chaosWeight);

      // Glyphs: Show lower case during flight, morph to uppercase as they enter landing zone
      if (p > 0.72) {
        if (flightEl.textContent !== cfg.upper) {
          flightEl.textContent = cfg.upper;
        }
      } else {
        if (flightEl.textContent !== cfg.lower) {
          flightEl.textContent = cfg.lower;
        }
      }

      // Font family & weight inheritance from mother letter
      if (!flightEl.style.fontSize) {
        flightEl.style.fontSize = data.srcFontSize + 'px';
        flightEl.style.fontWeight = '800';
      }

      // Dynamic glowing aura in mid-flight (calibrated for enlarged bolder badge)
      const glowAmount = Math.round(chaosWeight * 18);
      const textGlow = glowAmount > 2
        ? `0 0 ${glowAmount}px ${cfg.glow}, 0 0 ${glowAmount * 2.2}px rgba(0, 216, 255, 0.45), 0 0 ${glowAmount * 0.5}px #ffffff`
        : 'none';

      // Apply hardware-accelerated 3D transform
      flightEl.style.transform = `translate3d(${finalX.toFixed(2)}px, ${finalY.toFixed(2)}px, ${finalZ.toFixed(1)}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale(${currentScale.toFixed(3)})`;
      flightEl.style.textShadow = textGlow;
      flightEl.style.opacity = '1';
    });

    if (!allSettled) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafRunning = false;
      rafId = null;
    }
  }

  function ensureRafRunning() {
    if (!rafRunning) {
      rafRunning = true;
      lastTime = performance.now();
      rafId = requestAnimationFrame(tick);
    }
  }

  // Create GSAP ScrollTrigger to track scroll progress
  const trigger = ScrollTrigger.create({
    trigger: '#home',
    start: 'top top',
    endTrigger: '#about',
    end: 'top 120px',
    scrub: false, // Inertia and auto-flight are handled via custom RAF physics loop
    onUpdate: (self) => {
      const scrollP = self.progress;
      const scrollDir = self.direction; // 1 = down, -1 = up
      const scrollY = window.scrollY || window.pageYOffset || 0;

      if (scrollDir > 0) {
        // Scrolling DOWN: trigger autonomous flight to destination dock
        if (scrollP >= 0.025 || scrollY >= 20) {
          if (flightState !== 'docked' && flightState !== 'flying_to_dock') {
            flightState = 'flying_to_dock';
            autoProgress = Math.max(autoProgress, scrollP);
            ensureRafRunning();
          } else if (flightState === 'flying_to_dock') {
            if (scrollP > autoProgress) {
              autoProgress = scrollP;
            }
            ensureRafRunning();
          }
        }
      } else if (scrollDir < 0) {
        // Scrolling UP: if returning back to Hero top, trigger flight back home
        if (scrollP <= 0.08 || scrollY <= 60) {
          if (flightState !== 'home' && flightState !== 'flying_to_home') {
            flightState = 'flying_to_home';
            autoProgress = Math.min(autoProgress, scrollP);
            ensureRafRunning();
          } else if (flightState === 'flying_to_home') {
            if (scrollP < autoProgress) {
              autoProgress = scrollP;
            }
            ensureRafRunning();
          }
        }
      }
    }
  });

  // Re-measure on resize, orientation change, or font loading
  function handleRefresh() {
    measureCoordinates();
    if (trigger) {
      if (flightState === 'docked') {
        autoProgress = 1.0;
        targetProgress = 1.0;
      } else if (flightState === 'home') {
        autoProgress = 0.0;
        targetProgress = 0.0;
      }
      ensureRafRunning();
    }
  }

  ScrollTrigger.addEventListener('refresh', handleRefresh);

  let resizeDebounce;
  window.addEventListener('resize', () => {
    clearTimeout(resizeDebounce);
    resizeDebounce = setTimeout(() => {
      measureCoordinates();
      if (flightState === 'docked') {
        autoProgress = 1.0;
        targetProgress = 1.0;
      } else if (flightState === 'home') {
        autoProgress = 0.0;
        targetProgress = 0.0;
      }
      ensureRafRunning();
    }, 120);
  });

  // Initial measurement and state synchronization
  requestAnimationFrame(() => {
    measureCoordinates();
    if (trigger) {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const scrollP = trigger.progress;
      if (scrollP >= 0.95 || scrollY > 400) {
        flightState = 'docked';
        autoProgress = 1.0;
        targetProgress = 1.0;
        LETTERS_CONFIG.forEach((cfg) => {
          currentProgress[cfg.key] = 1.0;
        });
        aboutTag.classList.add('is-docked');
        flightStage.style.display = 'none';
        Object.values(sourceElements).forEach((el) => {
          el.classList.add('is-extracted');
        });
      } else if (scrollP <= 0.015 && scrollY <= 25) {
        flightState = 'home';
        autoProgress = 0.0;
        targetProgress = 0.0;
        LETTERS_CONFIG.forEach((cfg) => {
          currentProgress[cfg.key] = 0.0;
        });
        aboutTag.classList.remove('is-docked');
        flightStage.style.display = 'none';
        Object.values(sourceElements).forEach((el) => {
          el.classList.remove('is-extracted');
        });
      } else {
        // If loaded in the middle: complete flight to dock cleanly so no letters stay stranded
        flightState = 'flying_to_dock';
        autoProgress = Math.max(0.1, scrollP);
        targetProgress = autoProgress;
        LETTERS_CONFIG.forEach((cfg) => {
          currentProgress[cfg.key] = autoProgress;
        });
        ensureRafRunning();
      }
    }
  });

  window.addEventListener('hero-name-typed', () => {
    document.querySelectorAll('.kinetic-source-char').forEach((el) => {
      const k = el.getAttribute('data-char-key');
      if (k) sourceElements[k] = el;
    });
    measureCoordinates();
  });
}
