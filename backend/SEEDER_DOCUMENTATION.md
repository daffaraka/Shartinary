# 📋 Seeder Documentation - Master Data & Places

Dokumentasi lengkap tentang seeder yang telah dibuat untuk mengelola Master Data (Countries, Provinces, Cities, Categories, Tags, Places).

---

## 🏗️ Struktur Seeder

### 1. **CountrySeeder**
Menambahkan data negara-negara di Asia Tenggara.

**Data yang ditambahkan:**
- Indonesia (ID)
- Singapore (SG)
- Malaysia (MY)
- Thailand (TH)
- Vietnam (VN)

**File:** `backend/database/seeders/CountrySeeder.php`

---

### 2. **ProvinceSeeder**
Menambahkan data provinsi/state untuk setiap negara.

**Data yang ditambahkan:**
- Indonesia: DKI Jakarta, Jawa Barat, Bali, DIY Yogyakarta
- Malaysia: Kuala Lumpur, Selangor
- Thailand: Bangkok
- Vietnam: Ho Chi Minh City
- Singapore: Singapore (sebagai province)

**File:** `backend/database/seeders/ProvinceSeeder.php`

---

### 3. **CitySeeder**
Menambahkan data kota untuk setiap provinsi.

**Data yang ditambahkan:**
- Jakarta, Bandung, Bali, Yogyakarta (Indonesia)
- Kuala Lumpur (Malaysia)
- Bangkok (Thailand)
- Singapore (Singapore)

**File:** `backend/database/seeders/CitySeeder.php`

---

### 4. **CategorySeeder**
Menambahkan kategori tempat wisata dengan icon dan warna.

**Kategori yang ditambahkan:**
| Kategori | Icon | Warna |
|----------|------|-------|
| Kuliner | 🍽️ | orange |
| Hiburan | 🎭 | purple |
| Alam | 🏞️ | green |
| Budaya | 🏛️ | amber |
| Belanja | 🛍️ | pink |
| Olahraga | ⚽ | blue |
| Relaksasi | 🧘 | cyan |
| Fotografi | 📸 | indigo |

**File:** `backend/database/seeders/CategorySeeder.php`

---

### 5. **TagSeeder**
Menambahkan tag deskriptif untuk places.

**Tag yang ditambahkan:**
- Halal, Vegetarian, Vegan, Matcha
- Gen Z, Hidden Gem, Hemat, Instagrammable
- Pet Friendly, Family Friendly, Romantic, Adventurous
- Luxury, Budget, Trending, Local Favorite

**File:** `backend/database/seeders/TagSeeder.php`

---

### 6. **PlaceSeeder**
Menambahkan tempat wisata (POI) dengan relasi ke city, category, dan tags.

**Tempat yang ditambahkan:**

#### Jakarta (5 tempat)
- Soto Ayam Borobudur (Kuliner)
- Kafe Betawi (Kuliner)
- Taman Mini Indonesia Indah (Budaya)
- Grand Indonesia (Belanja)
- Kota Tua Jakarta (Fotografi)

#### Bandung (4 tempat)
- Tangkuban Perahu (Alam)
- Kawah Putih (Fotografi)
- Dusun Bambu (Relaksasi)
- Pasar Baru Bandung (Belanja)

#### Bali (5 tempat)
- Pura Tanah Lot (Budaya)
- Ubud Monkey Forest (Alam)
- Tegallalang Rice Terrace (Fotografi)
- Warung Biah (Kuliner)
- Spa Bali (Relaksasi)

#### Singapore (4 tempat)
- Marina Bay Sands (Hiburan)
- Gardens by the Bay (Alam)
- Orchard Road (Belanja)
- Hawker Chan (Kuliner)

#### Bangkok (4 tempat)
- Grand Palace (Budaya)
- Wat Pho (Budaya)
- Floating Market (Kuliner)
- Chatuchak Weekend Market (Belanja)

#### Kuala Lumpur (4 tempat)
- Petronas Twin Towers (Fotografi)
- Batu Caves (Alam)
- Central Market (Belanja)
- Nasi Lemak Wanjo (Kuliner)

**File:** `backend/database/seeders/PlaceSeeder.php`

---

## 🗄️ Database Schema

### Relasi Antar Tabel

```
Countries (1) ──→ (Many) Provinces
    ↓
Provinces (1) ──→ (Many) Cities
    ↓
Cities (1) ──→ (Many) Places
    ↓
Places (Many) ──→ (Many) Tags (via place_tag pivot)
    ↓
Places (Many) ──→ (1) Categories
```

### Tabel Utama

