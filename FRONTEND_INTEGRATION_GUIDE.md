# 🎨 Frontend Integration Guide - Places & Master Data

Panduan lengkap untuk mengintegrasikan API Places ke dalam aplikasi React frontend.

---

## 📦 Setup

### 1. Install Dependencies
```bash
npm install axios react-query
```

### 2. Create API Client
```typescript
// src/api/client.ts
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if authenticated
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 🔌 API Hooks

### 1. useCategories Hook
```typescript
// src/hooks/useCategories.ts
import { useQuery } from 'react-query';
import { apiClient } from '../api/client';

export const useCategories = () => {
  return useQuery('categories', async () => {
    const { data } = await apiClient.get('/categories');
    return data.data;
  }, {
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};
```

### 2. useTags Hook
```typescript
// src/hooks/useTags.ts
import { useQuery } from 'react-query';
import { apiClient } from '../api/client';

export const useTags = () => {
  return useQuery('tags', async () => {
    const { data } = await apiClient.get('/tags');
    return data.data;
  }, {
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};
```

### 3. usePlaces Hook
```typescript
// src/hooks/usePlaces.ts
import { useQuery } from 'react-query';
import { apiClient } from '../api/client';

interface PlacesParams {
  cityId?: number;
  categorySlug?: string;
  tags?: string[];
  search?: string;
  page?: number;
  perPage?: number;
}

export const usePlaces = (params?: PlacesParams) => {
  return useQuery(
    ['places', params],
    async () => {
      const queryParams = new URLSearchParams();
      if (params?.cityId) queryParams.append('city_id', params.cityId.toString());
      if (params?.categorySlug) queryParams.append('category_slug', params.categorySlug);
      if (params?.tags?.length) queryParams.append('tags', params.tags.join(','));
      if (params?.search) queryParams.append('search', params.search);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.perPage) queryParams.append('per_page', params.perPage.toString());

      const { data } = await apiClient.get(`/places?${queryParams}`);
      return data;
    },
    {
      staleTime: 60 * 1000, // 1 minute
    }
  );
};
```

### 4. usePlaceDetail Hook
```typescript
// src/hooks/usePlaceDetail.ts
import { useQuery } from 'react-query';
import { apiClient } from '../api/client';

export const usePlaceDetail = (placeId: number) => {
  return useQuery(
    ['place', placeId],
    async () => {
      const { data } = await apiClient.get(`/places/${placeId}`);
      return data.data;
    },
    {
      enabled: !!placeId,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};
```

### 5. usePlacesByCity Hook
```typescript
// src/hooks/usePlacesByCity.ts
import { useQuery } from 'react-query';
import { apiClient } from '../api/client';

export const usePlacesByCity = (cityId: number, categorySlug?: string) => {
  return useQuery(
    ['places-by-city', cityId, categorySlug],
    async () => {
      const params = new URLSearchParams();
      if (categorySlug) params.append('category_slug', categorySlug);

      const { data } = await apiClient.get(`/places/city/${cityId}?${params}`);
      return data;
    },
    {
      enabled: !!cityId,
      staleTime: 60 * 1000,
    }
  );
};
```

### 6. usePlacesByCategory Hook
```typescript
// src/hooks/usePlacesByCategory.ts
import { useQuery } from 'react-query';
import { apiClient } from '../api/client';

export const usePlacesByCategory = (categorySlug: string, cityId?: number) => {
  return useQuery(
    ['places-by-category', categorySlug, cityId],
    async () => {
      const params = new URLSearchParams();
      if (cityId) params.append('city_id', cityId.toString());

      const { data } = await apiClient.get(`/places/category/${categorySlug}?${params}`);
      return data;
    },
    {
      enabled: !!categorySlug,
      staleTime: 60 * 1000,
    }
  );
};
```

### 7. usePlacesByTag Hook
```typescript
// src/hooks/usePlacesByTag.ts
import { useQuery } from 'react-query';
import { apiClient } from '../api/client';

export const usePlacesByTag = (tagSlug: string, cityId?: number) => {
  return useQuery(
    ['places-by-tag', tagSlug, cityId],
    async () => {
      const params = new URLSearchParams();
      if (cityId) params.append('city_id', cityId.toString());

      const { data } = await apiClient.get(`/places/tag/${tagSlug}?${params}`);
      return data;
    },
    {
      enabled: !!tagSlug,
      staleTime: 60 * 1000,
    }
  );
};
```

### 8. useSearchPlaces Hook
```typescript
// src/hooks/useSearchPlaces.ts
import { useQuery } from 'react-query';
import { apiClient } from '../api/client';

export const useSearchPlaces = (query: string, cityId?: number) => {
  return useQuery(
    ['search-places', query, cityId],
    async () => {
      const params = new URLSearchParams();
      params.append('q', query);
      if (cityId) params.append('city_id', cityId.toString());

      const { data } = await apiClient.get(`/places/search?${params}`);
      return data;
    },
    {
      enabled: query.length >= 2,
      staleTime: 60 * 1000,
    }
  );
};
```

### 9. useNearbyPlaces Hook
```typescript
// src/hooks/useNearbyPlaces.ts
import { useQuery } from 'react-query';
import { apiClient } from '../api/client';

interface NearbyParams {
  latitude: number;
  longitude: number;
  radius?: number;
}

export const useNearbyPlaces = (params: NearbyParams) => {
  return useQuery(
    ['nearby-places', params],
    async () => {
      const queryParams = new URLSearchParams();
      queryParams.append('latitude', params.latitude.toString());
      queryParams.append('longitude', params.longitude.toString());
      if (params.radius) queryParams.append('radius', params.radius.toString());

      const { data } = await apiClient.get(`/places/nearby?${queryParams}`);
      return data;
    },
    {
      enabled: !!params.latitude && !!params.longitude,
      staleTime: 60 * 1000,
    }
  );
};
```

---

## 🎨 React Components

### 1. PlaceCard Component
```typescript
// src/components/PlaceCard.tsx
import React from 'react';
import { Place } from '../types';

interface PlaceCardProps {
  place: Place;
  onClick?: () => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, onClick }) => {
  return (
    <div
      className={`border-l-4 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow`}
      style={{ borderLeftColor: `var(--color-${place.category.color})` }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{place.category.icon}</span>
            <h3 className="font-bold text-lg">{place.name}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-2">{place.address}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {place.tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
```

### 2. PlaceList Component
```typescript
// src/components/PlaceList.tsx
import React from 'react';
import { Place } from '../types';
import { PlaceCard } from './PlaceCard';

interface PlaceListProps {
  places: Place[];
  isLoading?: boolean;
  onPlaceClick?: (place: Place) => void;
}

export const PlaceList: React.FC<PlaceListProps> = ({
  places,
  isLoading,
  onPlaceClick,
}) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading places...</div>;
  }

  if (!places.length) {
    return <div className="text-center py-8 text-gray-500">No places found</div>;
  }

  return (
    <div className="space-y-3">
      {places.map((place) => (
        <PlaceCard
          key={place.id}
          place={place}
          onClick={() => onPlaceClick?.(place)}
        />
      ))}
    </div>
  );
};
```

### 3. CategoryFilter Component
```typescript
// src/components/CategoryFilter.tsx
import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface CategoryFilterProps {
  selectedSlug?: string;
  onSelect: (slug: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedSlug,
  onSelect,
}) => {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) return <div>Loading categories...</div>;

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => onSelect('')}
        className={`px-4 py-2 rounded-full whitespace-nowrap ${
          !selectedSlug ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        All
      </button>
      {categories?.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.slug)}
          className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-2 ${
            selectedSlug === category.slug
              ? `bg-${category.color}-500 text-white`
              : 'bg-gray-200'
          }`}
        >
          <span>{category.icon}</span>
          {category.name}
        </button>
      ))}
    </div>
  );
};
```

### 4. TagFilter Component
```typescript
// src/components/TagFilter.tsx
import React from 'react';
import { useTags } from '../hooks/useTags';

