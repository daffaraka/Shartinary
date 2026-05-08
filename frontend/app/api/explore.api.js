import api from "./client";

/**
 * Mengambil semua kategori tempat
 */
export const getCategories = () => {
    return api.get("/categories");
};

/**
 * Mengambil semua tag tempat
 */
export const getTags = () => {
    return api.get("/tags");
};

/**
 * Mencari tempat berdasarkan filter
 * @param {Object} params { query, category, tag, city_id, province_id, country_id }
 */
export const searchPlaces = (params) => {
    return api.get("/places/search", { params });
};

/**
 * Mengambil detail tempat
 */
export const getPlaceDetail = (id) => {
    return api.get(`/places/${id}`);
};
