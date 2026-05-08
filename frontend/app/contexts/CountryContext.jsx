import React, { useEffect, useContext } from "react";
import { 
    getCountries, createCountry, updateCountry as updateCountryApi, deleteCountry as deleteCountryApi,
    getProvinces as getProvincesApi, createProvince, updateProvince as updateProvinceApi, deleteProvince as deleteProvinceApi,
    getCities as getCitiesApi, createCity, updateCity as updateCityApi, deleteCity as deleteCityApi
} from "../api/country.api";


const CountryContext = React.createContext();


export function CountryProvider({ children }) {
    const [countries, setCountries] = React.useState([]);
    const [provinces, setProvinces] = React.useState([]);
    const [cities, setCities] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [loadingProvinces, setLoadingProvinces] = React.useState(false);
    const [loadingCities, setLoadingCities] = React.useState(false);

    // --- Country Actions ---
    const fetchCountry = async () => {
        try {
            setLoading(true)
            const res = await getCountries();
            setCountries(res.data.data)
        } catch (err) {
            console.log(err.response?.data?.message || err.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCountry();
    }, []);

    const addCountry = async (data) => {
        setLoading(true);
        try {
            await createCountry(data);
            await fetchCountry();
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Gagal menambah negara" };
        } finally {
            setLoading(false);
        }
    };

    const editCountry = async (id, data) => {
        setLoading(true);
        try {
            await updateCountryApi(id, data);
            await fetchCountry();
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Gagal memperbarui negara" };
        } finally {
            setLoading(false);
        }
    };

    const removeCountry = async (id) => {
        if (!window.confirm("Yakin ingin menghapus negara ini?")) return;
        setLoading(true);
        try {
            await deleteCountryApi(id);
            await fetchCountry();
        } catch (err) {
            alert(err.response?.data?.message || "Gagal menghapus negara");
        } finally {
            setLoading(false);
        }
    };

    // --- Province Actions ---
    const fetchProvinces = async (countryId) => {
        if (!countryId) {
            setProvinces([]);
            return;
        }
        setLoadingProvinces(true);
        try {
            const res = await getProvincesApi(countryId);
            setProvinces(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingProvinces(false);
        }
    };

    const addProvince = async (data) => {
        setLoading(true);
        try {
            await createProvince(data);
            await fetchProvinces(data.country_id);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Gagal menambah provinsi" };
        } finally {
            setLoading(false);
        }
    };

    const editProvince = async (id, data) => {
        setLoading(true);
        try {
            await updateProvinceApi(id, data);
            await fetchProvinces(data.country_id);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Gagal memperbarui provinsi" };
        } finally {
            setLoading(false);
        }
    };

    const removeProvince = async (id, countryId) => {
        if (!window.confirm("Yakin ingin menghapus provinsi ini?")) return;
        setLoading(true);
        try {
            await deleteProvinceApi(id);
            await fetchProvinces(countryId);
        } catch (err) {
            alert(err.response?.data?.message || "Gagal menghapus provinsi");
        } finally {
            setLoading(false);
        }
    };

    // --- City Actions ---
    const fetchCities = async (params) => {
        if (!params || (!params.province_id && !params.country_id)) {
            setCities([]);
            return;
        }
        setLoadingCities(true);
        try {
            const res = await getCitiesApi(params);
            setCities(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingCities(false);
        }
    };

    const addCity = async (data) => {
        setLoading(true);
        try {
            await createCity(data);
            await fetchCities({ province_id: data.province_id });
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Gagal menambah kota" };
        } finally {
            setLoading(false);
        }
    };

    const editCity = async (id, data) => {
        setLoading(true);
        try {
            await updateCityApi(id, data);
            await fetchCities({ province_id: data.province_id });
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Gagal memperbarui kota" };
        } finally {
            setLoading(false);
        }
    };

    const removeCity = async (id, provinceId, countryId) => {
        if (!window.confirm("Yakin ingin menghapus kota ini?")) return;
        setLoading(true);
        try {
            await deleteCityApi(id);
            const params = provinceId ? { province_id: provinceId } : { country_id: countryId };
            await fetchCities(params);
        } catch (err) {
            alert(err.response?.data?.message || "Gagal menghapus kota");
        } finally {
            setLoading(false);
        }
    };

    return (
        <CountryContext.Provider value={{ 
            countries, provinces, cities, 
            loading, loadingProvinces, loadingCities,
            addCountry, editCountry, removeCountry,
            fetchProvinces, addProvince, editProvince, removeProvince,
            fetchCities, addCity, editCity, removeCity
        }}>
            {children}
        </CountryContext.Provider>
    );
}

export const useCountry = () => useContext(CountryContext);

export default CountryContext;