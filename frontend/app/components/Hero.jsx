export default function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange text-[12px] font-bold py-1.5 px-4 rounded-full mb-6 uppercase tracking-widest">
            Temukan Inspirasi Anda
          </div>
          <h1 className="text-[52px] lg:text-[64px] font-extrabold text-brand-brown leading-[1.05] tracking-tight mb-8">
            Rencanakan <span className="text-brand-orange">ketenangan</span> di tiap langkah.
          </h1>
          <p className="text-[17px] text-brand-brown-muted leading-relaxed mb-10 max-w-[480px] mx-auto md:mx-0">
            Platform berbagi itinerary terbaik untuk para traveler. Temukan, simpan, dan bagikan rencana perjalanan impian Anda dengan komunitas.
          </p>
          
          <div className="bg-white p-2.5 rounded-2xl shadow-xl shadow-brand-brown/5 border border-brand-brown/10 flex flex-col sm:flex-row gap-2 max-w-[650px] mx-auto md:mx-0 mt-8">
            <div className="flex-1 relative border-b sm:border-b-0 sm:border-r border-brand-brown/10">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown/40">🔍</span>
              <input type="text" placeholder="Cari destinasi..." className="w-full bg-transparent border-none outline-none py-3.5 pl-11 pr-4 text-[14px] text-brand-brown placeholder-brand-brown/40" />
            </div>
            <div className="flex-1 relative border-b sm:border-b-0 sm:border-r border-brand-brown/10">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown/40">📍</span>
              <select className="w-full bg-transparent border-none outline-none appearance-none py-3.5 pl-11 pr-4 text-[14px] font-medium text-brand-brown cursor-pointer">
                <option value="">Semua Kota</option>
                <option value="bali">Bali</option>
                <option value="jogja">Yogyakarta</option>
                <option value="lombok">Lombok</option>
                <option value="jakarta">Jakarta</option>
                <option value="bandung">Bandung</option>
              </select>
            </div>
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown/40">🏷️</span>
              <select className="w-full bg-transparent border-none outline-none appearance-none py-3.5 pl-11 pr-4 text-[14px] font-medium text-brand-brown cursor-pointer">
                <option value="">Semua Kategori</option>
                <option value="alam">Alam & Pantai</option>
                <option value="budaya">Budaya & Sejarah</option>
                <option value="kuliner">Kuliner</option>
                <option value="petualangan">Petualangan</option>
              </select>
            </div>
            <button className="bg-brand-orange text-white font-bold py-3.5 px-8 rounded-xl hover:bg-brand-orange/90 transition-all shadow-md shadow-brand-orange/20 mt-2 sm:mt-0">
              Cari
            </button>
          </div>
        </div>

        <div className="relative group">
           <div className="absolute inset-0 bg-brand-orange/10 rounded-[40px] rotate-3 -z-10 translate-x-4 group-hover:rotate-6 transition-transform duration-500"></div>
           <div className="bg-white rounded-[32px] shadow-2xl shadow-brand-brown/5 border border-brand-brown/5 overflow-hidden p-2 transition-transform duration-500 group-hover:-translate-y-2">
              <div className="aspect-[4/5] md:aspect-[4/3] bg-gradient-to-br from-brand-orange to-brand-brown rounded-[24px] relative overflow-hidden flex items-end p-8">
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                 <div className="relative z-10">
                    <div className="text-white/80 text-[12px] font-bold tracking-widest uppercase mb-1">Pilihan Editor</div>
                    <h3 className="text-white text-3xl font-bold mb-4">Senja Eksotis di Ubud</h3>
                    <div className="flex gap-4">
                       <div className="bg-white/20 backdrop-blur-md rounded-xl py-2 px-4 border border-white/20">
                          <div className="text-white text-sm font-bold">5 Hari</div>
                       </div>
                       <div className="bg-white/20 backdrop-blur-md rounded-xl py-2 px-4 border border-white/20">
                          <div className="text-white text-sm font-bold">Rp 3.5Jt</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
