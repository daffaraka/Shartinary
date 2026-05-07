export default function Footer() {
  return (
    <footer className="bg-brand-brown pt-24 pb-12">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Col 1: Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Shartinary Logo" className="w-10 h-10 object-contain drop-shadow-md brightness-0 invert" />
              <div className="text-brand-orange text-2xl font-bold tracking-tight">Shartinary</div>
            </div>
            <p className="text-[#faf9f6]/60 text-[15px] leading-relaxed mb-8 max-w-[280px]">
              Membangun jembatan bagi para traveler untuk saling berbagi dan menginspirasi di seluruh penjuru Indonesia.
            </p>
            <div className="flex gap-4">
              {["📷", "🐦", "📘", "📺"].map((icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-brand-orange text-[14px] font-bold uppercase tracking-widest mb-8">Eksplorasi</h4>
            <ul className="space-y-4 text-[#faf9f6]/70 text-[14px]">
              <li><a href="#" className="hover:text-white transition-colors">Jelajahi Itinerary</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Destinasi Favorit</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kalkulator Budget</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Travel Buddy</a></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-brand-orange text-[14px] font-bold uppercase tracking-widest mb-8">Perusahaan</h4>
            <ul className="space-y-4 text-[#faf9f6]/70 text-[14px]">
              <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kontak</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pusat Bantuan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog Perjalanan</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-brand-orange text-[14px] font-bold uppercase tracking-widest mb-8">Berlangganan</h4>
            <p className="text-[#faf9f6]/60 text-[14px] mb-6">Dapatkan tips perjalanan terbaik langsung di email Anda.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email..." 
                className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-[14px] text-white outline-none focus:border-brand-orange/40 w-full"
              />
              <button className="bg-brand-orange text-white px-4 rounded-xl hover:bg-brand-orange/90 transition-colors">
                 →
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#faf9f6]/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#faf9f6]/30 text-[13px]">© 2025 Shartinary. Kehangatan dalam setiap langkah kaki Anda.</p>
          <div className="flex gap-8 text-[13px] text-[#faf9f6]/30">
            <a href="#" className="hover:text-white">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
