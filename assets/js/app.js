// Yurdanur Köse Mimarlık & İnşaat - Web Portalı Mantığı
document.addEventListener("DOMContentLoaded", () => {
  initCounters();
  initProjectsFilter();
  initSocialGallery();
  initWhiteForm();
  initMobileMenu();
  initHeaderScroll();
});

// 1. Sayaç Animasyonu
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
          const duration = 1800;
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentVal = Math.round(target * (1 - (1 - progress) * (1 - progress)));

            el.textContent = `${prefix}${currentVal.toLocaleString("tr-TR")}${suffix}`;

            if (frame === totalFrames) {
              clearInterval(counter);
              el.textContent = `${prefix}${target.toLocaleString("tr-TR")}${suffix}`;
            }
          }, frameDuration);
        });
      }
    });
  }, { threshold: 0.25 });

  const statsSection = document.getElementById("stats-band");
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// 2. Proje Filtreleme & Kart Render
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  renderProjects("all");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active", "bg-amber-500", "text-slate-900", "font-bold"));
      filterBtns.forEach((b) => b.classList.add("bg-slate-800", "text-slate-300"));

      btn.classList.add("active", "bg-amber-500", "text-slate-900", "font-bold");
      btn.classList.remove("bg-slate-800", "text-slate-300");

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
    <div class="project-card rounded-xl overflow-hidden flex flex-col group cursor-pointer shadow-lg" onclick="openProjectModal('${proj.id}')">
      <!-- Görsel Alanı (16:10) -->
      <div class="relative w-full aspect-[16/10] overflow-hidden bg-slate-900">
        <img src="${proj.coverImage}" alt="${proj.title}" class="img-zoom w-full h-full object-cover">
        
        <!-- Üst Rozetler -->
        <div class="absolute top-3 left-3 flex gap-2">
          <span class="px-3 py-1 text-xs font-semibold rounded-full bg-slate-900/85 text-white border border-slate-700/80 backdrop-blur-sm">
            ${proj.categoryLabel}
          </span>
          ${proj.status === "devam-ediyor" ? `
            <span class="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500 text-slate-950">
              Devam Eden Şantiye
            </span>
          ` : `
            <span class="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/90 text-white">
              ${proj.statusLabel}
            </span>
          `}
        </div>

        <div class="absolute bottom-3 right-3">
          <span class="px-3 py-1 text-xs font-bold rounded-lg bg-black/80 text-amber-400 border border-slate-700 backdrop-blur-sm">
            ${proj.areaSquareMeters.toLocaleString("tr-TR")} m²
          </span>
        </div>
      </div>

      <!-- Kart İçeriği -->
      <div class="p-6 flex-1 flex flex-col justify-between bg-[#1E2227]">
        <div>
          <div class="text-xs font-medium text-amber-400 flex items-center gap-1.5 mb-2">
            <i class="fa-solid fa-location-dot"></i>
            <span>${proj.location}</span>
          </div>
          <h3 class="text-lg font-bold font-heading text-white group-hover:text-amber-400 transition-colors line-clamp-1 mb-2">
            ${proj.title}
          </h3>
          <p class="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
            ${proj.scopeSummary}
          </p>
        </div>

        <!-- Alt Teknik Bilgiler -->
        <div class="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-300 font-medium">
          <span class="flex items-center gap-2">
            <i class="fa-solid fa-cubes-stacked text-sky-400"></i>
            ${proj.structureType}
          </span>
          <span class="flex items-center gap-1.5 text-amber-400">
            <i class="fa-solid fa-clock"></i>
            ${proj.deliveryTimeMonths} Ay Teslim
          </span>
        </div>
      </div>
    </div>
  `).join("");
}

// 3. Şantiye & Sosyal Medya Galerisi
function initSocialGallery() {
  const container = document.getElementById("social-gallery-grid");
  if (!container || typeof SOCIAL_GALLERY === "undefined") return;

  container.innerHTML = SOCIAL_GALLERY.map((item) => `
    <div class="relative rounded-xl overflow-hidden group aspect-square bg-slate-900 shadow-md">
      <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
      
      <div class="absolute top-3 left-3">
        <span class="px-2.5 py-1 text-[11px] font-bold rounded-md bg-amber-500 text-slate-950">
          ${item.badge}
        </span>
      </div>

      <div class="absolute bottom-4 left-4 right-4">
        <span class="text-xs text-amber-400 font-medium block mb-1">${item.category}</span>
        <h4 class="text-sm font-bold font-heading text-white line-clamp-2 leading-tight">${item.title}</h4>
      </div>
    </div>
  `).join("");
}

// 4. Proje Modal / Detay Penceresi
window.openProjectModal = function(projectId) {
  const project = PROJECTS_DATA.find((p) => p.id === projectId);
  if (!project) return;

  const modalBackdrop = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-project-details");
  const specs = project.technicalSpecs;

  modalContent.innerHTML = `
    <!-- Header Image -->
    <div class="relative bg-slate-950 aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
      <img src="${project.coverImage}" alt="${project.title}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-[#1E2227] via-slate-950/40 to-slate-950/60 flex flex-col justify-between p-6">
        <div class="flex items-center justify-between">
          <span class="px-3.5 py-1 text-xs font-bold rounded-full bg-amber-500 text-slate-950">
            ${project.categoryLabel} • ${project.statusLabel}
          </span>
          <button onclick="closeProjectModal()" class="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center transition-colors">
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>
        <div>
          <p class="text-xs font-semibold text-amber-400 mb-1 flex items-center gap-1.5">
            <i class="fa-solid fa-location-dot"></i> ${project.location}
          </p>
          <h2 class="text-xl md:text-3xl font-bold font-heading text-white">${project.title}</h2>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="p-6 md:p-8 space-y-6">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
        <div class="p-2 border-r border-slate-800 last:border-none">
          <div class="text-xs text-slate-400 mb-1">Toplam Alan</div>
          <div class="text-base sm:text-lg font-bold text-amber-400">${project.areaSquareMeters.toLocaleString("tr-TR")} m²</div>
        </div>
        <div class="p-2 border-r border-slate-800 last:border-none">
          <div class="text-xs text-slate-400 mb-1">Taşıyıcı Sistem</div>
          <div class="text-base sm:text-lg font-bold text-white">${project.structureType}</div>
        </div>
        <div class="p-2 border-r border-slate-800 last:border-none">
          <div class="text-xs text-slate-400 mb-1">Teslim Süresi</div>
          <div class="text-base sm:text-lg font-bold text-sky-400">${project.deliveryTimeMonths} Ay</div>
        </div>
        <div class="p-2">
          <div class="text-xs text-slate-400 mb-1">Standart / Marka</div>
          <div class="text-base sm:text-lg font-bold text-white truncate">${project.clientOrBrand || "Özel Sanayici"}</div>
        </div>
      </div>

      <div>
        <h4 class="text-sm font-bold font-heading text-white uppercase tracking-wider mb-2 flex items-center gap-2">
          <i class="fa-solid fa-circle-check text-amber-400"></i> Mühendislik Kapsamı & Uygulama Detayları
        </h4>
        <p class="text-slate-300 leading-relaxed text-sm md:text-base">
          ${project.scopeSummary}
        </p>
      </div>

      <div class="bg-slate-900/90 p-5 rounded-xl border border-slate-800">
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Statik ve Altyapı Verileri</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          ${specs.craneCapacityTon ? `
            <div class="flex items-center gap-3 text-slate-200">
              <div class="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <i class="fa-solid fa-weight-hanging"></i>
              </div>
              <div>
                <span class="text-slate-400 block">Vinç Kapasitesi:</span>
                <strong>${specs.craneCapacityTon} Ton Tavan Vinci</strong>
              </div>
            </div>
          ` : ""}
          ${specs.floorLoadCapacityKgM2 ? `
            <div class="flex items-center gap-3 text-slate-200">
              <div class="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <i class="fa-solid fa-layer-group"></i>
              </div>
              <div>
                <span class="text-slate-400 block">Zemin Taşıma Gücü:</span>
                <strong>${specs.floorLoadCapacityKgM2.toLocaleString("tr-TR")} kg/m²</strong>
              </div>
            </div>
          ` : ""}
          ${specs.substationKva ? `
            <div class="flex items-center gap-3 text-slate-200">
              <div class="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <i class="fa-solid fa-bolt"></i>
              </div>
              <div>
                <span class="text-slate-400 block">Trafo Gücü:</span>
                <strong>${specs.substationKva} kVA</strong>
              </div>
            </div>
          ` : ""}
          ${specs.canopyHeightMeters ? `
            <div class="flex items-center gap-3 text-slate-200">
              <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <i class="fa-solid fa-gas-pump"></i>
              </div>
              <div>
                <span class="text-slate-400 block">Kanopi Yüksekliği:</span>
                <strong>${specs.canopyHeightMeters} Metre (EPDK Uyumlu)</strong>
              </div>
            </div>
          ` : ""}
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 pt-2">
        <a href="#teklif-formu" onclick="closeProjectModal(); selectFormProjectType('${project.category === 'akaryakit' ? 'Akaryakıt İstasyonu' : 'OSB Fabrika & Depo'}');" class="btn-amber flex-1 py-3 px-5 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2">
          <i class="fa-solid fa-paper-plane"></i> Bu Kapsam İçin Teklif Al
        </a>
        <button onclick="closeProjectModal()" class="py-3 px-6 rounded-xl text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 text-sm font-medium">
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

