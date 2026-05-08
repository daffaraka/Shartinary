import { useParams, Link } from "react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { itineraries, CATEGORY_COLORS } from "../data/dummyItineraries";

export default function ItineraryDetail() {
  const { id } = useParams();
  
  // Ambil data dummy berdasarkan ID (fallback ke index 0 jika tidak ada)
  const itinerary = itineraries.find(i => i.id === parseInt(id)) || itineraries[0];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-brand-brown">
      <Navbar />

      {/* 1. Gambar Header & Judul Utama */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-brand-brown overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-brown via-brand-brown to-brand-orange/40 mix-blend-multiply z-10"></div>
        <img 
          src={itinerary.image} 
          alt={itinerary.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-brand-orange text-white text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{itinerary.location}</span>
              {itinerary.tags.map((tag, idx) => (
                <span key={idx} className="bg-white/20 backdrop-blur-md text-white text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              ))}
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
        
        {/* Kolom Kiri: Jadwal Itinerary & Paywall */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-extrabold text-brand-brown mb-8 border-b border-brand-brown/10 pb-4">
            Rincian Perjalanan
          </h2>

          {itinerary.days.map((day) => (
            <div key={day.dayNumber} className="mb-12">
              <h3 className="text-xl font-bold bg-brand-orange text-white inline-block px-5 py-2 rounded-xl mb-8 shadow-md">
                {day.title}
              </h3>
              
              <div className="relative border-l-2 border-brand-orange/30 ml-4 space-y-10 pb-4">
                {day.activities.map((act) => {
                  const catStyle = CATEGORY_COLORS[act.primary_category] || CATEGORY_COLORS.transit;
                  return (
                    <div key={act.id} className="relative pl-8 group">
                      <div className="absolute w-4 h-4 bg-brand-orange rounded-full -left-[9px] top-1 border-4 border-[#faf9f6] group-hover:scale-125 transition-transform"></div>
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                        <div className="text-brand-orange font-bold text-lg min-w-[80px]">{act.time_start}</div>
                        <h4 className="text-xl font-bold text-brand-brown">{act.place}</h4>
                      </div>
                      <div className="bg-white border border-brand-brown/5 rounded-2xl p-5 shadow-sm shadow-brand-brown/5 mt-3 group-hover:shadow-md transition-shadow">
                        
                        {/* Tags Kategori (IMPLEMENTASI BRAINSTORMING) */}
                        <div className="flex flex-wrap gap-2 mb-3">
                           {/* Primary Category Badge */}
                           <span className={`text-[10px] font-bold ${catStyle.bg} ${catStyle.text} px-2 py-1 rounded-md uppercase tracking-wide flex items-center gap-1`}>
                             {catStyle.icon} {act.primary_category.replace('_', ' ')}
                           </span>
                           {/* Specific Tags Badge */}
                           {act.tags.map((t, tidx) => (
                             <span key={tidx} className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md uppercase tracking-wide">
                               {t}
                             </span>
                           ))}
                        </div>
                        
                        <p className="text-brand-brown-muted text-[15px] mb-4">{act.description}</p>
                        
                        <div className="flex items-center gap-4 text-[13px] font-bold bg-[#faf9f6] inline-flex px-4 py-2 rounded-lg text-brand-brown/70">
                          <span>💵 Spend: <span className="text-brand-orange">Rp {act.estimated_spend.toLocaleString('id-ID')}</span> ({act.spend_note})</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Paywall / Subscription Condition */}
          <div className="relative mt-12 pt-8">
            <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f6]/0 via-[#faf9f6] to-[#faf9f6] z-10"></div>
            <div className="relative z-0 opacity-30 select-none pointer-events-none blur-sm">
               <h3 className="text-xl font-bold bg-brand-brown text-white inline-block px-5 py-2 rounded-xl mb-8">
                Hari Berikutnya...
               </h3>
               <div className="border-l-2 border-brand-brown/30 ml-4 space-y-8">
                 <div className="pl-8">
                   <div className="w-full h-32 bg-gray-200 rounded-2xl"></div>
                 </div>
               </div>
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
        </div>

        {/* Kolom Kanan: Sidebar (Di atas pada Mobile) */}
        <div className="lg:col-span-1 space-y-8 order-first lg:order-last">
          <div className="bg-white rounded-[32px] p-8 border border-brand-brown/5 shadow-xl shadow-brand-brown/5 sticky top-28">
            
            {/* Author */}
            <div className="flex items-center gap-4 pb-6 border-b border-brand-brown/5 mb-6">
              <div className="w-12 h-12 bg-brand-brown rounded-full text-white flex items-center justify-center text-xl font-bold">
                {itinerary.authorInitial}
              </div>
              <div>
                <div className="text-[12px] text-brand-brown/50 font-bold uppercase tracking-widest mb-1">Dibuat Oleh</div>
                <div className="text-[16px] font-bold text-brand-brown">{itinerary.author}</div>
              </div>
            </div>

            {/* Sitasi / Social Proof */}
            <div className="mb-8">
              <h4 className="text-[13px] font-bold text-brand-brown uppercase tracking-widest mb-3">Digunakan Oleh</h4>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full bg-orange-200 border-2 border-white z-30"></div>
                  <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white z-20"></div>
                  <div className="w-8 h-8 rounded-full bg-green-200 border-2 border-white z-10"></div>
                </div>
                <div className="text-[13px] font-bold text-brand-orange">
                  +{itinerary.usersCount} Traveler lainnya
                </div>
              </div>
            </div>

            {/* Komposisi Aktivitas Dinamis */}
            <div className="mb-8">
              <h4 className="text-[13px] font-bold text-brand-brown uppercase tracking-widest mb-3">Komposisi Perjalanan</h4>
              <div className="flex w-full h-3 rounded-full overflow-hidden mb-3 bg-gray-100">
                {itinerary.composition.map((comp, idx) => {
                  const colorClass = CATEGORY_COLORS[comp.category]?.color || 'bg-gray-400';
                  return (
                    <div key={idx} className={`${colorClass}`} style={{ width: `${comp.percentage}%` }} title={`${comp.label} (${comp.percentage}%)`}></div>
                  )
                })}
              </div>
              <div className="grid grid-cols-2 gap-2 text-[12px] font-bold text-brand-brown/60 mt-4">
                {itinerary.composition.map((comp, idx) => {
                  const colorClass = CATEGORY_COLORS[comp.category]?.color || 'bg-gray-400';
                  return (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${colorClass}`}></span> 
                      {comp.label} ({comp.percentage}%)
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Estimasi Budget */}
            <div className="bg-[#faf9f6] rounded-2xl p-6 mb-8 border border-brand-brown/5">
              <div className="text-[12px] font-bold text-brand-brown/50 uppercase tracking-widest mb-1">Total Estimasi Budget</div>
              <div className="text-3xl font-extrabold text-brand-brown">Rp {itinerary.totalSpend}</div>
              <div className="text-[13px] text-brand-brown/50 mt-2">Untuk 1 orang selama {itinerary.duration}</div>
            </div>

            {/* Actions (IMPLEMENTASI POINT 4) */}
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
                    const url = `https://wa.me/?text=Halo! Lihat itinerary liburan keren ke ${itinerary.location} yang saya buat di Shartinary: ${window.location.href}`;
                    window.open(url, '_blank');
                  }}
                  className="w-full bg-[#25D366] text-white font-bold py-3 rounded-xl hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2 text-[13px] shadow-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
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
