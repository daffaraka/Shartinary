export default function CategoryList({ data, isLoading, onAdd, onEdit, onDelete }) {
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
                <h1 className="text-2xl font-bold text-brand-brown">Manajemen Kategori</h1>
                <button 
                    onClick={onAdd}
                    className="bg-brand-orange text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-brand-orange/20"
                >
                    + Tambah Kategori
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider">
                            <th className="py-4 px-4">ID</th>
                            <th className="py-4 px-4">Ikon</th>
                            <th className="py-4 px-4">Nama Kategori</th>
                            <th className="py-4 px-4">Slug</th>
                            <th className="py-4 px-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-[14px]">
                        {data && data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-4 text-gray-400 font-mono">{item.id}</td>
                                    <td className="py-4 px-4 text-xl">{item.icon}</td>
                                    <td className="py-4 px-4 font-bold text-brand-brown">{item.name}</td>
                                    <td className="py-4 px-4 font-medium text-gray-500">{item.slug}</td>
                                    <td className="py-4 px-4 text-right">
                                        <button 
                                            onClick={() => onEdit(item)}
                                            className="text-brand-orange border p-1 px-3 w-min-10 rounded-lg border-brand-orange/20 hover:bg-brand-orange hover:text-white font-bold mr-2 transition-all"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => onDelete(item.id)}
                                            className="text-red-500 border p-1 px-3 w-min-10 rounded-lg border-red-200 hover:text-red-700 hover:bg-red-50 font-bold transition-all"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-20 text-center text-gray-400 italic">
                                    Tidak ada data kategori ditemukan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
