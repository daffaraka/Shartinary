import React, { useState, useEffect } from "react";

export default function CityForm({ 
    initialData, 
    countries, 
    provinces, 
    onSubmit, 
    onCancel, 
    isLoading, 
    defaultProvinceId,
    defaultCountryId,
    onCountryChange
}) {
    const [formData, setFormData] = useState({
        name: "",
        province_id: "",
        country_id: ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                province_id: initialData.province_id || "",
                country_id: initialData.country_id || "" // Assuming API returns country_id
            });
        } else {
            setFormData({ 
                name: "", 
                province_id: defaultProvinceId || "",
                country_id: defaultCountryId || ""
            });
        }
    }, [initialData, defaultProvinceId, defaultCountryId]);

    const handleCountryChange = (id) => {
        setFormData({ ...formData, country_id: id, province_id: "" });
        onCountryChange(id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Negara
                </label>
                <select 
                    required
                    value={formData.country_id}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                >
                    <option value="">-- Pilih Negara --</option>
                    {countries.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Provinsi
                </label>
                <select 
                    required
                    value={formData.province_id}
                    onChange={(e) => setFormData({ ...formData, province_id: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                    disabled={!formData.country_id}
                >
                    <option value="">-- Pilih Provinsi --</option>
                    {provinces.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Nama Kota
                </label>
                <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Bandung"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
                />
            </div>

            <div className="flex gap-3 pt-4">
                <button 
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 transition-colors"
                >
                    Batal
                </button>
                <button 
                    type="submit"
                    disabled={isLoading}
                    className="flex-2 bg-brand-orange text-white px-8 py-3 rounded-xl text-sm font-bold hover:opacity-90 shadow-lg shadow-brand-orange/20 disabled:opacity-50"
                >
                    {isLoading ? "Menyimpan..." : "Simpan Kota"}
                </button>
            </div>
        </form>
    );
}
