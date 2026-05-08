import { useState, useEffect } from "react";

export function meta() {
  return [
    { title: "Jelajahi Destinasi - Shartinary" },
    { name: "description", content: "Temukan rute perjalanan terbaik untuk petualanganmu." },
  ];
}

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ItineraryCard from "../components/layout/ItineraryCard";
import { useExplore } from "../contexts/ExploreContext";
import { useCountry } from "../contexts/CountryContext";

export default function Explore() {
  const { 
    categories, tags, places, loading: searchLoading, 
    filters, updateFilters, performSearch 
  } = useExplore();

  const { 
    countries, provinces, cities, 
    fetchProvinces, fetchCities 
  } = useCountry();

  // Local state for search query to avoid too many re-renders
  const [tempQuery, setTempQuery] = useState(filters.query);

  // Sync provinces when country changes
  useEffect(() => {
    if (filters.country_id) fetchProvinces(filters.country_id);
  }, [filters.country_id]);

  // Sync cities when province changes
  useEffect(() => {
    if (filters.province_id) fetchCities(filters.province_id);
  }, [filters.province_id]);

  // Perform search on mount or when filters change
  useEffect(() => {
    performSearch();
  }, [filters.category, filters.tag, filters.city_id, filters.province_id, filters.country_id]);

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilters({ query: tempQuery });
    performSearch({ ...filters, query: tempQuery });
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col text-brand-brown">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-brand-brown pt-32 pb-20 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-[800px] mx-auto animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Eksplorasi Inspirasi</h1>
          <p className="text-white/60 text-lg">Temukan tempat terbaik dan rute perjalanan yang dikurasi khusus untuk petualanganmu.</p>
          
          {/* Main Search Bar */}
          <form onSubmit={handleSearch} className="mt-10 bg-white p-2 rounded-full shadow-2xl flex max-w-[600px] mx-auto focus-within:ring-4 focus-within:ring-brand-orange/30 transition-all">
            <input 
              type="text" 
              value={tempQuery}
              onChange={(e) => setTempQuery(e.target.value)}
              placeholder="Cari destinasi, kota, atau tema..." 
              className="flex-1 bg-transparent px-6 text-brand-brown focus:outline-none placeholder:text-brand-brown/40 font-medium"
            />
            <button type="submit" className="bg-brand-orange text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-brand-orange/20">
              {searchLoading ? "Mencari..." : "Cari"}
            </button>
          </form>
        </div>
      </section>

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-8 py-16 flex flex-col md:flex-row gap-10">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-1/4 shrink-0">
          <div className="sticky top-28 space-y-6">
            
            {/* Filter Wilayah */}
            <div className="bg-white p-6 rounded-3xl border border-brand-brown/5 shadow-sm">
              <h3 className="font-bold text-[16px] text-brand-brown mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Lokasi & Wilayah
              </h3>
              <div className="space-y-4">
                <div>
                    <label className="text-[10px] font-bold text-brand-brown/40 uppercase tracking-widest mb-1 block">Negara</label>
                    <select 
                        value={filters.country_id}
                        onChange={(e) => updateFilters({ country_id: e.target.value, province_id: "", city_id: "" })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                    >
                        <option value="">Semua Negara</option>
                        {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-[10px] font-bold text-brand-brown/40 uppercase tracking-widest mb-1 block">Provinsi</label>
                    <select 
                        disabled={!filters.country_id}
                        value={filters.province_id}
                        onChange={(e) => updateFilters({ province_id: e.target.value, city_id: "" })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-orange/20 focus:outline-none disabled:opacity-50"
                    >
                        <option value="">Semua Provinsi</option>
                        {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-[10px] font-bold text-brand-brown/40 uppercase tracking-widest mb-1 block">Kota</label>
                    <select 
                        disabled={!filters.province_id}
                        value={filters.city_id}
                        onChange={(e) => updateFilters({ city_id: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-orange/20 focus:outline-none disabled:opacity-50"
                    >
                        <option value="">Semua Kota</option>
                        {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
              </div>
            </div>

            {/* Filter Kategori */}
            <div className="bg-white p-6 rounded-3xl border border-brand-brown/5 shadow-sm">
              <h3 className="font-bold text-[16px] text-brand-brown mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                Kategori
              </h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => updateFilters({ category: "" })}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${!filters.category ? 'bg-brand-orange text-white' : 'bg-gray-50 text-brand-brown/60 hover:bg-gray-100'}`}
                >
                  Semua
                </button>
                {categories.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => updateFilters({ category: cat.slug })}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filters.category === cat.slug ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' : 'bg-gray-50 text-brand-brown/60 hover:bg-gray-100'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Tags */}
            <div className="bg-white p-6 rounded-3xl border border-brand-brown/5 shadow-sm">
              <h3 className="font-bold text-[16px] text-brand-brown mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                Tags Populer
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button 
                    key={tag.id}
                    onClick={() => updateFilters({ tag: filters.tag === tag.slug ? "" : tag.slug })}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all border ${filters.tag === tag.slug ? 'bg-brand-brown text-white border-brand-brown' : 'bg-transparent text-brand-brown/40 border-brand-brown/10 hover:border-brand-brown/30'}`}
                  >
                    #{tag.name}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Catalog Grid */}
        <div className="w-full md:w-3/4">
          <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-2xl font-bold text-brand-brown">Hasil Penjelajahan</h2>
                <p className="text-brand-brown/40 text-sm">Menampilkan {places.length} tempat menarik</p>
            </div>
            <div className="flex items-center gap-2 text-[14px] font-medium text-brand-brown/60">
              Urutkan: 
              <select className="bg-transparent font-bold text-brand-brown focus:outline-none cursor-pointer">
                <option>Terbaru</option>
                <option>Populer</option>
                <option>Terdekat</option>
              </select>
            </div>
          </div>

          {searchLoading ? (
             <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
                <p className="text-brand-brown/40 font-medium animate-pulse">Sedang mencari tempat terbaik...</p>
             </div>
          ) : places.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {places.map((place, index) => (
                <div key={place.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <ItineraryCard 
                    title={place.name}
                    price={place.price_level || "Gratis"}
                    loc={place.city?.name || "Lokasi Rahasia"}
                    duration={place.category?.name || "General"}
                    badges={place.tags?.map(t => t.name) || []}
                    isFeatured={false}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-brand-brown/10">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-brand-brown mb-2">Ups, tempat tidak ditemukan!</h3>
                <p className="text-brand-brown/40 max-w-[300px] mx-auto">Coba ubah kata kunci atau hapus beberapa filter untuk melihat lebih banyak hasil.</p>
                <button 
                  onClick={() => { window.location.reload() }}
                  className="mt-6 text-brand-orange font-bold text-sm hover:underline"
                >
                  Reset Pencarian
                </button>
            </div>
          )}

          {places.length > 0 && (
            <div className="mt-12 text-center">
              <button className="bg-white border-2 border-brand-brown/10 text-brand-brown font-bold px-8 py-3 rounded-full hover:bg-[#faf9f6] transition-colors shadow-sm">
                Muat Lebih Banyak
              </button>
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}
