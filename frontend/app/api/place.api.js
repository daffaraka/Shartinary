import api from "./client";

export const getPlaces = (params = {}) => {
    return api.get("/places", { params });
};

export const getPlace = (id) => {
    return api.get(`/places/${id}`);
};

/**
 * Membuat tempat baru (POI)
 * Menggunakan FormData karena kemungkinan ada upload gambar
 */
export const createPlace = (formData) => {
    return api.post("/places", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

/**
 * Memperbarui data tempat
 */
export const updatePlace = (id, formData) => {
    // Laravel terkadang butuh _method put jika menggunakan FormData
    formData.append("_method", "PUT");
    return api.post(`/places/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

export const deletePlace = (id) => {
    return api.delete(`/places/${id}`);
};
