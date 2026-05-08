import React, { createContext, useContext, useState, useEffect } from "react";
import { getCategories, getTags, searchPlaces } from "../api/explore.api";

const ExploreContext = createContext();

export function ExploreProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Filter States
    const [filters, setFilters] = useState({
        query: "",
        category: "",
        tag: "",
        country_id: "",
        province_id: "",
        city_id: ""
    });

    // Load Initial Data (Categories & Tags)
    useEffect(() => {
        const loadMasterData = async () => {
            try {
                const [catRes, tagRes] = await Promise.all([
                    getCategories(),
                    getTags()
                ]);
                setCategories(catRes.data.data);
                setTags(tagRes.data.data);
            } catch (err) {
                console.error("Gagal memuat data filter explore", err);
            }
        };
        loadMasterData();
    }, []);

    // Function to perform search
    const performSearch = async (customFilters = null) => {
        setLoading(true);
        try {
            const searchParams = customFilters || filters;
            const res = await searchPlaces(searchParams);
            setPlaces(res.data.data);
        } catch (err) {
            console.error("Gagal mencari tempat", err);
        } finally {
            setLoading(false);
        }
    };

    const updateFilters = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const resetFilters = () => {
        setFilters({
            query: "",
            category: "",
            tag: "",
            country_id: "",
            province_id: "",
            city_id: ""
        });
    };

    return (
        <ExploreContext.Provider value={{
            categories,
            tags,
            places,
            loading,
            filters,
            updateFilters,
            resetFilters,
            performSearch
        }}>
            {children}
        </ExploreContext.Provider>
    );
}

export const useExplore = () => useContext(ExploreContext);
export default ExploreContext;
