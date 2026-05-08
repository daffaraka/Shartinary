import React, { createContext, useContext, useState, useEffect } from "react";
import { getTags, createTag, updateTag, deleteTag } from "../api/tag.api";

const TagContext = createContext();

export function TagProvider({ children }) {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        setLoading(true);
        try {
            const res = await getTags();
            setTags(res.data);
        } catch (err) {
            console.error("Failed to fetch tags", err);
        } finally {
            setLoading(false);
        }
    };

    const addTag = async (data) => {
        try {
            const res = await createTag(data);
            setTags([...tags, res.data.data]);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Gagal menambah tag" };
        }
    };

    const editTag = async (id, data) => {
        try {
            const res = await updateTag(id, data);
            setTags(tags.map(t => t.id === id ? res.data.data : t));
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Gagal memperbarui tag" };
        }
    };

    const removeTag = async (id) => {
        if (!confirm("Apakah Anda yakin ingin menghapus tag ini?")) return;
        try {
            await deleteTag(id);
            setTags(tags.filter(t => t.id !== id));
            return { success: true };
        } catch (err) {
            alert("Gagal menghapus tag.");
            return { success: false };
        }
    };

    return (
        <TagContext.Provider value={{
            tags,
            loading,
            fetchTags,
            addTag,
            editTag,
            removeTag
        }}>
            {children}
        </TagContext.Provider>
    );
}

export const useTag = () => useContext(TagContext);
export default TagContext;
