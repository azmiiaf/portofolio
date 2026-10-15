import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  User,
  GraduationCap,
  Award,
  FolderKanban,
  Briefcase,
  Mail,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useAuth } from "./AuthContext";
import { authService } from "../services/authService";
import Button from "../Elements/Button";

const SIDEBAR_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/profile", label: "Profil", icon: User },
  { to: "/admin/education", label: "Pendidikan", icon: GraduationCap },
  { to: "/admin/certifications", label: "Lisensi & Sertifikasi", icon: Award },
  { to: "/admin/projects", label: "Projek", icon: FolderKanban },
  { to: "/admin/experience", label: "Experience", icon: Briefcase },
  { to: "/admin/contact", label: "Kontak", icon: Mail },
];

export default function AdminLayout() {
  const { session } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-base)]">
      {/* Sidebar */}
      <aside className="w-60 fixed bottom-0 top-0 lef-0 shrink-0 border-r border-[var(--color-border)] flex flex-col py-8 px-4">
        <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest mb-4 px-3">
          Admin Panel
        </p>

        <nav className="flex flex-col gap-1 flex-1">
          {SIDEBAR_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
                }`
              }
            >
              <Icon size={16} strokeWidth={1.75} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="border-t border-[var(--color-border)] pt-4 mt-4">
          <Link to='/'>
            <Button variant="primary">Panel Portofolio</Button>
          </Link>
          {session?.user?.email && (
            <p className="text-xs text-[var(--color-text-muted)] px-3 mb-2 truncate mt-10">
              {session.user.email}
            </p>
          )}
          <button
            id="admin-logout"
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-[var(--color-text-secondary)] hover:text-red-400 hover:bg-red-400/5 transition-colors"
          >
            <LogOut size={16} strokeWidth={1.75} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-60 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
