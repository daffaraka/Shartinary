# 🔌 API Endpoints Reference - Master Data & Places

Referensi endpoint API yang dapat diimplementasikan untuk mengakses data Master Data dan Places sesuai blueprint ITINERARY.md.

---

## 📍 Location Endpoints

### GET /api/countries
Mengambil semua negara.

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Indonesia",
      "slug": "indonesia",
      "iso_code": "ID"
    },
    {
      "id": 2,
      "name": "Singapore",
      "slug": "singapore",
      "iso_code": "SG"
    }
  ]
}
```

---

### GET /api/countries/{id}/provinces
Mengambil provinsi dari suatu negara.

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "DKI Jakarta",
      "slug": "dki-jakarta",
      "country_id": 1
    },
    {
      "id": 2,
      "name": "Jawa Barat",
      "slug": "jawa-barat",
      "country_id": 1
    }
  ]
}
```

---

### GET /api/provinces/{id}/cities
Mengambil kota dari suatu provinsi.

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Jakarta",
      "slug": "jakarta",
      "province_id": 1,
      "lat": -6.1944,
      "lng": 106.8229,
      "image_url": null
    }
  ]
}
```

---

## 🏷️ Category & Tag Endpoints

### GET /api/categories
Mengambil semua kategori tempat wisata.

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Kuliner",
      "slug": "kuliner",
      "icon": "🍽️",
      "color": "orange"
    },
    {
      "id": 2,
      "name": "Hiburan",
      "slug": "hiburan",
      "icon": "🎭",
      "color": "purple"
    }
  ]
}
```

**Use Case:** Dropdown kategori di frontend, legend warna untuk visualisasi.

---

### GET /api/tags
Mengambil semua tag deskriptif.

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Halal",
      "slug": "halal"
    },
    {
      "id": 2,
      "name": "Vegetarian",
      "slug": "vegetarian"
    },
    {
      "id": 3,
      "name": "Instagrammable",
      "slug": "instagrammable"
    }
  ]
}
```

**Use Case:** Filter tags, badge chips di place card.

---

## 📍 Places Endpoints

### GET /api/places
Mengambil semua places dengan filter dan eager loading.

**Query Parameters:**
- `city_id` (optional): Filter berdasarkan kota
- `category_slug` (optional): Filter berdasarkan kategori
- `search` (optional): Pencarian berdasarkan nama
- `tags` (optional): Filter berdasarkan tag (comma-separated)
- `page` (optional): Pagination
- `per_page` (optional): Items per page (default: 15)

**Example:**
```
GET /api/places?city_id=1&category_slug=kuliner&search=soto
GET /api/places?tags=halal,instagrammable&per_page=20
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Soto Ayam Borobudur",
      "address": "Jl. Sabang No. 35, Jakarta Pusat",
      "latitude": -6.1944,
      "longitude": 106.8229,
      "city_id": 1,
      "category_id": 1,
      "category": {
        "id": 1,
        "name": "Kuliner",
        "slug": "kuliner",
        "icon": "🍽️",
        "color": "orange"
      },
      "tags": [
        {
          "id": 1,
          "name": "Halal",
          "slug": "halal"
        },
        {
          "id": 7,
          "name": "Hemat",
          "slug": "hemat"
        }
      ],
      "city": {
        "id": 1,
        "name": "Jakarta",
        "slug": "jakarta"
      }
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 15,
    "total": 26,
    "last_page": 2
  }
}
```

---

### GET /api/places/{id}
Mengambil detail place spesifik.

**Response:**
```json
{
  "data": {
    "id": 1,
    "name": "Soto Ayam Borobudur",
    "address": "Jl. Sabang No. 35, Jakarta Pusat",
    "latitude": -6.1944,
    "longitude": 106.8229,
    "city_id": 1,
    "category_id": 1,
    "created_at": "2026-05-07T10:00:00Z",
    "updated_at": "2026-05-07T10:00:00Z",
    "category": {
      "id": 1,
      "name": "Kuliner",
      "slug": "kuliner",
      "icon": "🍽️",
      "color": "orange"
    },
    "tags": [
      {
        "id": 1,
        "name": "Halal",
        "slug": "halal"
      },
      {
        "id": 7,
        "name": "Hemat",
        "slug": "hemat"
      },
      {
        "id": 16,
        "name": "Local Favorite",
        "slug": "local-favorite"
      }
    ],
    "city": {
      "id": 1,
      "name": "Jakarta",
      "slug": "jakarta",
      "province": {
        "id": 1,
        "name": "DKI Jakarta",
        "slug": "dki-jakarta",
        "country": {
          "id": 1,
          "name": "Indonesia",
          "slug": "indonesia",
          "iso_code": "ID"
        }
      }
    }
  }
}
```

---

### GET /api/cities/{id}/places
Mengambil semua places di suatu kota.

**Query Parameters:**
- `category_slug` (optional): Filter berdasarkan kategori
- `tags` (optional): Filter berdasarkan tag

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Soto Ayam Borobudur",
      "address": "Jl. Sabang No. 35, Jakarta Pusat",
      "latitude": -6.1944,
      "longitude": 106.8229,
      "category": {
        "id": 1,
        "name": "Kuliner",
        "slug": "kuliner",
        "icon": "🍽️",
        "color": "orange"
      },
      "tags": [
        {
          "id": 1,
          "name": "Halal",
          "slug": "halal"
        }
      ]
    }
  ]
}
```

