// Reads ?id=INDEX or ?group=groupN and renders the project details on a separate page
(function () {
  function qsParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function renderProject(p) {
    if (!p) return;
    document.getElementById("projectName").textContent = p.name || "";
    document.getElementById("projectDescription").textContent =
      p.description || "";
    document.getElementById("projectOverview").textContent = p.overview || "";
    const icon = document.getElementById("projectIcon");
    if (icon) icon.textContent = p.icon || "📁";

    const techs = document.getElementById("projectTechs");
    techs.innerHTML = "";
    (p.techs || []).forEach((t) => {
      const s = document.createElement("span");
      s.className = "tech-badge";
      s.textContent = t;
      techs.appendChild(s);
    });

    const features = document.getElementById("projectFeatures");
    features.innerHTML = "";
    (p.features || []).forEach((f) => {
      const li = document.createElement("li");
      li.textContent = f;
      features.appendChild(li);
    });

    const teamContainer = document.getElementById("projectTeam");
    teamContainer.innerHTML = "";
    (p.team || []).forEach((member) => {
      const memberCard = document.createElement("div");
      memberCard.className = "team-member-card";
      const displayName =
        member.name ||
        (member.cv
          ? member.cv
              .split("/")
              .pop()
              .replace(/\.[^.]+$/, "")
          : "Member");
      memberCard.innerHTML = `\n                <div class="member-avatar">${
        member.avatar || "👤"
      }</div>\n                <h4 class="member-name">${displayName}</h4>\n                ${
        member.cv
          ? '<p class="cv-hint">📄 <button class="open-cv-btn" data-cv="' +
            member.cv +
            '">Open CV</button></p>'
          : ""
      }\n            `;
      teamContainer.appendChild(memberCard);
    });

    // wire project PDF button
    const viewPdfBtn = document.getElementById("viewProjectPdfBtn");
    viewPdfBtn.addEventListener("click", () => {
      if (p.projectPdf) {
        // open pdf in a new tab for reliability
        window.open(p.projectPdf, "_blank");
      } else {
        alert("No project PDF available");
      }
    });

    // delegate CV buttons
    document.getElementById("projectTeam").addEventListener("click", (e) => {
      const btn = e.target.closest && e.target.closest(".open-cv-btn");
      if (!btn) return;
      const cv = btn.getAttribute("data-cv");
      if (cv) {
        window.open(cv, "_blank");
      }
    });
  }

  function findProject() {
    // try id param
    const id = qsParam("id");
    if (id !== null) {
      const idx = parseInt(id, 10);
      if (!isNaN(idx) && projectsData[idx]) return projectsData[idx];
    }
    // try group param like group3
    const group = qsParam("group");
    if (group) {
      const proj = projectsData.find(
        (p) =>
          p.group === group ||
          (p.projectPdf && p.projectPdf.indexOf(group) !== -1)
      );
      if (proj) return proj;
    }
    // fallback to first
    return projectsData[0];
  }

  document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // Wait for projectsData to be available (projects.js loaded before this file)
  if (typeof projectsData === "undefined") {
    console.error("projectsData not found");
  } else {
    const project = findProject();
    renderProject(project);
  }
})();
