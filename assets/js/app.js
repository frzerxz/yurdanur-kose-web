// Yurdanur Köse Mimarlık & İnşaat - Web Portalı Mantığı
document.addEventListener("DOMContentLoaded", () => {
  initCounters();
  initProjectsFilter();
  initProposalWizard();
  initMobileMenu();
  initHeaderScroll();
});

// 1. Sayac (Counter) Animasyonu
function initCounters() {
  const counterElements = document.querySelectorAll(".stat-counter");
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterElements.forEach((el) => {
          const target = parseInt(el.getAttribute("data-target"), 10);
          const prefix = el.getAttribute("data-prefix") || "";
          const suffix = el.getAttribute("data-suffix") || "";
          const duration = 2000;
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease out quad
            const currentVal = Math.round(target * (1 - (1 - progress) * (1 - progress)));

            // Binlik ayırıcı
            const formatted = currentVal.toLocaleString("tr-TR");
            el.textContent = `${prefix}${formatted}${suffix}`;

            if (frame === totalFrames) {
              clearInterval(counter);
              el.textContent = `${prefix}${target.toLocaleString("tr-TR")}${suffix}`;
            }
          }, frameDuration);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById("stats-band");
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// 2. Proje Filtreleme & Kart Render
let currentFilter = "all";

function initProjectsFilter() {
  const container = document.getElementById("projects-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  renderProjects("all");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active", "bg-amber-600", "text-white", "border-amber-500"));
      filterBtns.forEach((b) => b.classList.add("bg-slate-800/80", "text-slate-300", "border-slate-700"));

      btn.classList.add("active", "bg-amber-600", "text-white", "border-amber-500");
      btn.classList.remove("bg-slate-800/80", "text-slate-300", "border-slate-700");

      const filter = btn.getAttribute("data-filter");
      renderProjects(filter);
    });
  });
}

function renderProjects(filter) {
  const container = document.getElementById("projects-grid");
  if (!container || typeof PROJECTS_DATA === "undefined") return;

  const filtered = PROJECTS_DATA.filter((item) => {
    if (filter === "all") return true;
    if (filter === "devam-ediyor") return item.status === "devam-ediyor";
    if (filter === "endustriyel") return item.category === "endustriyel" || item.category === "lojistik";
    if (filter === "akaryakit") return item.category === "akaryakit";
    return true;
  });

  container.innerHTML = filtered.map((proj) => `
    <div class="project-card rounded-lg overflow-hidden flex flex-col group cursor-pointer" onclick="openProjectModal('${proj.id}')">
      <!-- Görsel Alanı (16:9) -->
      <div class="relative w-full aspect-video overflow-hidden bg-slate-900">
        <img src="${proj.coverImage}" alt="${proj.title}" class="img-zoom w-full h-full object-cover">
        
        <!-- Blueprint Overlay -->
        <div class="blueprint-overlay absolute inset-0 flex flex-col justify-end p-5">
          <div class="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider mb-1">
            <span class="inline-block w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            Teknik Detayları Gör
          </div>
          <p class="text-xs text-slate-300 line-clamp-2">${proj.scopeSummary}</p>
        </div>

        <!-- Category Badge -->
        <div class="absolute top-3 left-3 flex gap-2">
          <span class="px-2.5 py-1 text-xs font-mono font-medium rounded bg-black/75 border border-sky-500/40 text-sky-300 backdrop-blur-sm">
            ${proj.categoryLabel}
          </span>
          ${proj.status === "devam-ediyor" ? `
            <span class="px-2.5 py-1 text-xs font-mono font-medium rounded bg-amber-500/20 border border-amber-500/50 text-amber-300 backdrop-blur-sm">
              Şantiyede
            </span>
          ` : `
            <span class="px-2.5 py-1 text-xs font-mono font-medium rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 backdrop-blur-sm">
              Teslim Edildi
            </span>
          `}
        </div>

        <!-- Technical Area Badge -->
        <div class="absolute top-3 right-3">
          <span class="px-2.5 py-1 text-xs font-mono font-bold rounded bg-slate-950/90 text-white border border-slate-700">
            ${proj.areaSquareMeters.toLocaleString("tr-TR")} m²
          </span>
        </div>
      </div>

      <!-- Kart İçeriği -->
      <div class="p-5 flex-1 flex flex-col justify-between bg-[#24282D]">
        <div>
          <div class="text-xs font-mono text-slate-400 flex items-center gap-2 mb-2">
            <i class="fa-solid fa-location-dot text-amber-500"></i>
            <span>${proj.location}</span>
          </div>
          <h3 class="text-lg font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-1 mb-2 font-heading">
            ${proj.title}
          </h3>
          <p class="text-sm text-slate-400 line-clamp-2 mb-4">
            ${proj.scopeSummary}
          </p>
        </div>

        <!-- Teknik Rozetler Bandı -->
        <div class="pt-3 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-300">
          <span class="flex items-center gap-1.5">
            <i class="fa-solid fa-cubes text-sky-400"></i>
            ${proj.structureType}
          </span>
          <span class="flex items-center gap-1.5 text-amber-400">
            <i class="fa-regular fa-clock"></i>
            ${proj.deliveryTimeMonths} Ay Teslim
          </span>
        </div>
      </div>
    </div>
  `).join("");
}

