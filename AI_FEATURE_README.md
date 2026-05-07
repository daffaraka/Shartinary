# 🤖 Shartinary: AI Auto-Generate Itinerary Feature

Dokumen ini menjelaskan rancangan arsitektur dan alur kerja untuk fitur **AI Auto-Generate Itinerary** pada platform Shartinary, menggunakan teknologi Google Gemini API.

---

## 🌟 Ringkasan Fitur
Fitur ini memungkinkan pengguna untuk membuat draft itinerary perjalanan secara otomatis hanya dengan memberikan beberapa kata kunci (destinasi, budget, durasi, dan tema). AI akan mengembalikan jadwal perjalanan yang terstruktur (per hari dan per jam), lengkap dengan estimasi budget dan saran perlengkapan.

## 🔄 Alur Kerja Pengguna (User Flow)
1. **Input Preferensi**: Pengguna mengisi form singkat di halaman *Create Itinerary*:
   - Kota Tujuan (misal: "Yogyakarta")
   - Durasi (misal: "3 Hari")
   - Budget (misal: "Rp 2.000.000")
   - Tema (misal: "Kuliner & Sejarah")
2. **AI Processing**: Frontend mengirim data ke Backend (Laravel). Backend akan menyusun *prompt* dan mengirimkannya ke Google Gemini API.
3. **Review & Edit**: AI mengembalikan data dalam format JSON. Frontend (React) merender data tersebut ke dalam bentuk *timeline/cards*.
4. **Finalisasi**: Pengguna bisa mengedit jadwal tersebut (menggeser jam, menghapus tempat, mengubah harga) sebelum menyimpannya ke *database* publik Shartinary.

---

## 🛠️ Arsitektur Teknis

### 1. Komponen yang Terlibat
* **Frontend (React/Tailwind)**: Menampilkan form input dan *drag-and-drop timeline* untuk hasil AI.
* **Backend (Laravel)**: Menjadi perantara (proxy) agar *API Key* Gemini tetap aman. Laravel menerima input user, memanggil Gemini API, dan mem-parsing hasilnya.
* **Google Gemini API (Gemini 1.5 Flash/Pro)**: Mesin AI utama untuk menghasilkan teks terstruktur.
* **Google Maps Places API (Opsional di tahap 2)**: Untuk memvalidasi nama tempat yang di-generate AI agar mendapatkan foto dan koordinat asli.

### 2. Strategi Prompting (Sistem AI)
Agar Gemini mengembalikan data yang bisa dibaca oleh sistem (bukan teks paragraf biasa), kita akan menggunakan teknik **JSON Strict Prompting**.

**Contoh Prompt yang dikirim Laravel ke Gemini:**
> "Kamu adalah expert travel planner. Buatkan itinerary untuk ke {Tujuan} selama {Durasi} hari dengan total budget sekitar {Budget}. Tema perjalanan adalah {Tema}. Kembalikan jawaban murni dalam format JSON dengan struktur: { days: [ { day: 1, activities: [ { time: '08:00', place: 'Nama Tempat', category: 'Kuliner', estimated_cost: 50000, description: '...' } ] } ], packing_list: ['...'] }. Jangan berikan teks apapun selain JSON."

### 3. Struktur Respon JSON Harapan
```json
{
  "total_estimated_budget": 1800000,
  "packing_list": ["Payung", "Kamera", "Obat Pribadi", "Sepatu Nyaman"],
  "days": [
    {
      "day_number": 1,
      "theme": "Eksplorasi Budaya",
      "activities": [
        {
          "time_start": "08:00",
          "time_end": "10:00",
          "place": "Keraton Yogyakarta",
          "category": "Sejarah",
          "estimated_cost": 25000,
          "description": "Melihat peninggalan sejarah dan budaya keraton."
        },
        {
          "time_start": "10:30",
          "time_end": "12:00",
          "place": "Gudeg Yu Djum",
          "category": "Kuliner",
          "estimated_cost": 40000,
          "description": "Sarapan sekaligus makan siang dengan hidangan khas."
        }
      ]
    }
  ]
}
```

---

## 🚀 Fase Pengembangan Selanjutnya

Jika ingin mulai mengembangkan fitur ini, berikut langkah urutannya:
1. **Dapatkan API Key**: Daftar dan dapatkan API Key dari [Google AI Studio](https://aistudio.google.com/).
2. **Setup Laravel API**: Buat endpoint `POST /api/generate-itinerary` di Laravel yang terhubung ke package `google-gemini-php`.
3. **Buat UI Form React**: Buat komponen `AIItineraryGenerator.jsx` yang memiliki form input preferensi perjalanan.
4. **Integrasi & State Management**: Hubungkan React dengan Laravel, tangkap JSON hasil AI, dan simpan ke `itineraryDraftStore` (Zustand) agar bisa diedit user.
