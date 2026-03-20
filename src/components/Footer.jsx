import { motion } from 'framer-motion';
import { Github, Mail, MessageCircle } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { site, contact } = useSiteData();

  const logoText = site?.logoText || 'JOJO';
  const logoDot = site?.logoDot || ".DEV's";

  const links = [
    { label: 'GitHub', href: contact?.github || 'https://github.com/JOJODEVS-GIT', icon: Github },
    { label: 'WhatsApp', href: contact?.whatsapp || 'https://wa.me/2290160293043', icon: MessageCircle },
    { label: 'Email', href: `mailto:${contact?.email || 'jojohkdev@gmail.com'}`, icon: Mail },
  ];

  return (
    <footer style={{ backgroundColor: 'var(--bg-footer)', borderColor: 'var(--border-card)' }} className="border-t" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-1">
              <span style={{ color: 'var(--text-primary)' }}>{logoText}</span>
              <span className="text-[#16C79A]">{logoDot}</span>
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Développeur Web Full Stack & Automatisation</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Cotonou, Bénin</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
            {['Accueil:#hero', 'À propos:#about', 'Services:#services', 'Parcours:#parcours', 'Projets:#projects', 'Contact:#contact'].map((item) => {
              const [label, href] = item.split(':');
              return <a key={href} href={href} className="hover:text-[#16C79A] transition-colors" style={{ color: 'var(--text-secondary)' }}>{label}</a>;
            })}
          </nav>

          <div className="flex gap-3">
            {links.map((link, idx) => {
              const IconComponent = link.icon;
              return (
                <a key={idx} href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-2 rounded-lg border border-[#16C79A]/20 transition-all glow-effect hover:bg-[#16C79A]/20"
                  style={{ background: 'var(--bg-card)' }} aria-label={link.label}>
                  <IconComponent size={18} />
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}
          className="mt-12 pt-8 border-t text-center text-sm" style={{ borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
          <p>&copy; {currentYear} {logoText}{logoDot} — Josué Hounkanrin. Tous droits réservés.</p>
        </motion.div>
      </div>
    </footer>
  );
}
