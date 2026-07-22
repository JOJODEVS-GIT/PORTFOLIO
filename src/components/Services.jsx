import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconMap';
import { useSiteData } from '../context/SiteDataContext';

const fallbackServices = [
  { iconName: 'Globe', title: 'Création de sites & apps', description: 'Des sites vitrine, e-commerce et applications web rapides, modernes et pensés pour convertir vos visiteurs en clients.', features: ['Sites vitrine & landing pages', 'E-commerce', 'Applications web (React / Next.js)', 'Responsive & rapide'] },
  { iconName: 'Bot', title: 'Automatisation & gain de temps', description: 'J\'automatise vos tâches répétitives — documents, données, relances — avec des scripts et bots Python sur mesure.', features: ['Bots & scripts Python', 'Génération de documents', 'Traitement de données', 'Intégrations API'] },
  { iconName: 'Palette', title: 'Conseil, design & SEO', description: 'Maquettes, cahier des charges et audit SEO pour partir sur des bases solides et un site qu\'on trouve sur Google.', features: ['Maquettes (Figma)', 'Cahier des charges', 'Audit SEO & performance', 'Conseil technique'] },
  { iconName: 'Shield', title: 'Maintenance & sécurité', description: 'Suivi après livraison, mises à jour, sauvegardes et sécurisation — pour un site qui reste rapide, sûr et à jour.', features: ['Suivi après livraison', 'Sécurité & sauvegardes', 'Mises à jour', 'Optimisation performance'] },
  { iconName: 'Layout', title: 'Applications de gestion & dashboards', description: "Des outils de gestion sur mesure — ERP simplifié, suivi d'activité, tableaux de bord — pour piloter votre business en un coup d'œil.", features: ['ERP & gestion sur mesure', 'Tableaux de bord', 'Suivi en temps réel', 'Laravel / React / Firebase'] },
  { iconName: 'Bot', title: 'Chatbots & automatisation WhatsApp', description: 'Des chatbots WhatsApp et automatisations qui répondent à vos clients et gèrent vos commandes 24h/24, avec n8n.', features: ['Bots WhatsApp', 'Réponses automatiques', 'Gestion de commandes', 'Automatisation n8n'] },
];

export default function Services() {
  const { services } = useSiteData();
  const servicesData = services.length ? services : fallbackServices;

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="section-heading !mb-4">
          <span className="idx text-base sm:text-lg">02.</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">Services</h2>
          <span className="rule" />
        </motion.div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mb-16 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          Des solutions digitales adaptées à vos besoins.
        </motion.p>

        <motion.div className="grid md:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {servicesData.map((service, idx) => {
            const IconComponent = getIcon(service.iconName, 'Briefcase');
            return (
              <motion.div key={service.id || idx} variants={itemVariants} className="card group">
                <div className="w-14 h-14 mb-6 rounded-xl bg-[color:var(--accent-a10)] border border-[color:var(--accent-a20)] flex items-center justify-center group-hover:bg-[color:var(--accent-a20)] transition-colors">
                  <IconComponent size={28} className="text-[color:var(--accent)]" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{service.title}</h3>
                <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{service.description}</p>
                <ul className="space-y-2.5">
                  {(service.features || []).map((feature, fidx) => (
                    <li key={fidx} className="text-sm flex items-center gap-3" style={{ color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>▹</span>
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
