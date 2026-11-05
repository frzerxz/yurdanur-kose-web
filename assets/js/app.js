// Yurdanur Köse Mimarlık & İnşaat - 3D Web Portalı & İnteraktif Mantık
document.addEventListener("DOMContentLoaded", () => {
  initThreeJsHero();
  initCounters();
  initProjectsFilter();
  initFlowingMarquee();
  init3DCardTilt();
  initWhiteForm();
  initMobileMenu();
  initHeaderScroll();
});

// 1. THREE.JS İNTERAKTİF 3D MİMARİ SAHNE (Hero Bölümü)
function initThreeJsHero() {
  const container = document.getElementById("hero-3d-canvas-container");
  const canvas = document.getElementById("hero-3d-canvas");
  if (!container || !canvas || typeof THREE === "undefined") return;

  const scene = new THREE.Scene();
  
  // Kamera
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 5, 25);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Işıklandırma
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const pointLightAmber = new THREE.PointLight(0xF59E0B, 2, 50);
  pointLightAmber.position.set(10, 15, 10);
  scene.add(pointLightAmber);

  const pointLightCyan = new THREE.PointLight(0x06B6D4, 2, 50);
  pointLightCyan.position.set(-10, -5, 10);
  scene.add(pointLightCyan);

  // 3D Çelik Taşıyıcı / Kanopi ve Fabrika Yapı İskeleti
  const structureGroup = new THREE.Group();
  scene.add(structureGroup);

  // Ana Çelik Kirişler (Wireframe Grid)
  const boxGeo = new THREE.BoxGeometry(18, 9, 12, 6, 3, 4);
  const edges = new THREE.EdgesGeometry(boxGeo);
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xF59E0B,
    transparent: true,
    opacity: 0.45,
    linewidth: 1.5
  });
  const wireframe = new THREE.LineSegments(edges, lineMat);
  structureGroup.add(wireframe);

  // İç Çelik Makas Çaprazları (Truss System)
  const innerTrussGeo = new THREE.BoxGeometry(16, 7, 10, 4, 2, 2);
  const innerEdges = new THREE.EdgesGeometry(innerTrussGeo);
  const innerMat = new THREE.LineBasicMaterial({
    color: 0x06B6D4,
    transparent: true,
    opacity: 0.35
  });
  const innerWire = new THREE.LineSegments(innerEdges, innerMat);
  structureGroup.add(innerWire);

  // Zemin Izgarası (Ground Blueprint Plane)
  const gridHelper = new THREE.GridHelper(30, 20, 0xF59E0B, 0x1E293B);
  gridHelper.position.y = -5;
  scene.add(gridHelper);

  // 3D Uçuşan Işık Parçacıkları (Şantiye Kıvılcımları / Yıldız Tozu)
  const particleCount = 180;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 40;
    particlePositions[i + 1] = (Math.random() - 0.5) * 30;
    particlePositions[i + 2] = (Math.random() - 0.5) * 30;
  }

  particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xF59E0B,
    size: 0.25,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });
  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // Fare Hareketiyle 3D Etkileşim
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;

  window.addEventListener("mousemove", (e) => {
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    mouseX = (e.clientX - windowHalfX) * 0.0006;
    mouseY = (e.clientY - windowHalfY) * 0.0006;
  });

  // Render Döngüsü (60 FPS Smooth)
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Otomatik Yavaş 3D Salınım
    structureGroup.rotation.y += 0.002;
    structureGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.08;

    // Fare Etkileşimi (Lerp damping)
    targetRotationY = mouseX * 2;
    targetRotationX = mouseY * 1.5;
    structureGroup.rotation.y += (targetRotationY - structureGroup.rotation.y) * 0.04;
    structureGroup.rotation.x += (targetRotationX - structureGroup.rotation.x) * 0.04;

    // Parçacık Hareketi
    particleSystem.rotation.y = elapsedTime * 0.03;

    renderer.render(scene, camera);
  }
  animate();

  // Resize Listener
  window.addEventListener("resize", () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

// 2. 3D KART EĞİLME (TILT) ETKİSİ
function init3DCardTilt() {
  const cards = document.querySelectorAll(".card-3d-element");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
  });
}

// 3. "GÖRSELLER AKSIN" - SÜREKLİ AKAN 3D MARQUEE AKIŞI
function initFlowingMarquee() {
  const track1 = document.getElementById("flow-track-1");
  const track2 = document.getElementById("flow-track-2");
  if (!track1 || typeof INSTAGRAM_FLOW_IMAGES === "undefined") return;

  // İki katmanlı kesintisiz sonsuz döngü (Duplicate list for seamless infinite loop)
  const list1 = [...INSTAGRAM_FLOW_IMAGES, ...INSTAGRAM_FLOW_IMAGES];
  track1.innerHTML = list1.map((item, idx) => `
    <div class="flow-photo-card" onclick="openPhotoModal('${item.img}', '${item.title}')">
      <img src="${item.img}" alt="${item.title}" loading="lazy">
      <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4">
        <div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950 inline-block mb-1">
            Instagram
          </span>
          <h5 class="text-xs font-bold text-white line-clamp-1 leading-snug">${item.title}</h5>
        </div>
      </div>
    </div>
  `).join("");

  if (track2) {
    const list2 = [...INSTAGRAM_FLOW_IMAGES].reverse();
    const doubleList2 = [...list2, ...list2];
    track2.innerHTML = doubleList2.map((item) => `
      <div class="flow-photo-card" onclick="openPhotoModal('${item.img}', '${item.title}')">
        <img src="${item.img}" alt="${item.title}" loading="lazy">
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4">
          <div>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500 text-white inline-block mb-1">
              Saha Uygulaması
            </span>
            <h5 class="text-xs font-bold text-white line-clamp-1 leading-snug">${item.title}</h5>
          </div>
        </div>
      </div>
    `).join("");
  }
}

