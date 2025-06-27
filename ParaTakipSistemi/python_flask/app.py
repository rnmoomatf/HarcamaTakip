from flask import Flask, request, jsonify
import requests
from datetime import datetime

app = Flask(__name__)
COUCHDB_URL = 'http://localhost:5984/harcamalar'

# ➕ Ekleme
@app.route('/ekle', methods=['POST'])
def ekle():
    veri = request.json
    veri['tarih'] = datetime.utcnow().isoformat()
    response = requests.post(COUCHDB_URL, json=veri)
    return jsonify(response.json())

# 📄 Listeleme
@app.route('/liste', methods=['GET'])
def liste():
    response = requests.get(f"{COUCHDB_URL}/_all_docs?include_docs=true")
    return jsonify(response.json())

# ✏️ Güncelleme
@app.route('/guncelle/<id>', methods=['PUT'])
def guncelle(id):
    guncel_veri = request.json
    if '_rev' not in guncel_veri:
        return jsonify({'error': '_rev bilgisi eksik'}), 400
    guncel_veri['_id'] = id
    response = requests.put(f"{COUCHDB_URL}/{id}", json=guncel_veri)
    return jsonify(response.json())

# 🗑️ Silme
@app.route('/sil/<id>/<rev>', methods=['DELETE'])
def sil(id, rev):
    response = requests.delete(f"{COUCHDB_URL}/{id}?rev={rev}")
    return jsonify(response.json())

# Ana sayfa
@app.route("/", methods=["GET"])
def index():
    return "<p>Flask Harcama Takip Sistemi çalışıyor! <a href='/liste'>Kayıtları Listele</a></p>"

if __name__ == '__main__':
    app.run(debug=True)

