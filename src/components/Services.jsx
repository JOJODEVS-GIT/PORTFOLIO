import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconMap';
import { useSiteData } from '../context/SiteDataContext';

const fallbackServices = [
  { iconName: 'Globe', title: 'Création Web', description: 'Sites vitrine, e-commerce, applications web complètes avec React, Next.js et WordPress.', features: ['Sites vitrine', 'E-commerce', 'Applications web', 'Landing pages'] },
  { iconName: 'Bot', title: 'Automatisation', description: 'Bots, scripts, génération automatique de documents avec Python et APIs.', features: ['Bots Python', 'Scripts automatisés', 'Génération de documents', 'Intégrations API'] },
  { iconName: 'Palette', title: 'Conseil & Design', description: 'Maquettes Figma, cahiers des charges, audit SEO et conseil technique.', features: ['Maquettes Figma', 'Cahiers des charges', 'Audit SEO', 'Conseil technique'] },
];

export default function Services() {
  const { services } = useSiteData();
  const servicesData = services.length ? services : fallbackServices;

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Mes <span className="accent-gradient">Services</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Des solutions digitales adaptées à vos besoins
        </motion.p>

        <motion.div className="grid md:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {servicesData.map((service, idx) => {
            const IconComponent = getIcon(service.iconName, 'Briefcase');
            return (
              <motion.div key={service.id || idx} variants={itemVariants} className="card text-center group">
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-[#16C79A]/10 border border-[#16C79A]/20 flex items-center justify-center group-hover:bg-[#16C79A]/20 transition-colors">
                  <IconComponent size={32} className="text-[#16C79A]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="mb-6 text-sm" style={{ color: 'var(--text-secondary)' }}>{service.description}</p>
                <ul className="space-y-2 text-left mx-auto w-fit">
                  {(service.features || []).map((feature, fidx) => (
                    <li key={fidx} className="text-sm flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                      <span className="w-1.5 h-1.5 flex-shrink-0 rounded-full bg-[#16C79A]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
