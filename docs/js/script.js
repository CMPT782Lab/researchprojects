// ========================================
// MOBILE MENU TOGGLE
// ========================================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
  });
}

// Close menu when a link is clicked (only on mobile)
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Only close menu if hamburger is visible (mobile view)
    if (window.innerWidth <= 768) {
      navMenu.style.display = "none";
    }
  });
});

// ========================================
// SMOOTH SCROLL FUNCTION
// ========================================
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// ========================================
// PARALLAX EFFECT ON SCROLL - ENHANCED
// ========================================
window.addEventListener("scroll", () => {
  const parallaxElements = document.querySelectorAll(
    ".hero-background, .hero::before, .hero::after"
  );
  const scrollPosition = window.pageYOffset;

  parallaxElements.forEach((element) => {
    const speed = element.dataset.speed || 0.5;
    element.style.transform = `translateY(${scrollPosition * speed}px)`;
  });

  // Update navbar appearance on scroll
  const navbar = document.querySelector(".navbar");
  if (scrollPosition > 50) {
    navbar.style.boxShadow = "0 12px 40px rgba(99, 102, 241, 0.25)";
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.backdropFilter = "blur(25px)";
  } else {
    navbar.style.boxShadow = "0 8px 32px rgba(99, 102, 241, 0.15)";
    navbar.style.background = "rgba(255, 255, 255, 0.85)";
    navbar.style.backdropFilter = "blur(20px)";
  }
});

// ========================================
// CONTACT FORM HANDLING
// ========================================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector("textarea").value;

    // Simple validation
    if (name.trim() && email.trim() && message.trim()) {
      // Show success message
      const successMsg = document.createElement("div");
      successMsg.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: #10b981;
                color: white;
                padding: 15px 25px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
                z-index: 2000;
                animation: slideInRight 0.5s ease;
            `;
      successMsg.textContent = "✓ Message sent successfully!";
      document.body.appendChild(successMsg);

      // Remove message after 3 seconds
      setTimeout(() => {
        successMsg.remove();
      }, 3000);

      // Reset form
      contactForm.reset();
    } else {
      // Show error message
      const errorMsg = document.createElement("div");
      errorMsg.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: #ef4444;
                color: white;
                padding: 15px 25px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
                z-index: 2000;
                animation: slideInRight 0.5s ease;
            `;
      errorMsg.textContent = "✗ Please fill in all fields!";
      document.body.appendChild(errorMsg);

      // Remove message after 3 seconds
      setTimeout(() => {
        errorMsg.remove();
      }, 3000);
    }
  });
}

// ========================================
// SCROLL REVEAL ANIMATIONS - MULTI-DIRECTIONAL
// ========================================
const revealElements = document.querySelectorAll(
  ".feature-card, .team-card, .stat-card"
);
const directions = [
  "slideUpSmooth",
  "slideDownSmooth",
  "slideLeftSmooth",
  "slideRightSmooth",
  "slideUpRotate",
];

const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const randomDirection =
        directions[Math.floor(Math.random() * directions.length)];
      const delay = (index % 3) * 0.15;

      entry.target.style.animation = `${randomDirection} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s forwards`;
      entry.target.style.opacity = "0";

      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// ========================================
// ABOUT SECTION TEXT REVEAL
// ========================================
const aboutTexts = document.querySelectorAll(".about-text p");

const textObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = `slideLeftSmooth 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${
          index * 0.2
        }s forwards`;
        entry.target.style.opacity = "0";
        textObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  }
);

aboutTexts.forEach((text) => {
  textObserver.observe(text);
});

// ========================================
// ADD CUSTOM ANIMATIONS ON LOAD
// ========================================
window.addEventListener("load", () => {
  // Add animation to hero content
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.animation =
      "slideUpSmooth 1s cubic-bezier(0.34, 1.56, 0.64, 1)";
  }

  // Add staggered animation to nav links
  navLinks.forEach((link, index) => {
    link.style.opacity = "0";
    link.style.animation = `slideDownSmooth 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${
      index * 0.1
    }s forwards`;
  });

  // Animate hero title with smooth tilt
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    heroTitle.style.animation =
      "slideLeftSmooth 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), tilt 6s ease-in-out 0.8s infinite";
  }

  // Animate hero subtitle
  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (heroSubtitle) {
    heroSubtitle.style.animation =
      "slideRightSmooth 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s backwards";
  }
});

