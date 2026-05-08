import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export function meta() {
  return [
    { title: "Daftar Akun Baru - Shartinary" },
    { name: "description", content: "Bergabunglah dengan komunitas Shartinary untuk merencanakan perjalanan terbaikmu." },
  ];
}

export default function Register() {
  const { register, authLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.password_confirmation) {
        return setError("Konfirmasi kata sandi tidak cocok.");
    }

    const result = await register(formData);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-6 pt-32 pb-20">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="bg-white rounded-[40px] shadow-2xl shadow-brand-brown/5 border border-brand-brown/5 overflow-hidden">
            <div className="p-10">
              <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold text-brand-brown mb-2">Buat Akun</h1>
                <p className="text-brand-brown/40 text-sm">Mulai perjalanan cerdasmu hari ini</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-medium rounded-2xl flex items-center gap-3">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-brand-brown/40 uppercase tracking-widest mb-2 ml-1">
                    Nama Lengkap
                  </label>
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-brand-orange/10 focus:border-brand-orange/30 transition-all"
                    placeholder="Masukkan nama Anda"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-brand-brown/40 uppercase tracking-widest mb-2 ml-1">
                    Alamat Email
                  </label>
                  <input 
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-brand-orange/10 focus:border-brand-orange/30 transition-all"
                    placeholder="nama@email.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-brand-brown/40 uppercase tracking-widest mb-2 ml-1">
                    Kata Sandi
                  </label>
                  <input 
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-brand-orange/10 focus:border-brand-orange/30 transition-all"
                    placeholder="Minimal 8 karakter"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-brand-brown/40 uppercase tracking-widest mb-2 ml-1">
                    Konfirmasi Kata Sandi
                  </label>
                  <input 
                    type="password"
                    required
                    value={formData.password_confirmation}
                    onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-brand-orange/10 focus:border-brand-orange/30 transition-all"
                    placeholder="Ulangi kata sandi"
                  />
                </div>

                <div className="pt-2">
                    <button 
                    type="submit"
                    disabled={authLoading}
                    className="w-full bg-brand-orange text-white py-4 rounded-2xl font-bold text-sm hover:bg-orange-600 shadow-xl shadow-brand-orange/20 transition-all disabled:opacity-50"
                    >
                    {authLoading ? "Sedang Mendaftar..." : "Daftar Sekarang"}
                    </button>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-brand-brown/40">
                  Sudah punya akun?{" "}
                  <Link to="/login" className="text-brand-brown font-bold hover:underline">
                    Masuk di sini
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
