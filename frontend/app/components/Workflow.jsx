export default function Workflow() {
  const steps = [
    { title: "Rencanakan", desc: "Tentukan destinasi dan susun jadwal harianmu dengan mudah.", emoji: "✍️" },
    { title: "Kelola Budget", desc: "Catat pengeluaran dan bagi biaya bersama teman perjalanan.", emoji: "💰" },
    { title: "Bagikan", desc: "Publikasikan karya itinerarymu untuk menginspirasi dunia.", emoji: "🌟" }
  ];

  return (
    <section className="py-32 bg-brand-brown overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="text-center mb-20">
           <h2 className="text-[36px] font-extrabold text-white mb-4">Langkah Sederhana</h2>
           <p className="text-white/60 text-[16px]">Mulai perjalanan impian Anda dalam hitungan menit.</p>
        </div>

        <div className="relative max-w-[1000px] mx-auto">
          {/* Garis Penghubung (Hanya muncul di Desktop) */}
          <div className="absolute top-[32px] left-[15%] right-[15%] h-[3px] bg-white/10 hidden md:block z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 relative z-10 items-start">
             {steps.map((step, i) => (
               <div key={i} className={`flex flex-col items-center text-center group relative ${i === 1 ? 'md:mt-16' : ''}`}>
                 
                 {/* Indikator Panah */}
                 {i < steps.length - 1 && (
                   <div className={`hidden md:block absolute top-[22px] -right-[15%] lg:-right-[20%] text-white/20 text-[24px] font-bold z-0 pointer-events-none translate-x-1/2 ${i === 1 ? '-mt-16' : ''}`}>
                     →
                   </div>
                 )}

                 {/* Lingkaran Angka Step */}
                 <div className="w-16 h-16 bg-brand-brown border-[4px] border-brand-orange rounded-full flex items-center justify-center text-brand-orange font-black text-2xl mb-8 shadow-[0_0_0_8px_#3d2b1f] transition-all duration-500 group-hover:bg-brand-orange group-hover:text-white group-hover:scale-110 z-10">
                    {i + 1}
                 </div>
                 
                 {/* Kotak Konten */}
                 <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[32px] p-8 shadow-xl w-full flex-1 transition-transform duration-500 group-hover:-translate-y-2 relative">
                    <div className="text-4xl mb-5 transition-transform duration-500 group-hover:scale-110">{step.emoji}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-[14px] text-white/60 leading-relaxed">
                      {step.desc}
                    </p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
