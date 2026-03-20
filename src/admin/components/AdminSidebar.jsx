import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard, Settings, Sparkles, BarChart3,
  User, Route, Briefcase, FolderGit2, Code2, Mail, Menu, X, LogOut
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/site', label: 'Site', icon: Settings },
  { to: '/admin/hero', label: 'Hero', icon: Sparkles },
  { to: '/admin/stats', label: 'Stats', icon: BarChart3 },
  { to: '/admin/about', label: 'À propos', icon: User },
  { to: '/admin/parcours', label: 'Parcours', icon: Route },
  { to: '/admin/services', label: 'Services', icon: Briefcase },
  { to: '/admin/projects', label: 'Projets', icon: FolderGit2 },
  { to: '/admin/skills', label: 'Compétences', icon: Code2 },
  { to: '/admin/contact', label: 'Contact', icon: Mail },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const navContent = (
    <>
      <div className="p-4 border-b border-[#16C79A]/10">
        <Link to="/" className="text-xl font-bold">
          <span style={{ color: 'var(--text-primary)' }}>JOJO</span>
          <span className="text-[#16C79A]">.DEV's</span>
        </Link>
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Administration</p>
      </div>

      <nav aria-label="Administration" className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#16C79A]/20 text-[#16C79A] border border-[#16C79A]/30'
                    : 'hover:bg-[#16C79A]/10'
                }`
              }
              style={({ isActive }) => isActive ? {} : { color: 'var(--text-secondary)' }}
            >
              <Icon size={18} />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[#16C79A]/10">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors w-full"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ouvrir le menu admin"
        aria-expanded={isOpen}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 border border-[#16C79A]/20 rounded-lg"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 border-r border-[#16C79A]/10 z-40 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        {navContent}
      </aside>
    </>
  );
}
