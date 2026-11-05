// Yurdanur Köse Mimarlık & İnşaat - Proje Veri Şeması (Project Interface)
// EPDK & İSG Standartlarında Ağır Sanayi ve Akaryakıt Portföyü

const PROJECTS_DATA = [
  {
    id: "proj-1",
    title: "Balıkesir OSB Plastik Enjeksiyon Fabrikası",
    slug: "balikesir-osb-plastik-enjeksiyon",
    category: "endustriyel",
    categoryLabel: "OSB Fabrika",
    status: "tamamlandi",
    statusLabel: "Tamamlandı",
    location: "Balıkesir OSB / Karesi",
    areaSquareMeters: 8500,
    structureType: "Ağır Çelik",
    deliveryTimeMonths: 7,
    clientOrBrand: "Polimer Endüstri A.Ş.",
    coverImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541888946425-d0fbb1861563?q=80&w=1200&auto=format&fit=crop"
    ],
    scopeSummary: "Ağır çelik konstrüksiyon imalatı, 10 tonluk çift kiriş gezer köprülü vinç yolları, 5.000 kg/m² yüzey sertleştiricili endüstriyel zemin betonu ve modern idari ofis bloğu.",
    technicalSpecs: {
      craneCapacityTon: 10,
      floorLoadCapacityKgM2: 5000,
      substationKva: 1600,
      canopyHeightMeters: null
    }
  },
  {
    id: "proj-2",
    title: "Petrol Ofisi Akaryakıt & Dinlenme İstasyonu",
    slug: "petrol-ofisi-balikesir-cevre-yolu",
    category: "akaryakit",
    categoryLabel: "Petrol Ofisi İstasyon",
    status: "tamamlandi",
    statusLabel: "Tamamlandı",
    location: "Balıkesir Çevre Yolu / Karesi",
    areaSquareMeters: 4800,
    structureType: "Çelik Kanopi & Kompozit İdari Tesis",
    deliveryTimeMonths: 5,
    clientOrBrand: "Petrol Ofisi Kurumsal Bayiliği",
    coverImage: "https://images.unsplash.com/photo-1527018606416-a674e140cca3?q=80&w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1527018606416-a674e140cca3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop"
    ],
    scopeSummary: "EPDK standartlarına tam uyumlu 6 adalılık çelik kanopi montajı, ATEX sertifikalı ex-proof elektrik altyapısı, 4 adet çift cidarlı yer altı yakıt tankı, 7/24 market ve oto yıkama ünitesi.",
    technicalSpecs: {
      craneCapacityTon: null,
      floorLoadCapacityKgM2: 8000,
      substationKva: 400,
      canopyHeightMeters: 5.4
    }
  },
  {
    id: "proj-3",
    title: "Bandırma OSB Lojistik Depo & Antrepo Tesisi",
    slug: "bandirma-osb-lojistik-antrepo",
    category: "lojistik",
    categoryLabel: "Lojistik Depo",
    status: "tamamlandi",
    statusLabel: "Tamamlandı",
    location: "Bandırma OSB / Balıkesir",
    areaSquareMeters: 14200,
    structureType: "Prefabrik Betonarme + Çelik Makas",
    deliveryTimeMonths: 8,
    clientOrBrand: "Ege Global Lojistik Depoculuk",
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop"
    ],
    scopeSummary: "12 adet hidrolik yükleme rampası, FM Global ve yangın yönetmeliğine uygun sprinkler söndürme ağı, 12.5 metre serbest tavan yüksekliği ve yüksek mukavemetli zemin.",
    technicalSpecs: {
      craneCapacityTon: 15,
      floorLoadCapacityKgM2: 7000,
      substationKva: 1250,
      canopyHeightMeters: null
    }
  },
  {
    id: "proj-4",
    title: "Balıkesir OSB Ağır Makine & Talaşlı İmalat Fabrikası",
    slug: "balikesir-osb-agir-makine",
    category: "endustriyel",
    categoryLabel: "OSB Fabrika",
    status: "tamamlandi",
    statusLabel: "Tamamlandı",
    location: "Balıkesir OSB 2. Etap",
    areaSquareMeters: 11000,
    structureType: "Ağır Çelik Konstrüksiyon",
    deliveryTimeMonths: 9,
    clientOrBrand: "Köse Ağır Sanayi Yatırımları",
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop"
    ],
    scopeSummary: "Ağır tonajlı pres ve CNC tezgahları için özel titreşim sönümleyici temeller, 20 ton vinç kirişleri ve fotovoltaik (GES) panellere uyumlu güçlendirilmiş çatı makas sistemi.",
    technicalSpecs: {
      craneCapacityTon: 20,
      floorLoadCapacityKgM2: 9000,
      substationKva: 2500,
      canopyHeightMeters: null
    }
  },
  {
    id: "proj-5",
    title: "Körfez Ekspres Akaryakıt & LPG İstasyonu",
    slug: "korfez-lpg-akaryakit-istasyonu",
    category: "akaryakit",
    categoryLabel: "Akaryakıt & LPG",
    status: "devam-ediyor",
    statusLabel: "Devam Ediyor",
    location: "Edremit Körfez Yolu / Balıkesir",
    areaSquareMeters: 3900,
    structureType: "Çelik Kanopi & Modüler İdari Bina",
    deliveryTimeMonths: 4,
    clientOrBrand: "Bölgesel Akaryakıt Dağıtım Ağı",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop"
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
    title: "Savaştepe OSB Gıda İşleme & Soğuk Hava Deposu",
    slug: "savastepe-osb-gida-isleme-depo",
    category: "endustriyel",
    categoryLabel: "Endüstriyel Tesis",
    status: "devam-ediyor",
    statusLabel: "Devam Ediyor",
    location: "Savaştepe OSB / Balıkesir",
    areaSquareMeters: 7600,
    structureType: "Karma (Prefabrik + Poliüretan Panel)",
    deliveryTimeMonths: 6,
    clientOrBrand: "Bahar Agro Gıda A.Ş.",
    coverImage: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1200&auto=format&fit=crop"
    ],
    scopeSummary: "HACCP hijyen standartlarında poliüretan sandviç panelli soğuk odalar, paslanmaz drenaj kanalları ve sıcak daldırma galvaniz çelik çatı konstrüksiyonu.",
    technicalSpecs: {
      craneCapacityTon: 5,
      floorLoadCapacityKgM2: 5000,
      substationKva: 1000,
      canopyHeightMeters: null
    }
  }
];
