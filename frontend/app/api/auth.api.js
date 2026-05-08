import api from "./client";

/**
 * Melakukan Login ke sistem
 * @param {Object} credentials { email, password }
 */
export const loginApi = (credentials) => {
    return api.post("/auth/login", credentials);
};

/**
 * Mendaftarkan akun baru
 * @param {Object} userData { name, email, password, password_confirmation }
 */
export const registerApi = (userData) => {
    return api.post("/auth/register", userData);
};

/**
 * Mengambil profil user yang sedang login
 */
export const getProfileApi = () => {
    return api.get("/auth/me");
};

/**
 * Melakukan Logout
 */
export const logoutApi = () => {
    return api.post("/auth/logout");
};
