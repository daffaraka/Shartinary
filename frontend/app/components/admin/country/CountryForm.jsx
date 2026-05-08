import React, { useState, useEffect } from "react";

export default function CountryForm({ initialData, onSubmit, onCancel, isLoading }) {
    const [formData, setFormData] = useState({
        name: "",
        iso_code: ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                iso_code: initialData.iso_code || ""
            });
        } else {
            setFormData({ name: "", iso_code: "" });
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Nama Negara
                </label>
                <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Indonesia"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Kode ISO (2 Karakter)
                </label>
                <input 
                    type="text"
                    required
                    maxLength={2}
                    value={formData.iso_code}
                    onChange={(e) => setFormData({ ...formData, iso_code: e.target.value.toUpperCase() })}
                    placeholder="Contoh: ID"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
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
                    className="flex-2 bg-brand-orange text-white px-8 py-3 rounded-xl text-sm font-bold hover:opacity-90 shadow-lg shadow-brand-orange/20 disabled:opacity-50 transition-all"
                >
                    {isLoading ? "Menyimpan..." : "Simpan Negara"}
                </button>
            </div>
        </form>
    );
}
