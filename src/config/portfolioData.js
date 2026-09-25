/**
 * Kalai - Portfolio Configuration & Engineering Data
 * Aligned with verified technical resume details.
 */

export const portfolioData = {
  personal: {
    name: "KALAI",
    fullName: "Kalaiyazhagan N",
    role: "Full Stack Developer | AI & Data Science · Java · Python · React",
    statusText: "Available for full-time engineering roles & contracts",
    location: "Kallakurichi / Chennai, Tamil Nadu, India",
    timezone: "Asia/Kolkata (IST)",
    phone: "+91 6379754684",
    email: "kalaiyazhagan.dev@gmail.com",
    github: "https://github.com/Kalaiyazhagan2005",
    linkedin: "https://www.linkedin.com/in/kalaiyazhagan",
    leetcode: "https://leetcode.com/u/Kalaiyazhagan/",
    portfolio: "https://kalaiyazhagan.in",
    resumeViewUrl: "/Kalai_resume.pdf",
    resumeDownloadUrl: "/Kalaiyazhagan_Resume.pdf",
    headline: "BUILDING HIGH-PERFORMANCE WEB APPLICATIONS & BACKEND SYSTEMS.",
    shortBio: "Artificial Intelligence & Data Science student and Full Stack Developer with hands-on expertise in Java, Python, C, REST APIs, React, and MySQL. 150+ DSA problems solved on LeetCode with experience building and shipping web apps, real-time systems, and RESTful services.",
    extendedBio: [
      "Artificial Intelligence and Data Science student and Full Stack Developer with hands-on expertise in Java, Python, C, REST APIs, React, and MySQL. Solved 150+ DSA problems on LeetCode across arrays, strings, trees, recursion, hashing, and dynamic programming.",
      "Built and shipped multiple full-stack projects spanning web apps, ML-driven prediction systems, and RESTful services. Strong foundation in OOP, DBMS, Operating Systems, and Computer Networks, with internship experience in full-stack development and CI/CD fundamentals."
    ]
  },

  education: {
    degree: "B. Tech, Artificial Intelligence and Data Science",
    institution: "Muthayammal College of Engineering, Rasipuram",
    period: "2023 – Present",
    gpa: "GPA: 7.5",
    highlight: "Artificial Intelligence, Data Structures & Algorithms, Machine Learning & Systems Architecture"
  },

  internship: {
    role: "Full Stack Web Development Intern (Training)",
    company: "Accent Techno Soft",
    year: "2025",
    bullets: [
      "Built full-stack web applications end-to-end using React, Spring Boot, and MySQL, translating requirements into working features.",
      "Designed and implemented RESTful APIs following MVC architecture; integrated frontend and backend via HTTP and JSON.",
      "Used Git for collaborative version control and gained hands-on exposure to CI/CD deployment fundamentals."
    ]
  },

  certifications: [
    { title: "Oracle Cloud Infrastructure Certified Foundations Associate", issuer: "Oracle", year: "2024" },
    { title: "Certification of Python (Basics)", issuer: "HackerRank", year: "2024" },
    { title: "Full-Stack Web Development Course", issuer: "Udemy", year: "2025" },
    { title: "Smart India Hackathon (Participation)", issuer: "SIH", year: "2025, 2026" }
  ],

  metrics: [
    {
      value: "Java, Python & C",
      label: "Core Languages",
      description: "OOP architecture, algorithm problem-solving, and 150+ LeetCode DSA solved"
    },
    {
      value: "React & REST APIs",
      label: "Frontend & Full Stack",
      description: "Modular React applications, state management, and seamless HTTP/JSON integration"
    },
    {
      value: "Spring Boot & FastAPI",
      label: "Backend & WebSockets",
      description: "MVC architecture, asynchronous endpoints, real-time WebSockets, and microservices"
    },
    {
      value: "MySQL & PostgreSQL",
      label: "Databases & DevOps",
      description: "Relational schema design, query optimization, Docker fundamentals, and CI/CD"
    }
  ],

  services: [
    {
      id: "01",
      code: "BACKEND_SYSTEMS",
      title: "BACKEND & RESTFUL APIS",
      tagline: "Designing scalable backend services with Spring Boot, Python & FastAPI.",
      description: "Focusing on MVC architecture, RESTful API design, asynchronous processing, real-time communication with WebSockets, and database persistence with MySQL and PostgreSQL.",
      deliverables: [
        "Spring Boot & Java REST API Architecture",
        "FastAPI & Flask Asynchronous Backend Services",
        "Real-Time WebSocket Communication & Event Channels",
        "JWT-Based Authentication & Role-Based Access Control"
      ],
      shapeType: "octahedron",
      accentColor: "#78dcff"
    },
    {
      id: "02",
      code: "INTERACTIVE_WEB",
      title: "FULL STACK WEB APPLICATIONS",
      tagline: "Building responsive, modern web interfaces with React, JavaScript & TypeScript.",
      description: "Creating responsive web applications end-to-end with React and modern CSS, translating business logic and requirements into high-performance user experiences.",
      deliverables: [
        "Modern Component Architectures with React.js & Vite",
        "Type-Safe Client Interfaces with TypeScript",
        "Smooth Motion Choreography & Transitions with GSAP",
        "Responsive, Accessible Layouts Optimized for Mobile & Desktop"
      ],
      shapeType: "torusKnot",
      accentColor: "#e2f952"
    },
    {
      id: "03",
      code: "DATA_ENGINEERING",
      title: "DATABASE & QUERY OPTIMIZATION",
      tagline: "Designing high-integrity relational schemas with MySQL & PostgreSQL.",
      description: "Focusing on data integrity, ACID compliance, query optimization, indexing, and persistent database storage to maintain consistent, scalable application state.",
      deliverables: [
        "Relational Schema Design & Migration Management (MySQL & PostgreSQL)",
        "Query Tuning, Indexing, and Performance Optimization",
        "Microservice Data Separation & Edge-Case Architecture",
        "JDBC & ORM Persistence Integrations"
      ],
      shapeType: "torus",
      accentColor: "#b482ff"
    },
    {
      id: "04",
      code: "INFRASTRUCTURE",
      title: "DEVOPS, GIT & CI/CD",
      tagline: "Production-ready workflows with Git, Linux, and Docker fundamentals.",
      description: "Deploying and managing reliable development workflows with Git collaborative version control, Linux environments, and CI/CD deployment fundamentals.",
      deliverables: [
        "Collaborative Git & GitHub Version Control",
        "CI/CD Pipeline Fundamentals & Automated Deployment",
        "Containerization Basics with Docker",
        "Automated Testing (Selenium) & Unit Testing"
      ],
      shapeType: "icosahedron",
      accentColor: "#ff8c3c"
    }
  ],

  projects: [
    {
      id: "storybabe",
      number: "01",
      title: "STORY BABE - SOCIAL PLATFORM",
      category: "FULL-STACK SOCIAL MEDIA PLATFORM",
      year: "2024",
      summary: "Full-stack web application for users to post personal experiences and stories, socialize, and dynamically generate custom post images matching their narratives.",
      image: "/projects/storybabe.png",
      tags: ["React JS", "TypeScript", "Tailwind CSS", "PostgreSQL", "REST API"],
      metrics: "Microservice Architecture & Image AI",
      architecture: [
        "Developed a full-stack web application for users to post their personal experiences and socialize with other people.",
        "Designed and implemented microservice architecture for edge cases, integrating PostgreSQL for reliable, scalable data storage.",
        "Implemented image generation model to let users generate post images according to their personal essays and stories.",
        "Secured user data by implementing robust Authentication and added customer care support for users."
      ],
      liveUrl: "https://storybabe.kalaiyazhagan.in",
      githubUrl: "https://github.com/Kalaiyazhagan2005/StoryBabe"
    },
    {
      id: "bucket-chat",
      number: "02",
      title: "BUCKET CHAT ENGINE",
      category: "REAL-TIME COMMUNICATION SYSTEM",
      year: "2024",
      summary: "High-performance real-time communication platform built with Python, Flask, FastAPI, and WebSockets, enabling instant chat rooms, whispers, and host moderation.",
      image: "/projects/bucket-chat.png",
      tags: ["Python", "FastAPI", "Flask", "WebSockets", "JWT", "JavaScript"],
      metrics: "Real-Time WebSocket & Host Controls",
      architecture: [
        "Built a high performance, real-time communication platform that enables users to create and join chat rooms.",
        "Implemented JWT-based authentication and authorization with role-based host controls for muting, kicking, banning users, locking rooms and enabling broadcast-only mode.",
        "Built asynchronous RESTful APIs and WebSocket communication using FastAPI for real-time messaging, direct whispers, typing indicators, reactions, member updates, and chat history exports.",
        "Built a responsive three-column interface with live member tracking, capacity monitor and host moderation."
      ],
      liveUrl: "https://bucketchat.kalaiyazhagan.in",
      githubUrl: "https://github.com/Kalaiyazhagan2005/bucket-chat"
    },
    {
      id: "chess-engine",
      number: "03",
      title: "SOVEREIGN CHESS ENGINE",
      category: "ALGORITHMIC C++20 GAME ENGINE",
      year: "2024",
      summary: "High-performance chess engine utilizing C++20 bitboards, Zobrist hashing, and an advanced minimax search tree connected via UCI to a Node.js web server and browser UI.",
      image: "/projects/chess-engine.png",
      tags: ["C++20", "Node.js", "JavaScript", "HTML5 Canvas", "Algorithms"],
      metrics: "Alpha-Beta Pruning & Bitboards",
      architecture: [
        "Developed a high-performance chess engine using C++20 bitboards, optimized move generation, Zobrist hashing, and complete Chess rule validation.",
        "Implemented an advanced search system with alpha-beta pruning, iterative deepening, quiescence search, transposition tables, Null-move pruning, and late-move reductions.",
        "Built a Node.js web server with Universal Chess Interface (UCI) to connect the native C++ engine with a browser-based chess app.",
        "Designed responsive chess interface supporting player vs AI, Pass & Play, AI vs Player, FEN/PGN management, move history, and live engine evaluation."
      ],
      liveUrl: "#",
      githubUrl: "https://github.com/Kalaiyazhagan2005/chess-engine"
    },
    {
      id: "edutur",
      number: "04",
      title: "EDUTUR LMS PLATFORM",
      category: "FULL-STACK EDUCATION PLATFORM",
      year: "2024",
      summary: "Full-stack learning management platform handling student lifecycles, interactive course workflows, role-based authentication, and academic assessment.",
      image: "/projects/edutur.png",
      tags: ["React", "Spring Boot", "MySQL", "REST API", "Java"],
      metrics: "Enterprise Full-Stack Architecture",
      architecture: [
        "Full-stack architecture featuring a responsive React client and robust backend services following MVC architecture.",
        "Role-based access control for students, faculty, and administrators with secure token authentication.",
        "MySQL relational data modeling and query optimization for persistent course records, student progress, and evaluation."
      ],
      liveUrl: "https://edutur.in",
      githubUrl: "https://github.com/Kalaiyazhagan2005"
    }
  ],

  techStack: [
    { category: "Programming Languages", items: ["Java", "Python", "C", "JavaScript (ESNext)", "TypeScript"] },
    { category: "Web Technologies", items: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Three.js", "GSAP"] },
    { category: "Backend & APIs", items: ["Spring Boot", "REST API Design", "FastAPI", "Flask", "MVC Architecture", "JDBC", "Node.js"] },
    { category: "Databases & Storage", items: ["MySQL", "Query Optimization", "PostgreSQL", "Redis"] },
    { category: "Core CS & Testing", items: ["Data Structures & Algorithms (150+ LeetCode)", "OOP", "DBMS", "Operating Systems", "Computer Networks", "Selenium", "Unit Testing"] },
    { category: "Tools & DevOps", items: ["Linux", "Git", "GitHub", "VS Code", "Figma", "Docker (fundamentals)", "CI/CD"] }
  ],

  tickerItems: [
    "JAVA", "PYTHON", "REACT.JS", "SPRING BOOT", "MYSQL", "REST APIS", "FASTAPI",
    "POSTGRESQL", "C++20", "DOCKER", "LINUX", "GIT", "SELENIUM", "LEETCODE 150+"
  ]
};
