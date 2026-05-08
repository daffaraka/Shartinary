import React, { useState, useEffect } from "react";

export default function ProvinceForm({ initialData, countries, onSubmit, onCancel, isLoading, defaultCountryId }) {
    const [formData, setFormData] = useState({
        name: "",
        country_id: ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                country_id: initialData.country_id || ""
            });
        } else {
            setFormData({ 
                name: "", 
                country_id: defaultCountryId || "" 
            });
        }
    }, [initialData, defaultCountryId]);

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
                    onChange={(e) => setFormData({ ...formData, country_id: e.target.value })}
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
                    Nama Provinsi
                </label>
                <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Jawa Barat"
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
                    {isLoading ? "Menyimpan..." : "Simpan Provinsi"}
                </button>
            </div>
        </form>
    );
}