// 3. Proje Detay Modalı / Lightbox
window.openProjectModal = function(projectId) {
  const project = PROJECTS_DATA.find((p) => p.id === projectId);
  if (!project) return;

  const modalBackdrop = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-project-details");

  const specs = project.technicalSpecs;

  modalContent.innerHTML = `
    <!-- Header -->
    <div class="relative bg-slate-950 aspect-video md:aspect-[21/9] w-full overflow-hidden">
      <img src="${project.coverImage}" alt="${project.title}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-[#1A1D20] via-black/40 to-black/60 flex flex-col justify-between p-6">
        <div class="flex items-center justify-between">
          <span class="px-3 py-1 text-xs font-mono rounded bg-sky-600/90 text-white font-bold tracking-wider uppercase">
            ${project.categoryLabel} • ${project.statusLabel}
          </span>
          <button onclick="closeProjectModal()" class="w-10 h-10 rounded-full bg-black/60 hover:bg-amber-600 text-white flex items-center justify-center transition-colors">
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>
        <div>
          <p class="text-xs font-mono text-amber-400 mb-1 flex items-center gap-2">
            <i class="fa-solid fa-location-dot"></i> ${project.location}
          </p>
          <h2 class="text-xl md:text-3xl font-bold text-white font-heading">${project.title}</h2>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="p-6 md:p-8 space-y-6">
      <!-- Teknik Künye Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/90 p-4 rounded-lg border border-slate-700/80 font-mono text-center">
        <div class="p-2 border-r border-slate-800 last:border-none">
          <div class="text-xs text-slate-400 mb-1">Toplam Alan</div>
          <div class="text-base sm:text-lg font-bold text-sky-400">${project.areaSquareMeters.toLocaleString("tr-TR")} m²</div>
        </div>
        <div class="p-2 border-r border-slate-800 last:border-none">
          <div class="text-xs text-slate-400 mb-1">Taşıyıcı Sistem</div>
          <div class="text-base sm:text-lg font-bold text-white">${project.structureType}</div>
        </div>
        <div class="p-2 border-r border-slate-800 last:border-none">
          <div class="text-xs text-slate-400 mb-1">Teslim Süresi</div>
          <div class="text-base sm:text-lg font-bold text-amber-400">${project.deliveryTimeMonths} Ay</div>
        </div>
        <div class="p-2">
          <div class="text-xs text-slate-400 mb-1">İşveren / Marka</div>
          <div class="text-base sm:text-lg font-bold text-white truncate">${project.clientOrBrand || "Özel Sanayici"}</div>
        </div>
      </div>

      <!-- Kapsam & Mühendislik Çözümleri -->
      <div>
        <h4 class="text-sm font-mono text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-2">
          <i class="fa-solid fa-compass-drafting"></i> Mühendislik Kapsamı & Uygulama Detayları
        </h4>
        <p class="text-slate-300 leading-relaxed text-sm md:text-base">
          ${project.scopeSummary}
        </p>
      </div>

      <!-- Detaylı Teknik Şartname Değerleri -->
      <div class="bg-[#24282D] p-5 rounded-lg border border-slate-700">
        <h4 class="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">Statik & Altyapı Parametreleri</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
          ${specs.craneCapacityTon ? `
            <div class="flex items-center gap-3 text-slate-200">
              <i class="fa-solid fa-weight-hanging text-amber-500 text-sm"></i>
              <div>
                <span class="text-slate-400 block">Vinç Kapasitesi:</span>
                <strong>${specs.craneCapacityTon} Ton Köprülü Vinç</strong>
              </div>
            </div>
          ` : ""}
          ${specs.floorLoadCapacityKgM2 ? `
            <div class="flex items-center gap-3 text-slate-200">
              <i class="fa-solid fa-layer-group text-sky-400 text-sm"></i>
              <div>
                <span class="text-slate-400 block">Zemin Taşıma Gücü:</span>
                <strong>${specs.floorLoadCapacityKgM2.toLocaleString("tr-TR")} kg/m²</strong>
              </div>
            </div>
          ` : ""}
          ${specs.substationKva ? `
            <div class="flex items-center gap-3 text-slate-200">
              <i class="fa-solid fa-bolt text-yellow-400 text-sm"></i>
              <div>
                <span class="text-slate-400 block">Trafo & Enerji Gücü:</span>
                <strong>${specs.substationKva} kVA</strong>
              </div>
            </div>
          ` : ""}
          ${specs.canopyHeightMeters ? `
            <div class="flex items-center gap-3 text-slate-200">
              <i class="fa-solid fa-gas-pump text-amber-400 text-sm"></i>
              <div>
                <span class="text-slate-400 block">Kanopi Yüksekliği:</span>
                <strong>${specs.canopyHeightMeters} Metre (EPDK Uyumlu)</strong>
              </div>
            </div>
          ` : ""}
        </div>
      </div>

      <!-- Aksiyon Butonları -->
      <div class="flex flex-col sm:flex-row gap-3 pt-2">
        <a href="#teklif-formu" onclick="closeProjectModal(); selectProjectType('${project.category === 'akaryakit' ? 'Akaryakıt İstasyonu' : 'Fabrika & Depo'}');" class="btn-amber flex-1 py-3 px-5 rounded text-center text-sm font-semibold flex items-center justify-center gap-2">
          <i class="fa-solid fa-calculator"></i> Benzer Proje İçin Keşif & Teklif İste
        </a>
        <button onclick="closeProjectModal()" class="py-3 px-6 rounded text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 text-sm font-mono">
          Kapat
        </button>
      </div>
    </div>
  `;

  modalBackdrop.classList.add("open");
  document.body.style.overflow = "hidden";
};

