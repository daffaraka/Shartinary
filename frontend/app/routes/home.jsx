
export function meta() {
  return [
    { title: "Shartinary - Sharing Itinerary" },
    { name: "description", content: "Platform Sharing Itinerary #1 Indonesia" },
  ];
}

export default function Home() {
  return (
    <div className="font-sans bg-white text-gray-900 min-h-screen overflow-x-hidden">
      {/* TOP BAR */}
      <div className="bg-orange-500 text-white text-[11px] text-center py-1.5 px-4 font-medium tracking-wide">
        ✈️ &nbsp;Shartinary Beta — Bagikan itinerarymu & dapatkan feedback dari komunitas!
      </div>

      {/* NAVBAR */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-[0_2px_8px_rgba(249,115,22,0.08)]">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[60px] gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 bg-orange-500 rounded-[10px] flex items-center justify-center shadow-[0_4px_12px_rgba(249,115,22,0.3)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            </div>
            <div>
              <div className="text-[17px] font-extrabold text-gray-900 tracking-[-0.02em] leading-tight">Shartinary</div>
              <div className="text-[9px] text-orange-500 font-bold tracking-[0.12em] uppercase leading-tight">Sharing Itinerary</div>
            </div>
          </a>

          {/* Menus */}
          <div className="hidden md:flex items-center gap-0.5">
            {[
              { title: "Jelajahi", items: ["Itinerary Terpopuler", "Destinasi Trending", "Budget Terjangkau", "Weekend Escape"] },
              { title: "Destinasi", items: ["Indonesia", "Asia Tenggara", "Asia Timur", "Eropa"] },
              { title: "Itinerary", items: ["Buat Itinerary", "Itinerary Saya", "Disimpan", "Ikut Itinerary"] },
              { title: "Budget", items: ["Kalkulator Perjalanan", "Lacak Pengeluaran", "Split Cost", "Tips Hemat"] },
              { title: "Komunitas", items: ["Review & Rating", "Forum Diskusi", "Travel Buddy", "Blog Perjalanan"] }
            ].map((menu, i) => (
              <div key={i} className="relative group">
                <button className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                  {menu.title} 
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="group-hover:rotate-180 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                </button>
                <div className="hidden group-hover:block absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 w-[270px] bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-gray-100 p-2 z-[100]">
                  {menu.items.map((item, j) => (
                    <a key={j} href="#" className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-orange-50 transition-colors">
                      <div className="w-[30px] h-[30px] bg-orange-50 rounded-lg shrink-0 flex items-center justify-center">
                        <div className="w-[7px] h-[7px] bg-orange-400 rounded-full"></div>
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-gray-800">{item}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">Deskripsi singkat menu ini</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="text-[13px] font-medium text-gray-600 py-2 px-3.5 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors">Masuk</button>
            <button className="flex items-center gap-1.5 bg-orange-500 text-white text-[13px] font-semibold py-[9px] px-[18px] rounded-xl shadow-[0_4px_12px_rgba(249,115,22,0.3)] hover:bg-orange-600 hover:shadow-[0_4px_16px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 transition-all">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
              Buat Akun
            </button>
          </div>
        </div>
      </div>

      {/* GREETING BAR */}
      <div className="bg-orange-50 border-b border-orange-200 py-2.5 px-6 flex items-center justify-between hidden md:flex">
        <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-[13px] font-bold text-orange-700">Selamat Pagi ☀️</span>
            <span className="text-orange-300 text-[11px]">•</span>
            <span className="text-[13px] text-orange-700">Mau ke mana hari ini? Temukan inspirasi perjalananmu di Shartinary.</span>
          </div>
          <a href="#" className="text-[12px] font-semibold text-orange-600 flex items-center gap-1 hover:text-orange-700 hover:underline">
            Jelajahi sekarang <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7-7"/></svg>
          </a>
        </div>
      </div>

      {/* HERO */}
      <div className="bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-orange-50 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-[200px] h-[200px] bg-orange-100 rounded-full opacity-50 pointer-events-none blur-3xl"></div>
        
        <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-[11px] font-semibold py-1.5 px-3.5 rounded-full mb-5">
              <span className="w-[7px] h-[7px] bg-orange-500 rounded-full animate-pulse"></span>
              ✈️ Platform Sharing Itinerary #1 Indonesia
            </div>
            <h1 className="text-[44px] md:text-[52px] font-extrabold text-gray-900 leading-[1.1] tracking-[-0.02em] mb-5">
              Rencanakan <span className="text-orange-500 relative inline-block">Perjalanan</span> Impianmu & Bagikan ke Dunia
            </h1>
            <p className="text-gray-500 text-[16px] leading-[1.7] mb-7 max-w-[480px]">
              Buat itinerary detail lengkap dengan budget, tempat, dan jadwal. Ikuti itinerary traveler lain sebagai referensi. Gratis selamanya.
            </p>
            
            <div className="flex gap-2 mb-5">
              <div className="flex-1 flex items-center gap-2.5 bg-gray-50 border-[1.5px] border-gray-200 rounded-2xl py-3 px-4 focus-within:border-orange-400 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(249,115,22,0.1)] transition-all">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <input type="text" placeholder="Cari destinasi, itinerary, atau traveler..." className="flex-1 bg-transparent border-none outline-none text-[14px] text-gray-700 placeholder-gray-400" />
              </div>
              <button className="bg-orange-500 text-white font-semibold text-[14px] py-3 px-6 rounded-2xl shadow-[0_4px_12px_rgba(249,115,22,0.3)] hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(249,115,22,0.4)] transition-all shrink-0">Cari</button>
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[12px] text-gray-400">Populer:</span>
              {['Bali', 'Labuan Bajo', 'Raja Ampat', 'Jogja', 'Lombok', 'Bromo'].map((tag, i) => (
                <span key={i} className="text-[12px] text-gray-700 bg-gray-100 py-1.5 px-3.5 rounded-full font-medium cursor-pointer hover:bg-orange-50 hover:text-orange-600 transition-colors">{tag}</span>
              ))}
            </div>
          </div>
          
          <div className="relative pl-6 md:pl-12">
            <div className="absolute -top-3 left-0 md:left-6 bg-orange-500 text-white rounded-2xl py-2 px-3.5 shadow-[0_8px_16px_rgba(249,115,22,0.3)] z-20 animate-[bounce_3s_ease-in-out_infinite]">
              <div className="text-[10px] font-semibold opacity-90">Itinerary Baru</div>
              <div className="text-[18px] font-extrabold">+124 <span className="text-[13px] font-normal opacity-80">hari ini</span></div>
            </div>
            
            <div className="bg-white rounded-3xl shadow-[0_24px_48px_rgba(0,0,0,0.1)] border border-gray-100 p-4.5 hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-gradient-to-br from-orange-500 to-amber-400 rounded-2xl h-[160px] relative overflow-hidden mb-3.5 flex items-end p-3">
                <div className="absolute top-2.5 right-3.5 text-[60px] opacity-20">🌴</div>
                <div className="absolute top-2.5 left-3 bg-white/90 text-amber-600 text-[11px] font-semibold py-1 px-2.5 rounded-full backdrop-blur-sm shadow-sm">⭐ 4.9</div>
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-2 w-full border border-white/20">
                  <p className="text-white font-bold text-[13px]">Bali 7 Hari</p>
                  <span className="text-white/80 text-[11px]">Ubud · Seminyak · Nusa Penida</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-orange-50 rounded-xl p-2 text-center"><div className="text-[14px] font-bold text-orange-600">7</div><div className="text-[10px] text-gray-400">Hari</div></div>
                <div className="bg-orange-50 rounded-xl p-2 text-center"><div className="text-[14px] font-bold text-orange-600">18</div><div className="text-[10px] text-gray-400">Tempat</div></div>
                <div className="bg-orange-50 rounded-xl p-2 text-center"><div className="text-[14px] font-bold text-orange-600">4.2Jt</div><div className="text-[10px] text-gray-400">Budget</div></div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex">
                  {['R','S','D','M'].map((char, i) => (
                    <div key={i} className={`w-[26px] h-[26px] bg-gradient-to-br from-orange-500 to-rose-400 rounded-lg border-2 border-white flex items-center justify-center text-white text-[10px] font-bold ${i !== 0 ? '-ml-1.5' : ''}`}>{char}</div>
                  ))}
                </div>
                <span className="text-[11px] text-gray-500 font-medium">+1.2K mengikuti</span>
              </div>
            </div>
            
            <div className="absolute -bottom-3 right-2 bg-white border border-gray-100 rounded-2xl py-2.5 px-3.5 shadow-[0_8px_16px_rgba(0,0,0,0.08)] flex items-center gap-2.5 z-20">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
              </div>
              <div><div className="text-[10px] text-gray-500 font-medium">Budget saved</div><div className="text-[13px] font-bold text-gray-800">Rp 850.000</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="bg-orange-500">
        <div className="max-w-[1200px] mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: "12K+", lbl: "Itinerary Dibagikan" },
            { val: "8K+", lbl: "Traveler Aktif" },
            { val: "340+", lbl: "Destinasi Tercakup" },
            { val: "Rp 2.4M", lbl: "Rata-rata Budget Hemat" }
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-[24px] md:text-[28px] font-black text-white leading-none">{s.val}</div>
              <div className="text-[13px] text-white/80 mt-1">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ITINERARY TERBARU */}
      <div className="py-14 max-w-[1200px] mx-auto px-6">
        <div className="flex items-end justify-between mb-7">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-1 h-5 bg-orange-500 rounded-full"></div>
              <span className="text-[11px] font-bold text-orange-500 tracking-[0.1em] uppercase">Terbaru</span>
            </div>
            <h2 className="text-[28px] font-black text-gray-900 tracking-[-0.02em]">Itinerary Terbaru</h2>
            <p className="text-[13px] text-gray-500 mt-1">Itinerary terkini yang dibagikan oleh komunitas traveler</p>
          </div>
          <a href="#" className="flex items-center gap-1.5 text-[13px] font-semibold text-orange-500 hover:text-orange-600 hover:underline">
            Lihat semua <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7-7"/></svg>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { bg: 'from-orange-400 to-rose-500', cat: 'Alam & Budaya', rat: '4.9', tags: ['#Bali', '#Pantai', '#Alam'], title: 'Bali 7 Hari — Ubud, Seminyak & Nusa Penida', days: 7, places: 18, price: '4.2Jt', author: 'R', name: 'Rizki Pratama', fol: '1.2K' },
            { bg: 'from-amber-500 to-orange-500', cat: 'Sejarah & Budaya', rat: '4.8', tags: ['#Jogja', '#Solo', '#Kuliner'], title: 'Jogja–Solo 4 Hari: Keraton, Prambanan, Batik Walk', days: 4, places: 12, price: '1.85Jt', author: 'S', name: 'Sari Dewi', fol: '876' },
            { bg: 'from-teal-500 to-cyan-500', cat: 'Petualangan', rat: '4.9', tags: ['#NTT', '#Snorkeling', '#Wildlife'], title: 'Labuan Bajo 5 Hari: Komodo & Pulau Padar', days: 5, places: 10, price: '5.6Jt', author: 'D', name: 'Dito Wirawan', fol: '2.1K' },
            { bg: 'from-blue-500 to-teal-500', cat: 'Diving & Snorkeling', rat: '5.0', tags: ['#Papua', '#Diving', '#Laut'], title: 'Raja Ampat 6 Hari: Surga Bawah Laut Papua', days: 6, places: 9, price: '7.8Jt', author: 'M', name: 'Maya Putri', fol: '3.2K' },
            { bg: 'from-emerald-500 to-teal-500', cat: 'Pantai & Relaksasi', rat: '4.7', tags: ['#Lombok', '#Gili', '#Santai'], title: 'Lombok & Gili Islands 4 Hari', days: 4, places: 11, price: '3.1Jt', author: 'F', name: 'Fajar Kurnia', fol: '1.5K' },
            { bg: 'from-red-500 to-orange-500', cat: 'Alam & Trekking', rat: '4.8', tags: ['#Jatim', '#Gunung', '#Trekking'], title: 'Bromo–Ijen 3 Hari: Sunrise & Blue Fire', days: 3, places: 6, price: '1.2Jt', author: 'H', name: 'Hendra S.', fol: '987' },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-orange-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all cursor-pointer group">
              <div className={`h-[140px] relative overflow-hidden bg-gradient-to-br ${card.bg}`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                <div className="absolute top-2.5 left-2.5 bg-white/90 text-gray-700 text-[10px] font-semibold py-1 px-2.5 rounded-full">{card.cat}</div>
                <div className="absolute top-2.5 right-2.5 bg-black/30 text-white text-[11px] py-0.5 px-2 rounded-full flex items-center gap-1 backdrop-blur-sm"><span className="text-amber-400 text-[10px]">★</span> {card.rat}</div>
                <div className="absolute bottom-2 left-2 flex gap-1.5">
                  {card.tags.map(t => <span key={t} className="bg-black/25 text-white text-[10px] py-0.5 px-2 rounded-full backdrop-blur-sm">{t}</span>)}
                </div>
              </div>
              <div className="p-3.5">
                <div className="text-[13px] font-semibold text-gray-800 leading-[1.4] mb-3 line-clamp-2">{card.title}</div>
                <div className="grid grid-cols-3 gap-1.5 mb-2.5">
                  <div className="bg-gray-50 rounded-lg p-1.5 flex flex-col items-center"><div className="text-[11px] font-semibold text-gray-700">{card.days} Hari</div></div>
                  <div className="bg-gray-50 rounded-lg p-1.5 flex flex-col items-center"><div className="text-[11px] font-semibold text-gray-700">{card.places} Tmp</div></div>
                  <div className="bg-gray-50 rounded-lg p-1.5 flex flex-col items-center"><div className="text-[10px] font-semibold text-gray-700">Rp {card.price}</div></div>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5">
                    <div className="w-[26px] h-[26px] bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white text-[10px] font-bold">{card.author}</div>
                    <span className="text-[11px] text-gray-500 font-medium">{card.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    {card.fol}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRENDING DESTINATIONS */}
      <div className="bg-gray-50 py-14">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-end justify-between mb-7">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-1 h-5 bg-orange-500 rounded-full"></div>
                <span className="text-[11px] font-bold text-orange-500 tracking-[0.1em] uppercase">Trending</span>
              </div>
              <h2 className="text-[28px] font-black text-gray-900 tracking-[-0.02em]">Destinasi Sedang Ramai</h2>
              <p className="text-[13px] text-gray-500 mt-1">Destinasi yang paling banyak direncanakan traveler saat ini</p>
            </div>
            <a href="#" className="flex items-center gap-1.5 text-[13px] font-semibold text-orange-500 hover:text-orange-600 hover:underline">
              Semua destinasi <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7-7"/></svg>
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {[
              { bg: 'from-teal-500 to-cyan-500', emoji: '🦎', name: 'Labuan Bajo', reg: 'Nusa Tenggara Timur', heat: 'Sangat Ramai', heatClass: 'bg-red-500/80', stat1: '12.4K', stat2: '234', trend: '+28%' },
              { bg: 'from-orange-500 to-amber-500', emoji: '🌺', name: 'Bali', reg: 'Bali', heat: 'Ramai', heatClass: 'bg-orange-500/80', stat1: '48.1K', stat2: '1.8K', trend: '+12%' },
              { bg: 'from-blue-500 to-teal-500', emoji: '🐠', name: 'Raja Ampat', reg: 'Papua Barat', heat: 'Populer', heatClass: 'bg-green-500/80', stat1: '5.2K', stat2: '156', trend: '+41%' },
              { bg: 'from-amber-500 to-yellow-500', emoji: '🏛️', name: 'Yogyakarta', reg: 'DI Yogyakarta', heat: 'Ramai', heatClass: 'bg-orange-500/80', stat1: '31.7K', stat2: '976', trend: '+9%' },
            ].map((d, i) => (
              <div key={i} className="rounded-2xl overflow-hidden cursor-pointer relative aspect-4/3 group shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className={`w-full h-full relative bg-gradient-to-br ${d.bg}`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute top-3 right-3.5 text-[40px] opacity-25 group-hover:opacity-50 transition-opacity group-hover:scale-110 duration-300">{d.emoji}</div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="text-white font-extrabold text-[17px] leading-tight">{d.name}</div>
                    <div className="text-white/70 text-[11px] mt-0.5">{d.reg}</div>
                    <span className={`text-[10px] font-bold text-white py-0.5 px-2.5 rounded-full inline-block mt-1.5 backdrop-blur-sm ${d.heatClass}`}>{d.heat}</span>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-white/80 text-[11px]">👥 {d.stat1}</div>
                      <div className="flex items-center gap-1 text-white/80 text-[11px]">🗺 {d.stat2}</div>
                      <div className="ml-auto text-green-300 text-[10px] font-bold">↑ {d.trend}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="py-14 max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-orange-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2.5">
            <div className="w-1 h-4 bg-orange-500 rounded-full"></div>
            Cara Kerja
            <div className="w-1 h-4 bg-orange-500 rounded-full"></div>
          </div>
          <div className="text-[28px] font-black text-gray-900">Mudah dalam 3 Langkah</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: '01', bg: 'bg-orange-50', iconStr: 'text-orange-500', svg: <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>, title: 'Buat Itinerary', desc: 'Susun rencana perjalananmu hari per hari. Tambahkan destinasi, hotel, budget, dan perlengkapan yang dibutuhkan.' },
            { step: '02', bg: 'bg-blue-50', iconStr: 'text-blue-500', svg: <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>, title: 'Bagikan ke Komunitas', desc: 'Publikasikan itinerarymu agar traveler lain bisa menemukan dan menjadikannya referensi perjalanan mereka.' },
            { step: '03', bg: 'bg-green-50', iconStr: 'text-green-500', svg: <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>, title: 'Kelola Budget Bareng', desc: 'Catat semua pengeluaran dan bagi biaya dengan teman perjalananmu secara otomatis dan transparan.' },
          ].map((h, i) => (
            <div key={i} className="text-center p-8 rounded-[18px] border border-gray-100 relative transition-all hover:border-orange-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[11px] font-bold py-1 px-3 rounded-full">{h.step}</div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3.5 ${h.bg} ${h.iconStr}`}>
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">{h.svg}</svg>
              </div>
              <div className="text-[16px] font-bold text-gray-800 mb-2">{h.title}</div>
              <div className="text-[13px] text-gray-500 leading-[1.6]">{h.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="bg-orange-500 py-14 px-6 text-center">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-[36px] font-black text-white leading-[1.1] mb-3">Mulai Perjalananmu Sekarang 🚀</h2>
          <p className="text-white/85 text-[16px] mb-7">Gratis selamanya. Buat akun dan mulai merencanakan petualangan pertamamu.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="bg-white text-orange-600 font-bold text-[15px] py-3.5 px-7 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform">Buat Akun Gratis</button>
            <button className="bg-orange-600 text-white font-bold text-[15px] py-3.5 px-7 rounded-2xl border-[1.5px] border-white/30 hover:bg-orange-700 hover:border-white/50 transition-colors">Jelajahi Itinerary</button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-gray-950 text-gray-400">
        <div className="bg-orange-500 py-8 px-6">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
            <div>
              <h3 className="text-white text-[20px] font-bold">Siap merencanakan perjalananmu?</h3>
              <p className="text-white/80 text-[13px] mt-1">Bergabung dengan ribuan traveler yang sudah sharing itinerary di Shartinary.</p>
            </div>
            <div className="flex gap-2.5 shrink-0">
              <button className="bg-white text-orange-600 font-semibold text-[13px] py-2.5 px-5 rounded-xl hover:bg-gray-50 transition-colors">Jelajahi Sekarang</button>
              <button className="bg-black/15 text-white font-semibold text-[13px] py-2.5 px-5 rounded-xl hover:bg-black/25 transition-colors">Daftar Gratis</button>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1.5">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-[34px] h-[34px] bg-orange-500 rounded-xl flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              </div>
              <div><div className="text-white text-[17px] font-extrabold tracking-[-0.02em] leading-none">Shartinary</div><div className="text-orange-500 text-[9px] font-bold tracking-[0.12em] uppercase mt-0.5">Sharing Itinerary</div></div>
            </div>
            <div className="text-[13px] leading-[1.7] text-gray-500 mt-3.5 mb-5">Platform berbagi itinerary perjalanan terlengkap. Rencanakan, bagikan, dan temukan inspirasi perjalananmu bersama komunitas traveler Indonesia.</div>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {[
                { v: '12K+', l: 'Itinerary' }, { v: '8K+', l: 'Traveler' },
                { v: '340+', l: 'Destinasi' }, { v: '4.9★', l: 'Rating' }
              ].map(s => <div key={s.l} className="bg-gray-900 rounded-xl py-2.5 px-3"><div className="text-white font-bold text-[13px]">{s.v}</div><div className="text-gray-500 text-[11px] mt-0.5">{s.l}</div></div>)}
            </div>
          </div>
          
          <div>
            <div className="text-white text-[13px] font-semibold mb-4 pb-2.5 border-b border-gray-800">Menu</div>
            <ul className="flex flex-col gap-2.5">
              {['Beranda', 'Jelajahi Itinerary', 'Destinasi Wisata', 'Komunitas Traveler', 'Blog Perjalanan', 'Tentang Kami'].map(m => (
                <li key={m}><a href="#" className="text-[13px] text-gray-500 flex items-center gap-2 hover:text-orange-400 transition-colors group"><span className="w-1 h-1 bg-gray-700 rounded-full group-hover:bg-orange-400 transition-colors shrink-0"></span>{m}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <div className="text-white text-[13px] font-semibold mb-4 pb-2.5 border-b border-gray-800">Layanan</div>
            <ul className="flex flex-col gap-2.5">
              {['Buat Itinerary', 'Kalkulator Budget', 'Split Cost', 'Travel Buddy', 'Review Destinasi', 'Export PDF'].map(m => (
                <li key={m}><a href="#" className="text-[13px] text-gray-500 flex items-center gap-2 hover:text-orange-400 transition-colors group"><span className="w-1 h-1 bg-gray-700 rounded-full group-hover:bg-orange-400 transition-colors shrink-0"></span>{m}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <div className="text-white text-[13px] font-semibold mb-4 pb-2.5 border-b border-gray-800">Kontak</div>
            <div className="flex flex-col gap-3.5 mb-5">
              <div className="flex items-start gap-2.5"><div className="w-[30px] h-[30px] bg-gray-800 rounded-lg flex items-center justify-center shrink-0 mt-0.5"><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></div><div><div className="text-white text-[13px] font-medium">halo@shartinary.id</div><div className="text-gray-500 text-[11px] mt-0.5">Email kami</div></div></div>
              <div className="flex items-start gap-2.5"><div className="w-[30px] h-[30px] bg-gray-800 rounded-lg flex items-center justify-center shrink-0 mt-0.5"><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg></div><div><div className="text-white text-[13px] font-medium">+62 812-3456-7890</div><div className="text-gray-500 text-[11px] mt-0.5">WhatsApp tersedia</div></div></div>
            </div>
            <div>
              <div className="text-white text-[13px] font-semibold mb-1.5">Newsletter</div>
              <div className="text-[12px] text-gray-500 mb-2.5">Tips traveling & itinerary terbaru langsung ke emailmu.</div>
              <div className="flex gap-1.5">
                <input type="email" placeholder="Email kamu" className="flex-1 bg-gray-800 border border-gray-700 rounded-xl py-2 px-3 text-[13px] text-white outline-none focus:border-orange-500 transition-colors placeholder:text-gray-500" />
                <button className="bg-orange-500 rounded-xl py-2 px-3 hover:bg-orange-600 transition-colors shrink-0"><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800">
          <div className="max-w-[1200px] mx-auto px-6 py-4.5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-gray-500">© 2025 Shartinary. Dibuat dengan ❤️ untuk para traveler Indonesia.</p>
            <div className="flex gap-4">
              <a href="#" className="text-[12px] text-gray-500 hover:text-orange-400 transition-colors">Kebijakan Privasi</a>
              <a href="#" className="text-[12px] text-gray-500 hover:text-orange-400 transition-colors">Syarat & Ketentuan</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
