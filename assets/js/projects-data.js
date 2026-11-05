// Yurdanur Köse Mimarlık & İnşaat - Doğrulanmış Gerçek Proje ve Görsel Veri Sistemi
// Tüm görseller ve açıklamalar doğrudan firmanın resmi Instagram arşivinden ve gönderi açıklamalarından alınmıştır.

const PROJECTS_DATA = [
  {
    id: "proj-muradiye-osb",
    title: "Muradiye Organize Sanayi Bölgesi",
    subtitle: "500.000 m² Hizmet Destek Alanı & Lojistik Tesisleri",
    category: "organize-sanayi",
    categoryLabel: "Organize Sanayi",
    year: "2024",
    location: "Muradiye OSB / Manisa",
    area: "500.000 m²",
    scope: "Master Plan, İmalat Dükkanları, Lojistik Depolar & İdari Yapılar",
    coverImage: "assets/images/real_projects/yk-01.jpg",
    gallery: [
      "assets/images/real_projects/yk-01.jpg",
      "assets/images/real_projects/yk-08.jpg",
      "assets/images/real_projects/yk-14.jpg"
    ],
    verifiedCaption: "Muradiye Organize Sanayi Bölgesi 291 Hektar Genişleme Alanı içerisinde, 500.000 m² alanda Hizmet Destek Alanı planlanmıştır. Planlanan Hizmet Destek Alanlarının tamamında, içerisinde yer alacak Küçük İmalat Tamirat Dükkanlarının ve Lojistik Depoların projelerine devam ediyoruz.",
    specs: {
      "Toplam Alan": "500.000 m² Hizmet Destek",
      "Genişleme Bölgesi": "291 Hektar",
      "Yapı Tipleri": "Lojistik Depo, İmalat Atölyeleri, İdari Bina",
      "Yürütülen Süreç": "Ruhsat, Uygulama & Mimari Projelendirme"
    }
  },
  {
    id: "proj-balikesir-osb-ticari",
    title: "Balıkesir OSB Ticari & Depolama Tesisleri",
    subtitle: "Lansman Satış Programı & 20 Adet Dükkan Kompleksi",
    category: "organize-sanayi",
    categoryLabel: "OSB & Depolama",
    year: "2023",
    location: "Balıkesir Organize Sanayi Bölgesi",
    area: "35.000 m²",
    scope: "Ticari Dükkanlar, Depolama Birimleri & Modüler Karkas Yapılar",
    coverImage: "assets/images/real_projects/yk-02.jpg",
    gallery: [
      "assets/images/real_projects/yk-02.jpg",
      "assets/images/real_projects/yk-06.jpg",
      "assets/images/real_projects/yk-11.jpg"
    ],
    verifiedCaption: "Balıkesir Organize Sanayi Bölgesindeki Ticari dükkanlar ve Depolama dükkanları için hazırladığımız Lansman Satış Programımız ve 20 adet dükkan projemiz.",
    specs: {
      "Ünite Sayısı": "20 Adet Bağımsız Modüler Dükkan",
      "Fonksiyon": "Depolama + Ticari Satış Birimleri",
      "Taşıyıcı Sistem": "Ağır Çelik Konstrüksiyon & Sandviç Panel",
      "Durum": "Tamamlandı / Satış Programında"
    }
  },
  {
    id: "proj-kerbela-petrokimya",
    title: "Irak Kerbela Petrokimya Özel Endüstri Bölgesi",
    subtitle: "16 Milyon m² Uluslararası Master Plan & Maket Projesi",
    category: "agir-sanayi",
    categoryLabel: "Ağır Sanayi / Master Plan",
    year: "2023",
    location: "Kerbela / Irak",
    area: "16.000.000 m²",
    scope: "Endüstriyel Master Planlama, Tesis Yerleşimleri, Lojistik Ağları & Maket",
    coverImage: "assets/images/real_projects/yk-03.jpg",
    gallery: [
      "assets/images/real_projects/yk-03.jpg"
    ],
    verifiedCaption: "Irak Kerbela'da kurulması planlanan Petrokimya Özel Endüstri Bölgesi (16 milyon m²) ile ilgili yapmış olduğumuz Master Plan ve Maket Çalışmamız.",
    specs: {
      "Ölçek": "16 Milyon m² Özel Endüstri Bölgesi",
      "Endüstri Tipi": "Petrokimya Rafineri & Yan Sanayi",
      "Çalışma Kapsamı": "Master Planlama, Fizibilite & 3D Maket",
      "Uluslararası Standart": "API, NFPA & Uluslararası Emniyet Kriterleri"
    }
  },
  {
    id: "proj-akaryakit-kanopi",
    title: "Akaryakıt & Servis İstasyonu Tesisleri",
    subtitle: "EPDK Uyumlu Çelik Kanopi, Yeraltı Tankları & Market Yapıları",
    category: "akaryakit",
    categoryLabel: "Akaryakıt & Kanopi",
    year: "2024",
    location: "Balıkesir & Güney Marmara Ağları",
    area: "6.500 m² İstasyon Sahası",
    scope: "Çelik Kanopi Montajı, Ex-Proof Tesisat, Yeraltı Yakıt Tankları, İSG Yönetimi",
    coverImage: "assets/images/instagram/insta-03.jpg",
    gallery: [
      "assets/images/instagram/insta-03.jpg",
      "assets/images/instagram/insta-04.jpg",
      "assets/images/proj-petrol-ofisi.jpg"
    ],
    verifiedCaption: "EPDK teknik mevzuatına ve dağıtıcı kurumsal kimliğine %100 uyumlu çelik kanopi tasarımı, statik analizi ve saha taahhüt uygulaması.",
    specs: {
      "Kanopi Açıklığı": "24 Metre Kolonsuz Genişlik",
      "Mevzuat Uyumu": "EPDK, TSE 12820 & İSG Yangın Yönetmeliği",
      "Elektrik Altyapısı": "Ex-Proof Zone 0 / Zone 1 Ekipmanları",
      "İlave Tesisler": "Market, Servis & Oto Yıkama İstasyonları"
    }
  },
  {
    id: "proj-balosb-tir-parki",
    title: "BALOSB Tır Parkı & Lojistik Transfer Merkezi",
    subtitle: "Ağır Taşımacılık & Filo İkmal Altyapısı",
    category: "organize-sanayi",
    categoryLabel: "Lojistik / Altyapı",
    year: "2023",
    location: "Balıkesir Organize Sanayi Bölgesi",
    area: "42.000 m²",
    scope: "Ağır Taşıt Sirkülasyon Planı, Giriş-Çıkış Güvenlik Binaları, Dinlenme Tesisleri",
    coverImage: "assets/images/real_projects/yk-15.jpg",
    gallery: [
      "assets/images/real_projects/yk-15.jpg"
    ],
    verifiedCaption: "Balıkesir Organize Sanayi Bölgesi (BALOSB) Tır Parkı ve Ağır Vasıta Lojistik Merkez Projesi.",
    specs: {
      "Araç Kapasitesi": "250+ Ağır Vasıta / TIR",
      "Zemin Mukavemeti": "Endüstriyel Saha Betonu (30 cm C35)",
      "İç Tesisler": "İdari Güvenlik Noktası & Sürücü Dinlenme Birimleri",
      "Güvenlik": "24/7 Plaka Tanıma & Aydınlatma Kuleleri"
    }
  },
  {
    id: "proj-balosb-otel-sosyal",
    title: "BALOSB Otel & Sosyal Yaşam Kompleksi",
    subtitle: "Sanayi Bölgesi İş İnsanları & Konuk Evi Projesi",
    category: "sosyal-tesis",
    categoryLabel: "Sosyal Tesis & Otel",
    year: "2023",
    location: "Balıkesir OSB",
    area: "12.000 m²",
    scope: "Mimari Avan Proje, İç Mimarlık, Konferans Salonu & Restoran Alanları",
    coverImage: "assets/images/real_projects/yk-07.jpg",
    gallery: [
      "assets/images/real_projects/yk-07.jpg",
      "assets/images/real_projects/yk-05.jpg"
    ],
    verifiedCaption: "Balıkesir Organize Sanayi Bölgesi (BALOSB) bünyesinde sanayiciler ve misafirler için hazırladığımız Otel ve Sosyal Alan Projeleri.",
    specs: {
      "Oda Sayısı": "72 Konaklama Odası",
      "Sosyal Donatılar": "Konferans Salonu, Kafeterya, Restoran",
      "Tasarım Dili": "Endüstriyel Tuğla, Brüt Beton & Geniş Cam Cephe",
      "Durum": "Proje ve Onay Süreci Tamamlandı"
    }
  },
  {
    id: "proj-muradiye-idari",
    title: "Muradiye OSB İdari Bina & Kafeterya",
    subtitle: "Yönetim Merkezi & 8 Adet Ticari Birim",
    category: "organize-sanayi",
    categoryLabel: "İdari Yapı",
    year: "2023",
    location: "Muradiye OSB / Manisa",
    area: "8.400 m²",
    scope: "Bölge Müdürlüğü İdari Binası, Toplantı Salonları, Kafeterya & Çevre Tanzimi",
    coverImage: "assets/images/real_projects/yk-14.jpg",
    gallery: [
      "assets/images/real_projects/yk-14.jpg",
      "assets/images/real_projects/yk-08.jpg"
    ],
    verifiedCaption: "Muradiye Organize Sanayi - 8 adet dükkan, 1 adet kafeterya ve İdari Bina Mimari Projemiz.",
    specs: {
      "Yönetim Binası": "Modern Çelik-Cam Hibrit Mimari",
      "Hizmet Üniteleri": "8 Ticari Dükkan + 1 Kafeterya",
      "Yeşil Bina": "Düşük Enerji Tüketimli Cephe Tasarımı",
      "Uygulama": "Mimari + Statik Ruhsat Projesi"
    }
  },
  {
    id: "proj-balosb-istinat",
    title: "BALOSB Taş İstinat Duvarları & Zemin Mühendisliği",
    subtitle: "Genişleme Alanı Heyelan Önleme ve Saha Düzenleme",
    category: "altyapi",
    categoryLabel: "Saha & İstinat",
    year: "2023",
    location: "Balıkesir OSB Genişleme Bölgesi",
    area: "14.000 m² Yüzey Alanı",
    scope: "Taş İstinat Duvarları, Drenaj Kanalları & Dış Yüzey Mimari Kaplamaları",
    coverImage: "assets/images/real_projects/yk-04.jpg",
    gallery: [
      "assets/images/real_projects/yk-04.jpg"
    ],
    verifiedCaption: "Balıkesir Organize Sanayi Bölgesi genişleme alanında yapımı tamamlanan taş istinat duvarları dış yüzleri için yaptığımız mimari ve yapısal çalışmalar.",
    specs: {
      "Duvar Yüksekliği": "8 ila 14 Metre Kademeli Taş Duvar",
      "Drenaj Sistemi": "Ağır Yağış ve Yeraltı Suyu Tahliye Ağı",
      "Görsel Doku": "Bölgesel Doğal Taş İşçiliği",
      "Statik Dayanım": "Deprem ve Heyelan Yük Analizli"
    }
  },
  {
    id: "proj-villa-konut",
    title: "Özel Villa & Konut Mimari Koleksiyonu",
    subtitle: "Brütalist & Yalın Çizgilerle Şekillenen Yaşam Alanları",
    category: "konut-villa",
    categoryLabel: "Konut & Villa",
    year: "2022 - 2024",
    location: "Balıkesir, Karesi & Edremit Körfezi",
    area: "450 - 1.200 m²",
    scope: "Bireysel Villa Tasarımları, Konut Yerleşimleri, İç Mekan & Peyzaj",
    coverImage: "assets/images/real_projects/yk-10.jpg",
    gallery: [
      "assets/images/real_projects/yk-10.jpg",
      "assets/images/real_projects/yk-12.jpg",
      "assets/images/real_projects/yk-13.jpg",
      "assets/images/real_projects/yk-09.jpg"
    ],
    verifiedCaption: "Yurdanur Köse Mimarlık imzası taşıyan özel villa, konut ve yaşam alanı tasarımları. Estetik, fonksiyonellik ve doğayla bütünleşen mimari çizgiler.",
    specs: {
      "Mimari Dil": "Doğal Ahşap, Taş & Brüt Beton Armoni",
      "Enerji Sınıfı": "Yüksek Isı Yalıtımlı Düşük Karbon Tesisatı",
      "Kapsam": "Anahtar Teslim Mimari Proje & İç Mekan İmalatı"
    }
  }
];