// ========================================
// PARALLAX EFFECT ON SCROLL
// ========================================
window.addEventListener("scroll", () => {
  const parallaxElements = document.querySelectorAll(".hero-background");
  parallaxElements.forEach((element) => {
    const scrollPosition = window.pageYOffset;
    element.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  });
});

// ========================================
// KEYBOARD NAVIGATION
// ========================================
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    navMenu.style.display = "none";
  }
});

// ========================================
// UTILITY FUNCTION: ADD ACTIVE CLASS STYLE
// ========================================
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .nav-link.active {
        color: #6366f1;
        font-weight: 600;
    }

    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ========================================
// PROJECT CARD INTERACTIONS & 3D TILT
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card, idx) => {
    // Ensure the displayed team-size matches the actual data in projectsData
    try {
      const teamSpan = card.querySelector(".team-size");
      if (
        teamSpan &&
        typeof projectsData !== "undefined" &&
        projectsData[idx]
      ) {
        const teamArr = projectsData[idx].team;
        const count = Array.isArray(teamArr) ? teamArr.length : 0;
        teamSpan.textContent = `👥 ${count} Member${count === 1 ? "" : "s"}`;
      }
    } catch (err) {
      console.warn("Could not update team-size for project card", idx, err);
    }

    // Ensure cursor and index
    card.dataset.index = idx;
    card.style.cursor = "pointer";

    // Attach click on entire card (fallback for buttons)
    card.addEventListener("click", (e) => {
      
    });

    // Attach button click if present
    const btn = card.querySelector(".view-btn");
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        
      });
    }

    // 3D tilt based on mouse position
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -8; // rotateX
      const ry = ((x - cx) / cx) * 8; // rotateY
      card.style.transform = `perspective(1000px) translateZ(6px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.01)`;
      card.style.boxShadow = "0 30px 60px rgba(15,23,42,0.16)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.boxShadow = "";
    });
  });
});

