import api from "./client";

export const itineraryApi = {
    getAll: (params) => api.get("/itineraries", { params }),
    getById: (id) => api.get(`/itineraries/${id}`),
    
    // Admin methods
    getAdminAll: (params) => api.get("/admin/itineraries", { params }),
    delete: (id) => api.delete(`/admin/itineraries/${id}`),
    toggleVisibility: (id) => api.patch(`/admin/itineraries/${id}/toggle-visibility`),

    create: (data) => api.post("/itineraries", data),
    update: (id, data) => api.put(`/itineraries/${id}`, data),
};
