// Yurdanur Köse Mimarlık & İnşaat - 3D Editoryal Web Portalı

// 0. SAYFA HER YENİLENDİĞİNDE (F5 / RELOAD) KESİNLİKLE EN BAŞA SAR
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Eğer URL'de önceden kalmış bir # hash varsa (#teklif-formu vb.), temizle ve en tepeye odakla
if (window.location.hash) {
  history.replaceState(null, null, window.location.pathname + window.location.search);
  window.scrollTo(0, 0);
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
  initThreeJsHero();
  initEditorialProjects();
  initFlowStream();
  initWhiteForm();
  initHeaderScroll();
  initMobileMenu();
});

// 1. THREE.JS 3D MİMARİ TEL KAFES & ŞANTİYE IŞIK PARÇACIKLARI
function initThreeJsHero() {
  const container = document.getElementById("hero-3d-canvas-container");
  const canvas = document.getElementById("hero-3d-canvas");
  if (!container || !canvas || typeof THREE === "undefined") return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 4, 24);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Işıklandırma
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  const pointGold = new THREE.PointLight(0xD4A373, 2.5, 45);
  pointGold.position.set(8, 12, 12);
  scene.add(pointGold);

  // 3D Çelik Taşıyıcı ve Kanopi Kafes Grubu
  const structureGroup = new THREE.Group();
  scene.add(structureGroup);

  // Ana Çelik Kirişler (Industrial Steel Truss)
  const boxGeo = new THREE.BoxGeometry(20, 8, 10, 5, 2, 3);
  const edges = new THREE.EdgesGeometry(boxGeo);
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xD4A373,
    transparent: true,
    opacity: 0.45
  });
  const wireframe = new THREE.LineSegments(edges, lineMat);
  structureGroup.add(wireframe);

  // İç Destek Çaprazları
  const innerTrussGeo = new THREE.BoxGeometry(16, 6, 8, 4, 2, 2);
  const innerEdges = new THREE.EdgesGeometry(innerTrussGeo);
  const innerMat = new THREE.LineBasicMaterial({
    color: 0x94A3B8,
    transparent: true,
    opacity: 0.3
  });
  const innerWire = new THREE.LineSegments(innerEdges, innerMat);
  structureGroup.add(innerWire);

  // Zemin Mimari Koordinat Izgarası
  const gridHelper = new THREE.GridHelper(36, 18, 0xD4A373, 0x2A3441);
  gridHelper.position.y = -4.5;
  scene.add(gridHelper);

  // Şantiye Işık Partikülleri
  const particleCount = 140;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 45;
    particlePositions[i + 1] = (Math.random() - 0.5) * 28;
    particlePositions[i + 2] = (Math.random() - 0.5) * 28;
  }

  particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xD4A373,
    size: 0.22,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });
  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // Fare Etkileşimi
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;

  window.addEventListener("mousemove", (e) => {
    const halfX = window.innerWidth / 2;
    const halfY = window.innerHeight / 2;
    mouseX = (e.clientX - halfX) * 0.0005;
    mouseY = (e.clientY - halfY) * 0.0005;
  });

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    targetRotationY += (mouseX - targetRotationY) * 0.05;
    targetRotationX += (mouseY - targetRotationX) * 0.05;

    structureGroup.rotation.y = targetRotationY + Math.sin(elapsedTime * 0.3) * 0.08;
    structureGroup.rotation.x = targetRotationX + Math.cos(elapsedTime * 0.25) * 0.04;

    particleSystem.rotation.y = elapsedTime * 0.02;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

// 2. EDİTORYAL ASİMETRİK PROJELER GALERİSİ (architecturechat.com Stili)
function initEditorialProjects() {
  const container = document.getElementById("projects-editorial-grid");
  if (!container || typeof PROJECTS_DATA === "undefined") return;

  const spans = [
    { span: "span-wide", height: "h-[480px] lg:h-[560px]" },
    { span: "span-narrow", height: "h-[360px] lg:h-[560px]" },
    { span: "span-half", height: "h-[420px] lg:h-[480px]" },
    { span: "span-half", height: "h-[420px] lg:h-[480px]" },
    { span: "span-narrow", height: "h-[360px] lg:h-[520px]" },
    { span: "span-wide", height: "h-[480px] lg:h-[520px]" },
    { span: "span-half", height: "h-[400px] lg:h-[460px]" },
    { span: "span-half", height: "h-[400px] lg:h-[460px]" },
    { span: "span-full", height: "h-[440px] lg:h-[520px]" }
  ];

  container.innerHTML = "";

  PROJECTS_DATA.forEach((proj, idx) => {
    const layout = spans[idx % spans.length];
    const item = document.createElement("div");
    item.className = `project-item ${layout.span} group`;
    item.onclick = () => openProjectModal(proj.id);

    item.innerHTML = `
      <div class="project-item-img-container ${layout.height} relative overflow-hidden bg-slate-900">
        <img 
          src="${proj.coverImage}" 
          alt="${proj.title}" 
          loading="lazy" 
          class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        >
        <span class="project-badge-tag">${proj.categoryLabel}</span>
        <div class="absolute inset-0 bg-gradient-to-t from-[#0D1013]/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
        <div class="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
        </div>
      </div>
      <div class="project-meta-caption">
        <div class="flex items-baseline justify-between gap-4">
          <h3 class="font-heading font-bold text-lg lg:text-xl text-white group-hover:text-[#D4A373] transition-colors">
            ${proj.title}
          </h3>
          <span class="font-mono text-xs text-slate-400 shrink-0">${proj.year}</span>
        </div>
        <p class="text-xs text-slate-400 mt-1 line-clamp-1">
          ${proj.subtitle} — <span class="text-slate-300 font-medium">${proj.location}</span>
        </p>
      </div>
    `;

    container.appendChild(item);
  });
}

