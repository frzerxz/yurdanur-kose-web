// Yurdanur Köse Mimarlık & İnşaat - Proje Veri Şeması
// Tüm görseller yerel ve yüksek çözünürlüklü endüstriyel / akaryakıt projelerinden oluşur

const PROJECTS_DATA = [
  {
    id: "proj-1",
    title: "Balıkesir OSB Ağır Sanayi & Fabrika Tesisi",
    slug: "balikesir-osb-agir-sanayi-tesisi",
    category: "endustriyel",
    categoryLabel: "OSB Fabrika",
    status: "tamamlandi",
    statusLabel: "Teslim Edildi",
    location: "Balıkesir OSB / Karesi",
    areaSquareMeters: 14500,
    structureType: "Ağır Çelik & Prefabrik",
    deliveryTimeMonths: 8,
    clientOrBrand: "Sanayi Yatırımı",
    coverImage: "assets/images/fabrika-1.jpg",
    galleryImages: [
      "assets/images/fabrika-1.jpg",
      "assets/images/fabrika-2.jpg",
      "assets/images/fabrika-3.jpg"
    ],
    scopeSummary: "Ağır çelik konstrüksiyon imalatı, çift kiriş tavan vinç yolları, yüksek mukavemetli endüstriyel saha betonu ve modern idari yönetim binası.",
    technicalSpecs: {
      craneCapacityTon: 15,
      floorLoadCapacityKgM2: 6000,
      substationKva: 1600,
      canopyHeightMeters: null
    }
  },
  {
    id: "proj-2",
    title: "Petrol Ofisi Akaryakıt & Dinlenme İstasyonu",
    slug: "petrol-ofisi-akaryakit-dinlenme-istasyonu",
    category: "akaryakit",
    categoryLabel: "Akaryakıt İstasyonu",
    status: "tamamlandi",
    statusLabel: "Teslim Edildi",
    location: "Balıkesir - Bursa Çevre Yolu / Karesi",
    areaSquareMeters: 5200,
    structureType: "Çelik Kanopi & Kompozit Tesis",
    deliveryTimeMonths: 5,
    clientOrBrand: "Petrol Ofisi Standartları",
    coverImage: "assets/images/akaryakit-1.jpg",
    galleryImages: [
      "assets/images/akaryakit-1.jpg",
      "assets/images/akaryakit-2.jpg"
    ],
    scopeSummary: "EPDK mevzuatına tam uyumlu 6 adalılık çelik kanopi imalatı, ATEX sertifikalı ex-proof elektrik altyapısı, çift cidarlı yer altı tankları ve 7/24 market & oto yıkama.",
    technicalSpecs: {
      craneCapacityTon: null,
      floorLoadCapacityKgM2: 8000,
      substationKva: 400,
      canopyHeightMeters: 5.5
    }
  },
  {
    id: "proj-3",
    title: "Balıkesir OSB Üretim & Enjeksiyon Tesisi",
    slug: "balikesir-osb-uretim-tesisi",
    category: "endustriyel",
    categoryLabel: "OSB Fabrika",
    status: "tamamlandi",
    statusLabel: "Teslim Edildi",
    location: "Balıkesir OSB 1. Etap",
    areaSquareMeters: 9200,
    structureType: "Ağır Çelik Karkas",
    deliveryTimeMonths: 7,
    clientOrBrand: "Özel Sanayici",
    coverImage: "assets/images/fabrika-2.jpg",
    galleryImages: [
      "assets/images/fabrika-2.jpg",
      "assets/images/fabrika-1.jpg"
    ],
    scopeSummary: "Geniş açıklıklı çelik makas sistemi, sandviç panel cephe giydirme, yangın sprinkler sistemi ve entegre ar-ge ofisleri.",
    technicalSpecs: {
      craneCapacityTon: 10,
      floorLoadCapacityKgM2: 5000,
      substationKva: 1250,
      canopyHeightMeters: null
    }
  },
  {
    id: "proj-4",
    title: "Bandırma OSB Lojistik Depo & Antrepo",
    slug: "bandirma-osb-lojistik-antrepo",
    category: "lojistik",
    categoryLabel: "Lojistik Depo",
    status: "tamamlandi",
    statusLabel: "Teslim Edildi",
    location: "Bandırma OSB / Balıkesir",
    areaSquareMeters: 16500,
    structureType: "Prefabrik Betonarme + Çelik",
    deliveryTimeMonths: 9,
    clientOrBrand: "Lojistik Şirketi",
    coverImage: "assets/images/depo-1.jpg",
    galleryImages: [
      "assets/images/depo-1.jpg",
      "assets/images/fabrika-3.jpg"
    ],
    scopeSummary: "14 adet hidrolik seviye ayarlı yükleme rampası, 13 metre tavan yüksekliği, FM Global yangın yönetmeliği ve aşınmaya dirençli zemin betonları.",
    technicalSpecs: {
      craneCapacityTon: 20,
      floorLoadCapacityKgM2: 7500,
      substationKva: 2000,
      canopyHeightMeters: null
    }
  },
  {
    id: "proj-5",
    title: "Körfez Bölgesi Akaryakıt & Otogaz İstasyonu",
    slug: "korfez-akaryakit-lpg-istasyonu",
    category: "akaryakit",
    categoryLabel: "Akaryakıt & LPG",
    status: "devam-ediyor",
    statusLabel: "Devam Eden Şantiye",
    location: "Edremit Körfez Yolu / Balıkesir",
    areaSquareMeters: 4600,
    structureType: "Çelik Kanopi & İdari Bina",
    deliveryTimeMonths: 4,
    clientOrBrand: "Bölgesel Dağıtıcı Ağı",
    coverImage: "assets/images/akaryakit-2.jpg",
    galleryImages: [
      "assets/images/akaryakit-2.jpg",
      "assets/images/akaryakit-1.jpg"
    ],
    scopeSummary: "LPG dolum adası ve otomasyon altyapısı, çevre koruma drenaj kanalları, hidrokarbon ayrıştırıcı filtreler ve kurumsal kimlik giydirme taahhüdü.",
    technicalSpecs: {
      craneCapacityTon: null,
      floorLoadCapacityKgM2: 6000,
      substationKva: 315,
      canopyHeightMeters: 5.2
    }
  },
  {
    id: "proj-6",
    title: "Balıkesir OSB Endüstriyel İmalat & Depo Kampüsü",
    slug: "balikesir-osb-endustriyel-kampus",
    category: "endustriyel",
    categoryLabel: "OSB Fabrika",
    status: "devam-ediyor",
    statusLabel: "Devam Eden Şantiye",
    location: "Balıkesir OSB 2. Etap",
    areaSquareMeters: 11800,
    structureType: "Ağır Çelik Konstrüksiyon",
    deliveryTimeMonths: 6,
    clientOrBrand: "Özel Sanayici",
    coverImage: "assets/images/fabrika-3.jpg",
    galleryImages: [
      "assets/images/fabrika-3.jpg",
      "assets/images/fabrika-2.jpg"
    ],
    scopeSummary: "Ağır makine parkuru için titreşim sönümlemeli zemin temelleri, 20 ton vinç kirişleri ve çatı GES panelleri taşıyıcı projesi.",
    technicalSpecs: {
      craneCapacityTon: 20,
      floorLoadCapacityKgM2: 8500,
      substationKva: 2500,
      canopyHeightMeters: null
    }
  }
];

