# 🚀 Shartinary Technical Blueprint: Master Data (Categories, Tags, Places) & Itinerary Core

Dokumen ini merinci arsitektur teknis untuk pengelolaan Master Data (Categories, Tags, Places) dan bagaimana data tersebut berelasi dengan sistem Itinerary, menggunakan pendekatan "Master POI (Point of Interest)".

---

## 1. Skema Database & Relasi (Backend)
**Tujuan:** Membangun pangkalan data tempat wisata terpusat yang ideal untuk fitur *AI Search Recommendation* di masa depan.

### A. Entitas Master Data
- **`categories`**: Kategori utama yang menentukan identitas visual. Wajib memiliki field: `slug`, `name`, `icon` (emoji/string), dan `color` (hex/nama warna tailwind).
- **`tags`**: Label deskriptif (misal: "Halal", "Matcha", "Gen Z"). Field: `slug`, `name`.
- **`places`**: Direktori tempat fisik. Berelasi dengan `city_id` dan `category_id`. Menyimpan `name`, `address`, `latitude`, `longitude`.
- **`place_tag` (Pivot)**: Relasi *Many-to-Many* antara `places` dan `tags`.

### B. Entitas Itinerary (Core)
- **`itineraries`**: Header rencana perjalanan (`user_id`, `city_id`, `title`, `total_budget`, `is_public`).
- **`itinerary_days`**: Pembagian timeline per hari (`itinerary_id`, `day_number`, `theme`).
- **`itinerary_items`**: Detail aktivitas. **Wajib menyimpan `place_id`** (merujuk ke tabel master `places`), `time_start`, `time_end`, dan `estimated_cost` (yang dapat dioverride oleh user).

---

## 2. API Endpoints (Data Provider)

1. **`GET /api/categories`** & **`GET /api/tags`**
   - **Fungsi:** Mengambil data referensi untuk kebutuhan *dropdown*, filter, atau *legend* di Frontend.
   - **Cache:** Sangat disarankan untuk di-cache karena datanya statis.

2. **`GET /api/places`**
   - **Fungsi:** Mesin pencari tempat saat pengguna ingin menambah destinasi manual ke *itinerary* mereka.
   - **Query Params:** Mendukung `?city_id={id}&category_slug={slug}&search={keyword}`.
   - **Eager Loading:** Response harus me-*load* relasi `category` dan `tags`.

---

## 3. Logika AI Auto-Seeder (`GeminiService`)
**Tujuan:** Memastikan ekstraksi JSON dari Gemini tidak menduplikasi data, melainkan memperkaya Master `Places`.

**Algoritma Parsing (Backend):**
1. **Ekstrak Tags:** Untuk setiap tag dari AI, jalankan `Tag::firstOrCreate()`. Simpan ID-nya.
2. **Ekstrak Place:** Jalankan `Place::firstOrCreate()` menggunakan `name` dan `city_id` dari AI. Pastikan AI juga menyertakan `category_slug` yang valid untuk memetakan `category_id` pada tempat ini.
3. **Sync Relasi Pivot:** Jalankan `$place->tags()->sync([array_of_tag_ids])`.
4. **Attach ke Item:** Buat baris baru di `itinerary_items` dengan menyisipkan `$place->id` yang baru saja dicari/dibuat.

---

## 4. Frontend: Visual UI/UX (React)
**Tujuan:** Mengimplementasikan prinsip "Easy to Use" melalui kategorisasi visual.

### A. Dynamic Rendering Berbasis Kategori
- Setiap komponen `ActivityCard` atau `PlaceCard` di builder dan halaman detail **wajib** menggunakan properti `color` dan `icon` yang dibawa dari relasi `place.category`.
- *Use case:* Memberikan aksen warna *orange* di border kartu secara otomatis jika kategori tempatnya adalah "Kuliner".

### B. Komponen `TagChips`
- Lakukan *mapping* dari array `place.tags` menjadi *chip/badge* kecil yang dirender tepat di bawah nama tempat.
- *Use case:* Mempermudah pengguna melihat *highlight* tempat tersebut (misal: muncul *badge* "Hidden Gem" atau "Hemat").