import React, { createContext, useContext, useState, useEffect } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../api/category.api";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await getCategories();
            setCategories(res.data);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        } finally {
            setLoading(false);
        }
    };

    const addCategory = async (data) => {
        try {
            const res = await createCategory(data);
            setCategories([...categories, res.data.data]);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Gagal menambah kategori" };
        }
    };

    const editCategory = async (id, data) => {
        try {
            const res = await updateCategory(id, data);
            setCategories(categories.map(c => c.id === id ? res.data.data : c));
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Gagal memperbarui kategori" };
        }
    };

    const removeCategory = async (id) => {
        if (!confirm("Apakah Anda yakin ingin menghapus kategori ini?")) return;
        try {
            await deleteCategory(id);
            setCategories(categories.filter(c => c.id !== id));
            return { success: true };
        } catch (err) {
            alert("Gagal menghapus kategori. Mungkin kategori ini sedang digunakan.");
            return { success: false };
        }
    };

    return (
        <CategoryContext.Provider value={{
            categories,
            loading,
            fetchCategories,
            addCategory,
            editCategory,
            removeCategory
        }}>
            {children}
        </CategoryContext.Provider>
    );
}

export const useCategory = () => useContext(CategoryContext);
export default CategoryContext;