// Firma Sosyal Medya & Şantiye Galerisi Görselleri
const SOCIAL_GALLERY = [
  {
    img: "assets/images/fabrika-1.jpg",
    title: "Balıkesir OSB Çelik Makas Montajı",
    category: "OSB Şantiyesi",
    badge: "Çelik Montaj"
  },
  {
    img: "assets/images/akaryakit-1.jpg",
    title: "Akaryakıt İstasyonu Kanopi İmalatı",
    category: "Akaryakıt",
    badge: "EPDK Standart"
  },
  {
    img: "assets/images/fabrika-2.jpg",
    title: "Organize Sanayi Fabrika Taşıyıcı Karkas",
    category: "OSB Fabrika",
    badge: "Ağır Çelik"
  },
  {
    img: "assets/images/depo-1.jpg",
    title: "Lojistik Depo & Yükleme Rampaları",
    category: "Lojistik Tesis",
    badge: "Antrepo"
  },
  {
    img: "assets/images/fabrika-3.jpg",
    title: "Ağır Sanayi Çatı ve Vinç Yolları",
    category: "Ağır Sanayi",
    badge: "Statik İmalat"
  },
  {
    img: "assets/images/akaryakit-2.jpg",
    title: "Akaryakıt İstasyon Saha Betonu ve Adalar",
    category: "Akaryakıt",
    badge: "İstasyon Tesis"
  }
];
