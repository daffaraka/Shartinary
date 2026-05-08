import React, { useState, useEffect } from "react";

export default function PlaceForm({ 
    initialData, 
    countries, 
    provinces, 
    cities, 
    categories, 
    tags,
    onSubmit, 
    onCancel, 
    isLoading,
    onCountryChange,
    onProvinceChange
}) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        address: "",
        latitude: "",
        longitude: "",
        category_id: "",
        city_id: "",
        province_id: "",
        country_id: "",
        rating: 0,
        tags: [] // Array of tag IDs
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                description: initialData.description || "",
                address: initialData.address || "",
                latitude: initialData.latitude || "",
                longitude: initialData.longitude || "",
                category_id: initialData.category_id || "",
                city_id: initialData.city_id || "",
                province_id: initialData.province_id || "",
                country_id: initialData.country_id || "",
                rating: initialData.rating || 0,
                tags: initialData.tags?.map(t => t.id) || []
            });
            setImagePreview(initialData.image);
            
            // Trigger cascading data if needed
            if (initialData.country_id) onCountryChange(initialData.country_id);
            if (initialData.province_id) onProvinceChange(initialData.province_id);
        }
    }, [initialData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleTagToggle = (tagId) => {
        const newTags = formData.tags.includes(tagId)
            ? formData.tags.filter(id => id !== tagId)
            : [...formData.tags, tagId];
        setFormData({ ...formData, tags: newTags });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'tags') {
                formData.tags.forEach(id => data.append('tags[]', id));
            } else {
                data.append(key, formData[key]);
            }
        });

        if (imageFile) {
            data.append('image', imageFile);
        }

        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto px-1">
            {/* Image Upload Section */}
            <div className="flex flex-col items-center gap-4 bg-gray-50 p-6 rounded-[30px] border border-dashed border-gray-200">
                <div className="w-40 h-40 rounded-[24px] bg-white shadow-inner overflow-hidden border-4 border-white">
                    {imagePreview ? (
                        <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
                            <span className="text-4xl">📸</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider">No Image</span>
                        </div>
                    )}
                </div>
                <input 
                    type="file" 
                    id="place-image" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <label 
                    htmlFor="place-image"
                    className="bg-brand-brown text-white text-[11px] font-bold px-5 py-2 rounded-full cursor-pointer hover:bg-brand-brown/90 transition-all"
                >
                    {imagePreview ? "Ganti Foto" : "Unggah Foto Utama"}
                </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Nama Destinasi</label>
                        <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                            placeholder="Contoh: Borobudur"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Kategori</label>
                        <select 
                            required
                            value={formData.category_id}
                            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                        >
                            <option value="">-- Pilih Kategori --</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Rating Default</label>
                        <input 
                            type="number" 
                            step="0.1"
                            max="5"
                            value={formData.rating}
                            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Deskripsi Singkat</label>
                        <textarea 
                            rows="7"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 resize-none"
                            placeholder="Ceritakan tentang tempat ini..."
                        />
                    </div>
                </div>
            </div>

            {/* Location Section */}
            <div className="bg-gray-50/50 p-6 rounded-[30px] border border-gray-100 space-y-6">
                <div className="text-xs font-bold text-brand-brown uppercase tracking-widest border-b border-gray-200 pb-2 mb-4">Informasi Lokasi</div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Negara</label>
                        <select 
                            required
                            value={formData.country_id}
                            onChange={(e) => {
                                setFormData({ ...formData, country_id: e.target.value, province_id: "", city_id: "" });
                                onCountryChange(e.target.value);
                            }}
                            className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                        >
                            <option value="">-- Pilih --</option>
                            {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Provinsi</label>
                        <select 
                            required
                            value={formData.province_id}
                            onChange={(e) => {
                                setFormData({ ...formData, province_id: e.target.value, city_id: "" });
                                onProvinceChange(e.target.value);
                            }}
                            className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                            disabled={!formData.country_id}
                        >
                            <option value="">-- Pilih --</option>
                            {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Kota</label>
                        <select 
                            required
                            value={formData.city_id}
                            onChange={(e) => setFormData({ ...formData, city_id: e.target.value })}
                            className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                            disabled={!formData.province_id}
                        >
                            <option value="">-- Pilih --</option>
                            {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Alamat Lengkap</label>
                    <input 
                        type="text" 
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                        placeholder="Jl. Raya Borobudur No. 1..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Latitude</label>
                        <input 
                            type="text" 
                            value={formData.latitude}
                            onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                            className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-orange/20 font-mono"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Longitude</label>
                        <input 
                            type="text" 
                            value={formData.longitude}
                            onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                            className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-orange/20 font-mono"
                        />
                    </div>
                </div>
            </div>

            {/* Tags Section */}
            <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">Pilih Tags (Karakteristik)</label>
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <button
                            key={tag.id}
                            type="button"
                            onClick={() => handleTagToggle(tag.id)}
                            className={`px-4 py-2 rounded-full text-[11px] font-bold transition-all border ${
                                formData.tags.includes(tag.id)
                                ? "bg-brand-orange text-white border-brand-orange"
                                : "bg-white text-gray-400 border-gray-200 hover:border-brand-orange/30"
                            }`}
                        >
                            #{tag.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6 sticky bottom-0 bg-white pb-2">
                <button 
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-4 py-4 rounded-2xl border border-gray-200 text-gray-600 text-[13px] font-bold hover:bg-gray-50 transition-colors"
                >
                    Batal
                </button>
                <button 
                    type="submit"
                    disabled={isLoading}
                    className="flex-2 bg-brand-orange text-white px-8 py-4 rounded-2xl text-[13px] font-bold hover:opacity-90 shadow-xl shadow-brand-orange/20 disabled:opacity-50 transition-all"
                >
                    {isLoading ? "Sedang Menyimpan..." : (initialData ? "Perbarui Destinasi" : "Simpan Destinasi")}
                </button>
            </div>
        </form>
    );
}
