import { Link } from "react-router";

export default function Sidebar({ isSidebarOpen, menuGroups }) {
    return (
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-brand-brown text-white/70 transition-transform duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} flex flex-col`}>
            {/* Sidebar Header */}
            <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white tracking-tight">Shartinary</span>
                    <span className="text-[10px] font-semibold bg-brand-orange text-white px-2 py-0.5 rounded">ADMIN</span>
                </Link>
            </div>

            {/* Sidebar Menu */}
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
                {menuGroups.map((group, groupIdx) => (
                    <div key={groupIdx}>
                        <div className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4 px-2">
                            {group.title}
                        </div>
                        <div className="space-y-1">
                            {group.items.map((item, itemIdx) => (
                                <Link
                                    key={itemIdx}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${item.path === "/admin" ? "bg-brand-orange text-white" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
                                >
                                    {item.icon}
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-white/10 shrink-0">
                <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium text-white/40 hover:bg-white/5 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Kembali ke Web
                </Link>
            </div>
        </aside>
    );
}