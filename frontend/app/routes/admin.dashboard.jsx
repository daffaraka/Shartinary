import AdminLayout from "../components/layout/AdminLayout";

export default function AdminDashboard() {
  const stats = [
    { 
      title: "Total Itinerary", 
      value: "1,284", 
      change: "+12%", 
      isUp: true, 
      icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg> 
    },
    { 
      title: "Di-generate AI", 
      value: "342", 
      change: "+54%", 
      isUp: true, 
      icon: <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg> 
    },
    { 
      title: "Pengguna Aktif", 
      value: "8,405", 
      change: "+5%", 
      isUp: true, 
      icon: <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> 
    },
    { 
      title: "Pendapatan Premium", 
      value: "Rp 12.4M", 
      change: "-2%", 
      isUp: false, 
      icon: <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 
    },
  ];

  const recentActivities = [
    { id: "ITN-882", user: "Bunda Ayu", action: "Membuat Itinerary Manual", target: "Bandung Family Trip", time: "10 menit yang lalu", status: "Public" },
    { id: "ITN-881", user: "Andi Traveler", action: "Generate dengan AI", target: "Labuan Bajo Adventure", time: "25 menit yang lalu", status: "Premium" },
    { id: "ITN-880", user: "Rina Style", action: "Generate dengan AI", target: "Jakarta Thrifting", time: "1 jam yang lalu", status: "Public" },
    { id: "ITN-879", user: "Budi Santoso", action: "Menyalin Itinerary", target: "Bali Selatan", time: "3 jam yang lalu", status: "Private" },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Pantau aktivitas platform Shartinary hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center">
                {stat.icon}
              </div>
              <div className={`text-[13px] font-bold px-2.5 py-1 rounded-md ${stat.isUp ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                {stat.change}
              </div>
            </div>
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">{stat.title}</div>
            <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Aktivitas Terbaru</h2>
          <button className="text-[13px] font-semibold text-blue-600 hover:text-blue-800 transition-colors">Lihat Semua</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-3 text-[12px] font-semibold text-slate-500 uppercase tracking-wider">ID / User</th>
                <th className="px-6 py-3 text-[12px] font-semibold text-slate-500 uppercase tracking-wider">Aktivitas</th>
                <th className="px-6 py-3 text-[12px] font-semibold text-slate-500 uppercase tracking-wider">Target</th>
                <th className="px-6 py-3 text-[12px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentActivities.map((act, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-800">{act.user}</div>
                    <div className="text-[12px] text-slate-500">{act.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[14px] font-medium text-slate-700">{act.action}</div>
                    <div className="text-[12px] text-slate-400">{act.time}</div>
                  </td>
                  <td className="px-6 py-4 text-[14px] font-medium text-slate-700">
                    {act.target}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[12px] font-bold ${
                      act.status === 'Public' ? 'bg-emerald-100 text-emerald-700' :
                      act.status === 'Premium' ? 'bg-purple-100 text-purple-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {act.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
