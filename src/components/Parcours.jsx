import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, MapPin, Calendar } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

const fallbackParcours = [
  { id: '1', type: 'formation', title: 'Formation Développement Web', organization: 'Autodidacte & Formations en ligne', location: 'Cotonou, Bénin', startDate: '2022', endDate: 'Présent', description: 'Apprentissage intensif de React, Next.js, TypeScript, Python et des technologies web modernes.' },
  { id: '2', type: 'experience', title: 'Développeur Web Full Stack Freelance', organization: "JOJO.DEV's", location: 'Cotonou, Bénin', startDate: '2023', endDate: 'Présent', description: 'Création de sites web, applications et automatisations pour des clients locaux et internationaux.' },
  { id: '3', type: 'certification', title: 'Certifications Web & Python', organization: 'Plateformes en ligne', location: 'En ligne', startDate: '2023', endDate: '2024', description: 'Certifications en développement web, Python, et bonnes pratiques de programmation.' },
];

const typeConfig = {
  formation: { icon: GraduationCap, label: 'Formation', hex: '#6b7c88' },
  experience: { icon: Briefcase, label: 'Expérience', hex: 'var(--accent)' },
  certification: { icon: Award, label: 'Certification', hex: '#c9a96e' },
};

export default function Parcours() {
  const { parcours } = useSiteData();
  const parcoursData = parcours.length ? parcours : fallbackParcours;

  return (
    <section id="parcours" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="section-heading !mb-4">
          <span className="idx text-base sm:text-lg">03.</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">Parcours</h2>
          <span className="rule" />
        </motion.div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mb-14 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          Formations, expériences et certifications.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mb-12">
          {Object.entries(typeConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: config.hex }} />
              {config.label}
            </div>
          ))}
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-[color:var(--accent-a40)] via-[color:var(--accent-a15)] to-transparent" />

          {parcoursData.map((item, idx) => {
            const config = typeConfig[item.type] || typeConfig.experience;
            const IconComponent = config.icon;
            const isLeft = idx % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative mb-12 md:mb-16 ${isLeft ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%] md:text-left'} pl-12 md:pl-0`}
              >
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10" style={{ background: config.hex }}>
                  <IconComponent size={17} style={{ color: '#05100c' }} />
                </div>

                <div className={`card ${isLeft ? 'md:mr-8' : 'md:ml-8'}`}>
                  <div className={`flex items-center gap-2 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                    <span className="px-2.5 py-1 rounded text-[0.65rem] uppercase" style={{ background: config.hex, color: '#05100c', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>{config.label}</span>
                  </div>

                  <h3 className="text-lg font-display font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p className="text-sm mb-2" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{item.organization}</p>

                  <div className={`flex flex-wrap gap-3 text-xs mb-3 ${isLeft ? 'md:justify-end' : ''}`} style={{ color: 'var(--text-muted)' }}>
                    <span className="flex items-center gap-1"><Calendar size={12} />{item.startDate} — {item.endDate || 'Présent'}</span>
                    {item.location && <span className="flex items-center gap-1"><MapPin size={12} />{item.location}</span>}
                  </div>

                  {item.description && <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