window.closeProjectModal = function() {
  const modalBackdrop = document.getElementById("project-modal");
  if (modalBackdrop) {
    modalBackdrop.classList.remove("open");
    document.body.style.overflow = "";
  }
};

// 4. 3-Adımlı Kompakt Teklif Sihirbazı
let currentStep = 1;
const proposalData = {
  projectType: "Fabrika & Depo",
  areaM2: "5000",
  landStatus: "Arsa Tahsis Edildi",
  location: "Balıkesir OSB",
  fullName: "",
  companyName: "",
  phone: "",
  email: "",
  notes: ""
};

function initProposalWizard() {
  const nextBtn = document.getElementById("wizard-next-btn");
  const prevBtn = document.getElementById("wizard-prev-btn");
  const submitBtn = document.getElementById("wizard-submit-btn");

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (validateStep(currentStep)) {
        currentStep++;
        updateWizardUI();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentStep--;
      updateWizardUI();
    });
  }

  // Proje Tipi Butonları
  const typeBtns = document.querySelectorAll(".type-select-btn");
  typeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      typeBtns.forEach((b) => b.classList.remove("active", "border-amber-500", "bg-amber-600/20", "text-amber-400"));
      typeBtns.forEach((b) => b.classList.add("border-slate-700", "bg-slate-800/60", "text-slate-300"));

      btn.classList.add("active", "border-amber-500", "bg-amber-600/20", "text-amber-400");
      btn.classList.remove("border-slate-700", "bg-slate-800/60", "text-slate-300");

      proposalData.projectType = btn.getAttribute("data-type");
    });
  });

  // Form Submit
  const form = document.getElementById("proposal-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleProposalSubmit();
    });
  }
}

function selectProjectType(typeName) {
  const btn = document.querySelector(`.type-select-btn[data-type="${typeName}"]`);
  if (btn) {
    btn.click();
  }
}

function validateStep(step) {
  if (step === 1) {
    return true; // default seçili
  }
  if (step === 2) {
    const areaInput = document.getElementById("form-area");
    const locInput = document.getElementById("form-location");
    if (areaInput && !areaInput.value) {
      alert("Lütfen tahmini kapalı alan büyüklüğünü belirtiniz.");
      areaInput.focus();
      return false;
    }
    proposalData.areaM2 = areaInput ? areaInput.value : "Belirtilmedi";
    const landStatusInput = document.getElementById("form-land-status");
    proposalData.landStatus = landStatusInput ? landStatusInput.value : "Belirtilmedi";
    proposalData.location = locInput && locInput.value ? locInput.value : "Balıkesir / OSB";
    return true;
  }
  return true;
}

