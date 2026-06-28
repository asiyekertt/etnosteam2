// Google Apps Script - Google Sheets'e veri yazmak için
// Bu kodu Google Sheets'te Apps Script editöründe çalıştırın

function doPost(e) {
    try {
        const payload = JSON.parse(e.postData.contents);
        const ss = SpreadsheetApp.openById(payload.spreadsheetId);
        const sheet = ss.getSheetByName(payload.sheetName);
        
        if (!sheet) {
            return ContentService.createTextOutput(JSON.stringify({success: false, error: 'Sheet not found'}))
                .setMimeType(ContentService.MimeType.JSON);
        }
        
        // Verileri ekle
        sheet.appendRow(payload.data);
        
        return ContentService.createTextOutput(JSON.stringify({success: true}))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Sheeti oluşturmak için (ilk defa çalıştırın)
function createSheets() {
    const ss = SpreadsheetApp.openById('1UI5AaBwIxMu_i8yIGAhIeUh6hKeC2RNfgxYUvcXM9vQ');
    
    // 5. Gün Değerlendirme sheeti
    let sheet1 = ss.getSheetByName('5. Gün Değerlendirme');
    if (!sheet1) {
        sheet1 = ss.insertSheet('5. Gün Değerlendirme');
    }
    sheet1.clear();
    sheet1.appendRow(['Tarih', 'Ad Soyad', '3 Kelime', 'Öğrendiği Bilgi', 'Düşündüğü', 'Gelecek Fikri', 'Emoji', 'Yıldız']);
    
    // Genel Değerlendirme sheeti
    let sheet2 = ss.getSheetByName('Genel Değerlendirme');
    if (!sheet2) {
        sheet2 = ss.insertSheet('Genel Değerlendirme');
    }
    sheet2.clear();
    sheet2.appendRow(['Tarih', 'Ad Soyad', '1. Etkinlik', '2. Etkinlik', '3. Etkinlik', 'Yorum']);
}
