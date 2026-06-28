# EtnoSTEAM Değerlendirme Uygulaması

Sevgili STEM Günlüğü projesinden esinlenerek oluşturulan 5 günlük değerlendirme uygulaması.

## 🎯 Özellikler

- **5. Gün Değerlendirme**: Günün öğrendiği şeyler hakkında sorular
- **Genel Değerlendirme**: En beğenilen 3 etkinliği seçerek kelime bulutu oluşturma
- **Excel Kayıt**: Tüm yanıtlar otomatik olarak Excel dosyasına kaydedilir
- **Türkçe Arayüz**: Tam Türkçe kullanıcı deneyimi

## 📁 Dosya Yapısı

```
etnosteam2/
├── index.html          # Ana uygulama
├── styles.css          # Tasarım dosyası
├── script.js           # İşlevsellik
├── package.json        # Bağımlılıklar
└── README.md           # Bu dosya
```

## 🚀 Kullanım

### Tarayıcıda Doğrudan Açma

`index.html` dosyasını tarayıcıda açın.

### GitHub Pages ile Yayınlama

1. Repository Ayarlarına gidin
2. GitHub Pages bölümüne gidin
3. Source olarak `main` branch'i seçin
4. Uygulamaya erişin: `https://username.github.io/etnosteam2`

## 📊 Veri Saklama

- Veriler tarayıcının **LocalStorage**'ında saklanır
- Excel ve CSV olarak indirilebilir
- Tüm veriler **tarayıcı seviyesinde** şifrelenmez (hassas veri için uygun değil)

## 📋 5. Gün Değerlendirme Soruları

1. **Adım Soyadım** - Kullanıcı adı ve soyadı
2. **3 Kelime** - Günü 3 kelimeyle tanımlama
3. **En İlginç Bilgi** - Bugün öğrenilen en ilginç bilgi
4. **Düşündüğü** - Etkinliğin tetiklediği sorular ve düşünceler
5. **Gelecek Fikri** - Gelecekte taşınan fikir
6. **Duygu Emojisi** - 6 farklı emoji arasından seçim
7. **Yıldız Puanı** - 1-5 arası yıldız derecelendirmesi

## 🌟 Genel Değerlendirme

- **Ad Soyad** - Öğrenci adı
- **3 En Beğenilen Etkinlik** - Projeden en beğenilen 3 etkinlik
- **Kelime Bulutu** - Girilen etkinliklerden otomatik kelime bulutu oluşturma
- **Genel Yorum** - Proje hakkında yorum

## ⚙️ Yönetim Paneli

- 📊 **Excel İndir** - Tüm verileri Excel formatında indir
- 📋 **CSV İndir** - Tüm verileri CSV formatında indir
- 🗑️ **Verileri Sil** - Tüm verileri temizle
- 📈 **İstatistikler** - Değerlendirme sayılarını görüntüle

## 🛠️ Teknolojiler

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Veri Depolama**: Browser LocalStorage
- **Excel Export**: XLSX.js kütüphanesi

## 📝 Lisans

MIT

---

**EtnoSTEAM Projesi** 🔬🎨🧮
