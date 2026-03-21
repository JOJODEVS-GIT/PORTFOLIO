import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';

const VISIBLE_COUNT = 6;

const fallbackProjects = [
  { id: 1, title: 'JOJO E-Commerce Mastery', description: 'Plateforme e-commerce complète avec panier, paiement et gestion produits.', imageUrl: '/images/jojo-ecommerce.webp', category: 'React', tech: ['TypeScript', 'React', 'Vite'], github: 'https://github.com/JOJODEVS-GIT/JOJO-ECOMMERCE-MASTERY', live: 'https://jojo-ecommerce-mastery.vercel.app' },
  { id: 2, title: 'Bloom Event', description: 'Plateforme de réservation d\'événements au Bénin avec recherche et catégories.', imageUrl: '/images/bloom-event.webp', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/BLOOM-EVENT', live: 'https://jojodevs-git.github.io/BLOOM-EVENT/' },
  { id: 3, title: 'MODALLAS', description: 'Site vitrine de mode africaine avec catalogue et panier intégré.', imageUrl: '/images/modallas.webp', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/MODALLAS', live: 'https://jojodevs-git.github.io/MODALLAS/' },
  { id: 4, title: 'Afro Flash Bénin', description: 'Site vitrine d\'actualités et de services au Bénin avec recherche d\'articles.', imageUrl: '/images/afro-flash-benin.webp', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/AFRO-FLASH-BENIN-SITE', live: 'https://jojodevs-git.github.io/AFRO-FLASH-BENIN-SITE/' },
  { id: 5, title: 'Reality Prompt Engine', description: 'Générateur de prompts IA avec interface intuitive et configuration avancée.', imageUrl: '/images/reality-prompt.webp', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/REALITY-PROMPT-ENGINE', live: 'https://jojodevs-git.github.io/REALITY-PROMPT-ENGINE/' },
  { id: 6, title: 'Mon Produit', description: 'Dashboard de gestion de produits avec statistiques, ROI et suivi des bénéfices.', imageUrl: '/images/mon-produit.webp', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/MON-PRODUIT', live: 'https://jojodevs-git.github.io/MON-PRODUIT/' },
  { id: 7, title: 'QCM JavaScript', description: 'Quiz interactif JavaScript — 70 questions, 7 thèmes, timer 20s par question.', imageUrl: '/images/qcm-javascript.webp', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/QCM-JAVASCRIPT', live: 'https://jojodevs-git.github.io/QCM-JAVASCRIPT/' },
  { id: 8, title: 'Suivi Chauffeur', description: 'Application de suivi de paiements chauffeurs en temps réel avec historique.', imageUrl: '/images/suivi-chauffeur.webp', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/SUIVI-CHAUFFEUR', live: 'https://jojodevs-git.github.io/SUIVI-CHAUFFEUR/' },
  { id: 9, title: 'Générateur QR Codes', description: 'Outil desktop de génération de QR codes avec interface graphique Tkinter.', gradient: 'from-purple-600 to-[#0F3460]', category: 'Python', tech: ['Python', 'Tkinter', 'qrcode'], github: 'https://github.com/JOJODEVS-GIT/GENERATEUR-QR-CODES' },
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [showAll, setShowAll] = useState(false);
  // Always use local data — projects have local screenshot images
  const projectsData = fallbackProjects;

  const categories = ['Tous', ...new Set(projectsData.map((p) => p.category))];
  const allFiltered = selectedCategory === 'Tous' ? projectsData : projectsData.filter((p) => p.category === selectedCategory);
  const filteredProjects = showAll ? allFiltered : allFiltered.slice(0, VISIBLE_COUNT);
  const hasMore = allFiltered.length > VISIBLE_COUNT;

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
              onClick={() => { setSelectedCategory(category); setShowAll(false); }}
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

        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #16C79A, var(--accent-dark))', boxShadow: '0 4px 15px rgba(22,199,154,0.3)' }}
            >
              {showAll ? <>Voir moins <ChevronUp size={18} /></> : <>Voir plus <ChevronDown size={18} /></>}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
