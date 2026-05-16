import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { CATEGORY_COLORS } from "../data/dummyItineraries";
import { itineraryApi } from "../api/itinerary.api";

export default function ItineraryDetail() {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        setLoading(true);
        const response = await itineraryApi.getById(id);
        setItinerary(response.data);
      } catch (err) {
        console.error("Error fetching itinerary:", err);
        setError("Gagal memuat itinerary. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
          <p className="text-brand-brown/40 font-medium animate-pulse">Menyiapkan rute perjalanan terbaik...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !itinerary) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
          <div className="bg-red-50 text-red-500 p-6 rounded-3xl mb-6 max-w-md">
            <p className="font-bold">{error || "Itinerary tidak ditemukan."}</p>
          </div>
          <Link to="/explore" className="text-brand-orange font-bold hover:underline">
            Kembali ke Jelajahi
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Helper untuk gambar (karena DB mungkin belum punya gambar asli)
  const headerImage = itinerary.image || `https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2070&auto=format&fit=crop`;

  return (
    <div className="min-h-screen bg-[#faf9f6] text-brand-brown">
      <Navbar />

      {/* 1. Gambar Header & Judul Utama */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-brand-brown overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-brown via-brand-brown to-brand-orange/40 mix-blend-multiply z-10"></div>
        <img 
          src={headerImage} 
          alt={itinerary.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-brand-orange text-white text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {itinerary.city?.name || "Global"}
              </span>
              {itinerary.is_public && (
                <span className="bg-white/20 backdrop-blur-md text-white text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Public
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight shadow-sm">
              {itinerary.title}
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              {itinerary.description}
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Kolom Kiri: Jadwal Itinerary */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-extrabold text-brand-brown mb-8 border-b border-brand-brown/10 pb-4">
            Rincian Perjalanan
          </h2>

          {itinerary.days?.map((day) => (
            <div key={day.id} className="mb-12">
              <h3 className="text-xl font-bold bg-brand-orange text-white inline-block px-5 py-2 rounded-xl mb-8 shadow-md">
                {day.theme || `Hari ke-${day.day_number}`}
              </h3>
              
              <div className="relative border-l-2 border-brand-orange/30 ml-4 space-y-10 pb-4">
                {day.items?.map((item) => {
                  const categorySlug = item.place?.category?.slug || 'transit';
                  const catStyle = CATEGORY_COLORS[categorySlug] || CATEGORY_COLORS.transit;
                  return (
                    <div key={item.id} className="relative pl-8 group">
                      <div className="absolute w-4 h-4 bg-brand-orange rounded-full -left-[9px] top-1 border-4 border-[#faf9f6] group-hover:scale-125 transition-transform"></div>
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                        <div className="text-brand-orange font-bold text-lg min-w-[80px]">
                          {item.time_start?.substring(0, 5) || "00:00"}
                        </div>
                        <h4 className="text-xl font-bold text-brand-brown">{item.place?.name}</h4>
                      </div>
                      <div className="bg-white border border-brand-brown/5 rounded-2xl p-5 shadow-sm shadow-brand-brown/5 mt-3 group-hover:shadow-md transition-shadow">
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                           <span className={`text-[10px] font-bold ${catStyle.bg} ${catStyle.text} px-2 py-1 rounded-md uppercase tracking-wide flex items-center gap-1`}>
                             {catStyle.icon} {categorySlug.replace('_', ' ')}
                           </span>
                           {item.place?.price_range && (
                             <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md uppercase tracking-wide">
                               {item.place.price_range}
                             </span>
                           )}
                        </div>
                        
                        <p className="text-brand-brown-muted text-[15px] mb-4">
                          {item.note || item.place?.address}
                        </p>
                        
                        <div className="flex items-center gap-4 text-[13px] font-bold bg-[#faf9f6] inline-flex px-4 py-2 rounded-lg text-brand-brown/70">
                          <span>💵 Est. Cost: <span className="text-brand-orange">Rp {(item.estimated_cost || 0).toLocaleString('id-ID')}</span></span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Paywall (Simulated logic: if duration_days > 2) */}
          {itinerary.duration_days > 2 && (
            <div className="relative mt-12 pt-8">
              <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f6]/0 via-[#faf9f6] to-[#faf9f6] z-10"></div>
              <div className="relative z-0 opacity-30 select-none pointer-events-none blur-sm">
                 <h3 className="text-xl font-bold bg-brand-brown text-white inline-block px-5 py-2 rounded-xl mb-8">
                  Hari Berikutnya...
                 </h3>
              </div>

              <div className="relative z-20 bg-white border-2 border-brand-orange rounded-[32px] p-8 md:p-12 text-center shadow-2xl shadow-brand-orange/10 max-w-[600px] mx-auto -mt-20">
                <div className="w-16 h-16 bg-brand-orange/10 text-brand-orange rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                  🔒
                </div>
                <h3 className="text-2xl font-extrabold text-brand-brown mb-4">Buka Rute Sepenuhnya</h3>
                <p className="text-brand-brown-muted text-[15px] mb-8 leading-relaxed">
                  Rute selanjutnya mengandung informasi rahasia, rekomendasi spot, dan rincian budget lengkap. Berlangganan <strong>Shartinary Premium</strong> untuk melihat jadwal secara utuh!
                </p>
                <button className="bg-brand-orange text-white text-lg font-bold py-4 px-10 rounded-full hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/30 w-full sm:w-auto">
                  Berlangganan Rp 49k / Bulan
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Kolom Kanan: Sidebar */}
        <div className="lg:col-span-1 space-y-8 order-first lg:order-last">
          <div className="bg-white rounded-[32px] p-8 border border-brand-brown/5 shadow-xl shadow-brand-brown/5 sticky top-28">
            
            {/* Author */}
            <div className="flex items-center gap-4 pb-6 border-b border-brand-brown/5 mb-6">
              <div className="w-12 h-12 bg-brand-brown rounded-full text-white flex items-center justify-center text-xl font-bold">
                {itinerary.user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <div className="text-[12px] text-brand-brown/50 font-bold uppercase tracking-widest mb-1">Dibuat Oleh</div>
                <div className="text-[16px] font-bold text-brand-brown">{itinerary.user?.name || "Anonymous User"}</div>
              </div>
            </div>

            {/* Stats */}
            <div className="mb-8">
              <h4 className="text-[13px] font-bold text-brand-brown uppercase tracking-widest mb-3">Durasi & Kota</h4>
              <div className="flex items-center gap-3 text-brand-orange font-bold">
                <span>📅 {itinerary.duration_days} Hari</span>
                <span>📍 {itinerary.city?.name}</span>
              </div>
            </div>

            {/* Estimasi Budget */}
            <div className="bg-[#faf9f6] rounded-2xl p-6 mb-8 border border-brand-brown/5">
              <div className="text-[12px] font-bold text-brand-brown/50 uppercase tracking-widest mb-1">Total Estimasi Budget</div>
              <div className="text-3xl font-extrabold text-brand-brown">Rp {(itinerary.total_budget || 0).toLocaleString('id-ID')}</div>
              <div className="text-[13px] text-brand-brown/50 mt-2">Estimasi budget per orang</div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button className="w-full bg-brand-brown text-white font-bold py-4 rounded-xl hover:bg-brand-orange transition-colors flex items-center justify-center gap-2 shadow-sm">
                <span>➕</span> Gunakan Itinerary Ini
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => alert('Fitur Download PDF sedang disiapkan!')}
                  className="w-full bg-white text-brand-brown border-2 border-brand-brown/10 font-bold py-3 rounded-xl hover:border-brand-brown transition-colors flex items-center justify-center gap-2 text-[13px] shadow-sm"
                >
                  <span>⬇️</span> Simpan PDF
                </button>
                <button 
                  onClick={() => {
                    const url = `https://wa.me/?text=Halo! Lihat itinerary liburan keren ke ${itinerary.city?.name} yang saya buat di Shartinary: ${window.location.href}`;
                    window.open(url, '_blank');
                  }}
                  className="w-full bg-[#25D366] text-white font-bold py-3 rounded-xl hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2 text-[13px] shadow-sm"
                >
                  WhatsApp
                </button>
              </div>
            </div>
            
          </div>
        </div>
        
      </main>

      <Footer />
    </div>
  );
}