// 5. Yasal & Güvenlik Modalları (EPDK, Gizlilik, KVKK)
window.openEpdkModal = function() {
  const modal = document.getElementById("epdk-modal");
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
};

window.closeEpdkModal = function() {
  const modal = document.getElementById("epdk-modal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
};

window.openPrivacyModal = function() {
  const modal = document.getElementById("privacy-modal");
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
};

window.closePrivacyModal = function() {
  const modal = document.getElementById("privacy-modal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
};

window.openKvkkModal = function() {
  const modal = document.getElementById("kvkk-modal");
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
};

window.closeKvkkModal = function() {
  const modal = document.getElementById("kvkk-modal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
};

// 6. Temiz Beyaz Seçimli Form Mantığı
let selectedProjectType = "OSB Fabrika & Depo";

function initWhiteForm() {
  const pills = document.querySelectorAll(".form-select-pill");
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      selectedProjectType = pill.getAttribute("data-type");
    });
  });

  const form = document.getElementById("clean-proposal-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleWhiteFormSubmit();
    });
  }
}

window.selectFormProjectType = function(type) {
  const targetPill = document.querySelector(`.form-select-pill[data-type="${type}"]`);
  if (targetPill) {
    targetPill.click();
  }
};

function handleWhiteFormSubmit() {
  const name = document.getElementById("form-name")?.value || "";
  const company = document.getElementById("form-company")?.value || "";
  const phone = document.getElementById("form-phone")?.value || "";
  const email = document.getElementById("form-email")?.value || "";
  const area = document.getElementById("form-area")?.value || "";
  const location = document.getElementById("form-location")?.value || "";
  const landStatus = document.getElementById("form-land-status")?.value || "";
  const notes = document.getElementById("form-notes")?.value || "";

  // WhatsApp Mesajı
  const message = `Merhaba Yurdanur Köse Mimarlık & İnşaat, web sitenizden yeni bir ön keşif ve teklif talebinde bulunuyorum:

🏗️ Proje Türü: ${selectedProjectType}
📐 Tahmini Kapalı Alan: ${area ? area + ' m²' : 'Görüşmede netleşecek'}
📍 Lokasyon: ${location || 'Balıkesir OSB / Çevre Bölge'}
📌 Arsa Durumu: ${landStatus}
👤 Yetkili: ${name}
🏢 Firma: ${company || 'Belirtilmedi'}
📞 Telefon: ${phone}
✉️ E-posta: ${email}
📝 Ek Talepler: ${notes || 'Belirtilmedi'}`;

  const encodedMsg = encodeURIComponent(message);
  const waUrl = `https://wa.me/902662439665?text=${encodedMsg}`;

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
};

// 7. Mobil Menü & Header Scroll
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

function initHeaderScroll() {
  const header = document.getElementById("main-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("bg-[#14171A]/95", "backdrop-blur-md", "shadow-xl", "border-b", "border-slate-800");
      header.classList.remove("bg-transparent");
    } else {
      header.classList.remove("bg-[#14171A]/95", "backdrop-blur-md", "shadow-xl", "border-b", "border-slate-800");
      header.classList.add("bg-transparent");
    }
  });
}
