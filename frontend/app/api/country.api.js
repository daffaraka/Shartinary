import api from "./client";

/**
 * Mengambil semua daftar Negara
 */
export const getCountries = () => {
  return api.get("/countries");
};

/**
 * Mengambil daftar Provinsi berdasarkan ID Negara
 * @param {number} countryId 
 */
export const getProvinces = (countryId) => {
  return api.get("/provinces", {
    params: { country_id: countryId }
  });
};

/**
 * Mengambil daftar Kota berdasarkan ID Provinsi atau ID Negara
 * @param {Object} params { province_id, country_id }
 */
export const getCities = (params) => {
  return api.get("/cities", { params });
};

/**
 * Membuat negara baru (Admin)
 */
export const createCountry = (data) => {
  return api.post("/admin/countries", data);
};

/**
 * Memperbarui data negara (Admin)
 */
export const updateCountry = (id, data) => {
  return api.put(`/admin/countries/${id}`, data);
};

/**
 * Menghapus negara (Admin)
 */
export const deleteCountry = (id) => {
  return api.delete(`/admin/countries/${id}`);
};

/**
 * Provinsi (Admin)
 */
export const createProvince = (data) => {
  return api.post("/admin/provinces", data);
};

export const updateProvince = (id, data) => {
  return api.put(`/admin/provinces/${id}`, data);
};

export const deleteProvince = (id) => {
  return api.delete(`/admin/provinces/${id}`);
};

/**
 * Kota (Admin)
 */
export const createCity = (data) => {
  return api.post("/admin/cities", data);
};

export const updateCity = (id, data) => {
  return api.put(`/admin/cities/${id}`, data);
};

export const deleteCity = (id) => {
  return api.delete(`/admin/cities/${id}`);
};