// ========================================
// VEDANT HEGDE STYLE - CURSOR PARTICLE TRAIL
// ========================================
const particles = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 2;
    this.speedX = (Math.random() - 0.5) * 4;
    this.speedY = Math.random() * -3 - 2;
    this.opacity = 1;
    this.color = `hsla(${Math.random() * 60 + 240}, 100%, 60%, ${
      this.opacity
    })`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += 0.1; // gravity
    this.opacity -= 0.02;
    this.size *= 0.98;
  }

  draw(ctx) {
    ctx.fillStyle = `hsla(${Math.random() * 60 + 240}, 100%, 60%, ${
      this.opacity
    })`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Create canvas for particle effect
const canvas = document.createElement("canvas");
canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 999;
`;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Update canvas on resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Create particles on mouse move
document.addEventListener("mousemove", (e) => {
  if (Math.random() > 0.7) {
    particles.push(new Particle(e.clientX, e.clientY));
  }
});

// Animation loop for particles
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw(ctx);

    if (particles[i].opacity <= 0) {
      particles.splice(i, 1);
    }
  }

  if (particles.length > 0) {
    requestAnimationFrame(animateParticles);
  }
}

document.addEventListener("mousemove", () => {
  if (particles.length > 0) {
    animateParticles();
  }
});

// ========================================
// TEAM CV DATA
// ========================================
const teamCVData = [
  {
    name: "John Developer",
    position: "Lead Developer",
    avatar: "👨‍💻",
    about:
      "Experienced full-stack developer with 8+ years of expertise in modern web technologies. Passionate about building scalable, efficient solutions and mentoring junior developers.",
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "Python",
      "Docker",
      "AWS",
      "MongoDB",
      "GraphQL",
      "TypeScript",
      "Microservices",
    ],
    experience: [
      {
        title: "Lead Developer",
        company: "Tech Corp",
        duration: "2021 - Present",
        description:
          "Leading frontend development team, architecting scalable React applications",
      },
      {
        title: "Senior Developer",
        company: "StartUp Inc",
        duration: "2018 - 2021",
        description:
          "Developed full-stack solutions, mentored 3 junior developers",
      },
      {
        title: "Junior Developer",
        company: "Web Solutions",
        duration: "2015 - 2018",
        description:
          "Built responsive web applications using modern frameworks",
      },
    ],
    education: [
      {
        title: "B.Tech in Computer Science",
        institution: "University of Technology",
        year: "2015",
        description: "GPA: 3.8/4.0",
      },
      {
        title: "AWS Certified Solutions Architect",
        institution: "Amazon Web Services",
        year: "2020",
        description: "Professional certification",
      },
    ],
  },
  {
    name: "Sarah Designer",
    position: "UI/UX Designer",
    avatar: "👩‍💼",
    about:
      "Creative UI/UX designer with 6+ years of experience crafting beautiful, user-centered digital experiences. Specializes in design systems and responsive design.",
    skills: [
      "Figma",
      "Adobe XD",
      "UI Design",
      "UX Research",
      "Prototyping",
      "Wireframing",
      "Design Systems",
      "CSS",
      "User Testing",
      "Accessibility",
    ],
    experience: [
      {
        title: "UI/UX Designer",
        company: "Design Studio",
        duration: "2020 - Present",
        description:
          "Creating design systems and leading design initiatives for web and mobile apps",
      },
      {
        title: "Product Designer",
        company: "Digital Agency",
        duration: "2017 - 2020",
        description:
          "Designed 15+ projects for clients across various industries",
      },
      {
        title: "Junior Designer",
        company: "Creative Hub",
        duration: "2015 - 2017",
        description: "Assisted in UI/UX design and developed design assets",
      },
    ],
    education: [
      {
        title: "B.Design in Interaction Design",
        institution: "Design Institute",
        year: "2015",
        description: "Focus on Digital Design",
      },
      {
        title: "Google UX Design Certificate",
        institution: "Google",
        year: "2021",
        description: "Professional certification",
      },
    ],
  },
  {
    name: "Mike Researcher",
    position: "Research Lead",
    avatar: "👨‍🔬",
    about:
      "Data-driven researcher with 7+ years of experience in market research and data analysis. Expert in identifying trends and generating actionable insights.",
    skills: [
      "Data Analysis",
      "Python",
      "R",
      "SQL",
      "Tableau",
      "Excel",
      "Statistics",
      "Machine Learning",
      "Research Methodology",
      "Report Writing",
    ],
    experience: [
      {
        title: "Research Lead",
        company: "Analytics Inc",
        duration: "2021 - Present",
        description:
          "Leading research initiatives, analyzing market trends and consumer behavior",
      },
      {
        title: "Data Analyst",
        company: "Research Firm",
        duration: "2018 - 2021",
        description: "Conducted 50+ research projects with actionable insights",
      },
      {
        title: "Junior Researcher",
        company: "Market Research Co",
        duration: "2015 - 2018",
        description: "Assisted in research projects and data collection",
      },
    ],
    education: [
      {
        title: "M.S. in Data Science",
        institution: "University of Analytics",
        year: "2015",
        description: "GPA: 3.9/4.0",
      },
      {
        title: "Advanced Statistics Certification",
        institution: "Online Academy",
        year: "2019",
        description: "Advanced statistical analysis",
      },
    ],
  },
  {
    name: "Emma Backend",
    position: "Backend Engineer",
    avatar: "👩‍💻",
    about:
      "Backend engineer specializing in scalable API design and database optimization. 5+ years experience building robust server-side solutions for high-traffic applications.",
    skills: [
      "Java",
      "Spring Boot",
      "Python",
      "PostgreSQL",
      "Redis",
      "Kubernetes",
      "Microservices",
      "REST APIs",
      "CI/CD",
      "Linux",
    ],
    experience: [
      {
        title: "Backend Engineer",
        company: "Cloud Services",
        duration: "2021 - Present",
        description:
          "Designing and implementing scalable backend systems handling millions of requests",
      },
      {
        title: "Junior Backend Developer",
        company: "Tech Startup",
        duration: "2018 - 2021",
        description:
          "Developed backend APIs and database optimization solutions",
      },
      {
        title: "Software Developer Intern",
        company: "IT Solutions",
        duration: "2017 - 2018",
        description: "Worked on backend features and bug fixes",
      },
    ],
    education: [
      {
        title: "B.Tech in Information Technology",
        institution: "Engineering College",
        year: "2017",
        description: "GPA: 3.7/4.0",
      },
      {
        title: "Kubernetes Certified Associate",
        institution: "Linux Foundation",
        year: "2022",
        description: "Container orchestration certification",
      },
    ],
  },
  {
    name: "David Manager",
    position: "Project Manager",
    avatar: "👨‍💼",
    about:
      "Strategic project manager with 9+ years of experience in agile and waterfall methodologies. Proven track record of delivering projects on time and within budget.",
    skills: [
      "Agile",
      "Scrum",
      "Kanban",
      "Jira",
      "Leadership",
      "Stakeholder Management",
      "Risk Management",
      "Budget Planning",
      "Team Building",
      "Communication",
    ],
    experience: [
      {
        title: "Project Manager",
        company: "Enterprise Solutions",
        duration: "2020 - Present",
        description:
          "Managing 3-5 concurrent projects, overseeing teams of 10+ members",
      },
      {
        title: "Scrum Master",
        company: "Software House",
        duration: "2017 - 2020",
        description:
          "Led agile transformations and managed 15+ successful project deliveries",
      },
      {
        title: "Team Lead",
        company: "Development Firm",
        duration: "2014 - 2017",
        description: "Coordinated team activities and tracked project progress",
      },
    ],
    education: [
      {
        title: "B.A. in Business Administration",
        institution: "Business University",
        year: "2014",
        description: "GPA: 3.8/4.0",
      },
      {
        title: "PMP Certification",
        institution: "Project Management Institute",
        year: "2019",
        description: "Professional Project Manager",
      },
      {
        title: "SAFe 5 Practitioner",
        institution: "Scaled Agile Inc",
        year: "2021",
        description: "Enterprise agile certification",
      },
    ],
  },
];

// ========================================
// CV MODAL FUNCTIONS
// ========================================
function openCV(index) {
  const modal = document.getElementById("cvModal");
  const data = teamCVData[index];

  // Set header info
  document.getElementById("cvName").textContent = data.name;
  document.getElementById("cvPosition").textContent = data.position;
  document.querySelector(".cv-avatar").textContent = data.avatar;

  // Set about
  document.getElementById("cvAbout").textContent = data.about;

  // Set skills
  const skillsContainer = document.getElementById("cvSkills");
  skillsContainer.innerHTML = "";
  data.skills.forEach((skill) => {
    const badge = document.createElement("span");
    badge.className = "skill-badge";
    badge.textContent = skill;
    skillsContainer.appendChild(badge);
  });

  // Set experience
  const experienceContainer = document.getElementById("cvExperience");
  experienceContainer.innerHTML = "";
  data.experience.forEach((exp) => {
    const item = document.createElement("div");
    item.className = "experience-item";
    item.innerHTML = `
            <h4>${exp.title}</h4>
            <div class="duration">${exp.company} • ${exp.duration}</div>
            <p>${exp.description}</p>
        `;
    experienceContainer.appendChild(item);
  });

  // Set education
  const educationContainer = document.getElementById("cvEducation");
  educationContainer.innerHTML = "";
  data.education.forEach((edu) => {
    const item = document.createElement("div");
    item.className = "education-item";
    item.innerHTML = `
            <h4>${edu.title}</h4>
            <div class="duration">${edu.institution} • ${edu.year}</div>
            <p>${edu.description}</p>
        `;
    educationContainer.appendChild(item);
  });

  // Show modal and lock scroll without jumping
  modal.classList.add("active");
  if (typeof lockBodyScroll === "function") lockBodyScroll();
}

function closeCV() {
  const modal = document.getElementById("cvModal");
  modal.classList.remove("active");
  if (typeof unlockBodyScroll === "function") unlockBodyScroll();
}

// Close modal on outside click
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("cvModal");
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeCV();
    }
  });
});

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCV();
  }
});

// ========================================
// INTERACTIVE GLOW BACKGROUND EFFECT
// ========================================
const glowCanvas = document.createElement("div");
glowCanvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    opacity: 0.3;
`;
document.body.appendChild(glowCanvas);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  glowCanvas.style.background = `radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(99, 102, 241, 0.1), transparent 80%)`;
});
