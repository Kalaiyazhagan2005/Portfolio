/**
 * Kalai - Portfolio Configuration & Engineering Data
 * Strictly authentic technical data, devoid of generic AI boilerplate.
 */

export const portfolioData = {
  personal: {
    name: "KALAI",
    fullName: "Kalaiyazhagan N",
    role: "Full-Stack Developer & Systems Engineer",
    statusText: "Available for select contracts & full-time engineering roles",
    location: "Chennai, India",
    timezone: "Asia/Kolkata (IST)",
    email: "kalaiyazhagan.dev@gmail.com",
    github: "https://github.com/Kalaiyazhagan2005",
    linkedin: "https://www.linkedin.com/in/kalaiyazhagan",
    telegram: "https://t.me",
    resumeUrl: "#contact",
    headline: "BUILDING RELIABLE SOFTWARE WITH PRECISION, PERFORMANCE, AND PURPOSE.",
    shortBio: "I approach engineering as a systems problem: understand how the pieces interact, remove unnecessary complexity, and build software that remains reliable as it grows.",
    extendedBio: [
      "From backend services and databases to real-time applications and interactive interfaces, I focus on building systems that are predictable, efficient, and maintainable.",
      "I care about what happens beneath the interface just as much as what the user sees — from data consistency and API design to performance, deployment, and the details that make an application feel fast."
    ]
  },

  metrics: [
    {
      value: "Node.js & Python",
      label: "Backend Services",
      description: "Asynchronous processing, real-time WebSockets, and structured service architecture"
    },
    {
      value: "React & Three.js",
      label: "Interactive Web",
      description: "Responsive web interfaces and hardware-accelerated WebGL experiences"
    },
    {
      value: "PostgreSQL & Redis",
      label: "Data Engineering",
      description: "Relational data modeling, caching patterns, and high-integrity state"
    },
    {
      value: "Docker & Linux",
      label: "Production Systems",
      description: "Containerized environments, NGINX reverse proxy, and PM2 process management"
    }
  ],

  services: [
    {
      id: "01",
      code: "BACKEND_SYSTEMS",
      title: "DISTRIBUTED BACKEND SYSTEMS",
      tagline: "Designing reliable backend services with Node.js and Python.",
      description: "Focusing on structured service architecture, asynchronous processing, real-time communication with WebSockets, and predictable endpoints that remain maintainable as systems grow.",
      deliverables: [
        "Node.js (Express) & Python (FastAPI) Backend Services",
        "Real-Time WebSocket Communication & Event Channels",
        "Asynchronous Task Processing & Queue Pipelines",
        "Scalable Architecture & Structured Service Design"
      ],
      shapeType: "octahedron",
      accentColor: "#78dcff"
    },
    {
      id: "02",
      code: "INTERACTIVE_WEB",
      title: "INTERACTIVE WEB EXPERIENCES",
      tagline: "Building responsive interfaces with React, Three.js, WebGL, and GSAP.",
      description: "Creating responsive web applications and interactive 3D visual experiences, keeping usability, rendering performance, and clean component patterns at the center.",
      deliverables: [
        "Modern Component Architectures with React & Vite",
        "Interactive 3D Visualizations & WebGL Canvases (Three.js)",
        "Smooth Motion Choreography & Transitions with GSAP",
        "Responsive, Accessible Layouts Optimized for Mobile & Desktop"
      ],
      shapeType: "torusKnot",
      accentColor: "#e2f952"
    },
    {
      id: "03",
      code: "DATA_ENGINEERING",
      title: "DATA & DATABASE ENGINEERING",
      tagline: "Designing structured data systems with PostgreSQL, MongoDB, and Redis.",
      description: "Focusing on data integrity, query optimization, schema indexing, caching patterns, and efficient access paths to maintain consistent application state.",
      deliverables: [
        "Relational Schema Design & Migration Management (PostgreSQL)",
        "In-Memory Caching & Session Storage (Redis)",
        "Document Storage & Scalable Collections (MongoDB)",
        "Query Tuning, Indexing, and Connection Pooling"
      ],
      shapeType: "torus",
      accentColor: "#b482ff"
    },
    {
      id: "04",
      code: "INFRASTRUCTURE",
      title: "DEPLOYMENT & INFRASTRUCTURE",
      tagline: "Turning applications into production-ready systems.",
      description: "Deploying and managing reliable environments using Docker, Linux, NGINX, and PM2, with an emphasis on practical deployment workflows, process supervision, and maintainability.",
      deliverables: [
        "Containerization with Docker & Multi-Service Compose",
        "Linux VPS Administration & Server Hardening",
        "Reverse Proxy Routing & SSL Termination with NGINX",
        "Process Supervision & Restart Policies (PM2, systemd)"
      ],
      shapeType: "icosahedron",
      accentColor: "#ff8c3c"
    }
  ],

  projects: [
    {
      id: "edutur",
      number: "01",
      title: "EDUTUR LMS PLATFORM",
      category: "FULL-STACK EDUCATION PLATFORM",
      year: "2024",
      summary: "Comprehensive education management platform designed for student lifecycle handling, interactive course workflows, and academic assessment.",
      image: "/projects/edutur.png",
      tags: ["React", "Node.js", "Express", "PostgreSQL", "Redis", "PM2"],
      metrics: "Full-Stack Learning Architecture",
      architecture: [
        "Full-stack architecture featuring a responsive React client and modular Express.js backend services.",
        "Role-based access control for students, faculty, and administrators with secure token authentication.",
        "PostgreSQL relational data modeling for persistent course records, student progress, and evaluation."
      ],
      liveUrl: "https://edutur.in",
      githubUrl: "https://github.com/Kalaiyazhagan2005"
    },
    {
      id: "bucket-chat",
      number: "02",
      title: "BUCKET CHAT ENGINE",
      category: "REAL-TIME WEBSOCKET SERVER",
      year: "2024",
      summary: "Real-time communication server built in Python, enabling instant WebSocket message broadcasting with room-based partitioning and connection handling.",
      image: "/projects/bucket-chat.png",
      tags: ["Python", "FastAPI", "WebSockets", "Redis", "AsyncIO"],
      metrics: "Real-Time WebSocket Server",
      architecture: [
        "Asynchronous WebSocket pipeline leveraging Python asyncio for non-blocking I/O.",
        "Room-based message bucketing for partitioned channel subscriptions and isolated state.",
        "Fast, lightweight payload serialization and clean connection lifecycle management."
      ],
      liveUrl: "#",
      githubUrl: "https://github.com/Kalaiyazhagan2005/bucket-chat"
    },
    {
      id: "storybabe",
      number: "03",
      title: "STORYBABE SOCIAL PLATFORM",
      category: "COMMUNITY WEB PLATFORM",
      year: "2024",
      summary: "Community experience-sharing web platform in TypeScript, connecting users through personal narratives, shared thoughts, and open discussions.",
      image: "/projects/storybabe.png",
      tags: ["TypeScript", "React", "Node.js", "MongoDB", "Express"],
      metrics: "Social Community Platform",
      architecture: [
        "TypeScript-driven architecture ensuring type safety across client interfaces and backend endpoints.",
        "Responsive UI for reading, composing, and categorizing story threads.",
        "Document-based data storage for flexible narrative content and user interactions."
      ],
      liveUrl: "#",
      githubUrl: "https://github.com/Kalaiyazhagan2005/StoryBabe"
    },
    {
      id: "chess-engine",
      number: "04",
      title: "CHESS ENGINE",
      category: "ALGORITHMIC SEARCH & GAME ENGINE",
      year: "2023",
      summary: "Algorithmic chess engine and interactive board built with JavaScript, implementing 64-bit bitboard state, minimax search, and positional evaluation.",
      image: "/projects/chess-engine.png",
      tags: ["JavaScript", "HTML5 Canvas", "Algorithms", "WebSockets"],
      metrics: "Algorithmic Minimax Search",
      architecture: [
        "64-bit integer bitboard representation for efficient move generation and board evaluation.",
        "Minimax search algorithm with alpha-beta pruning for tactical evaluation.",
        "Interactive browser chessboard interface with move validation and real-time visual feedback."
      ],
      liveUrl: "#",
      githubUrl: "https://github.com/Kalaiyazhagan2005/chess-engine"
    },
    {
      id: "retrieval-game",
      number: "05",
      title: "RETRIEVAL GAME",
      category: "INTERACTIVE BROWSER GAME",
      year: "2023",
      summary: "Interactive browser-based game developed with modern JavaScript, focusing on smooth frame rendering, event-driven player controls, and score tracking.",
      image: "/projects/retrieval-game.png",
      tags: ["JavaScript", "HTML5 Canvas", "CSS3", "DOM Events"],
      metrics: "Interactive Gameplay Engine",
      architecture: [
        "Event-driven game loop handling inputs, collision detection, and score progression.",
        "Hardware-accelerated HTML5 Canvas rendering for smooth visual animations.",
        "Lightweight modular JavaScript structure without external heavy dependencies."
      ],
      liveUrl: "#",
      githubUrl: "https://github.com/Kalaiyazhagan2005/retrival-game"
    }
  ],

  techStack: [
    { category: "Languages", items: ["TypeScript", "JavaScript (ESNext)", "Python", "SQL", "HTML5/CSS3"] },
    { category: "Frontend", items: ["React", "Three.js (WebGL)", "GSAP", "Vite", "Tailwind CSS", "Vanilla JS"] },
    { category: "Backend", items: ["Node.js", "Express", "FastAPI", "Python AsyncIO", "RESTful APIs", "WebSockets"] },
    { category: "Databases & Cache", items: ["PostgreSQL", "Redis Pub/Sub", "MongoDB", "Connection Pooling"] },
    { category: "DevOps & Cloud", items: ["Docker", "Docker Compose", "Linux VPS", "NGINX", "PM2", "Git / GitHub Actions"] }
  ],

  tickerItems: [
    "REACT", "NODE.JS", "TYPESCRIPT", "THREE.JS (WEBGL)", "PYTHON", "POSTGRESQL",
    "REDIS", "DOCKER", "FASTAPI", "GSAP MOTION", "NGINX", "WEBSOCKETS", "PM2"
  ]
};
