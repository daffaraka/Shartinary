# 🚀 Shartinary Technical Blueprint: Location Hierarchy (Country, Province, City)

Dokumen ini merinci spesifikasi teknis untuk implementasi fitur Master Data Lokasi pada platform Shartinary, mulai dari Backend (API) hingga Frontend (Cascading Dropdown).

---

## 1. Backend: API Endpoints (Master Lokasi)
**Tujuan:** Menyediakan data berjenjang untuk kebutuhan filter atau form pembuatan Itinerary.

### A. Endpoint List
1. **`GET /api/countries`**
   - **Fungsi:** Mengambil daftar semua negara yang aktif.
   - **Response:** `[ { "id": 1, "name": "Indonesia", "slug": "indonesia" } ]`

2. **`GET /api/provinces`**
   - **Fungsi:** Mengambil daftar provinsi.
   - **Query Parameter:** `?country_id=1` (Wajib untuk filter berdasarkan negara).
   - **Response:** `[ { "id": 1, "country_id": 1, "name": "Jawa Tengah", "slug": "jawa-tengah" } ]`

3. **`GET /api/cities`**
   - **Fungsi:** Mengambil daftar kota/kabupaten.
   - **Query Parameter:** `?province_id=1` (Wajib untuk filter berdasarkan provinsi).
   - **Response:** `[ { "id": 1, "province_id": 1, "name": "Semarang", "slug": "semarang", "image_url": "..." } ]`

*(Catatan: Semua endpoint di atas harus memiliki response yang cepat, bisa dipertimbangkan menggunakan Redis Cache di Laravel karena data lokasi jarang berubah).*

---

## 2. Frontend: Location Selector Architecture
**Tujuan:** Membuat komponen UI Dropdown berjenjang yang interaktif dan "Easy to Use".

### A. State Management (React / Zustand)
**Store Name:** `useLocationStore` atau langsung di dalam `useItineraryStore`
**Core States:**
- `countries`: Array data negara.
- `provinces`: Array data provinsi (berubah sesuai negara terpilih).
- `cities`: Array data kota (berubah sesuai provinsi terpilih).
- `selectedCountry`: ID negara yang dipilih.
- `selectedProvince`: ID provinsi yang dipilih.
- `selectedCity`: ID kota yang dipilih (Data akhir yang akan dikirim saat *submit*).
- `isLoading`: Object untuk *loading state* masing-masing dropdown.

**Core Actions:**
- `fetchCountries()`: Dipanggil saat komponen pertama kali dimuat.
- `onCountryChange(countryId)`: Reset `selectedProvince` & `selectedCity`, lalu jalankan `fetchProvinces(countryId)`.
- `onProvinceChange(provinceId)`: Reset `selectedCity`, lalu jalankan `fetchCities(provinceId)`.

### B. UI Component: `CascadingLocationSelect`
Komponen ini akan terdiri dari 3 elemen `<select>` (atau library seperti `react-select`):
1. **Pilih Negara:** Selalu aktif.
2. **Pilih Provinsi:** *Disabled* sampai Negara dipilih. Menampilkan indikator *loading* saat memuat data.
3. **Pilih Kota:** *Disabled* sampai Provinsi dipilih. Menampilkan indikator *loading* saat memuat data.

### C. UX Considerations
- Jika pengguna mengubah Negara setelah memilih Kota, maka input Provinsi dan Kota harus otomatis dikosongkan untuk mencegah ketidaksesuaian data.
- Menampilkan pesan *"Data tidak ditemukan"* jika sebuah provinsi belum memiliki data kota di database.