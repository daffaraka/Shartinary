export default function CityList({ 
    data, 
    isLoading, 
    onAdd, 
    onEdit, 
    onDelete, 
    countries, 
    provinces,
    selectedCountry, 
    selectedProvince,
    onCountryChange,
    onProvinceChange
}) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-brand-brown">Manajemen Kota</h1>
                    <p className="text-gray-400 text-sm">Kelola data kota berdasarkan wilayah</p>
                </div>
                <button 
                    onClick={onAdd}
                    className="bg-brand-orange text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-brand-orange/20"
                >
                    + Tambah Kota
                </button>
            </div>

            {/* Filter */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div>
                    <label className="block text-[10px] font-bold text-brand-brown/40 uppercase tracking-widest mb-1">Negara</label>
                    <select 
                        value={selectedCountry || ""} 
                        onChange={(e) => onCountryChange(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                    >
                        <option value="">-- Pilih Negara --</option>
                        {countries.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-brand-brown/40 uppercase tracking-widest mb-1">Provinsi</label>
                    <select 
                        value={selectedProvince || ""} 
                        onChange={(e) => onProvinceChange(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                        disabled={!selectedCountry}
                    >
                        <option value="">-- Pilih Provinsi --</option>
                        {provinces.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider">
                            <th className="py-4 px-4">ID</th>
                            <th className="py-4 px-4">Nama Kota</th>
                            <th className="py-4 px-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-[14px]">
                        {isLoading ? (
                            <tr>
                                <td colSpan="3" className="py-10 text-center">
                                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange mx-auto"></div>
                                </td>
                            </tr>
                        ) : data && data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-4 text-gray-400 font-mono">{item.id}</td>
                                    <td className="py-4 px-4 font-bold text-brand-brown">{item.name}</td>
                                    <td className="py-4 px-4 text-right">
                                        <button 
                                            onClick={() => onEdit(item)}
                                            className="text-brand-orange border p-1 px-3 rounded-lg border-brand-orange/20 hover:bg-brand-orange hover:text-white font-bold mr-2 transition-all"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => onDelete(item.id)}
                                            className="text-red-500 border p-1 px-3 rounded-lg border-red-100 hover:bg-red-50 font-bold transition-all"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                                <tr>
                                    <td colSpan="3" className="py-20 text-center text-gray-400 italic">
                                        {selectedCountry ? "Tidak ada data kota ditemukan di wilayah ini." : "Pilih negara terlebih dahulu untuk melihat kota."}
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
