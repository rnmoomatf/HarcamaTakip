const express = require("express");
const bodyParser = require("body-parser");
const nano = require("nano")("http://admin:123456@localhost:5984"); // CouchDB bağlantı
const app = express();
const port = 5500;

app.use(bodyParser.json());
app.use(express.static("public")); // public klasöründeki frontend dosyalarını sunar

let db;

// Veritabanını başlat: varsa kullan, yoksa oluştur
async function initDB() {
  try {
    const dbList = await nano.db.list();
    if (!dbList.includes("harcamalar")) {
      await nano.db.create("harcamalar");
      console.log("✅ 'harcamalar' veritabanı oluşturuldu.");
    } else {
      console.log("✅ 'harcamalar' veritabanı zaten mevcut.");
    }
    db = nano.db.use("harcamalar");
  } catch (err) {
    console.error("❌ Veritabanı oluşturulamadı:", err);
  }
}

// Veri ekleme endpoint
app.post("/ekle", async (req, res) => {
  const veri = { ...req.body, tarih: new Date().toISOString() };
  try {
    const result = await db.insert(veri);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Kayıtları listeleme endpoint
app.get("/liste", async (req, res) => {
  try {
    const data = await db.list({ include_docs: true });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Güncelleme endpoint
app.put("/guncelle/:id", async (req, res) => {
  const id = req.params.id;
  const updatedDoc = req.body;

  if (!updatedDoc._rev) {
    return res.status(400).json({ error: "_rev bilgisi zorunludur." });
  }

  try {
    const result = await db.insert(updatedDoc);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Silme endpoint
app.delete("/sil/:id/:rev", async (req, res) => {
  const id = req.params.id;
  const rev = req.params.rev;

  try {
    const result = await db.destroy(id, rev);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Anasayfa
app.get("/", (req, res) => {
  res.send(
    "<h2>Node.js Harcama Takip API Çalışıyor</h2><p><a href='/liste'>Kayıtları Listele</a></p>"
  );
});

// Sunucuyu başlat
app.listen(port, async () => {
  console.log(`🚀 Sunucu http://localhost:${port} adresinde çalışıyor`);
  await initDB();
});
