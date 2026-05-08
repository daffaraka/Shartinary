export default function PlaceList({ data, isLoading, onAdd, onEdit, onDelete }) {
    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-brand-brown">Manajemen Destinasi</h1>
                    <p className="text-gray-400 text-sm">Kelola Point of Interest (POI) dan lokasi wisata</p>
                </div>
                <button 
                    onClick={onAdd}
                    className="bg-brand-orange text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-brand-orange/20"
                >
                    + Tambah Destinasi
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                            <th className="py-4 px-4">Info Tempat</th>
                            <th className="py-4 px-4">Kategori</th>
                            <th className="py-4 px-4">Lokasi</th>
                            <th className="py-4 px-4">Rating</th>
                            <th className="py-4 px-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-[14px]">
                        {data && data.length > 0 ? (
                            data.map((place) => (
                                <tr key={place.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                                                {place.image ? (
                                                    <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        🖼️
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-brand-brown">{place.name}</div>
                                                <div className="text-[11px] text-gray-400 truncate max-w-[200px]">{place.address}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="bg-brand-orange/5 text-brand-orange px-3 py-1 rounded-full font-bold text-[10px] uppercase border border-brand-orange/10">
                                            {place.category?.icon} {place.category?.name}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="text-[13px] font-medium text-gray-700">{place.city?.name}</div>
                                        <div className="text-[11px] text-gray-400">{place.province?.name}</div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-1 text-orange-400 font-bold">
                                            ⭐ {place.rating || "0.0"}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => onEdit(place)}
                                                className="p-2 text-brand-orange border border-brand-orange/20 rounded-lg hover:bg-brand-orange hover:text-white transition-all"
                                                title="Edit"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            </button>
                                            <button 
                                                onClick={() => onDelete(place.id)}
                                                className="p-2 text-red-500 border border-red-100 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                                                title="Hapus"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-20 text-center text-gray-400 italic">
                                    Belum ada data destinasi ditemukan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
