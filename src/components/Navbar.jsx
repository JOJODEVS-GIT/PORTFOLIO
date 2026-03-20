import { useEffect, useState, useCallback } from 'react';
import { Menu, X, Sun, Moon, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { site } = useSiteData();
  const { theme, toggleTheme } = useTheme();

  const logoText = site?.logoText || 'JOJO';
  const logoDot = site?.logoDot || ".DEV's";

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    setIsScrolled(scrolled > 50);
    setScrollProgress(scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'À propos', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Parcours', href: '#parcours' },
    { label: 'Projets', href: '#projects' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      aria-label="Navigation principale"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-slide-down ${
        isScrolled
          ? 'backdrop-blur border-b shadow-lg'
          : 'bg-transparent'
      }`}
      style={isScrolled ? {
        backgroundColor: 'var(--nav-bg)',
        borderColor: 'rgba(22,199,154,0.1)',
      } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#hero"
            className="text-2xl font-bold animate-fade-in"
          >
            <span style={{ color: 'var(--text-primary)' }}>{logoText}</span>
            <span className="text-[#16C79A]">{logoDot}</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <a key={idx} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-card)]"
              aria-label={theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'}
              title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
            >
              {theme === 'dark' ? (
                <Sun size={20} style={{ color: 'var(--text-secondary)' }} />
              ) : (
                <Moon size={20} style={{ color: 'var(--text-secondary)' }} />
              )}
            </button>

            <Link
              to="/admin"
              className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-card)]"
              aria-label="Administration"
              title="Admin"
            >
              <Shield size={18} style={{ color: 'var(--text-muted)' }} />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
              aria-label="Ouvrir le menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X size={24} style={{ color: 'var(--text-primary)' }} />
              ) : (
                <Menu size={24} style={{ color: 'var(--text-primary)' }} />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-[var(--border-card)] animate-fade-in">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="block px-4 py-2 rounded transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

      <div
        className="absolute bottom-0 left-0 h-[2px] transition-all duration-300"
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(to right, var(--accent), var(--accent-dark))`,
        }}
      />
    </nav>
  );
}
