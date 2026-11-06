# Yurdanur Köse Mimarlık & İnşaat
## Çok Sayfalı (Multi-Page) Mimari Web Portalı & 3D Görsel Vitrin

Bu proje, **Yurdanur Köse Mimarlık & İnşaat ve Ticaret Ltd. Şti.** için geliştirilmiş modern, 3D interaktif ve editoryal çok sayfalı (multi-page) kurumsal web portalıdır.

---

### 🌐 Sayfa Mimarisi

1. **`index.html` (Ana Sayfa - Görsel Vitrin):**
   - Stuart Tanner Architects stili tam ekran mimari görsel açılışı.
   - Three.js WebGL 3D parametrik mimari tel kafes / çelik konstrüksiyon interaktif arka planı.
   - Öne çıkan projeler editoryal seçkisi.
   - Sürekli akan 3D şantiye görsel bandı.
   - Kurumsal özet ve keşif çağrısı (CTA).

2. **`kurumsal.html` (Kurumsal & Deneyim):**
   - 20 yılı aşkın saha ve taahhüt deneyimi.
   - Mimar Yurdanur Köse biyografisi, BASİAD üyeliği ve Adalet Bakanlığı Bursa Bölge Adliye Mahkemesi yeminli bilirkişilik geçmişi.
   - Irak Kerbela Petrokimya Özel Endüstri Bölgesi (16 Milyon m²) Master Plan ve maket çalışması.
   - Statik güven, mevzuat onayı ve sıfır iş kazası saha prensipleri.

3. **`projeler.html` (Projeler Portfolyosu):**
   - Architecturechat editoryal asimetrik galeri gridi (`span-wide`, `span-narrow`, `span-half`, `span-full`).
   - Dinamik kategori filtreleme butonları (Tümü, Organize Sanayi, Akaryakıt & Kanopi, Ağır Sanayi / Master Plan, Konut & Villa).
   - Wilson / Framerpanda stili proje detay modalı (teknik künye, metrajlar, statik sistem, çoklu şantiye fotoğrafları ve tam ekran lightbox).

4. **`organize-sanayi.html` (Organize Sanayi & Akaryakıt Çözümleri):**
   - Muradiye OSB 500.000 m² Lojistik Antrepo & Dağıtım Merkezi.
   - Balıkesir OSB (BALOSB) 40 Adet Sanayi Dükkanı, BALOSB Tır Parkı ve İş Oteli.
   - EPDK Petrol Piyasası Kanunu, TSE 12820 emniyet mesafeleri ve ATEX Ex-Proof Zone standartları.
   - Yeraltı çift cidarlı yakıt tankları (EN 12285-1) ve geniş açıklıklı çelik kanopi çözümleri.
   - Ruhsat, imar ve statik mevzuat karşılaştırma tablosu.

5. **`galeri.html` (Şantiye & İmalat Arşivi):**
   - Üst bölümde çift yönlü sonsuz akan 3D görsel şeridi (Marquee Stream).
   - Sayfa gövdesinde Instagram arşivinden elde edilen 39 adet gerçek ve doğrulanmış şantiye fotoğrafının tamamını içeren dinamik masonry gridi.
   - Tek tıkla açılan yüksek çözünürlüklü tam ekran lightbox.

6. **`iletisim.html` (İletişim & Harita & Keşif Formu):**
   - 3 şube/irtibat noktası (Balıkesir Genel Merkez, BALOSB Saha İrtibat, EPDK Masası) ve doğrudan Google Haritalar yol tarifi butonları.
   - Beyaz temiz seçimli interaktif teklif formu (proje türü seçimi, metrekare, lokasyon seçimi).
   - WhatsApp API entegrasyonu ve başvuru onay modalı.

---

### ⚖️ Mevzuat & Hukuki Güvence Modalları
Tüm sayfalarda alt bilgide yer alan ve tek tıkla açılan yasal pencereler:
- **EPDK & İSG Standartları Güvence Şartnamesi** (5015 Sayılı Petrol Piyasası Kanunu, TSE 12820, ATEX Zone 0/1/2, 6331 İSG).
- **Gizlilik Politikası**.
- **KVKK Aydınlatma Metni** (6698 Sayılı Kanun).

---

### 🎨 Tasarım Prensipleri
- **Renk Paleti:** `#0D1013` (Koyu antrasit zemin), `#14181D` (Yüzey), `#D4A373` (Mimari altın/bronz), `#E6E2D8` (Doğal taş bej).
- **Tipografi:** `Outfit` (Başlıklar), `Plus Jakarta Sans` (Gövde metni), `Space Mono` (Teknik metraj ve kodlar).
- **Sıfır Sahte Veri:** Sitedeki tüm görseller firmanın Instagram arşivinden ayıklanan gerçek imalatlara aittir. Uydurma metinler ve robotik yönlendirmeler kaldırılmıştır.
- **Sayfa Başına Odaklanma:** Yenileme yapıldığında tarayıcının ortada veya formda kalmasını engelleyen `history.scrollRestoration = 'manual'` ve `window.scrollTo(0,0)` mekanizması mevcuttur.

---

### 💻 Çalıştırma
Tüm sayfalar saf HTML5, Tailwind CDN ve vanilya JavaScript ile hazırlandığından herhangi bir derleme aracına gerek kalmadan doğrudan çalışır:
```bash
# Tarayıcıda açmak için:
start index.html
```