// Fotoğraf Lightbox Modalı
window.openPhotoModal = function(imgSrc, title) {
  const modalBackdrop = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-project-details");
  if (!modalBackdrop || !modalContent) return;

  modalContent.innerHTML = `
    <div class="relative bg-slate-950 w-full overflow-hidden p-4 sm:p-6 text-center">
      <div class="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
        <div class="text-left">
          <span class="text-xs font-bold text-amber-400 block">YURDANUR KÖSE INSTAGRAM ARŞİVİ</span>
          <h3 class="text-lg font-bold text-white">${title}</h3>
        </div>
        <button onclick="closeProjectModal()" class="w-10 h-10 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center transition-colors">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>
      <div class="max-h-[70vh] flex items-center justify-center overflow-hidden rounded-xl bg-black">
        <img src="${imgSrc}" alt="${title}" class="max-h-[70vh] w-auto max-w-full object-contain">
      </div>
      <div class="pt-4 flex items-center justify-between text-xs text-slate-400">
        <span>© Yurdanur Köse Mimarlık & İnşaat</span>
        <a href="https://www.instagram.com/yurdanurkosemimarlik/" target="_blank" class="text-amber-400 hover:underline flex items-center gap-1.5 font-bold">
          <i class="fa-brands fa-instagram text-sm"></i> @yurdanurkosemimarlik
        </a>
      </div>
    </div>
  `;

  modalBackdrop.classList.add("open");
  document.body.style.overflow = "hidden";
};

// 4. Sayaç Animasyonu
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

// 5. Proje Filtreleme & Kart Render
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
    <div class="card-3d-wrap">
      <div class="card-3d-element project-card rounded-2xl overflow-hidden flex flex-col group cursor-pointer shadow-xl border border-slate-700/80" onclick="openProjectModal('${proj.id}')">
        <!-- Görsel Alanı (16:10) -->
        <div class="relative w-full aspect-[16/10] overflow-hidden bg-slate-900">
          <img src="${proj.coverImage}" alt="${proj.title}" class="img-zoom w-full h-full object-cover">
          
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="px-3 py-1 text-xs font-semibold rounded-full bg-slate-900/85 text-white border border-slate-700/80 backdrop-blur-sm">
              ${proj.categoryLabel}
            </span>
            ${proj.status === "devam-ediyor" ? `
              <span class="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500 text-slate-950 font-bold">
                Devam Eden Şantiye
              </span>
            ` : `
              <span class="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/90 text-white font-bold">
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
        <div class="p-6 flex-1 flex flex-col justify-between bg-[#181C21]">
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

          <div class="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300 font-medium">
            <span class="flex items-center gap-2">
              <i class="fa-solid fa-cubes-stacked text-cyan-400"></i>
              ${proj.structureType}
            </span>
            <span class="flex items-center gap-1.5 text-amber-400 font-bold">
              <i class="fa-solid fa-clock"></i>
              ${proj.deliveryTimeMonths} Ay Teslim
            </span>
          </div>
        </div>
      </div>
    </div>
  `).join("");

  // Re-bind 3D tilt to new cards
  init3DCardTilt();
}

// 6. Proje Modal / Detay Penceresi
window.openProjectModal = function(projectId) {
  const project = PROJECTS_DATA.find((p) => p.id === projectId);
  if (!project) return;

  const modalBackdrop = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-project-details");
  const specs = project.technicalSpecs;

  modalContent.innerHTML = `
    <div class="relative bg-slate-950 aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
      <img src="${project.coverImage}" alt="${project.title}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-[#181C21] via-slate-950/40 to-slate-950/60 flex flex-col justify-between p-6">
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
          <div class="text-base sm:text-lg font-bold text-cyan-400">${project.deliveryTimeMonths} Ay</div>
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

      <!-- Galeri Görselleri -->
      ${project.galleryImages && project.galleryImages.length > 1 ? `
        <div>
          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Proje Fotoğrafları</h4>
          <div class="grid grid-cols-3 gap-3">
            ${project.galleryImages.map((g) => `
              <div class="rounded-lg overflow-hidden aspect-video bg-black cursor-pointer border border-slate-700" onclick="openPhotoModal('${g}', '${project.title}')">
                <img src="${g}" alt="${project.title}" class="w-full h-full object-cover hover:scale-105 transition-transform">
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <div class="flex flex-col sm:flex-row gap-3 pt-2">
        <a href="#teklif-formu" onclick="closeProjectModal(); selectFormProjectType('${project.category === 'akaryakit' ? 'Akaryakıt İstasyonu' : 'OSB Fabrika & Depo'}');" class="btn-amber flex-1 py-3.5 px-5 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2">
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

// 7. Yasal & Güvenlik Modalları
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

// 8. Temiz Beyaz Seçimli Form Mantığı
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

// 9. Mobil Menü & Header Scroll
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
      header.classList.add("bg-[#0F1215]/95", "backdrop-blur-md", "shadow-xl", "border-b", "border-slate-800");
      header.classList.remove("bg-transparent");
    } else {
      header.classList.remove("bg-[#0F1215]/95", "backdrop-blur-md", "shadow-xl", "border-b", "border-slate-800");
      header.classList.add("bg-transparent");
    }
  });
}
