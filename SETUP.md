# Google Sheets Entegrasyonu Kurulum Rehberi

## 📋 Adımlar

### 1️⃣ Google Sheets'te Apps Script Oluşturun

1. Google Sheets dosyanızı açın: https://docs.google.com/spreadsheets/d/1UI5AaBwIxMu_i8yIGAhIeUh6hKeC2RNfgxYUvcXM9vQ/

2. **Extensions** → **Apps Script** tıklayın

3. Açılan editörde tüm kodu silin ve şunu yapıştırın:

```javascript
function doPost(e) {
    try {
        const payload = JSON.parse(e.postData.contents);
        const ss = SpreadsheetApp.openById(payload.spreadsheetId);
        const sheet = ss.getSheetByName(payload.sheetName);
        
        if (!sheet) {
            // Sheet yoksa oluştur
            ss.insertSheet(payload.sheetName);
            const newSheet = ss.getSheetByName(payload.sheetName);
            
            // Header ekle
            if (payload.sheetName === '5. Gün Değerlendirme') {
                newSheet.appendRow(['Tarih', 'Ad Soyad', '3 Kelime', 'Öğrendiği Bilgi', 'Düşündüğü', 'Gelecek Fikri', 'Emoji', 'Yıldız']);
            } else if (payload.sheetName === 'Genel Değerlendirme') {
                newSheet.appendRow(['Tarih', 'Ad Soyad', '1. Etkinlik', '2. Etkinlik', '3. Etkinlik', 'Yorum']);
            }
        }
        
        // Verileri ekle
        const targetSheet = ss.getSheetByName(payload.sheetName);
        targetSheet.appendRow(payload.data);
        
        return ContentService.createTextOutput(JSON.stringify({success: true}))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
```

4. **Deploy** → **New Deployment** tıklayın

5. Type: **Web app** seçin

6. Execute as: Kendi hesabınız seçin

7. Who has access: **Anyone** seçin

8. **Deploy** tıklayın

9. **Authorization** gerekirse, Google hesabınıza erişim izni verin

### 2️⃣ Deployment URL'sini Kopyalayın

Deploy tamamlandıktan sonra:
- "New deployment created" mesajında **Web app URL**'sini kopyalayın
- Örnek: `https://script.google.com/macros/d/AKfyc...../usercopy`

### 3️⃣ URL'yi index.html dosyasına Ekleyin

GitHub repository'de `script.js` dosyasını açın ve şu satırı bulun:

```javascript
const SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_SCRIPT_DEPLOYMENT_ID/usercopy';
```

`YOUR_SCRIPT_DEPLOYMENT_ID` yerine 2. adımda kopyaladığınız URL'yi yapıştırın:

```javascript
const SCRIPT_URL = 'https://script.google.com/macros/d/AKfyc.../usercopy';
```

### 4️⃣ Tamamlandı! ✅

Artık:
- Uygulamada form gönderdiğinizde
- Veriler **LocalStorage**'da kaydedilir
- **Google Sheets**'e otomatik olarak yazılır
- Excel/CSV olarak indirebilirsiniz

---

## 🧪 Test Edin

1. Uygulamayı açın: https://asiyekertt.github.io/etnosteam2
2. Bir form doldurun
3. **Kaydet** tıklayın
4. Google Sheets'te "5. Gün Değerlendirme" veya "Genel Değerlendirme" sayfasını kontrol edin
5. Veriler otomatik olarak eklenmiş olmalı

---

## ⚠️ Sorun Giderme

**Veriler Google Sheets'e yazılmıyor:**
- Apps Script'in düzgün deploy edilip edilmediğini kontrol edin
- `SCRIPT_URL` değerinin doğru olup olmadığını kontrol edin
- Browser console'da (F12) hataları kontrol edin

**"Permission denied" hatası:**
- Apps Script'i "Anyone" erişimiyle deploy ettiğinizden emin olun

---

**Kurulum tamamlandı! 🎉**
