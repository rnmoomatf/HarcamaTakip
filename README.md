
# 💰 Harcama Takip Sistemi – CouchDB Tabanlı Web Uygulaması

**Harcama Takip Sistemi**, bireylerin gelir ve giderlerini kolayca takip edebilecekleri, web tabanlı, kullanıcı dostu bir projedir. Bu proje hem frontend (HTML, CSS, JavaScript) hem de backend (Flask & Express.js) teknolojileri kullanılarak geliştirilmiştir. Veritabanı katmanında NoSQL mimarili **Apache CouchDB** tercih edilmiştir.

---

## 🎯 Amaç

Bu uygulamanın temel amacı, **CouchDB** kullanarak gerçek zamanlı veri kaydı, listeleme, güncelleme ve silme işlemlerinin yapılabildiği HTML/CSS/JS ile kullanıcı dostu arayüze sahip bir sistem geliştirmektir.  
Hem **Python (Flask)** hem de **Node.js (Express.js)** ile CouchDB entegrasyonu sağlanarak, uygulamanın iki farklı backend altyapısıyla çalışabilmesi hedeflenmiştir.

---

## 🔧 Özellikler

- ✅ Harcama ve gelir ekleme  
- 📋 Kayıt listeleme  
- 🖊️ Kayıt güncelleme  
- 🗑️ Kayıt silme  
- 📊 Aylık toplam gelir-gider analizi  
- 🧠 Kategorilere göre harcama dökümü  
- 💻 Express.js ve Flask backend alternatifleri  
- 🧱 CouchDB NoSQL veritabanı ile esnek veri yönetimi  

---

## 🛠️ Kullanılan Teknolojiler

### Frontend
- HTML5  
- CSS3  
- Vanilla JavaScript  

### Backend
- Node.js (Express.js)  
- Python (Flask)  

### Veritabanı
- Apache CouchDB  

### API İletişimi
- RESTful servisler (JSON)

---

## 🧪 Kazanımlar / Deneyim

Bu proje ile:

- RESTful API oluşturma ve test etme,
- CouchDB ile belge tabanlı veri yönetimi,
- Frontend & Backend entegrasyonu,
- JavaScript ile dinamik içerik oluşturma,
- Python ve Node.js ile CouchDB işlemleri yapma

konularında pratik deneyim kazanılmıştır.

---

## ⚙️ Kurulum ve Çalıştırma

- CouchDB yüklü ve `localhost:5984` üzerinde çalışıyor olmalıdır. 
-Tarayıcıdan `http://localhost:5984/_utils` adresine giderek veritabanını görüntüleyebilirsiniz. 
- Kullanıcı adı: `admin`, Şifre: `123456` şeklinde yapılandırılmıştır.
-Veritabanı olarak CouchDB'nin harcamalar isimli veritabanı kullanılmaktadır.
-Sunucu ilk çalıştırıldığında bu veritabanı otomatik olarak oluşturulur (eğer yoksa). 
-Gerekirse harcamalar isimli veritabanını CouchDB'de manuel olarak oluşturabilirsiniz.
-Node.js sunucusu ile birlikte `public/` klasöründeki dosyalar otomatik olarak servis edilir.  
-Express.js sunucusu http://localhost:5500 adresinde çalışmaktadır. 
-Sunucuyu çalıştırdıktan sonra `http://localhost:5500` adresinden arayüze erişebilirsiniz.

### 📦 Node.js Sunucusu (Express + CouchDB)

```bash
npm install
node server.js
```

### 🐍 Flask Sunucusu:

```bash
cd python_flask
pip install flask
python app.py
```

---

## 🖼️ Proje Ekran Görüntüsü

![Proje Görüntüsü](https://raw.githubusercontent.com/rnmoomatf/HarcamaTakip/refs/heads/main/Harcama_Takip.png)

---

## 🔗 Bağlantılar

- 💻 [GitHub Projesi](https://github.com/rnmoomatf/HarcamaTakip.git)
- 👤 [LinkedIn Profilim](https://www.linkedin.com/in/rnmoo-matf-502517336/)

---

## 📌 Notlar

Bu proje eğitim amaçlıdır. Geliştirilmeye açıktır. Her türlü katkıya ve geri bildirime açığım. 🙌
Soru ve önerileriniz için benimle iletişime geçebilirsiniz.  
Projeyi faydalı bulduysanız ⭐ bırakmayı unutmayın!

---

&copy; 2025 HarcamaTakip – Tüm hakları saklıdır.