// 3. WILSON / FRAMERPANDA PROJE DETAY MODALI
function openProjectModal(projectId) {
  if (typeof PROJECTS_DATA === "undefined") return;
  const proj = PROJECTS_DATA.find(p => p.id === projectId);
  if (!proj) return;

  const modal = document.getElementById("project-detail-modal");
  const modalContent = document.getElementById("project-modal-content");
  if (!modal || !modalContent) return;

  let specsHtml = "";
  if (proj.specs) {
    specsHtml = Object.entries(proj.specs).map(([key, val]) => `
      <div class="py-2.5 border-b border-white/5 flex justify-between items-center text-xs">
        <span class="text-slate-400 font-medium">${key}</span>
        <span class="font-semibold text-white text-right">${val}</span>
      </div>
    `).join("");
  }

  let galleryHtml = "";
  if (proj.gallery && proj.gallery.length > 0) {
    galleryHtml = `
      <div class="mt-8 pt-8 border-t border-white/10">
        <h4 class="text-xs font-mono tracking-wider uppercase text-[#D4A373] mb-4">
          Farklı Açılar & Şantiye Görselleri (${proj.gallery.length} Fotoğraf)
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          ${proj.gallery.map(imgSrc => `
            <div class="h-48 rounded bg-slate-900 overflow-hidden cursor-pointer group" onclick="openPhotoLightbox('${imgSrc}', '${proj.title}')">
              <img src="${imgSrc}" alt="${proj.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  modalContent.innerHTML = `
    <!-- Tepe Kapatma Butonu -->
    <div class="sticky top-0 z-20 flex justify-between items-center px-6 py-4 bg-[#14181E]/95 backdrop-blur-md border-b border-white/10">
      <span class="text-xs font-mono uppercase tracking-wider text-slate-400">
        ${proj.categoryLabel} / ${proj.year}
      </span>
      <button onclick="closeProjectModal()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
        <i class="fa-solid fa-xmark text-sm"></i>
      </button>
    </div>

    <!-- Büyük Ana Görsel -->
    <div class="w-full h-[400px] sm:h-[480px] bg-slate-900 relative">
      <img src="${proj.coverImage}" alt="${proj.title}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-[#14181E] via-transparent to-transparent"></div>
    </div>

    <!-- Başlık ve Künye -->
    <div class="p-6 sm:p-10 -mt-16 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Sol: Proje Metni ve Açıklaması -->
        <div class="lg:col-span-7 space-y-6">
          <span class="inline-block px-3 py-1 rounded text-[11px] font-mono uppercase tracking-wider bg-[#D4A373]/15 text-[#D4A373] border border-[#D4A373]/30">
            ${proj.location}
          </span>
          <h2 class="text-2xl sm:text-4xl font-heading font-extrabold text-white leading-tight">
            ${proj.title}
          </h2>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
            ${proj.subtitle}
          </p>

          <div class="p-4 rounded bg-white/[0.03] border-l-2 border-[#D4A373] text-xs text-slate-300 leading-relaxed font-sans">
            <span class="font-mono text-[#D4A373] uppercase tracking-wider block mb-1">
              <i class="fa-solid fa-clipboard-check mr-1"></i> Proje Açıklaması:
            </span>
            "${proj.verifiedCaption}"
          </div>

          <div class="pt-3">
            <a href="#teklif-formu" onclick="closeProjectModal()" class="btn-gold text-xs font-bold py-2.5 px-6 rounded">
              <i class="fa-solid fa-calculator mr-1"></i> Bu Projeye Benzer Keşif İste
            </a>
          </div>
        </div>

        <!-- Sağ: Teknik Detaylar Tablosu -->
        <div class="lg:col-span-5 bg-white/[0.02] border border-white/10 rounded-lg p-6 space-y-2">
          <h3 class="text-xs font-mono uppercase tracking-wider text-slate-400 pb-2 border-b border-white/10">
            Teknik Proje Künyesi
          </h3>
          ${specsHtml}
        </div>

      </div>

      <!-- Ek Galeri Fotoğrafları -->
      ${galleryHtml}
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  const modal = document.getElementById("project-detail-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// 4. KESİNTİSİZ AKAN 3D FOTOĞRAF ŞERİDİ ("Görseller Aksın" - Temiz, Yazısız Tasarım)
function initFlowStream() {
  const trackLeft = document.getElementById("marquee-track-left");
  const trackRight = document.getElementById("marquee-track-right");
  if (!trackLeft || !trackRight || typeof FLOW_STREAM_PHOTOS === "undefined") return;

  const half = Math.ceil(FLOW_STREAM_PHOTOS.length / 2);
  const leftList = FLOW_STREAM_PHOTOS.slice(0, half);
  const rightList = FLOW_STREAM_PHOTOS.slice(half);

  // Kartların üzerinde "Büyütmek için tıkla" gibi ekstra yönlendirme yazısı YOKTUR (Kullanıcı Talebi)
  function renderCards(list) {
    return list.map(item => `
      <div class="marquee-card" onclick="openPhotoLightbox('${item.src}', '${item.title}')">
        <img src="${item.src}" alt="${item.title}" loading="lazy">
        <div class="marquee-card-overlay">
          <span class="text-xs font-heading font-semibold text-white drop-shadow">${item.title}</span>
        </div>
      </div>
    `).join("");
  }

  trackLeft.innerHTML = renderCards(leftList) + renderCards(leftList);
  trackRight.innerHTML = renderCards(rightList) + renderCards(rightList);
}

// 5. TAM EKRAN LIGHTBOX
function openPhotoLightbox(src, title) {
  const lb = document.getElementById("photo-lightbox");
  const img = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  if (!lb || !img) return;

  img.src = src;
  if (caption) caption.textContent = title || "Yurdanur Köse Mimarlık & İnşaat Arşivi";

  lb.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closePhotoLightbox() {
  const lb = document.getElementById("photo-lightbox");
  if (lb) {
    lb.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// 6. YASAL & STANDART MODALLARI (EPDK, GİZLİLİK, KVKK)
function openEpdkModal() {
  const m = document.getElementById("epdk-modal");
  if (m) { m.classList.add("active"); document.body.style.overflow = "hidden"; }
}
function closeEpdkModal() {
  const m = document.getElementById("epdk-modal");
  if (m) { m.classList.remove("active"); document.body.style.overflow = ""; }
}

function openPrivacyModal() {
  const m = document.getElementById("privacy-modal");
  if (m) { m.classList.add("active"); document.body.style.overflow = "hidden"; }
}
function closePrivacyModal() {
  const m = document.getElementById("privacy-modal");
  if (m) { m.classList.remove("active"); document.body.style.overflow = ""; }
}

function openKvkkModal() {
  const m = document.getElementById("kvkk-modal");
  if (m) { m.classList.add("active"); document.body.style.overflow = "hidden"; }
}
function closeKvkkModal() {
  const m = document.getElementById("kvkk-modal");
  if (m) { m.classList.remove("active"); document.body.style.overflow = ""; }
}

// 7. TEMİZ BEYAZ TEKLİF FORMU & WHATSAPP ENTEGRASYONU
function initWhiteForm() {
  const form = document.getElementById("clean-proposal-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const projTypeEl = document.querySelector("input[name='form_project_type']:checked");
    const projType = projTypeEl ? projTypeEl.value : "Organize Sanayi Fabrika / Depo";
    const area = document.getElementById("form_area")?.value || "Belirtilmedi";
    const location = document.getElementById("form_location")?.value || "Balıkesir";
    const name = document.getElementById("form_name")?.value || "";
    const phone = document.getElementById("form_phone")?.value || "";
    const notes = document.getElementById("form_notes")?.value || "";

    const text = `*YURDANUR KÖSE MİMARLIK - YENİ KEŞİF & TEKLİF TALEBİ*%0A%0A` +
      `👤 *İsim / Yetkili:* ${name}%0A` +
      `📞 *Telefon:* ${phone}%0A` +
      `🏗️ *Proje Türü:* ${projType}%0A` +
      `📐 *Yaklaşık Alan:* ${area} m²%0A` +
      `📍 *Konum / OSB:* ${location}%0A` +
      `📝 *Proje Notu:* ${notes || 'Doğrudan teknik görüşme talep ediliyor.'}%0A%0A` +
      `_Web sitesi üzerinden oluşturuldu._`;

    const whatsappUrl = `https://wa.me/905322439665?text=${text}`;
    window.open(whatsappUrl, "_blank");

    const modalSuccess = document.getElementById("proposal-success-modal");
    if (modalSuccess) {
      modalSuccess.classList.add("active");
    }
  });
}

function closeSuccessModal() {
  const modalSuccess = document.getElementById("proposal-success-modal");
  if (modalSuccess) {
    modalSuccess.classList.remove("active");
  }
}

// 8. HEADER SCROLL & MOBİL MENÜ
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  const links = menu.querySelectorAll("a");
  links.forEach(l => {
    l.addEventListener("click", () => {
      menu.classList.add("hidden");
    });
  });
}

// Global modal kapatma (Esc veya backdrop tıklaması)
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProjectModal();
    closePhotoLightbox();
    closeEpdkModal();
    closePrivacyModal();
    closeKvkkModal();
    closeSuccessModal();
  }
});
