// Veri Depolama
const DATA_KEY = 'evaluations_data';

// DOM Elements
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const day5Form = document.getElementById('day5Form');
const generalForm = document.getElementById('generalForm');
const successMessage = document.getElementById('successMessage');

// Tab Navigation
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        switchTab(tabName);
    });
});

function switchTab(tabName) {
    // Hide all tabs
    tabContents.forEach(content => content.classList.remove('active'));
    navBtns.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

// Emoji Selection
document.querySelectorAll('.emoji-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        document.getElementById('day5_emoji').value = btn.getAttribute('data-emoji');
    });
});

// Star Rating
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', (e) => {
        e.preventDefault();
        const rating = star.getAttribute('data-rating');
        document.querySelectorAll('.star').forEach((s, index) => {
            if (index < rating) {
                s.classList.add('selected');
            } else {
                s.classList.remove('selected');
            }
        });
        document.getElementById('day5_rating').value = rating;
    });
});

// 5. Gün Form Submit
day5Form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        type: 'day5',
        timestamp: new Date().toLocaleString('tr-TR'),
        name: document.getElementById('name').value,
        threeWords: document.getElementById('day5_example').value,
        learning: document.getElementById('day5_learning').value,
        thinking: document.getElementById('day5_activity').value,
        future: document.getElementById('day5_future').value,
        emoji: document.getElementById('day5_emoji').value,
        rating: document.getElementById('day5_rating').value
    };

    saveData(formData);
    showSuccessMessage();
    day5Form.reset();
    document.querySelectorAll('.emoji-btn, .star').forEach(btn => btn.classList.remove('selected'));
    updateStats();
});

// Genel Form Submit
generalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        type: 'general',
        timestamp: new Date().toLocaleString('tr-TR'),
        name: document.getElementById('general_name').value,
        activity1: document.getElementById('activity1').value,
        activity2: document.getElementById('activity2').value,
        activity3: document.getElementById('activity3').value,
        comment: document.getElementById('general_comment').value
    };

    saveData(formData);
    showSuccessMessage();
    generalForm.reset();
    updateWordcloud();
    updateStats();
});

// Veri Kaydetme
function saveData(data) {
    let allData = JSON.parse(localStorage.getItem(DATA_KEY)) || [];
    allData.push(data);
    localStorage.setItem(DATA_KEY, JSON.stringify(allData));
}

// Başarı Mesajı
function showSuccessMessage() {
    successMessage.classList.remove('hidden');
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 3000);
}

// İstatistikler Güncelle
function updateStats() {
    const allData = JSON.parse(localStorage.getItem(DATA_KEY)) || [];
    const day5Count = allData.filter(d => d.type === 'day5').length;
    const generalCount = allData.filter(d => d.type === 'general').length;
    
    document.getElementById('day5Count').textContent = day5Count;
    document.getElementById('generalCount').textContent = generalCount;
}

// Kelime Bulutu Oluştur
function updateWordcloud() {
    const allData = JSON.parse(localStorage.getItem(DATA_KEY)) || [];
    const generalData = allData.filter(d => d.type === 'general');
    
    const wordFrequency = {};
    
    generalData.forEach(record => {
        const activities = [record.activity1, record.activity2, record.activity3].filter(Boolean);
        activities.forEach(activity => {
            const words = activity.split(' ');
            words.forEach(word => {
                const cleanWord = word.toLowerCase().trim();
                if (cleanWord.length > 2) {
                    wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1;
                }
            });
        });
    });
    
    if (Object.keys(wordFrequency).length === 0) {
        document.getElementById('wordcloud').innerHTML = '<p style="color: #999;">Henüz veri yok...</p>';
        return;
    }
    
    // Kelime sıklıklarını sırala
    const sortedWords = Object.entries(wordFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 30);
    
    const maxFreq = Math.max(...sortedWords.map(([_, freq]) => freq));
    const minFreq = Math.min(...sortedWords.map(([_, freq]) => freq));
    
    const wordcloud = document.getElementById('wordcloud');
    wordcloud.innerHTML = '';
    
    sortedWords.forEach(([word, freq]) => {
        const sizeIndex = Math.ceil(((freq - minFreq) / (maxFreq - minFreq)) * 5) || 1;
        const wordEl = document.createElement('span');
        wordEl.className = `word word-size-${sizeIndex}`;
        wordEl.textContent = word;
        wordcloud.appendChild(wordEl);
    });
}

// Excel İndir
document.getElementById('downloadExcel').addEventListener('click', () => {
    const allData = JSON.parse(localStorage.getItem(DATA_KEY)) || [];
    
    if (allData.length === 0) {
        alert('İndirilecek veri yok!');
        return;
    }
    
    // 5. Gün Verileri
    const day5Data = allData.filter(d => d.type === 'day5').map(d => ({
        'Tarih': d.timestamp,
        'Ad Soyad': d.name,
        '3 Kelime': d.threeWords,
        'Öğrendiği Bilgi': d.learning,
        'Düşündüğü': d.thinking,
        'Gelecek Fikri': d.future,
        'Emoji': d.emoji,
        'Yıldız': d.rating
    }));
    
    // Genel Değerlendirme Verileri
    const generalData = allData.filter(d => d.type === 'general').map(d => ({
        'Tarih': d.timestamp,
        'Ad Soyad': d.name,
        '1. Etkinlik': d.activity1,
        '2. Etkinlik': d.activity2,
        '3. Etkinlik': d.activity3,
        'Yorum': d.comment
    }));
    
    // Workbook Oluştur
    const wb = XLSX.utils.book_new();
    
    if (day5Data.length > 0) {
        const ws1 = XLSX.utils.json_to_sheet(day5Data);
        XLSX.utils.book_append_sheet(wb, ws1, '5. Gün Değerlendirme');
    }
    
    if (generalData.length > 0) {
        const ws2 = XLSX.utils.json_to_sheet(generalData);
        XLSX.utils.book_append_sheet(wb, ws2, 'Genel Değerlendirme');
    }
    
    XLSX.writeFile(wb, `etnosteam_evaluations_${new Date().toISOString().slice(0, 10)}.xlsx`);
});

// CSV İndir
document.getElementById('downloadCSV').addEventListener('click', () => {
    const allData = JSON.parse(localStorage.getItem(DATA_KEY)) || [];
    
    if (allData.length === 0) {
        alert('İndirilecek veri yok!');
        return;
    }
    
    let csv = 'Tip,Tarih,Ad Soyad,Detaylar\n';
    
    allData.forEach(d => {
        if (d.type === 'day5') {
            csv += `"5. Gün","${d.timestamp}","${d.name}","3 Kelime: ${d.threeWords} | Öğrenme: ${d.learning}"\n`;
        } else {
            csv += `"Genel","${d.timestamp}","${d.name}","Etkinlikler: ${d.activity1}, ${d.activity2}, ${d.activity3}"\n`;
        }
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `etnosteam_evaluations_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
});

// Verileri Temizle
document.getElementById('clearData').addEventListener('click', () => {
    if (confirm('Tüm verileri silmek istediğinize emin misiniz? Bu işlem geri alınamaz!')) {
        localStorage.removeItem(DATA_KEY);
        updateStats();
        updateWordcloud();
        showSuccessMessage();
        alert('Tüm veriler silindi!');
    }
});

// Kelime Bulutu Yenile
document.getElementById('refreshWordcloud').addEventListener('click', () => {
    updateWordcloud();
    showSuccessMessage();
});

// Sayfa Yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    updateWordcloud();
});
