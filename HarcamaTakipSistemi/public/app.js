const API_URL = 'http://localhost:5500'; // Express sunucu adresi

// Miktar alanını otomatik formatla (1.000,50 gibi)
const miktarInput = document.getElementById('miktar');
miktarInput.addEventListener('input', (e) => {
    let value = e.target.value;

    // Harfleri temizle
    value = value.replace(/[^\d,\.]/g, "");

    // Noktaları kaldır, virgülden böl
    let parts = value.replace(/\./g, "").split(",");
    let integerPart = parts[0];
    let decimalPart = parts[1] ? "," + parts[1].slice(0, 2) : "";

    // Binlik ayraç ekle
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    e.target.value = integerPart + decimalPart;
});

let guncellenenId = null;
let guncellenenRev = null;

async function ekle() {
    const miktarHam = document.getElementById('miktar').value;
    const miktarSayisal = parseFloat(miktarHam.replace(/\./g, '').replace(',', '.'));

    const harcama = {
        aciklama: document.getElementById('aciklama').value,
        miktar: miktarSayisal,
        tip: document.getElementById('tip').value,
        kategori: document.getElementById('kategori').value,
        tarih: new Date().toISOString()
    };

    try {
        const response = await fetch(`${API_URL}/ekle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(harcama)
        });
        const data = await response.json();
        if (data.ok || data.id) {
            alert("Kayıt eklendi!");
            temizleForm();
            listele();
            raporOlustur();
        } else {
            alert("Ekleme başarısız!");
        }
    } catch (error) {
        console.error("Ekleme hatası:", error);
    }
}

async function listele() {
    try {
        const response = await fetch(`${API_URL}/liste`);
        const data = await response.json();
        const liste = document.getElementById('liste');

        while (liste.rows.length > 1) liste.deleteRow(1);

        data.rows.forEach(row => {
            if (row.doc) {
                const doc = row.doc;
                const tr = liste.insertRow();

                tr.insertCell().textContent = new Date(doc.tarih).toLocaleDateString();
                tr.insertCell().textContent = doc.aciklama;
                tr.insertCell().textContent = doc.kategori;
                tr.insertCell().textContent = doc.tip;
                tr.insertCell().textContent = doc.miktar.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                const islemCell = tr.insertCell();

                // Güncelle butonu
                const guncelleBtn = document.createElement('button');
                guncelleBtn.textContent = 'Güncelle';
                guncelleBtn.onclick = () => baslatGuncelleme(doc);
                islemCell.appendChild(guncelleBtn);

                // Sil butonu
                const silBtn = document.createElement('button');
                silBtn.textContent = 'Sil';
                silBtn.style.marginLeft = '8px';
                silBtn.onclick = () => sil(doc._id, doc._rev);
                islemCell.appendChild(silBtn);
            }
        });
    } catch (error) {
        console.error("Listeleme hatası:", error);
    }
}

async function sil(id, rev) {
    if (!confirm('Bu kaydı silmek istediğinize emin misiniz?')) return;

    try {
        const response = await fetch(`${API_URL}/sil/${id}/${rev}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        if (data.ok) {
            alert('Kayıt silindi!');
            await listele();
            await raporOlustur();
        } else {
            alert('Silme başarısız!');
        }
    } catch (error) {
        console.error('Silme hatası:', error);
    }
}

function baslatGuncelleme(doc) {
    document.getElementById('aciklama').value = doc.aciklama;
    document.getElementById('tip').value = doc.tip;
    document.getElementById('kategori').value = doc.kategori;

    document.getElementById('miktar').value = doc.miktar.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    guncellenenId = doc._id;
    guncellenenRev = doc._rev;

    const btn = document.querySelector('button[onclick="ekle()"]');
    btn.textContent = 'Güncelle';
    btn.onclick = guncelle;
}

async function guncelle() {
    if (!guncellenenId || !guncellenenRev) {
        alert('Güncellenecek kayıt seçilmedi!');
        return;
    }

    const miktarHam = document.getElementById('miktar').value;
    const miktarSayisal = parseFloat(miktarHam.replace(/\./g, '').replace(',', '.'));

    const harcama = {
        _id: guncellenenId,
        _rev: guncellenenRev,
        aciklama: document.getElementById('aciklama').value,
        miktar: miktarSayisal,
        tip: document.getElementById('tip').value,
        kategori: document.getElementById('kategori').value,
        tarih: new Date().toISOString()
    };

    try {
        const response = await fetch(`${API_URL}/guncelle/${guncellenenId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(harcama)
        });
        const data = await response.json();
        if (data.ok) {
            alert('Kayıt güncellendi!');
            guncellenenId = null;
            guncellenenRev = null;

            const btn = document.querySelector('button[onclick="guncelle()"]');
            btn.textContent = 'Ekle';
            btn.onclick = ekle;

            temizleForm();
            listele();
            raporOlustur();
        } else {
            alert('Güncelleme başarısız!');
        }
    } catch (error) {
        console.error('Güncelleme hatası:', error);
    }
}

function temizleForm() {
    document.getElementById('aciklama').value = '';
    document.getElementById('miktar').value = '';
    document.getElementById('tip').value = 'gider';
    document.getElementById('kategori').value = 'fatura';
}

async function raporOlustur() {
    try {
        const response = await fetch(`${API_URL}/liste`);
        const data = await response.json();

        const rapor = {
            toplamGelir: 0,
            toplamGider: 0,
            kategoriler: {}
        };

        data.rows.forEach(row => {
            if (row.doc) {
                const doc = row.doc;
                if (doc.tip === 'gelir') {
                    rapor.toplamGelir += doc.miktar;
                } else {
                    rapor.toplamGider += doc.miktar;
                }

                if (!rapor.kategoriler[doc.kategori]) {
                    rapor.kategoriler[doc.kategori] = 0;
                }
                rapor.kategoriler[doc.kategori] += doc.miktar;
            }
        });

        const raporDiv = document.getElementById('rapor');
        raporDiv.innerHTML = `
            <p><strong>Toplam Gelir:</strong> ${rapor.toplamGelir.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</p>
            <p><strong>Toplam Gider:</strong> ${rapor.toplamGider.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</p>
            <p><strong>Bakiye:</strong> ${(rapor.toplamGelir - rapor.toplamGider).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</p>
            <h3>Kategori Analizleri</h3>
            ${Object.entries(rapor.kategoriler).map(([kategori, miktar]) => `
                <p>${kategori}: ${miktar.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</p>
            `).join('')}
        `;
    } catch (error) {
        console.error("Rapor hatası:", error);
    }
}

window.onload = async () => {
    await listele();
    await raporOlustur();
};
