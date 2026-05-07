# Shartinary: Kategori & Tags Documentation

Dokumen ini mendefinisikan standar kategori dan pelabelan (tagging) untuk seluruh tempat (Points of Interest) di dalam ekosistem Shartinary.

---

## 1. Primary Categories (Kategori Induk)
Setiap tempat **wajib** memiliki satu kategori utama yang menentukan identitas visualnya (Warna & Ikon) di UI.

| Slug (Database) | Ikon | Warna Utama | Penggunaan |
| :--- | :---: | :--- | :--- |
| `kuliner` | 🍔 | Orange | Restoran, cafe, bar, coffee shop, jajanan pasar. |
| `belanja` | 🛍️ | Purple | Pusat perbelanjaan, pasar, outlet, toko oleh-oleh. |
| `hiburan` | 🎢 | Blue | Atraksi berbayar, kebun binatang, taman hiburan, nightlife. |
| `alam_wisata` | 🌲 | Green | Wisata alam terbuka, taman, pantai, pegunungan. |
| `seni_budaya` | 🏛️ | Yellow | Situs bersejarah, museum, galeri, candi, teater. |
| `akomodasi` | 🛏️ | Stone | Penginapan, hotel, camping ground, villa. |
| `transit` | 🚌 | Gray | Bandara, stasiun, terminal, SPBU, rest area. |

---

## 2. Sistem Tags (Multi-Label)
Tags bersifat opsional dan bisa berjumlah banyak untuk setiap tempat. Digunakan untuk filter mendalam dan kecerdasan AI.

### A. Tags Filter Populer (Kebutuhan User)
- **`Halal`**: Wajib untuk mayoritas pasar Indonesia.
- **`Kids Friendly`**: Untuk target pasar keluarga (playground, baby room).
- **`Instagrammable`**: Untuk daya tarik visual/spot foto.
- **`Hidden Gem`**: Memberikan kesan eksklusivitas.

### B. Tags Vibe & Budget
- `Hemat` (Budget friendly)
- `Mewah` (Premium/Luxury)
- `Santai` (Slow travel)
- `Petualangan` (High energy/Outdoor)
- `Malam` (Hanya buka/seru saat malam hari)

---

## 3. Manfaat Teknis
1. **Visual Pie Chart**: Frontend (React) dapat langsung menghitung persentase kategori untuk membuat grafik "Komposisi Perjalanan".
2. **AI Semantic Matching**: Gemini AI akan menggunakan tags ini untuk mencocokkan prompt user (misal: "Cari tempat *Instagrammable* di Bali").
3. **SEO & Navigation**: Tags mempermudah pengindeksan pencarian di halaman `/explore`.

---
*Dibuat untuk keperluan Proyek Shartinary - #JuaraVibeCoding*
