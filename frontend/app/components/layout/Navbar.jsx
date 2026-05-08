import { useState } from "react";
import { Link } from "react-router";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-brown/5 shadow-sm shadow-brand-brown/5 transition-all">
      <div className="max-w-[1200px] mx-auto px-8 flex items-center justify-between h-[72px] gap-8">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
             <img src="/logo.png" alt="Shartinary Logo" className="w-full h-full object-contain drop-shadow-md" />
          </div>
          <div className="hidden sm:block">
            <div className="text-[19px] font-bold text-brand-brown tracking-tight leading-none group-hover:text-brand-orange transition-colors">Shartinary</div>
            <div className="text-[10px] text-brand-orange font-bold tracking-[.15em] uppercase mt-1">Shared Journeys</div>
          </div>
        </Link>

        {/* Desktop Menus */}
        <div className="hidden lg:flex items-center gap-8 shrink-0">
          <Link to="/explore" className="text-[14px] font-medium text-brand-brown/70 hover:text-brand-orange transition-colors">Eksplorasi</Link>
          
          <div className="relative group">
            <span className="text-[14px] font-medium text-brand-brown/70 hover:text-brand-orange transition-colors flex items-center gap-1.5 py-4 cursor-pointer">
              Kategori <span className="text-[10px] opacity-50 group-hover:rotate-180 transition-transform">▼</span>
            </span>
            <div className="absolute top-[80%] left-0 pt-2 hidden group-hover:block z-50">
              <div className="bg-white border border-brand-brown/5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] w-48 py-2 overflow-hidden">
                <Link to="/explore" className="block px-5 py-2.5 text-[13px] font-medium text-brand-brown/80 hover:bg-brand-orange/5 hover:text-brand-orange transition-colors">🍔 Kuliner</Link>
                <Link to="/explore" className="block px-5 py-2.5 text-[13px] font-medium text-brand-brown/80 hover:bg-brand-orange/5 hover:text-brand-orange transition-colors">🛍️ Belanja</Link>
                <Link to="/explore" className="block px-5 py-2.5 text-[13px] font-medium text-brand-brown/80 hover:bg-brand-orange/5 hover:text-brand-orange transition-colors">🎢 Hiburan</Link>
              </div>
            </div>
          </div>
          
          <Link to="#" className="text-[14px] font-medium text-brand-brown/70 hover:text-brand-orange transition-colors">Komunitas</Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <button className="text-[14px] font-medium text-brand-brown/70 hover:text-brand-brown px-3 py-2">Masuk</button>
          <Link to="/create" className="bg-gradient-to-r from-brand-orange to-[#e56b33] text-[#faf9f6] text-[14px] font-bold py-2.5 px-6 rounded-full hover:shadow-lg hover:shadow-brand-orange/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
            <span>✨</span> Buat dengan AI
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="lg:hidden p-2 text-brand-brown focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current transform transition duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 bg-current transition duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 bg-current transform transition duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`lg:hidden absolute top-[72px] left-0 w-full bg-white border-b border-brand-brown/10 transition-all duration-300 overflow-hidden shadow-xl ${isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-8 py-6 flex flex-col gap-5">
          <Link to="/explore" onClick={() => setIsMobileMenuOpen(false)} className="text-[16px] font-medium text-brand-brown">Eksplorasi</Link>
          <div className="h-px bg-brand-brown/5 my-1"></div>
          <button className="text-left text-[16px] font-medium text-brand-brown">Masuk / Daftar</button>
          <Link to="/create" onClick={() => setIsMobileMenuOpen(false)} className="bg-brand-orange text-white text-[15px] font-bold px-6 py-3 rounded-xl text-center flex items-center justify-center gap-2 mt-2 shadow-md">
            <span>✨</span> Buat Itinerary dengan AI
          </Link>
        </div>
      </div>
    </nav>
  );
}