#### `countries`
- `id` (PK)
- `name` (string)
- `slug` (string, unique)
- `iso_code` (string, unique)
- `timestamps`

#### `provinces`
- `id` (PK)
- `country_id` (FK)
- `name` (string)
- `slug` (string, unique)
- `timestamps`

#### `cities`
- `id` (PK)
- `province_id` (FK)
- `name` (string)
- `slug` (string, unique)
- `image_url` (nullable)
- `lat` (decimal, nullable)
- `lng` (decimal, nullable)
- `timestamps`

#### `categories`
- `id` (PK)
- `name` (string)
- `slug` (string, unique)
- `icon` (string) - emoji/icon
- `color` (string) - tailwind color name
- `timestamps`

#### `tags`
- `id` (PK)
- `name` (string)
- `slug` (string, unique)
- `timestamps`

#### `places`
- `id` (PK)
- `name` (string)
- `address` (text, nullable)
- `latitude` (decimal, nullable)
- `longitude` (decimal, nullable)
- `city_id` (FK)
- `category_id` (FK)
- `timestamps`

#### `place_tag` (Pivot)
- `id` (PK)
- `place_id` (FK)
- `tag_id` (FK)
- `timestamps`
- `unique(place_id, tag_id)`

---

## 🚀 Cara Menjalankan Seeder

### 1. Jalankan semua seeder
```bash
php artisan db:seed
```

### 2. Jalankan seeder spesifik
```bash
php artisan db:seed --class=CountrySeeder
php artisan db:seed --class=PlaceSeeder
```

### 3. Reset database dan jalankan seeder
```bash
php artisan migrate:fresh --seed
```

---

## 📝 Model Relationships

### Country Model
```php
public function provinces() { return $this->hasMany(Province::class); }
public function places() { return $this->hasManyThrough(Place::class, City::class); }
```

### Province Model
```php
public function country() { return $this->belongsTo(Country::class); }
public function cities() { return $this->hasMany(City::class); }
```

### City Model
```php
public function province() { return $this->belongsTo(Province::class); }
```

### Category Model
```php
public function places() { return $this->hasMany(Place::class); }
```

### Place Model
```php
public function city() { return $this->belongsTo(City::class); }
public function category() { return $this->belongsTo(Category::class); }
public function tags() { return $this->belongsToMany(Tag::class, 'place_tag'); }
```

### Tag Model
```php
public function places() { return $this->belongsToMany(Place::class, 'place_tag'); }
```

---

## 🔄 Algoritma Seeding

Seeder menggunakan `firstOrCreate()` untuk mencegah duplikasi data:

```php
Model::firstOrCreate(
    ['unique_field' => $value],  // Kondisi pencarian
    $data                         // Data yang akan dibuat jika tidak ada
);
```

Ini memastikan bahwa:
- Data tidak akan diduplikasi jika seeder dijalankan berkali-kali
- Data yang sudah ada akan dipertahankan
- Relasi pivot akan di-sync dengan benar

---

## 📌 Catatan Penting

1. **Urutan Eksekusi:** Seeder harus dijalankan dalam urutan yang benar:
   - Countries → Provinces → Cities → Categories → Tags → Places

2. **Foreign Keys:** Pastikan semua foreign key constraints sudah terpenuhi sebelum menjalankan seeder.

3. **Pivot Table:** Relasi many-to-many antara Places dan Tags menggunakan tabel pivot `place_tag`.

4. **Koordinat:** Latitude dan longitude untuk places sudah diisi dengan data yang akurat.

5. **Extensibility:** Seeder dirancang untuk mudah diperluas dengan menambahkan data baru ke array.

---

## 🎯 Use Cases

### 1. Mendapatkan semua places di suatu negara
```php
$country = Country::find(1);
$places = $country->places()->get();
```

### 2. Mendapatkan places dengan kategori tertentu
```php
$places = Place::where('category_id', $categoryId)->get();
```

### 3. Mendapatkan places dengan tag tertentu
```php
$places = Place::whereHas('tags', function($q) {
    $q->where('slug', 'instagrammable');
})->get();
```

### 4. Mendapatkan places di kota tertentu dengan kategori
```php
$places = Place::where('city_id', $cityId)
    ->where('category_id', $categoryId)
    ->with('tags')
    ->get();
```

---

## 📚 Referensi

- [Laravel Seeding Documentation](https://laravel.com/docs/seeding)
- [Laravel Relationships](https://laravel.com/docs/eloquent-relationships)
- [ITINERARY.md](../ITINERARY.md) - Blueprint teknis lengkap
