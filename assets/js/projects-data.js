// Yurdanur Köse Mimarlık & İnşaat - Proje Veri Şeması
// Tüm görseller firmanın Instagram hesabından (@yurdanurkosemimarlik) alınmıştır.

const PROJECTS_DATA = [
  {
    id: "proj-1",
    title: "Balıkesir OSB Ticari & Depolama Tesisleri",
    slug: "balikesir-osb-ticari-depolama",
    category: "endustriyel",
    categoryLabel: "OSB Projesi",
    status: "tamamlandi",
    statusLabel: "Lansman Satışı",
    location: "Balıkesir Organize Sanayi Bölgesi",
    areaSquareMeters: 18500,
    structureType: "Modüler Çelik Karkas",
    deliveryTimeMonths: 8,
    clientOrBrand: "Balıkesir OSB",
    coverImage: "assets/images/instagram/insta-06.jpg",
    galleryImages: [
      "assets/images/instagram/insta-06.jpg",
      "assets/images/instagram/insta-05.jpg",
      "assets/images/instagram/insta-07.jpg"
    ],
    scopeSummary: "Balıkesir OSB'de ticari dükkanlar, depolama alanları ve endüstriyel lojistik birimleri mimari projelendirme ve uygulama taahhüdü.",
    technicalSpecs: {
      craneCapacityTon: 10,
      floorLoadCapacityKgM2: 7500,
      substationKva: 1600,
      canopyHeightMeters: null
    }
  },
  {
    id: "proj-2",
    title: "Akaryakıt & Servis İstasyonu Tesisleri",
    slug: "akaryakit-servis-istasyonu",
    category: "akaryakit",
    categoryLabel: "Akaryakıt & Kanopi",
    status: "tamamlandi",
    statusLabel: "Teslim Edildi",
    location: "Balıkesir - Bursa Çevre Yolu / Karesi",
    areaSquareMeters: 5400,
    structureType: "Çelik Kanopi & Kompozit",
    deliveryTimeMonths: 5,
    clientOrBrand: "Dağıtıcı Standartları",
    coverImage: "assets/images/instagram/insta-03.jpg",
    galleryImages: [
      "assets/images/instagram/insta-03.jpg",
      "assets/images/instagram/insta-04.jpg"
    ],
    scopeSummary: "EPDK kurallarına tam uyumlu çelik kanopi montajı, yer altı yakıt tankları, ex-proof elektrik altyapısı, market ve servis alanları.",
    technicalSpecs: {
      craneCapacityTon: null,
      floorLoadCapacityKgM2: 8000,
      substationKva: 400,
      canopyHeightMeters: 5.4
    }
  },
  {
    id: "proj-3",
    title: "Endüstriyel Üretim Tesisi & Fabrika İmalatı",
    slug: "endustriyel-uretim-fabrikasi",
    category: "endustriyel",
    categoryLabel: "OSB Fabrika",
    status: "tamamlandi",
    statusLabel: "Teslim Edildi",
    location: "Balıkesir OSB Sanayi Bölgesi",
    areaSquareMeters: 12800,
    structureType: "Ağır Çelik Taşıyıcı",
    deliveryTimeMonths: 7,
    clientOrBrand: "Sanayi Yatırımı",
    coverImage: "assets/images/instagram/insta-12.jpg",
    galleryImages: [
      "assets/images/instagram/insta-12.jpg",
      "assets/images/instagram/insta-11.jpg"
    ],
    scopeSummary: "Ağır çelik konstrüksiyon karkas, tavan vinç yolları, yüksek mukavemetli endüstriyel zemin betonu ve cephe giydirme çözümleri.",
    technicalSpecs: {
      craneCapacityTon: 15,
      floorLoadCapacityKgM2: 6000,
      substationKva: 1600,
      canopyHeightMeters: null
    }
  },
  {
    id: "proj-4",
    title: "Lojistik Depolama & Antrepo Kompleksi",
    slug: "lojistik-antrepo-kompleksi",
    category: "lojistik",
    categoryLabel: "Lojistik Depo",
    status: "tamamlandi",
    statusLabel: "Teslim Edildi",
    location: "Bandırma - Balıkesir OSB Aksı",
    areaSquareMeters: 16200,
    structureType: "Prefabrik Betonarme + Çelik",
    deliveryTimeMonths: 9,
    clientOrBrand: "Lojistik Merkezi",
    coverImage: "assets/images/instagram/insta-15.jpg",
    galleryImages: [
      "assets/images/instagram/insta-15.jpg",
      "assets/images/instagram/insta-14.jpg"
    ],
    scopeSummary: "Hidrolik yükleme rampaları, geniş tır manevra sahaları, FM Global yangın sprinkler altyapısı ve yüksek tavanlı antrepo.",
    technicalSpecs: {
      craneCapacityTon: 20,
      floorLoadCapacityKgM2: 7500,
      substationKva: 2000,
      canopyHeightMeters: null
    }
  },
  {
    id: "proj-5",
    title: "Körfez Bölgesi Akaryakıt & LPG Otogaz İstasyonu",
    slug: "korfez-akaryakit-lpg-istasyonu",
    category: "akaryakit",
    categoryLabel: "Akaryakıt & LPG",
    status: "devam-ediyor",
    statusLabel: "Devam Eden Şantiye",
    location: "Edremit Körfez Yolu",
    areaSquareMeters: 4800,
    structureType: "Çelik Kanopi & İdari Tesis",
    deliveryTimeMonths: 4,
    clientOrBrand: "Bölgesel Dağıtıcı İstasyonu",
    coverImage: "assets/images/instagram/insta-08.jpg",
    galleryImages: [
      "assets/images/instagram/insta-08.jpg",
      "assets/images/instagram/insta-09.jpg"
    ],
    scopeSummary: "LPG dolum adası, drenaj kanalları, hidrokarbon ayrıştırıcı filtreler ve kurumsal kimlik giydirme taahhüdü.",
    technicalSpecs: {
      craneCapacityTon: null,
      floorLoadCapacityKgM2: 6000,
      substationKva: 315,
      canopyHeightMeters: 5.2
    }
  },
  {
    id: "proj-6",
    title: "OSB İdari Yönetim & İş Merkezi Binaları",
    slug: "osb-idari-yonetim-binasi",
    category: "endustriyel",
    categoryLabel: "İdari Yapı",
    status: "devam-ediyor",
    statusLabel: "Aktif Şantiye",
    location: "Balıkesir OSB",
    areaSquareMeters: 9600,
    structureType: "Kompozit & Çelik Karma",
    deliveryTimeMonths: 6,
    clientOrBrand: "Özel Sanayici",
    coverImage: "assets/images/instagram/insta-20.jpg",
    galleryImages: [
      "assets/images/instagram/insta-20.jpg",
      "assets/images/instagram/insta-21.jpg"
    ],
    scopeSummary: "Fabrika içi ergonomik idari ofisler, modern cephe giydirme, laboratuvar ve sosyal yaşam alanları.",
    technicalSpecs: {
      craneCapacityTon: 5,
      floorLoadCapacityKgM2: 5000,
      substationKva: 1000,
      canopyHeightMeters: null
    }
  }
];

