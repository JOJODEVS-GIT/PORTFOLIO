import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, MapPin, Calendar } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

const fallbackParcours = [
  { id: '1', type: 'formation', title: 'Formation Développement Web', organization: 'Autodidacte & Formations en ligne', location: 'Cotonou, Bénin', startDate: '2022', endDate: 'Présent', description: 'Apprentissage intensif de React, Next.js, TypeScript, Python et des technologies web modernes.' },
  { id: '2', type: 'experience', title: 'Développeur Web Full Stack Freelance', organization: "JOJO.DEV's", location: 'Cotonou, Bénin', startDate: '2023', endDate: 'Présent', description: 'Création de sites web, applications et automatisations pour des clients locaux et internationaux.' },
  { id: '3', type: 'certification', title: 'Certifications Web & Python', organization: 'Plateformes en ligne', location: 'En ligne', startDate: '2023', endDate: '2024', description: 'Certifications en développement web, Python, et bonnes pratiques de programmation.' },
];

const typeConfig = {
  formation: { icon: GraduationCap, label: 'Formation', color: 'bg-blue-500' },
  experience: { icon: Briefcase, label: 'Expérience', color: 'bg-[#16C79A]' },
  certification: { icon: Award, label: 'Certification', color: 'bg-purple-500' },
};

export default function Parcours() {
  const { parcours } = useSiteData();
  const parcoursData = parcours.length ? parcours : fallbackParcours;

  return (
    <section id="parcours" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Mon <span className="accent-gradient">Parcours</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Formations, expériences et certifications
        </motion.p>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mb-12">
          {Object.entries(typeConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <div className={`w-3 h-3 rounded-full ${config.color}`} />
              {config.label}
            </div>
          ))}
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#16C79A]/50 via-[#0F3460]/50 to-transparent" />

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
                <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-9 h-9 rounded-full ${config.color} flex items-center justify-center z-10 shadow-lg`}>
                  <IconComponent size={18} className="text-white" />
                </div>

                <div className={`card ${isLeft ? 'md:mr-8' : 'md:ml-8'}`}>
                  <div className={`flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider ${isLeft ? 'md:justify-end' : ''}`}>
                    <span className={`px-2 py-0.5 rounded-full text-white ${config.color}`}>{config.label}</span>
                  </div>

                  <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p className="text-[#16C79A] font-semibold text-sm mb-2">{item.organization}</p>

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
