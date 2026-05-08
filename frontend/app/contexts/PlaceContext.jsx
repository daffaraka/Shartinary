import React, { createContext, useContext, useState, useEffect } from "react";
import { getPlaces, createPlace, updatePlace, deletePlace } from "../api/place.api";

const PlaceContext = createContext();

export function PlaceProvider({ children }) {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        fetchPlaces();
    }, [filters]);

    const fetchPlaces = async () => {
        setLoading(true);
        try {
            const res = await getPlaces(filters);
            setPlaces(res.data.data || res.data);
        } catch (err) {
            console.error("Failed to fetch places", err);
        } finally {
            setLoading(false);
        }
    };

    const addPlace = async (formData) => {
        setLoading(true);
        try {
            const res = await createPlace(formData);
            setPlaces([res.data.data, ...places]);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Gagal menambah tempat" };
        } finally {
            setLoading(false);
        }
    };

    const editPlace = async (id, formData) => {
        setLoading(true);
        try {
            const res = await updatePlace(id, formData);
            setPlaces(places.map(p => p.id === id ? res.data.data : p));
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Gagal memperbarui tempat" };
        } finally {
            setLoading(false);
        }
    };

    const removePlace = async (id) => {
        if (!confirm("Apakah Anda yakin ingin menghapus tempat ini?")) return;
        setLoading(true);
        try {
            await deletePlace(id);
            setPlaces(places.filter(p => p.id !== id));
            return { success: true };
        } catch (err) {
            alert("Gagal menghapus tempat.");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return (
        <PlaceContext.Provider value={{
            places,
            loading,
            filters,
            setFilters,
            fetchPlaces,
            addPlace,
            editPlace,
            removePlace
        }}>
            {children}
        </PlaceContext.Provider>
    );
}

export const usePlace = () => useContext(PlaceContext);
export default PlaceContext;
