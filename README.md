# 🎨 Pixgen - AI Görsel Üretici

**Fikirlerinizi yapay zeka gücüyle çarpıcı görsellere dönüştürün.**

Pixgen, basit metin açıklamalarından nefes kesen görseller oluşturmak için Stable Diffusion XL teknolojisini kullanan modern, web tabanlı bir AI görsel üreticidir. Flask ile geliştirilmiş, animasyonlu grid arka planlar ve muhteşem görsel efektler içeren şık ve modern bir arayüze sahiptir.

![Pixgen Generated](static/images/generated_1.jpg)
![Pixgen Generated_2](static/images/generated_2.jpg)

## ✨ Özellikler

### 🎯 Temel İşlevsellik
- **AI Destekli Görsel Üretimi** - Stable Diffusion XL Base 1.0 ile güçlendirilmiş
- **Çoklu Görsel Boyutları** - Çeşitli en boy oranları ve çözünürlükler desteği
- **Gerçek Zamanlı İşleme** - Canlı üretim durumu ile görsellerinizin hayat bulmasını izleyin
- **Yüksek Kalite Çıktı** - Profesyonel kalitede görsel üretimi

### 🎨 Modern UI/UX
- **Ultra-Modern Tasarım** - Animasyonlu grid arka planlar ile şık arayüz
- **Etkileşimli Elemanlar** - Pürüzsüz animasyonlar ve duyarlı geri bildirim
- **Mobil Öncelikli** - Tüm cihazlarda çalışan tamamen duyarlı tasarım
- **Karanlık Tema** - Neon vurgular ile göz dostu karanlık arayüz

### 🚀 Gelişmiş Özellikler
- **Akıllı Öneriler** - Yaratıcılığı ilham veren önceden hazırlanmış promptlar
- **İndir ve Paylaş** - Kolay görsel indirme ve paylaşım özellikleri
- **İlerleme Takibi** - Güzel yükleme animasyonları ile gerçek zamanlı üretim ilerlemesi
- **Hata İşleme** - Kullanıcı dostu bildirimler ile kapsamlı hata işleme

## 🛠️ Teknoloji Yığını

### Backend
- **Flask** - Python web framework'ü
- **Hugging Face API** - AI model entegrasyonu
- **PIL (Pillow)** - Görsel işleme
- **Requests** - API çağrıları için HTTP istemcisi

### Frontend
- **HTML5/CSS3** - Modern web standartları
- **JavaScript ES6+** - Etkileşimli işlevsellik
- **Bootstrap 5** - Duyarlı grid sistemi
- **Font Awesome** - Güzel ikonlar
- **AOS (Animate On Scroll)** - Kaydırma animasyonları

### Stil
- **Özel CSS** - Elle hazırlanmış modern tasarım
- **CSS Grid & Flexbox** - Gelişmiş düzenler
- **CSS Animasyonları** - Pürüzsüz geçişler ve efektler
- **Backdrop Filtreler** - Modern cam-morfizm efektleri

## 🚀 Hızlı Başlangıç

### Önkoşullar
- Python 3.8 veya üzeri
- Hugging Face API token'ı
- Modern web tarayıcısı

### Kurulum

1. **Repoyu klonlayın**
   ```bash
   git clone https://github.com/kullaniciadi/pixgen.git
   cd pixgen
   ```

2. **Sanal ortam oluşturun**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows'ta: venv\Scripts\activate
   ```

3. **Bağımlılıkları yükleyin**
   ```bash
   pip install -r requirements.txt
   ```

4. **Ortam değişkenlerini ayarlayın**
   Proje kökünde bir `.env` dosyası oluşturun:
   ```env
   HF_TOKEN=hugging_face_token_buraya
   ```

5. **Uygulamayı çalıştırın**
   ```bash
   python app.py
   ```

6. **Tarayıcınızı açın**
   `http://localhost:5000` adresine gidin

## 🎯 Kullanım

### Temel Görsel Üretimi
1. AI Görsel Üretici bölümüne gidin
2. İstediğiniz görselin detaylı açıklamasını girin
3. Tercih ettiğiniz görsel boyutunu seçin
4. "Görsel Üret" butonuna tıklayın ve sihrin gerçekleşmesini izleyin!

### Örnek Promptlar
- `"Antik ağaçlar ve büyülü yaratıklar olan mistik bir orman"`
- `"Uçan arabalar ve neon ışıklar ile fütüristik şehir manzarası"`
- `"Canlı renkler ve akan desenler ile soyut sanat"`
- `"Altın yansımalar ile gün batımında sakin dağ manzarası"`

### Profesyonel İpuçları
- **Ayrıntılı Olun** - Promptunuz ne kadar detaylı olursa, sonuç o kadar iyi olur
- **Stil Anahtar Kelimeleri Kullanın** - "fotogerçekçi", "yağlıboya", "dijital sanat" gibi terimler ekleyin
- **Ruh Hali Belirtin** - "huzurlu", "dramatik", "kaprisli" gibi duygusal bağlam ekleyin
- **Detayları Dahil Edin** - Renkler, ışık, kompozisyon ve atmosfer hakkında bilgi verin

