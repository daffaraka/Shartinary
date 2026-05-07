import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ItineraryCard from "../components/ItineraryCard";
import { itineraries } from "../data/dummyItineraries";

export default function Explore() {
  const [activeTab, setActiveTab] = useState("Semua");
  const categories = ["Semua", "Kuliner", "Alam & Wisata", "Belanja", "Keluarga", "Hiburan"];

  // For visual demo, we just map the dummy data a few times to fill the grid.
  const displayItineraries = [...itineraries, ...itineraries];

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col text-brand-brown">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-brand-brown pt-32 pb-20 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-[800px] mx-auto animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Eksplorasi Inspirasi</h1>
          <p className="text-white/60 text-lg">Temukan ribuan rute perjalanan yang dibuat oleh komunitas traveler, siap untuk disalin dan disesuaikan dengan gayamu.</p>
          
          {/* Main Search Bar */}
          <div className="mt-10 bg-white p-2 rounded-full shadow-2xl flex max-w-[600px] mx-auto focus-within:ring-4 focus-within:ring-brand-orange/30 transition-all">
            <input 
              type="text" 
              placeholder="Cari destinasi atau tema..." 
              className="flex-1 bg-transparent px-6 text-brand-brown focus:outline-none placeholder:text-brand-brown/40 font-medium"
            />
            <button className="bg-brand-orange text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors">
              Cari
            </button>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-8 py-16 flex flex-col md:flex-row gap-10">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-1/4 shrink-0">
          <div className="sticky top-28 space-y-8">
            
            {/* Filter Kategori */}
            <div className="bg-white p-6 rounded-3xl border border-brand-brown/5 shadow-sm shadow-brand-brown/5">
              <h3 className="font-bold text-[16px] text-brand-brown mb-4">Kategori Trip</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${activeTab === cat ? 'bg-brand-orange border-brand-orange text-white' : 'border-brand-brown/20 group-hover:border-brand-orange/50'}`}>
                      {activeTab === cat && <span className="text-[10px]">✓</span>}
                    </div>
                    <span className={`text-[14px] font-medium transition-colors ${activeTab === cat ? 'text-brand-orange' : 'text-brand-brown/70 group-hover:text-brand-brown'}`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Durasi */}
            <div className="bg-white p-6 rounded-3xl border border-brand-brown/5 shadow-sm shadow-brand-brown/5">
              <h3 className="font-bold text-[16px] text-brand-brown mb-4">Durasi Waktu</h3>
              <div className="space-y-3">
                {['1 Hari', '2-3 Hari', '1 Minggu', 'Lebih Lama'].map((dur, i) => (
                  <label key={dur} className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="duration" className="peer sr-only" defaultChecked={i === 1} />
                    <div className="w-5 h-5 rounded-full border border-brand-brown/20 peer-checked:border-[6px] peer-checked:border-brand-orange transition-all"></div>
                    <span className="text-[14px] font-medium text-brand-brown/70 peer-checked:text-brand-brown transition-colors">{dur}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Catalog Grid */}
        <div className="w-full md:w-3/4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-brand-brown">Rekomendasi Populer</h2>
            <div className="flex items-center gap-2 text-[14px] font-medium text-brand-brown/60">
              Urutkan: 
              <select className="bg-transparent font-bold text-brand-brown focus:outline-none cursor-pointer">
                <option>Terbaru</option>
                <option>Paling Banyak Disalin</option>
                <option>Budget Termurah</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {displayItineraries.map((itinerary, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <ItineraryCard 
                  title={itinerary.title}
                  price={itinerary.totalSpend}
                  loc={itinerary.location}
                  duration={itinerary.duration}
                  badges={itinerary.tags}
                  isFeatured={false}
                />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="bg-white border-2 border-brand-brown/10 text-brand-brown font-bold px-8 py-3 rounded-full hover:bg-[#faf9f6] transition-colors shadow-sm">
              Muat Lebih Banyak
            </button>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
