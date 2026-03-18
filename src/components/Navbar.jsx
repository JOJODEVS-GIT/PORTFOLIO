import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setIsScrolled(scrolled > 50);
      setScrollProgress((scrolled / scrollHeight) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark', !isDark);
    document.body.classList.toggle('light', isDark);
  };

  const navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'À propos', href: '#about' },
    { label: 'Projets', href: '#projects' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-900/95 backdrop-blur border-b border-gray-800/30 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
            >
              Portfolio
            </motion.a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="nav-link"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-gray-900" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden pb-4 border-t border-gray-800"
            >
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </motion.nav>
    </>
  );
}
