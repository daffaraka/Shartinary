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
 * Mengambil daftar Kota berdasarkan ID Provinsi
 * @param {number} provinceId 
 */
export const getCities = (provinceId) => {
  return api.get("/cities", {
    params: { province_id: provinceId }
  });
};
