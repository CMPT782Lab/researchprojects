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
// SCROLL REVEAL ANIMATIONS - SIMPLIFIED
// ========================================
const revealElements = document.querySelectorAll(
  ".feature-card, .team-card, .stat-card"
);

const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// ========================================
// ABOUT SECTION TEXT REVEAL (Simplified)
// ========================================
const aboutTexts = document.querySelectorAll(".about-text p");

const textObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
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
// LOAD - MAKE EVERYTHING VISIBLE
// ========================================
window.addEventListener("load", () => {
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.opacity = "1";
  }

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.style.opacity = "1";
  });

  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    heroTitle.style.opacity = "1";
  }

  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (heroSubtitle) {
    heroSubtitle.style.opacity = "1";
  }
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
// PROJECT CARD INTERACTIONS (NO 3D EFFECTS)
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

    // Attach click on entire card
    card.addEventListener("click", (e) => {
      // Your click handler here
    });

    // Attach button click if present
    const btn = card.querySelector(".view-btn");
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        // Your button click handler here
      });
    }
  });
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
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeCV();
      }
    });
  }
});

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCV();
  }
});