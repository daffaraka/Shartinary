import React, { useState, useEffect } from "react";

export default function TagForm({ initialData, onSubmit, onCancel, isLoading }) {
    const [formData, setFormData] = useState({
        name: ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || ""
            });
        } else {
            setFormData({ name: "" });
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
                    Nama Tag
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">#</span>
                    <input 
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Solo Travel"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all font-bold text-brand-brown uppercase tracking-wider"
                    />
                </div>
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
                    {isLoading ? "Menyimpan..." : "Simpan Tag"}
                </button>
            </div>
        </form>
    );
}
