import React, { useState, useEffect } from "react";

export default function CategoryForm({ initialData, onSubmit, onCancel, isLoading }) {
    const [formData, setFormData] = useState({
        name: "",
        icon: ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                icon: initialData.icon || ""
            });
        } else {
            setFormData({ name: "", icon: "" });
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
                    Ikon (Emoji)
                </label>
                <input 
                    type="text"
                    required
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="Contoh: 🍕"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all text-center"
                />
                <p className="text-[10px] text-gray-400 mt-2 italic text-center">Gunakan shortcut Win + . untuk memilih emoji</p>
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Nama Kategori
                </label>
                <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Kuliner Nusantara"
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
                    className="flex-2 bg-brand-orange text-white px-8 py-3 rounded-xl text-sm font-bold hover:opacity-90 shadow-lg shadow-brand-orange/20 disabled:opacity-50 transition-all"
                >
                    {isLoading ? "Menyimpan..." : "Simpan Kategori"}
                </button>
            </div>
        </form>
    );
}
