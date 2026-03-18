import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      id: 1,
      title: 'Développeur Web WordPress',
      company: 'Freelance - Projets Personnels & Clients',
      location: 'Bénin',
      period: '2024 → Présent',
      description: 'Création de sites WordPress professionnels, landing pages, formulaires, systèmes de billetterie et optimisation marketing pour clients.',
      highlights: ['WordPress', 'WooCommerce', 'Elementor', 'SEO'],
    },
    {
      id: 2,
      title: 'Marketeur Digital',
      company: 'Auto-entrepreneur - E-commerce & Projets Locaux',
      location: 'Bénin',
      period: '2024 → Présent',
      description: 'Mise en place de stratégies de vente, pages Facebook Business, tunnels de conversion, WhatsApp Business et gestion communautés.',
      highlights: ['Facebook Marketing', 'WhatsApp Business', 'Stratégie Digitale', 'Conversion'],
    },
    {
      id: 3,
      title: 'En Développement Continu',
      company: 'Apprentissage Pratique',
      location: 'Online',
      period: '2024 → Présent',
      description: 'Amélioration continue en front-end (React, JavaScript), back-end et solutions digitales complètes pour plus de polyvalence.',
      highlights: ['React', 'JavaScript', 'HTML/CSS', 'Architecture Web'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          Mon <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">Expérience</span>
        </motion.h2>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-cyan-500 -translate-x-1/2"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className={`md:flex gap-8 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className="card h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase size={20} className="text-violet-400" />
                      <h3 className="text-2xl font-bold">{exp.title}</h3>
                    </div>

                    <p className="text-violet-400 font-semibold mb-3">{exp.company}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {exp.location}
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((skill, sidx) => (
                        <span
                          key={sidx}
                          className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-violet-300 text-xs font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex items-center justify-center">
                  <motion.div
                    whileInView={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 ring-4 ring-gray-900"
                  />
                </div>

                {/* Empty Space */}
                <div className="flex-1 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
