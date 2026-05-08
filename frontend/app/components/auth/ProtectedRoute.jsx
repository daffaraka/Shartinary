import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

export default function ProtectedRoute() {
    const { user, isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Tunggu sampai status auth selesai dicek
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
            </div>
        );
    }

    // Jika tidak login, arahkan ke login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Jika mencoba akses rute admin tapi bukan admin, arahkan ke home
    const isAdminRoute = location.pathname.startsWith("/admin");
    const hasAdminRole = user?.roles?.some(role => role.name === "admin");
    
    if (isAdminRoute && !hasAdminRole) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
