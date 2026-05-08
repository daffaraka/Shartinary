import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export function meta() {
  return [
    { title: "Masuk ke Akun Anda - Shartinary" },
    { name: "description", content: "Masuk untuk mulai merencanakan perjalanan Anda." },
  ];
}

export default function Login() {
  const { login, authLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const result = await login(formData);
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
                <h1 className="text-3xl font-extrabold text-brand-brown mb-2">Selamat Datang!</h1>
                <p className="text-brand-brown/40 text-sm">Masuk untuk melanjutkan petualanganmu</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-medium rounded-2xl flex items-center gap-3">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-brand-brown/40 uppercase tracking-widest mb-2 ml-1">
                    Alamat Email
                  </label>
                  <input 
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-brand-orange/10 focus:border-brand-orange/30 transition-all placeholder:text-gray-300"
                    placeholder="nama@email.com"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2 ml-1">
                    <label className="text-[10px] font-bold text-brand-brown/40 uppercase tracking-widest">
                      Kata Sandi
                    </label>
                    <Link to="/forgot-password" size="sm" className="text-[10px] font-bold text-brand-orange hover:underline">
                      Lupa?
                    </Link>
                  </div>
                  <input 
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-brand-orange/10 focus:border-brand-orange/30 transition-all placeholder:text-gray-300"
                    placeholder="••••••••"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-brand-brown text-white py-4 rounded-2xl font-bold text-sm hover:bg-brand-brown/90 shadow-xl shadow-brand-brown/20 transition-all disabled:opacity-50"
                >
                  {authLoading ? "Sedang Masuk..." : "Masuk Sekarang"}
                </button>
              </form>

              <div className="mt-10 text-center">
                <p className="text-sm text-brand-brown/40">
                  Belum punya akun?{" "}
                  <Link to="/register" className="text-brand-orange font-bold hover:underline">
                    Daftar Gratis
                  </Link>
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50/50 p-6 text-center border-t border-gray-50">
              <p className="text-[10px] text-brand-brown/30 font-medium uppercase tracking-widest">
                Protected by Shartinary Security
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
