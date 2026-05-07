# ✅ Migration Update Summary - Categories & Tags

Update migration untuk `categories` dan `tags` table sesuai dengan blueprint ITINERARY.md.

---

## 📋 Perubahan yang Dilakukan

### 1. Categories Migration - UPDATED
**File:** `backend/database/migrations/2026_05_07_082432_create_categories_table.php`

#### Fields yang Ditambahkan:
```php
$table->string('name');           // Nama kategori (misal: "Kuliner")
$table->string('slug')->unique(); // Slug unik (misal: "kuliner")
$table->string('icon');           // Icon emoji/string (misal: "🍽️")
$table->string('color');          // Warna tailwind/hex (misal: "orange")
```

#### Contoh Data:
| ID | Name | Slug | Icon | Color |
|----|------|------|------|-------|
| 1 | Kuliner | kuliner | 🍽️ | orange |
| 2 | Hiburan | hiburan | 🎭 | purple |
| 3 | Alam | alam | 🏞️ | green |
| 4 | Budaya | budaya | 🏛️ | amber |
| 5 | Belanja | belanja | 🛍️ | pink |
| 6 | Olahraga | olahraga | ⚽ | blue |
| 7 | Relaksasi | relaksasi | 🧘 | cyan |
| 8 | Fotografi | fotografi | 📸 | indigo |

---

### 2. Tags Migration - UPDATED
**File:** `backend/database/migrations/2026_05_07_082438_create_tags_table.php`

#### Fields yang Ditambahkan:
```php
$table->string('name');           // Nama tag (misal: "Halal")
$table->string('slug')->unique(); // Slug unik (misal: "halal")
```

#### Contoh Data:
| ID | Name | Slug |
|----|------|------|
| 1 | Halal | halal |
| 2 | Vegetarian | vegetarian |
| 3 | Vegan | vegan |
| 4 | Matcha | matcha |
| 5 | Gen Z | gen-z |
| 6 | Hidden Gem | hidden-gem |
| 7 | Hemat | hemat |
| 8 | Instagrammable | instagrammable |
| 9 | Pet Friendly | pet-friendly |
| 10 | Family Friendly | family-friendly |
| 11 | Romantic | romantic |
| 12 | Adventurous | adventurous |
| 13 | Luxury | luxury |
| 14 | Budget | budget |
| 15 | Trending | trending |
| 16 | Local Favorite | local-favorite |

---

## 🗄️ Database Schema

### Categories Table
```sql
CREATE TABLE categories (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    icon VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### Tags Table
```sql
CREATE TABLE tags (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

---

## 🔗 Relasi dengan Places

### Categories → Places (One-to-Many)
```
categories (1) ──→ (Many) places
```

Setiap place memiliki satu category, tetapi satu category bisa memiliki banyak places.

### Tags ↔ Places (Many-to-Many)
```
tags (Many) ──→ (Many) places (via place_tag pivot table)
```

Satu place bisa memiliki banyak tags, dan satu tag bisa dimiliki oleh banyak places.

---

## 📊 Complete Database Schema

```
┌─────────────────┐
│  categories     │
├─────────────────┤
│ id (PK)         │
│ name            │
│ slug (UNIQUE)   │
│ icon            │
│ color           │
│ timestamps      │
└────────┬────────┘
         │ (1:Many)
         ▼
┌─────────────────┐
│  places         │
├─────────────────┤
│ id (PK)         │
│ name            │
│ address         │
│ latitude        │
│ longitude       │
│ city_id (FK)    │
│ category_id (FK)│
│ timestamps      │
└────────┬────────┘
         │ (Many:Many via place_tag)
         ▼
┌─────────────────┐
│  tags           │
├─────────────────┤
│ id (PK)         │
│ name            │
│ slug (UNIQUE)   │
│ timestamps      │
└─────────────────┘
```

---

## ✅ Verification

### Categories Migration
- [x] `id` - Primary key
- [x] `name` - String field
- [x] `slug` - Unique string field
- [x] `icon` - String field (emoji/icon)
- [x] `color` - String field (tailwind/hex)
- [x] `timestamps` - created_at, updated_at

### Tags Migration
- [x] `id` - Primary key
- [x] `name` - String field
- [x] `slug` - Unique string field
- [x] `timestamps` - created_at, updated_at

---

## 🚀 Migration Execution

### Run All Migrations
```bash
cd backend
php artisan migrate
```

### Run Specific Migration
```bash
php artisan migrate --path=database/migrations/2026_05_07_082432_create_categories_table.php
php artisan migrate --path=database/migrations/2026_05_07_082438_create_tags_table.php
```

### Rollback
```bash
php artisan migrate:rollback
```

### Fresh Migration (Development Only)
```bash
php artisan migrate:fresh --seed
```

---

## 📝 Model Fillable Arrays

### Category Model
```php
protected $fillable = ['name', 'slug', 'icon', 'color'];
```

### Tag Model
```php
protected $fillable = ['name', 'slug'];
```

---

## 🎯 Use Cases

### Frontend - Dynamic Category Rendering
```typescript
// Render category icon dan warna secara dinamis
<div style={{ color: `var(--color-${category.color})` }}>
  <span>{category.icon}</span>
  <span>{category.name}</span>
</div>
```

### Frontend - Tag Chips
```typescript
// Render tag chips di bawah place name
{place.tags.map(tag => (
  <span key={tag.id} className="badge">{tag.name}</span>
))}
```

### Backend - Query by Category
```php
$places = Place::where('category_id', $categoryId)->get();
```

### Backend - Query by Tag
```php
$places = Place::whereHas('tags', function($q) {
    $q->where('slug', 'halal');
})->get();
```

---

## 📚 Related Files

- `backend/database/seeders/CategorySeeder.php` - Seeder untuk categories
- `backend/database/seeders/TagSeeder.php` - Seeder untuk tags
- `backend/app/Models/Category.php` - Model dengan relationships
- `backend/app/Models/Tag.php` - Model dengan relationships
- `backend/app/Models/Place.php` - Model dengan relationships

---

## ✨ Sesuai Blueprint

✅ Categories memiliki field: `slug`, `name`, `icon`, `color`
✅ Tags memiliki field: `slug`, `name`
✅ Proper relationships dengan Places
✅ Unique constraints pada slug
✅ Timestamps untuk audit trail

---

**Status:** ✅ COMPLETE
**Last Updated:** May 7, 2026