## 📁 Proje Yapısı

```
Pixgen/
├── app.py                 # Ana Flask uygulaması
├── static/
│   ├── css/
│   │   ├── style.css              # Ana stil dosyası
│   │   ├── custom-generator.css   # Üretici özel stilleri
│   │   └── ...                    # Ek stil dosyaları
│   ├── js/
│   │   ├── image-generator.js     # Üretici işlevselliği
│   │   └── ...                    # Diğer JavaScript dosyaları
│   └── images/
│       ├── generated/             # Üretilen görseller depolama
│       └── ...                    # Statik varlıklar
├── templates/
│   ├── base.html         # Temel şablon
│   ├── index.html        # Ana sayfa
│   └── ...               # Diğer şablonlar
├── .env                  # Ortam değişkenleri (bunu oluşturun)
├── requirements.txt      # Python bağımlılıkları
└── README.md            # Bu dosya
```

## 🎨 Tasarım Özellikleri

### Modern Grid Arka Plan
- Ekranda hafifçe hareket eden animasyonlu grid desenleri
- Derinlik ve görsel ilgi için çoklu katmanlı efektler
- Farklı ekran boyutlarına uyum sağlayan duyarlı tasarım

### Renk Şeması
- **Birincil**: Derin karanlık arka planlar (#0d0d0d)
- **Vurgu**: Cyan/Turkuaz (#00fcdb)
- **İkincil**: Mor gradyanları (#3500fc)
- **Metin**: Yüksek kontrastlı beyaz ve griler

### Animasyonlar
- Tüm etkileşimli elemanlar için pürüzsüz CSS geçişleri
- Arka planda yüzen parçacık efektleri
- Butonlar ve girişler için parlama ve nabız efektleri
- Kullanıcı geri bildirimi için kaydırmalı bildirimler

## 🔧 Yapılandırma

### Ortam Değişkenleri
Aşağıdaki değişkenlerle bir `.env` dosyası oluşturun:

```env
# Gerekli
HF_TOKEN=hugging_face_api_token_buraya

# Opsiyonel
FLASK_ENV=development
FLASK_DEBUG=True
```

### Desteklenen Görsel Boyutları
- **512×512** - Kare Standart (Hızlı üretim)
- **1024×1024** - Kare HD (Önerilen)
- **1024×512** - Yatay (Duvar kağıtları için harika)
- **512×1024** - Dikey (Mobil için mükemmel)
- **1536×1024** - Geniş ekran (Masaüstü arka planları)
- **768×1024** - Belge (A4 stili)

## 🚨 Hata İşleme

Uygulama kapsamlı hata işleme içerir:
- **API Zaman Aşımları** - Yavaş API yanıtlarının zarif işlenmesi
- **Geçersiz Promptlar** - Kullanıcı dostu doğrulama mesajları
- **Ağ Hataları** - Yeniden deneme mekanizmaları ve açık hata mesajları
- **Hız Sınırlaması** - API hız limitlerinin otomatik işlenmesi

## 🎯 Performans Optimizasyonları

- **Tembel Yükleme** - Görseller yalnızca gerektiğinde yüklenir
- **Verimli Önbellekleme** - Statik varlıkların akıllı önbelleklenmesi
- **Küçültülmüş Varlıklar** - Sıkıştırılmış CSS ve JavaScript
- **Aşamalı Geliştirme** - JavaScript devre dışı olsa bile çalışır

## 🤝 Katkıda Bulunma

Katkılarınızı memnuniyetle karşılıyoruz! Lütfen şu adımları takip edin:

1. Repoyu fork edin
2. Özellik dalı oluşturun (`git checkout -b feature/HarikaBirOzellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Harika bir özellik ekle'`)
4. Dalı push edin (`git push origin feature/HarikaBirOzellik`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır - detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🙏 Teşekkürler

- **Stability AI** - Muhteşem Stable Diffusion modeli için
- **Hugging Face** - API altyapısını sağladığı için
- **Flask Ekibi** - Mükemmel web framework'ü için
- **Topluluk** - İlham ve geri bildirim için

## 📞 Destek

Yardıma mı ihtiyacınız var? Seçenekleriniz:

- 📧 **E-posta**: destek@pixgen.com
- 🐛 **Sorunlar**: [GitHub Issues](https://github.com/CorenGt/Pixgen/issues)
- 💬 **Tartışmalar**: [GitHub Discussions](https://github.com/CorenGt/Pixgen/discussions)
- 📚 **Dokümantasyon**: [Wiki](https://github.com/CorenGt/Pixgen)

---

<div align="center">
  <h3>🌟 Bu projeyi faydalı bulduysanız yıldızlayın! 🌟</h3>
  <p>❤️ ile Pixgen Ekibi tarafından yapılmıştır</p>
</div> 
