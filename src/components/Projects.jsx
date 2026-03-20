import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';

const fallbackProjects = [
  { id: 1, title: 'JOJO E-Commerce Mastery', description: 'Plateforme e-commerce complète avec panier, paiement et gestion produits.', gradient: 'from-[#16C79A] to-[#0F3460]', category: 'React', tech: ['TypeScript', 'React', 'Vite'], github: 'https://github.com/JOJODEVS-GIT/JOJO-ECOMMERCE-MASTERY', live: 'https://jojo-ecommerce-mastery.vercel.app' },
  { id: 2, title: 'MODALLAS', description: 'Site vitrine événementiel — décoration et scénographie élégante.', gradient: 'from-[#0F3460] to-[#16C79A]', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/MODALLAS', live: 'https://modallas.vercel.app' },
  { id: 3, title: 'AFRO-FLASH-BENIN', description: 'Plateforme de services flash et livraison au Bénin.', gradient: 'from-[#16C79A] to-emerald-700', category: 'React', tech: ['Next.js', 'TypeScript'], github: 'https://github.com/JOJODEVS-GIT/AFRO-FLASH-BENIN', live: '#' },
  { id: 4, title: 'Reality Prompt Engine', description: 'Générateur de prompts IA avec interface intuitive.', gradient: 'from-purple-600 to-[#0F3460]', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/REALITY-PROMPT-ENGINE', live: 'https://reality-prompt-engine.vercel.app' },
  { id: 5, title: 'Mon Produit', description: 'Dashboard de gestion de produits avec statistiques et suivi.', gradient: 'from-[#0F3460] to-blue-800', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/MON-PRODUIT', live: 'https://mon-produit.vercel.app' },
  { id: 6, title: 'QCM JavaScript', description: 'Quiz interactif JavaScript — 60 questions, timer, stats par thème.', gradient: 'from-yellow-600 to-[#16C79A]', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/QCM-JAVASCRIPT', live: 'https://qcm-javascript.vercel.app' },
  { id: 7, title: 'Suivi Chauffeur', description: 'Application de suivi et gestion de chauffeurs en temps réel.', gradient: 'from-[#16C79A] to-teal-700', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/SUIVI-CHAUFFEUR', live: 'https://suivi-chauffeur.vercel.app' },
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const { projects } = useSiteData();
  const projectsData = projects.length ? projects : fallbackProjects;

  const categories = ['Tous', ...new Set(projectsData.map((p) => p.category))];
  const filteredProjects = selectedCategory === 'Tous' ? projectsData : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-accent)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Mes <span className="accent-gradient">Projets</span>
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                selectedCategory === category ? 'text-white shadow-lg' : 'border'
              }`}
              style={
                selectedCategory === category
                  ? { background: 'linear-gradient(135deg, #16C79A, var(--accent-dark))', boxShadow: '0 4px 15px rgba(22,199,154,0.3)' }
                  : { background: 'var(--bg-card)', borderColor: 'var(--border-card)', color: 'var(--text-secondary)' }
              }
            >
              {category}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="card group overflow-hidden"
              >
                {project.imageUrl ? (
                  <div className="w-full h-44 rounded-lg mb-4 relative overflow-hidden">
                    <img src={project.imageUrl} alt={project.title} width={400} height={176} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                  </div>
                ) : (
                  <div className={`w-full h-44 bg-gradient-to-br ${project.gradient || 'from-[#16C79A] to-[#0F3460]'} rounded-lg mb-4 relative overflow-hidden flex items-center justify-center`}>
                    <span className="text-white/80 text-3xl font-bold tracking-wider">{project.title.split(' ')[0]}</span>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                  </div>
                )}

                <h3 className="text-lg font-bold mb-2 group-hover:text-[#16C79A] transition-colors">{project.title}</h3>
                <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {(project.tech || []).map((tech, tidx) => (
                    <span key={tidx} className="px-3 py-1 bg-[#16C79A]/10 border border-[#16C79A]/20 rounded-full text-[#16C79A] text-xs font-semibold">{tech}</span>
                  ))}
                </div>

                <div className="flex gap-4 pt-4 border-t" style={{ borderColor: 'var(--border-card)' }}>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-[#16C79A] transition-colors" style={{ color: 'var(--text-secondary)' }}>
                      <Github size={16} /> Code
                    </a>
                  )}
                  {project.live && project.live !== '#' && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-[#16C79A] transition-colors ml-auto" style={{ color: 'var(--text-secondary)' }}>
                      <ExternalLink size={16} /> Voir live
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
