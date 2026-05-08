import React, { createContext, useContext, useState, useEffect } from "react";
import { loginApi, registerApi, getProfileApi, logoutApi } from "../api/auth.api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);

    // Initialize Auth State from LocalStorage
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            checkProfile(storedToken);
        } else {
            setLoading(false);
        }
    }, []);

    const checkProfile = async (storedToken) => {
        try {
            const res = await getProfileApi();
            // Laravel return { user: { ... } }
            setUser(res.data.user);
        } catch (err) {
            console.error("Token expired or invalid", err);
            handleLogout();
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (credentials) => {
        setAuthLoading(true);
        try {
            const res = await loginApi(credentials);
            const { token, user } = res.data;
            
            localStorage.setItem("token", token);
            setToken(token);
            setUser(user);
            
            return { success: true };
        } catch (err) {
            return { 
                success: false, 
                message: err.response?.data?.message || "Login gagal. Periksa kembali email dan password Anda." 
            };
        } finally {
            setAuthLoading(false);
        }
    };

    const handleRegister = async (userData) => {
        setAuthLoading(true);
        try {
            const res = await registerApi(userData);
            const { token, user } = res.data;
            
            localStorage.setItem("token", token);
            setToken(token);
            setUser(user);
            
            return { success: true };
        } catch (err) {
            return { 
                success: false, 
                message: err.response?.data?.message || "Registrasi gagal. Silakan coba lagi." 
            };
        } finally {
            setAuthLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logoutApi();
        } catch (err) {
            console.error("Logout error", err);
        } finally {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            authLoading,
            login: handleLogin,
            register: handleRegister,
            logout: handleLogout,
            isAuthenticated: !!token
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
