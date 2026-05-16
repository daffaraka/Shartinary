import { useState, useEffect } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import { itineraryApi } from "../api/itinerary.api";
import AdminModal from "../components/admin/country/CountryModal";

export function meta() {
  return [
    { title: "Manajemen Itinerary - Shartinary Admin" },
  ];
}

export default function AdminItineraries() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Detail Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetchItineraries = async () => {
    try {
      setLoading(true);
      const res = await itineraryApi.getAdminAll();
      setItineraries(res.data.data);
    } catch (err) {
      console.error("Gagal mengambil data itinerary", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  const handleViewDetail = async (id) => {
    setIsModalOpen(true);
    setDetailLoading(true);
    setSelectedItinerary(null);
    try {
      const res = await itineraryApi.getById(id);
      setSelectedItinerary(res.data);
    } catch (err) {
      alert("Gagal mengambil detail itinerary");
      setIsModalOpen(false);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus itinerary ini?")) {
      try {
        await itineraryApi.delete(id);
        setItineraries(itineraries.filter(i => i.id !== id));
      } catch (err) {
        alert("Gagal menghapus itinerary");
      }
    }
  };

  const handleToggleVisibility = async (id) => {
    try {
      const res = await itineraryApi.toggleVisibility(id);
      setItineraries(itineraries.map(i =>
        i.id === id ? { ...i, is_public: res.data.is_public } : i
      ));
    } catch (err) {
      alert("Gagal mengubah visibilitas");
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-brown">Manajemen Itinerary</h1>
          <p className="text-brand-brown/50 text-sm">Kelola rute perjalanan yang dibuat oleh user.</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-brand-brown/5 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-brand-brown/5">
              <th className="px-8 py-5 text-[12px] font-bold text-brand-brown/40 uppercase tracking-widest">Judul & Author</th>
              <th className="px-8 py-5 text-[12px] font-bold text-brand-brown/40 uppercase tracking-widest">Kota</th>
              <th className="px-8 py-5 text-[12px] font-bold text-brand-brown/40 uppercase tracking-widest">Durasi</th>
              <th className="px-8 py-5 text-[12px] font-bold text-brand-brown/40 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-[12px] font-bold text-brand-brown/40 uppercase tracking-widest text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-brown/5">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-8 py-20 text-center text-brand-brown/40">
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange"></div>
                    <span>Memuat data...</span>
                  </div>
                </td>
              </tr>
            ) : itineraries.length > 0 ? (
              itineraries.map((itinerary) => (
                <tr key={itinerary.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="font-bold text-brand-brown">{itinerary.title}</div>
                    <div className="text-[11px] text-brand-brown/40">Oleh: {itinerary.user?.name || 'Unknown'}</div>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-brand-brown/60">
                    {itinerary.city?.name}
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-brand-brown/60">
                    {itinerary.duration_days} Hari
                  </td>
                  <td className="px-8 py-5">
                    <button
                      onClick={() => handleToggleVisibility(itinerary.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${itinerary.is_public ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                    >
                      {itinerary.is_public ? 'Public' : 'Private'}
                    </button>
                  </td>
                  <td className="px-8 py-5 text-right space-x-2">
                    <button
                      onClick={() => handleViewDetail(itinerary.id)}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                      title="Lihat Detail"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => handleDelete(itinerary.id)}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      title="Hapus"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-8 py-20 text-center text-brand-brown/40">
                  Belum ada itinerary.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detail Itinerary"
        className="max-w-3xl"
      >
        <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          {detailLoading ? (
            <div className="py-10 text-center flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange"></div>
              <p className="text-sm text-gray-400">Memuat detail...</p>
            </div>
          ) : selectedItinerary ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Judul</h4>
                <p className="text-brand-brown font-bold text-lg">{selectedItinerary.title}</p>
              </div>

              <div>
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Deskripsi</h4>
                <p className="text-sm text-brand-brown/70 leading-relaxed">{selectedItinerary.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Kota</h4>
                  <p className="text-sm font-bold text-brand-brown">{selectedItinerary.city?.name}</p>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Budget</h4>
                  <p className="text-sm font-bold text-brand-orange">Rp {selectedItinerary.total_budget?.toLocaleString('id-ID')}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-sm font-bold text-brand-brown mb-4">Rencana Harian</h4>
                <div className="space-y-6">
                  {selectedItinerary.days?.map((day) => (
                    <div key={day.id} className="bg-gray-50 rounded-2xl p-4">
                      <div className="font-bold text-brand-brown mb-3 pb-2 border-b border-gray-200 flex justify-between">
                        <span>Hari {day.day_number}</span>
                        <span className="text-[11px] font-normal text-gray-400">{day.theme}</span>
                      </div>
                      <div className="space-y-3">
                        {day.items?.map((item) => (
                          <div key={item.id} className="flex gap-3 text-sm">
                            <span className="font-bold text-brand-orange shrink-0">{item.time_start?.substring(0, 5)}</span>
                            <div>
                              <div className="font-bold text-brand-brown">{item.place?.name}</div>
                              <div className="text-[12px] text-brand-brown/50">{item.note || item.place?.address}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </AdminModal>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fdba74;
          border-radius: 10px;
        }
      `}} />
    </AdminLayout>
  );
}
