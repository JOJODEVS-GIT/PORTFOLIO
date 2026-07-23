import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { useSiteData } from '../context/SiteDataContext';

const fallbackParcours = [
  { id: '1', type: 'experience', title: 'Développeur Full-Stack Freelance', organization: "JOJO.DEV's", location: 'Cotonou, Bénin', startDate: '2023', endDate: 'Présent', description: 'Conception de sites web, applications et automatisations pour des clients locaux et internationaux — du design à la mise en ligne, avec suivi après livraison.' },
  { id: '2', type: 'formation', title: 'Développement Web Full-Stack', organization: 'Autodidacte & formations en ligne', location: 'Cotonou, Bénin', startDate: '2022', endDate: 'Présent', description: 'Maîtrise de React, Next.js, TypeScript, Python et Firebase, avec les bonnes pratiques modernes : Git, CI/CD et sécurité.' },
  { id: '3', type: 'experience', title: 'Applications web modernes & sécurisées', organization: 'Projets clients & personnels', location: 'Cotonou, Bénin', startDate: '2024', endDate: 'Présent', description: 'E-commerce, dashboards et apps mobiles déployés sur Vercel, avec intégration continue (CI/CD) et sécurisation (règles Firebase, headers, audits).' },
  { id: '4', type: 'certification', title: 'Certification n8n — Automatisation & Workflows', organization: 'Udemy', location: 'En ligne', startDate: '2025', endDate: '2025', description: "Automatisation de workflows avec n8n : intégration d'API, orchestration de tâches et connexion d'outils sans code." },
];

const typeConfig = {
  formation: { icon: GraduationCap, label: 'Formation', hex: '#6b7c88' },
  experience: { icon: Briefcase, label: 'Expérience', hex: 'var(--accent)' },
  certification: { icon: Award, label: 'Certification', hex: '#c9a96e' },
};

export default function Parcours() {
  const { parcours } = useSiteData();
  const parcoursData = parcours.length ? parcours : fallbackParcours;

  const scrollRef = useRef(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  const nudge = (dir) => scrollRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });

  // Glisser-déposer à la souris (desktop)
  const onDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.pageX, startLeft: el.scrollLeft, moved: false };
    el.classList.add('cursor-grabbing');
  };
  const onMove = (e) => {
    const el = scrollRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.pageX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const onUp = () => {
    drag.current.down = false;
    scrollRef.current?.classList.remove('cursor-grabbing');
  };

  const Card = ({ item, config }) => (
    <div className="card w-[264px] sm:w-[292px]">
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2.5 py-1 rounded text-[0.65rem] uppercase" style={{ background: config.hex, color: '#05100c', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>{config.label}</span>
      </div>
      <h3 className="text-lg font-display font-semibold mb-1 leading-snug" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
      <p className="text-sm mb-2" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{item.organization}</p>
      <div className="flex flex-wrap gap-3 text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
        <span className="flex items-center gap-1"><Calendar size={12} />{item.startDate} — {item.endDate || 'Présent'}</span>
        {item.location && <span className="flex items-center gap-1"><MapPin size={12} />{item.location}</span>}
      </div>
      {item.description && <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>}
    </div>
  );

  return (
    <section id="parcours" className="py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="section-heading !mb-4">
          <span className="idx text-base sm:text-lg">03.</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">Parcours</h2>
          <span className="rule" />
        </motion.div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mb-10 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          Formations, expériences et certifications.
        </motion.p>

        {/* Légende + flèches de navigation */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {Object.entries(typeConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: config.hex }} />
                {config.label}
              </div>
            ))}
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button type="button" onClick={() => nudge(-1)} aria-label="Étape précédente"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[color:var(--accent-a10)]"
              style={{ border: '1px solid var(--border-card)', color: 'var(--text-secondary)' }}>
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={() => nudge(1)} aria-label="Étape suivante"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[color:var(--accent-a10)]"
              style={{ border: '1px solid var(--border-card)', color: 'var(--text-secondary)' }}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline horizontale déroulante */}
      <div className="relative">
        {/* Dégradés sur les bords (indiquent qu'on peut défiler) */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-20 z-20" style={{ background: 'linear-gradient(90deg, var(--bg-primary), transparent)' }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-20 z-20" style={{ background: 'linear-gradient(270deg, var(--bg-primary), transparent)' }} />

        <div
          ref={scrollRef}
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={onUp}
          onMouseLeave={onUp}
          className="hide-scrollbar overflow-x-auto cursor-grab snap-x snap-mandatory select-none"
        >
          <div className="relative flex items-stretch gap-4 px-6 sm:px-16 lg:px-[max(4rem,calc(50%-150px))]">
            {/* Ligne centrale horizontale (au centre des nœuds) */}
            <div className="absolute left-0 right-0 h-px" style={{ top: 'calc(280px + 1.125rem)', background: 'var(--accent-a20)' }} />

            {parcoursData.map((item, idx) => {
              const config = typeConfig[item.type] || typeConfig.experience;
              const IconComponent = config.icon;
              const isTop = idx % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: isTop ? -24 : 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  viewport={{ once: true }}
                  className="snap-center shrink-0 w-[264px] sm:w-[292px] flex flex-col"
                >
                  {/* Emplacement haut */}
                  <div className="h-[280px] flex items-end justify-center pb-6">
                    {isTop && <Card item={item} config={config} />}
                  </div>

                  {/* Nœud sur la ligne + connecteur */}
                  <div className="relative flex items-center justify-center" style={{ height: '2.25rem' }}>
                    <div
                      className="absolute left-1/2 -translate-x-1/2 w-px"
                      style={{ background: 'var(--accent-a20)', height: '1.5rem', [isTop ? 'bottom' : 'top']: '100%' }}
                    />
                    <div className="w-9 h-9 rounded-full flex items-center justify-center z-10 ring-4" style={{ background: config.hex, '--tw-ring-color': 'var(--bg-primary)' }}>
                      <IconComponent size={17} style={{ color: '#05100c' }} />
                    </div>
                  </div>

                  {/* Emplacement bas */}
                  <div className="h-[280px] flex items-start justify-center pt-6">
                    {!isTop && <Card item={item} config={config} />}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