// Gerçek Instagram Fotoğraflarından Oluşan Sürekli Akan 3D Akış (Marquee) Dizisi
const INSTAGRAM_FLOW_IMAGES = [
  { img: "assets/images/instagram/insta-01.jpg", title: "Balıkesir OSB Proje Çizimi" },
  { img: "assets/images/instagram/insta-02.jpg", title: "Şantiye Çelik Karkas İncelemesi" },
  { img: "assets/images/instagram/insta-03.jpg", title: "Akaryakıt İstasyon Kanopi Alanı" },
  { img: "assets/images/instagram/insta-04.jpg", title: "OSB Ticari Dükkanlar Tasarımı" },
  { img: "assets/images/instagram/insta-05.jpg", title: "Lansman Programı & Sanayici Buluşması" },
  { img: "assets/images/instagram/insta-06.jpg", title: "Balıkesir OSB Lansman Satışı" },
  { img: "assets/images/instagram/insta-07.jpg", title: "Endüstriyel Tesis Cephe Tasarımı" },
  { img: "assets/images/instagram/insta-08.jpg", title: "İstasyon & Dinlenme Tesisi" },
  { img: "assets/images/instagram/insta-09.jpg", title: "Ağır Çelik Konstrüksiyon" },
  { img: "assets/images/instagram/insta-10.jpg", title: "Fabrika Üretim Sahası" },
  { img: "assets/images/instagram/insta-11.jpg", title: "Lojistik Depo Rampaları" },
  { img: "assets/images/instagram/insta-12.jpg", title: "OSB Modern Yönetim Ofisleri" },
  { img: "assets/images/instagram/insta-13.jpg", title: "Çelik Taşıyıcı İskelet" },
  { img: "assets/images/instagram/insta-14.jpg", title: "Antrepo ve Sundurma İmalatı" },
  { img: "assets/images/instagram/insta-15.jpg", title: "Ticari Depolama Kampüsü" },
  { img: "assets/images/instagram/insta-16.jpg", title: "Şantiye Saha Koordinasyonu" },
  { img: "assets/images/instagram/insta-17.jpg", title: "Modern Sanayi Mimarisi" },
  { img: "assets/images/instagram/insta-18.jpg", title: "EPDK Uyumlu İstasyon Planı" },
  { img: "assets/images/instagram/insta-19.jpg", title: "Tavan Vinci ve Vinç Yolları" },
  { img: "assets/images/instagram/insta-20.jpg", title: "Endüstriyel Yapı İskân Aşaması" }
];
