import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, MapPin, Calendar } from 'lucide-react';
import { useEffect, useRef } from 'react';
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

function Card({ item, config }) {
  return (
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
}

export default function Parcours() {
  const { parcours } = useSiteData();
  const parcoursData = parcours.length ? parcours : fallbackParcours;
  // Duplication pour un défilement continu et sans couture (comme les témoignages)
  const loop = [...parcoursData, ...parcoursData];

  const scrollerRef = useRef(null);
  // paused = survol · drag = glisser à la main · pos = position flottante pour un défilement fluide
  const state = useRef({ paused: false, drag: false, startX: 0, startLeft: 0, last: 0, pos: 0 });

  // Défilement automatique lent + boucle sans couture, piloté en JS pour permettre le scroll manuel au survol
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const PX_PER_SEC = 10; // lent
    let raf;
    const tick = (t) => {
      const s = state.current;
      if (!s.last) s.last = t;
      const dt = (t - s.last) / 1000;
      s.last = t;
      const half = el.scrollWidth / 2;
      if (!reduce && !s.paused && !s.drag && half > 0) {
        s.pos += PX_PER_SEC * dt;
        if (s.pos >= half) s.pos -= half;
        else if (s.pos < 0) s.pos += half;
        el.scrollLeft = s.pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const syncPos = () => { const el = scrollerRef.current; if (el) state.current.pos = el.scrollLeft; };
  const onEnter = () => { state.current.paused = true; };
  const onLeave = () => { state.current.drag = false; scrollerRef.current?.classList.remove('pc-dragging'); syncPos(); state.current.paused = false; };
  const onDown = (e) => {
    const s = state.current;
    s.drag = true; s.startX = e.pageX; s.startLeft = scrollerRef.current.scrollLeft;
    scrollerRef.current.classList.add('pc-dragging');
  };
  const onMove = (e) => {
    const s = state.current;
    if (!s.drag) return;
    e.preventDefault();
    scrollerRef.current.scrollLeft = s.startLeft - (e.pageX - s.startX);
  };
  const onUp = () => { state.current.drag = false; scrollerRef.current?.classList.remove('pc-dragging'); syncPos(); };

  return (
    <section id="parcours" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="section-heading !mb-4">
          <span className="idx text-base sm:text-lg">03.</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">Parcours</h2>
          <span className="rule" />
        </motion.div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mb-8 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          Formations, expériences et certifications.
        </motion.p>

        {/* Légende */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
          {Object.entries(typeConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: config.hex }} />
              {config.label}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Carrousel horizontal auto — pause + glisser gauche/droite au survol, fondus sur les bords */}
      <div className="relative">
        {/* Ligne centrale horizontale (statique : les nœuds défilent dessus) */}
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 z-0" style={{ background: 'var(--accent-a20)' }} />

        <div
          ref={scrollerRef}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={onUp}
          className="pc-marquee relative z-10"
        >
          <div className="pc-track px-4">
          {loop.map((item, idx) => {
            const config = typeConfig[item.type] || typeConfig.experience;
            const IconComponent = config.icon;
            const isTop = idx % 2 === 0;

            return (
              <div key={`${item.id}-${idx}`} className="relative z-10 shrink-0 w-[264px] sm:w-[292px] flex flex-col">
                {/* Emplacement haut */}
                <div className="h-[330px] flex items-end justify-center pb-6">
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
                <div className="h-[330px] flex items-start justify-center pt-6">
                  {!isTop && <Card item={item} config={config} />}
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