---

### GET /api/categories/{slug}/places
Mengambil semua places dengan kategori tertentu.

**Query Parameters:**
- `city_id` (optional): Filter berdasarkan kota
- `search` (optional): Pencarian berdasarkan nama

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Soto Ayam Borobudur",
      "address": "Jl. Sabang No. 35, Jakarta Pusat",
      "latitude": -6.1944,
      "longitude": 106.8229,
      "category": {
        "id": 1,
        "name": "Kuliner",
        "slug": "kuliner",
        "icon": "🍽️",
        "color": "orange"
      },
      "tags": [
        {
          "id": 1,
          "name": "Halal",
          "slug": "halal"
        }
      ]
    }
  ]
}
```

---

### GET /api/tags/{slug}/places
Mengambil semua places dengan tag tertentu.

**Query Parameters:**
- `city_id` (optional): Filter berdasarkan kota
- `category_slug` (optional): Filter berdasarkan kategori

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Soto Ayam Borobudur",
      "address": "Jl. Sabang No. 35, Jakarta Pusat",
      "latitude": -6.1944,
      "longitude": 106.8229,
      "category": {
        "id": 1,
        "name": "Kuliner",
        "slug": "kuliner",
        "icon": "🍽️",
        "color": "orange"
      },
      "tags": [
        {
          "id": 1,
          "name": "Halal",
          "slug": "halal"
        }
      ]
    }
  ]
}
```

---

## 🔍 Search & Filter Examples

### Cari tempat kuliner halal di Jakarta
```
GET /api/places?city_id=1&category_slug=kuliner&tags=halal
```

### Cari tempat instagrammable di Bali
```
GET /api/places?city_id=3&tags=instagrammable
```

### Cari tempat dengan keyword "market"
```
GET /api/places?search=market
```

### Cari tempat luxury di Singapore
```
GET /api/places?city_id=5&tags=luxury
```

---

## 📊 Response Format

### Success Response (200)
```json
{
  "success": true,
  "data": [...],
  "message": "Data retrieved successfully"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [...],
  "meta": {
    "current_page": 1,
    "per_page": 15,
    "total": 100,
    "last_page": 7
  }
}
```

### Error Response (400/404/500)
```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "field": ["Error detail"]
  }
}
```

---

## 🔐 Authentication

Semua endpoint dapat menggunakan:
- **Bearer Token** (Sanctum): `Authorization: Bearer {token}`
- **Public Access**: Untuk kategori, tags, dan places (read-only)

---

## 💾 Caching Strategy

Untuk performa optimal:

```php
// Categories - Cache 24 jam
Cache::remember('categories', 86400, function() {
    return Category::all();
});

// Tags - Cache 24 jam
Cache::remember('tags', 86400, function() {
    return Tag::all();
});

// Places - Cache 1 jam (lebih sering berubah)
Cache::remember("places.city.{$cityId}", 3600, function() {
    return Place::where('city_id', $cityId)->get();
});
```

---

## 🚀 Implementation Checklist

- [ ] Buat LocationController untuk endpoints location
- [ ] Buat PlaceController untuk endpoints places
- [ ] Buat PlaceResource untuk response formatting
- [ ] Implement filtering dan search logic
- [ ] Implement pagination
- [ ] Implement caching
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Add rate limiting
- [ ] Add validation

---

## 📝 Contoh Controller Implementation

```php
// PlaceController.php
public function index(Request $request)
{
    $query = Place::with('category', 'tags', 'city');

    if ($request->city_id) {
        $query->where('city_id', $request->city_id);
    }

    if ($request->category_slug) {
        $query->whereHas('category', function($q) {
            $q->where('slug', $request->category_slug);
        });
    }

    if ($request->search) {
        $query->where('name', 'like', "%{$request->search}%");
    }

    if ($request->tags) {
        $tags = explode(',', $request->tags);
        $query->whereHas('tags', function($q) use ($tags) {
            $q->whereIn('slug', $tags);
        });
    }

    return PlaceResource::collection(
        $query->paginate($request->per_page ?? 15)
    );
}
```

---

## 📚 Related Documentation

- [ITINERARY.md](../ITINERARY.md) - Blueprint teknis lengkap
- [SEEDER_DOCUMENTATION.md](./SEEDER_DOCUMENTATION.md) - Dokumentasi seeder
- [SEEDER_SUMMARY.md](../SEEDER_SUMMARY.md) - Ringkasan implementasi