function updateWizardUI() {
  // Step indicator
  const stepItems = document.querySelectorAll(".step-item");
  stepItems.forEach((item, index) => {
    const stepNum = index + 1;
    item.classList.remove("active", "completed");
    if (stepNum < currentStep) {
      item.classList.add("completed");
    } else if (stepNum === currentStep) {
      item.classList.add("active");
    }
  });

  // Step containers
  const stepPanels = document.querySelectorAll(".wizard-panel");
  stepPanels.forEach((panel) => {
    const pStep = parseInt(panel.getAttribute("data-step"), 10);
    if (pStep === currentStep) {
      panel.classList.remove("hidden");
    } else {
      panel.classList.add("hidden");
    }
  });

  // Button visibility
  const prevBtn = document.getElementById("wizard-prev-btn");
  const nextBtn = document.getElementById("wizard-next-btn");
  const submitBtn = document.getElementById("wizard-submit-btn");

  if (currentStep === 1) {
    if (prevBtn) prevBtn.classList.add("hidden");
    if (nextBtn) nextBtn.classList.remove("hidden");
    if (submitBtn) submitBtn.classList.add("hidden");
  } else if (currentStep === 2) {
    if (prevBtn) prevBtn.classList.remove("hidden");
    if (nextBtn) nextBtn.classList.remove("hidden");
    if (submitBtn) submitBtn.classList.add("hidden");
  } else if (currentStep === 3) {
    if (prevBtn) prevBtn.classList.remove("hidden");
    if (nextBtn) nextBtn.classList.add("hidden");
    if (submitBtn) submitBtn.classList.remove("hidden");

    // Adım 3 özetini doldur
    const summaryEl = document.getElementById("wizard-summary");
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div class="text-xs font-mono text-slate-300 bg-slate-900/90 p-3 rounded border border-slate-700/80 mb-3 space-y-1">
          <div><strong class="text-sky-400">Proje Tipi:</strong> ${proposalData.projectType}</div>
          <div><strong class="text-sky-400">Metraj:</strong> ${proposalData.areaM2} m² (${proposalData.landStatus})</div>
          <div><strong class="text-sky-400">Lokasyon:</strong> ${proposalData.location}</div>
        </div>
      `;
    }
  }
}

function handleProposalSubmit() {
  const nameInput = document.getElementById("form-name");
  const companyInput = document.getElementById("form-company");
  const phoneInput = document.getElementById("form-phone");
  const emailInput = document.getElementById("form-email");
  const noteInput = document.getElementById("form-notes");

  proposalData.fullName = nameInput ? nameInput.value : "";
  proposalData.companyName = companyInput ? companyInput.value : "";
  proposalData.phone = phoneInput ? phoneInput.value : "";
  proposalData.email = emailInput ? emailInput.value : "";
  proposalData.notes = noteInput ? noteInput.value : "";

  // WhatsApp Bildirimi formatı
  const message = `Merhaba Yurdanur Köse Mimarlık & İnşaat, web sitenizden yeni bir taahhüt/keşif ön talebi oluşturdum:
  
🏗️ *Proje Tipi:* ${proposalData.projectType}
📐 *Tahmini Alan:* ${proposalData.areaM2} m²
📍 *Lokasyon:* ${proposalData.location}
📌 *Arsa Durumu:* ${proposalData.landStatus}
👤 *Yetkili:* ${proposalData.fullName}
🏢 *Firma:* ${proposalData.companyName || "Belirtilmedi"}
📞 *Telefon:* ${proposalData.phone}
✉️ *E-posta:* ${proposalData.email}
📝 *Ek Not:* ${proposalData.notes || "Yok"}`;

  const encodedMsg = encodeURIComponent(message);
  const waUrl = `https://wa.me/902662439665?text=${encodedMsg}`;

  // Başarı Modalı
  const modalSuccess = document.getElementById("proposal-success-modal");
  const waLinkBtn = document.getElementById("success-wa-link");
  if (waLinkBtn) {
    waLinkBtn.href = waUrl;
  }
  if (modalSuccess) {
    modalSuccess.classList.add("open");
  }
}

window.closeSuccessModal = function() {
  const modalSuccess = document.getElementById("proposal-success-modal");
  if (modalSuccess) {
    modalSuccess.classList.remove("open");
  }
  currentStep = 1;
  updateWizardUI();
};

// 5. Mobil Menü
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  const links = document.querySelectorAll(".mobile-nav-link");

  if (toggleBtn && menu) {
    toggleBtn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });

    links.forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.add("hidden");
      });
    });
  }
}

// 6. Header Scroll Cam Efekti
function initHeaderScroll() {
  const header = document.getElementById("main-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("bg-[#1A1D20]/95", "backdrop-blur-md", "shadow-xl", "border-b", "border-slate-800");
      header.classList.remove("bg-transparent");
    } else {
      header.classList.remove("bg-[#1A1D20]/95", "backdrop-blur-md", "shadow-xl", "border-b", "border-slate-800");
      header.classList.add("bg-transparent");
    }
  });
}