interface TagFilterProps {
  selectedTags: string[];
  onToggle: (slug: string) => void;
}

export const TagFilter: React.FC<TagFilterProps> = ({
  selectedTags,
  onToggle,
}) => {
  const { data: tags, isLoading } = useTags();

  if (isLoading) return <div>Loading tags...</div>;

  return (
    <div className="flex flex-wrap gap-2">
      {tags?.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onToggle(tag.slug)}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedTags.includes(tag.slug)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
};
```

### 5. PlaceSearch Component
```typescript
// src/components/PlaceSearch.tsx
import React, { useState } from 'react';
import { useSearchPlaces } from '../hooks/useSearchPlaces';
import { PlaceList } from './PlaceList';

interface PlaceSearchProps {
  cityId?: number;
}

export const PlaceSearch: React.FC<PlaceSearchProps> = ({ cityId }) => {
  const [query, setQuery] = useState('');
  const { data, isLoading } = useSearchPlaces(query, cityId);

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search places..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
      />
      {query && (
        <PlaceList
          places={data?.data || []}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
```

### 6. PlaceDetail Component
```typescript
// src/components/PlaceDetail.tsx
import React from 'react';
import { usePlaceDetail } from '../hooks/usePlaceDetail';

interface PlaceDetailProps {
  placeId: number;
}

export const PlaceDetail: React.FC<PlaceDetailProps> = ({ placeId }) => {
  const { data: place, isLoading } = usePlaceDetail(placeId);

  if (isLoading) return <div>Loading place details...</div>;
  if (!place) return <div>Place not found</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-4xl">{place.category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{place.name}</h1>
          <p className="text-gray-600">{place.category.name}</p>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Address</p>
        <p className="font-semibold">{place.address}</p>
      </div>

      {place.latitude && place.longitude && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Coordinates</p>
          <p className="font-semibold">
            {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
          </p>
        </div>
      )}

      {place.tags.length > 0 && (
        <div>
          <p className="text-sm text-gray-600 mb-2">Tags</p>
          <div className="flex flex-wrap gap-2">
            {place.tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {place.city && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Location</p>
          <p className="font-semibold">{place.city.name}</p>
          {place.city.province && (
            <p className="text-sm text-gray-600">{place.city.province.name}</p>
          )}
        </div>
      )}
    </div>
  );
};
```

---

## 📱 Page Examples

### 1. Places Explorer Page
```typescript
// src/pages/PlacesExplorer.tsx
import React, { useState } from 'react';
import { usePlaces } from '../hooks/usePlaces';
import { PlaceList } from '../components/PlaceList';
import { CategoryFilter } from '../components/CategoryFilter';
import { TagFilter } from '../components/TagFilter';

export const PlacesExplorer: React.FC = () => {
  const [cityId, setCityId] = useState<number>();
  const [categorySlug, setCategorySlug] = useState<string>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { data, isLoading } = usePlaces({
    cityId,
    categorySlug,
    tags: selectedTags,
  });

  const handleTagToggle = (slug: string) => {
    setSelectedTags((prev) =>
      prev.includes(slug)
        ? prev.filter((t) => t !== slug)
        : [...prev, slug]
    );
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Explore Places</h1>

      <CategoryFilter
        selectedSlug={categorySlug}
        onSelect={setCategorySlug}
      />

      <TagFilter
        selectedTags={selectedTags}
        onToggle={handleTagToggle}
      />

      <PlaceList
        places={data?.data || []}
        isLoading={isLoading}
      />
    </div>
  );
};
```

### 2. City Places Page
```typescript
// src/pages/CityPlaces.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePlacesByCity } from '../hooks/usePlacesByCity';
import { PlaceList } from '../components/PlaceList';
import { CategoryFilter } from '../components/CategoryFilter';

export const CityPlaces: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [categorySlug, setCategorySlug] = useState<string>();

  const { data, isLoading } = usePlacesByCity(
    parseInt(cityId!),
    categorySlug
  );

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Places in City</h1>

      <CategoryFilter
        selectedSlug={categorySlug}
        onSelect={setCategorySlug}
      />

      <PlaceList
        places={data?.data || []}
        isLoading={isLoading}
      />
    </div>
  );
};
```

---

## 🗂️ TypeScript Types

```typescript
// src/types/index.ts
export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  color: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface City {
  id: number;
  name: string;
  slug: string;
  latitude?: number;
  longitude?: number;
  province?: Province;
}

export interface Province {
  id: number;
  name: string;
  slug: string;
  country?: Country;
}

export interface Country {
  id: number;
  name: string;
  slug: string;
  iso_code: string;
}

export interface Place {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  city_id: number;
  category_id: number;
  created_at: string;
  updated_at: string;
  category: Category;
  tags: Tag[];
  city: City;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}
```

---

## 🚀 Usage Examples

### Example 1: Display all places
```typescript
const { data, isLoading } = usePlaces();
return <PlaceList places={data?.data || []} isLoading={isLoading} />;
```

### Example 2: Filter by city and category
```typescript
const { data, isLoading } = usePlaces({
  cityId: 1,
  categorySlug: 'kuliner',
});
```

### Example 3: Search places
```typescript
const { data, isLoading } = useSearchPlaces('soto');
```

### Example 4: Get nearby places
```typescript
const { data, isLoading } = useNearbyPlaces({
  latitude: -6.1944,
  longitude: 106.8229,
  radius: 5,
});
```

---

## 📚 Related Documentation

- [API_ENDPOINTS_REFERENCE.md](./backend/API_ENDPOINTS_REFERENCE.md) - API reference
- [SEEDER_DOCUMENTATION.md](./backend/SEEDER_DOCUMENTATION.md) - Seeder documentation
- [ITINERARY.md](./ITINERARY.md) - Blueprint teknis

---

**Last Updated:** May 7, 2026
**Status:** ✅ Ready for Implementation
