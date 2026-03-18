import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'GitHub', href: '#', icon: Github },
    { label: 'LinkedIn', href: '#', icon: Linkedin },
    { label: 'Twitter', href: '#', icon: Twitter },
    { label: 'Email', href: 'mailto:hello@example.com', icon: Mail },
  ];

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Left - Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent mb-2">
              Josué Hounkanrin
            </h2>
            <p className="text-gray-400 text-sm">
              Développeur Web WordPress & Marketeur Digital
            </p>
          </div>

          {/* Center - Quick Links */}
          <div className="flex gap-6 text-sm">
            <a href="#hero" className="text-gray-400 hover:text-white transition-colors">
              Accueil
            </a>
            <a href="#about" className="text-gray-400 hover:text-white transition-colors">
              À propos
            </a>
            <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
              Projets
            </a>
            <a href="#skills" className="text-gray-400 hover:text-white transition-colors">
              Compétences
            </a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* Right - Social Links */}
          <div className="flex gap-4">
            {links.map((link, idx) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={idx}
                  href={link.href}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-violet-500/20 hover:border-violet-500/50 border border-gray-700 transition-all glow-effect"
                  aria-label={link.label}
                >
                  <IconComponent size={20} />
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm"
        >
          <p>
            © {currentYear} Portfolio. Tous les droits réservés. | Fait avec ❤️ par un développeur passionné
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
