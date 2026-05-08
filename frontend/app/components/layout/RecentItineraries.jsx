import ItineraryCard from "./ItineraryCard";
import { itineraries } from "../../data/dummyItineraries";

export default function RecentItineraries() {
  return (
    <section className="py-28 bg-[#f4ebe1]">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-brand-orange rounded-full"></div>
              <span className="text-[12px] font-bold text-brand-orange tracking-[.2em] uppercase">Terpopuler</span>
            </div>
            <h2 className="text-[36px] font-extrabold text-brand-brown leading-none">Inspirasi Perjalanan</h2>
            <p className="text-brand-brown/60 mt-4 text-[15px]">Temukan rute perjalanan terbaik dari komunitas kami.</p>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-[15px] font-bold text-brand-orange hover:gap-3 transition-all group">
            Lihat Semua <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ItineraryCard
              title={itineraries[0].title}
              price={itineraries[0].totalSpend}
              loc={itineraries[0].location}
              duration={itineraries[0].duration}
              badges={itineraries[0].tags}
              isFeatured={true}
            />
          </div>
          <div className="lg:col-span-1 flex flex-col gap-8">
            <ItineraryCard
              title={itineraries[1].title}
              price={itineraries[1].totalSpend}
              loc={itineraries[1].location}
              duration={itineraries[1].duration}
              badges={itineraries[1].tags}
            />
            <ItineraryCard
              title={itineraries[2].title}
              price={itineraries[2].totalSpend}
              loc={itineraries[2].location}
              duration={itineraries[2].duration}
              badges={itineraries[2].tags}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
