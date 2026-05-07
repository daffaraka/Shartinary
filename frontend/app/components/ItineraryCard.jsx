import { Link } from "react-router";

export default function ItineraryCard({ title, price, loc, duration, badges, isFeatured }) {
  return (
    <Link to="/itinerary/1" className="group bg-white rounded-[24px] border border-brand-brown/5 overflow-hidden hover:shadow-xl hover:shadow-brand-brown/10 transition-all duration-500 hover:-translate-y-1 h-full flex flex-col block">
      <div className={`${isFeatured ? 'h-64 sm:h-80 md:h-[300px]' : 'h-48'} bg-brand-brown/5 relative overflow-hidden shrink-0`}>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/40 to-brand-brown/40 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="absolute top-4 left-4 flex gap-2">
          {badges?.map((badge, idx) => (
            <span key={idx} className="bg-white/90 backdrop-blur-sm text-brand-brown text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              {badge}
            </span>
          ))}
        </div>
        <div className="absolute top-4 right-4 bg-brand-brown/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
           ⭐ 4.9
        </div>
      </div>
      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-bold text-brand-orange uppercase tracking-wider">{loc}</span>
          <span className="w-1 h-1 bg-brand-brown/20 rounded-full"></span>
          <span className="text-[11px] font-bold text-brand-brown/40 uppercase tracking-wider">{duration}</span>
        </div>
        <h3 className={`${isFeatured ? 'text-[24px]' : 'text-[19px]'} font-bold text-brand-brown mb-5 leading-tight group-hover:text-brand-orange transition-colors`}>
          {title}
        </h3>
        <div className="flex items-center justify-between pt-5 border-t border-brand-brown/5 mt-auto">
          <div>
            <div className="text-[10px] text-brand-brown/40 font-bold uppercase tracking-widest mb-0.5">Estimasi</div>
            <div className="text-[15px] font-bold text-brand-brown">Rp {price}</div>
          </div>
          <button className="w-10 h-10 rounded-full bg-brand-orange-light text-brand-orange flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
             <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
