import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";

export default function CreateItinerary() {
  const [step, setStep] = useState("form"); // 'form' | 'generating' | 'done'
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Inisialisasi Gemini AI...");
  const navigate = useNavigate();

  // Handle form submit
  const handleGenerate = (e) => {
    e.preventDefault();
    setStep("generating");

    // Simulate AI generation process
    setTimeout(() => setLoadingText("Menganalisis tujuan destinasi..."), 1000);
    setTimeout(() => {
      setLoadingText("Menghitung estimasi budget ideal...");
      setProgress(30);
    }, 2500);
    setTimeout(() => {
      setLoadingText("Mencari rekomendasi kuliner & aktivitas...");
      setProgress(60);
    }, 4500);
    setTimeout(() => {
      setLoadingText("Menyusun rute optimal...");
      setProgress(90);
    }, 6500);
    setTimeout(() => {
      setStep("done");
      setProgress(100);
    }, 8000);
  };

  const [destinasi, setDestinasi] = useState("");
  const [durasi, setDurasi] = useState("1 Hari");
  const [budget, setBudget] = useState("");
  const [selectedVibes, setSelectedVibes] = useState([]);

  // Auto-fill form with instant ideas
  const applyIdea = (idea) => {
    setDestinasi(idea.destinasi);
    setDurasi(idea.durasi);
    setBudget(idea.budget);
    setSelectedVibes(idea.vibes);
  };

  const instantIdeas = [
    { label: "🏖️ Bali Keluarga (3H)", destinasi: "Bali", durasi: "3 Hari 2 Malam", budget: "5.000.000", vibes: ["Keluarga", "Santai"] },
    { label: "🍜 Jogja Hemat", destinasi: "Yogyakarta", durasi: "2 Hari 1 Malam", budget: "1.500.000", vibes: ["Kuliner", "Hemat"] },
  ];

  // Handle vibe checkbox
  const toggleVibe = (vibe) => {
    if (selectedVibes.includes(vibe)) {
      setSelectedVibes(selectedVibes.filter(v => v !== vibe));
    } else {
      setSelectedVibes([...selectedVibes, vibe]);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col lg:flex-row mt-[72px]">
        {/* Kolom Kiri: Form Input */}
        <div
          className={`w-full lg:w-5/12 bg-white border-r border-brand-brown/10 p-8 lg:p-12 xl:p-16 flex flex-col justify-center transition-all duration-700 ${step !== "form" ? "opacity-30 pointer-events-none filter blur-sm lg:blur-none" : ""}`}
        >
          <div className="max-w-[500px] mx-auto w-full">
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-brown mb-2 leading-tight">
              Susun Rute Perjalanan
            </h1>
            <p className="text-brand-brown-muted text-[15px] mb-8">
              Beri tahu kami preferensi Anda, dan AI cerdas kami akan menyusun jadwal liburan paling optimal.
            </p>

            {/* Instant Ideas */}
            <div className="mb-6 bg-brand-orange/5 border border-brand-orange/20 rounded-xl p-4">
              <p className="text-[12px] font-bold text-brand-orange uppercase tracking-wider mb-3">💡 Sedang Buntu? Coba Ide Instan:</p>
              <div className="flex flex-wrap gap-2">
                {instantIdeas.map((idea, idx) => (
                  <button 
                    key={idx} 
                    type="button"
                    onClick={() => applyIdea(idea)}
                    className="text-[13px] font-bold bg-white text-brand-brown border border-brand-brown/10 px-3 py-1.5 rounded-lg shadow-sm hover:border-brand-orange hover:text-brand-orange transition-colors"
                  >
                    {idea.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-[13px] font-bold text-brand-brown uppercase tracking-wide mb-2">
                  Tujuan Kota
                </label>
                <input
                  type="text"
                  placeholder="Misal: Kyoto, Jepang atau Bali"
                  value={destinasi}
                  onChange={(e) => setDestinasi(e.target.value)}
                  required
                  className="w-full bg-[#faf9f6] border border-brand-brown/10 text-brand-brown text-[15px] rounded-xl px-5 py-4 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-brand-brown uppercase tracking-wide mb-2">
                    Durasi
                  </label>
                  <select 
                    value={durasi}
                    onChange={(e) => setDurasi(e.target.value)}
                    className="w-full bg-[#faf9f6] border border-brand-brown/10 text-brand-brown text-[15px] rounded-xl px-5 py-4 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all appearance-none"
                  >
                    <option>1 Hari</option>
                    <option>2 Hari 1 Malam</option>
                    <option>3 Hari 2 Malam</option>
                    <option>1 Minggu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-brand-brown uppercase tracking-wide mb-2">
                    Total Anggaran
                  </label>
                  <input
                    type="text"
                    placeholder="Misal: 5 Juta"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                    className="w-full bg-[#faf9f6] border border-brand-brown/10 text-brand-brown text-[15px] rounded-xl px-5 py-4 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-brand-brown uppercase tracking-wide mb-2">
                  Gaya Liburan (Pilih beberapa)
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Kuliner",
                    "Santai",
                    "Petualangan",
                    "Belanja",
                    "Keluarga",
                    "Hemat",
                  ].map((vibe) => (
                    <label key={vibe} className="cursor-pointer">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={selectedVibes.includes(vibe)}
                        onChange={() => toggleVibe(vibe)}
                      />
                      <div className="bg-[#faf9f6] border border-brand-brown/10 text-brand-brown/60 text-[13px] font-medium px-4 py-2 rounded-full peer-checked:bg-brand-orange/10 peer-checked:text-brand-orange peer-checked:border-brand-orange transition-all hover:bg-brand-brown/5">
                        {vibe}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={step !== "form"}
                  className="w-full bg-brand-brown text-white text-[16px] font-bold py-4 rounded-xl hover:bg-brand-orange hover:shadow-lg hover:shadow-brand-orange/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span className="text-xl">✨</span> Generate Jadwal Otomatis
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Kolom Kanan: State Area (Visual/Loading/Done) */}
        <div className="w-full lg:w-7/12 bg-[#faf9f6] relative overflow-hidden min-h-[500px] flex items-center justify-center">
          {/* Default State */}
          {step === "form" && (
            <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center animate-fade-in-up">
              <div className="w-64 h-64 bg-brand-orange/5 rounded-full flex items-center justify-center mb-8 relative">
                <div className="absolute inset-0 bg-brand-orange/10 rounded-full animate-ping opacity-20"></div>
                <span className="text-6xl">🤖</span>
              </div>
              <h2 className="text-2xl font-bold text-brand-brown mb-2">
                Gemini AI Siap Membantu
              </h2>
              <p className="text-brand-brown/60 max-w-sm">
                Isi form di sebelah kiri untuk mulai membuat keajaiban
                perjalanan Anda.
              </p>
            </div>
          )}

          {/* Loading State */}
          {step === "generating" && (
            <div className="absolute inset-0 bg-brand-brown flex flex-col items-center justify-center text-center px-8 z-10 transition-all duration-500">
              {/* Animated Lines Background */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "40px 40px",
                }}
              ></div>

              <div className="relative z-20 w-full max-w-md">
                <div className="text-6xl mb-8 animate-bounce">✨</div>
                <h2 className="text-3xl font-extrabold text-white mb-6 animate-pulse">
                  Merakit Itinerary...
                </h2>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-brand-orange transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <p className="text-brand-orange font-mono text-[14px]">
                  {loadingText}
                </p>

                {/* Simulated Console Logs */}
                <div className="mt-8 bg-black/30 rounded-xl p-4 text-left font-mono text-[11px] text-white/50 h-32 overflow-hidden flex flex-col justify-end">
                  <div className="opacity-40"> Fetching places API... OK</div>
                  <div className="opacity-60">
                    {" "}
                    Calculating route distance matrix... OK
                  </div>
                  <div className="opacity-80">
                    Applying budget constraints: 5.000.000...
                  </div>
                  <div className="text-brand-orange">{`>> ${loadingText}`}</div>
                </div>
              </div>
            </div>
          )}

          {/* Done State */}
          {step === "done" && (
            <div className="absolute inset-0 bg-brand-orange/5 flex flex-col items-center justify-center text-center px-8 z-10 animate-fade-in-up">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl shadow-brand-orange/20 text-brand-orange text-4xl mb-6">
                ✓
              </div>
              <h2 className="text-3xl font-extrabold text-brand-brown mb-4">
                Itinerary Berhasil Dibuat!
              </h2>
              <p className="text-brand-brown/70 max-w-md mb-8">
                AI kami telah merangkum rute, aktivitas, dan estimasi biaya
                sesuai dengan kriteria yang Anda berikan.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep("form")}
                  className="px-6 py-3 rounded-xl border-2 border-brand-brown/10 text-brand-brown font-bold hover:bg-white transition-colors"
                >
                  Ulangi
                </button>
                <Link
                  to="/itinerary/1"
                  className="px-8 py-3 rounded-xl bg-brand-orange text-white font-bold shadow-lg shadow-brand-orange/30 hover:-translate-y-1 transition-transform"
                >
                  Lihat Hasil Detail →
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
