import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { useSiteData } from '../context/SiteDataContext';

const PROJECTS_PER_PAGE = 6;
const SWIPE_THRESHOLD = 50;

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

function ProjectCard({ project, idx }) {
  return (
    <motion.div
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
  );
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef(null);
  const dragX = useMotionValue(0);

  // Always use local data — projects have local screenshot images
  const projectsData = fallbackProjects;

  const categories = ['Tous', ...new Set(projectsData.map((p) => p.category))];
  const allFiltered = selectedCategory === 'Tous' ? projectsData : projectsData.filter((p) => p.category === selectedCategory);
  const totalPages = Math.ceil(allFiltered.length / PROJECTS_PER_PAGE);

  // Split projects into pages of 6
  const pages = [];
  for (let i = 0; i < allFiltered.length; i += PROJECTS_PER_PAGE) {
    pages.push(allFiltered.slice(i, i + PROJECTS_PER_PAGE));
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(0);
  };

  const paginate = (direction) => {
    setCurrentPage((prev) => {
      if (direction === 1) return Math.min(prev + 1, totalPages - 1);
      return Math.max(prev - 1, 0);
    });
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -SWIPE_THRESHOLD && currentPage < totalPages - 1) {
      paginate(1);
    } else if (info.offset.x > SWIPE_THRESHOLD && currentPage > 0) {
      paginate(-1);
    }
  };

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
              onClick={() => handleCategoryChange(category)}
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

        {/* Carousel container */}
        <div className="relative">
          {/* Arrow left */}
          {totalPages > 1 && currentPage > 0 && (
            <button
              onClick={() => paginate(-1)}
              className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #16C79A, var(--accent-dark))' }}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Arrow right */}
          {totalPages > 1 && currentPage < totalPages - 1 && (
            <button
              onClick={() => paginate(1)}
              className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #16C79A, var(--accent-dark))' }}
            >
              <ChevronRight size={20} />
            </button>
          )}

          <div ref={containerRef} className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${currentPage}`}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                drag={totalPages > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                style={{ x: dragX, cursor: totalPages > 1 ? 'grab' : 'default' }}
              >
                {pages[currentPage]?.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} idx={idx} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination dots */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            {pages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  background: idx === currentPage ? '#16C79A' : 'var(--border-card)',
                  transform: idx === currentPage ? 'scale(1.3)' : 'scale(1)',
                  boxShadow: idx === currentPage ? '0 0 8px rgba(22,199,154,0.5)' : 'none',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