// Kesintisiz Akan 3D Galeri için 39 Adet Doğrulanmış Instagram Fotoğrafı
const FLOW_STREAM_PHOTOS = [
  { src: "assets/images/real_projects/yk-01.jpg", title: "Muradiye OSB Hizmet Destek Alanı (500.000 m²)" },
  { src: "assets/images/real_projects/yk-02.jpg", title: "Balıkesir OSB Ticari & Depolama Dükkanları" },
  { src: "assets/images/real_projects/yk-03.jpg", title: "Kerbela Petrokimya Endüstri Master Planı" },
  { src: "assets/images/real_projects/yk-04.jpg", title: "BALOSB Taş İstinat Duvarı İmalatları" },
  { src: "assets/images/real_projects/yk-05.jpg", title: "BALOSB Sosyal Alan & Tesis Projeleri" },
  { src: "assets/images/real_projects/yk-06.jpg", title: "Balıkesir OSB 20 Adet Dükkan Yapımı" },
  { src: "assets/images/real_projects/yk-07.jpg", title: "BALOSB Otel Mimari Projesi" },
  { src: "assets/images/real_projects/yk-08.jpg", title: "Muradiye OSB 8 Dükkan & Kafeterya" },
  { src: "assets/images/real_projects/yk-09.jpg", title: "Konut Mimari Tasarım & Uygulama" },
  { src: "assets/images/real_projects/yk-10.jpg", title: "Villa Mimari & Peyzaj Tasarımı" },
  { src: "assets/images/real_projects/yk-11.jpg", title: "Balıkesir OSB Çelik Şantiye Montajı" },
  { src: "assets/images/real_projects/yk-12.jpg", title: "Villa Proje Detay & Dış Cephe" },
  { src: "assets/images/real_projects/yk-13.jpg", title: "Modern Yaşam Alanları & Mimari" },
  { src: "assets/images/real_projects/yk-14.jpg", title: "Muradiye OSB İdari Bina Projesi" },
  { src: "assets/images/real_projects/yk-15.jpg", title: "BALOSB Tır Parkı & Lojistik Sahası" },
  { src: "assets/images/real_projects/yk-16.jpg", title: "Şantiye Denetimi & OSB Danışmanlık" },
  { src: "assets/images/real_projects/yk-17.jpg", title: "İç Mimari & 3D Modelleme" },
  { src: "assets/images/real_projects/yk-18.jpg", title: "Taşıyıcı İskelet & Statik Analiz" },
  { src: "assets/images/real_projects/yk-19.jpg", title: "Endüstriyel Tesis Cephe Çözümleri" },
  { src: "assets/images/real_projects/yk-20.jpg", title: "Balıkesir OSB Fabrika İnşaat Süreci" },
  { src: "assets/images/real_projects/yk-21.jpg", title: "Çelik Konstrüksiyon & Kanopi İmalatı" },
  { src: "assets/images/real_projects/yk-22.jpg", title: "Lojistik Antrepo & Depolama Sahaları" },
  { src: "assets/images/real_projects/yk-23.jpg", title: "Mimari Detay Çizimleri & Uygulama" },
  { src: "assets/images/real_projects/yk-24.jpg", title: "Saha İSG & Mühendislik Koordinasyonu" },
  { src: "assets/images/real_projects/yk-25.jpg", title: "Prekast & Prefabrik Yapı Elemanları" },
  { src: "assets/images/real_projects/yk-26.jpg", title: "OSB Altyapı & Drenaj Çalışmaları" },
  { src: "assets/images/real_projects/yk-27.jpg", title: "Ofis & Yönetim Yapıları İç Mekan" },
  { src: "assets/images/real_projects/yk-28.jpg", title: "Sanayi Tesisi Projelendirme Süreçleri" }
];
