import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';

const PROJECTS_PER_PAGE = 6;
const SWIPE_THRESHOLD = 50;

export const fallbackProjects = [
  { id: 1, title: 'JOJO E-Commerce Mastery', description: 'Plateforme e-commerce complète avec panier, paiement et gestion produits.', longDescription: "Une plateforme e-commerce complète pensée pour les créateurs et commerçants. Gestion du catalogue, panier, tunnel de paiement et back-office de suivi des ventes. Interface rapide et responsive construite avec React et Vite.", role: 'Conception & développement full stack', year: '2025', imageUrl: '/images/jojo-ecommerce.webp', category: 'React', tech: ['TypeScript', 'React', 'Vite'], github: 'https://github.com/JOJODEVS-GIT/JOJO-ECOMMERCE-MASTERY', live: 'https://jojo-ecommerce-mastery.vercel.app' },
  { id: 2, title: 'Bloom Event', description: 'Plateforme de réservation d\'événements au Bénin avec recherche et catégories.', longDescription: "Plateforme de découverte et de réservation d'événements au Bénin. Recherche par catégories, fiches événement détaillées et parcours de réservation fluide. Design vitrine soigné en Bootstrap.", role: 'Développement front-end', year: '2024', imageUrl: '/images/bloom-event.webp', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/BLOOM-EVENT', live: 'https://jojodevs-git.github.io/BLOOM-EVENT/' },
  { id: 3, title: 'MODALLAS', description: 'Site vitrine de mode africaine avec catalogue et panier intégré.', longDescription: "Site vitrine de mode africaine mettant en valeur les collections avec un catalogue visuel et un panier intégré. Une identité chaleureuse au service de la marque.", role: 'Design & intégration', year: '2024', imageUrl: '/images/modallas.webp', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/MODALLAS', live: 'https://jojodevs-git.github.io/MODALLAS/' },
  { id: 4, title: 'Afro Flash Bénin', description: 'Site vitrine d\'actualités et de services au Bénin avec recherche d\'articles.', longDescription: "Portail d'actualités et de services au Bénin. Recherche d'articles, mise en avant des contenus et navigation claire pour une lecture agréable sur mobile comme sur desktop.", role: 'Développement front-end', year: '2024', imageUrl: '/images/afro-flash-benin.webp', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/AFRO-FLASH-BENIN-SITE', live: 'https://jojodevs-git.github.io/AFRO-FLASH-BENIN-SITE/' },
  { id: 5, title: 'Reality Prompt Engine', description: 'Générateur de prompts IA avec interface intuitive et configuration avancée.', longDescription: "Outil de génération de prompts IA avec une interface intuitive et des options de configuration avancées. Pensé pour accélérer le travail des créateurs de contenu et des développeurs.", role: 'Conception & développement', year: '2024', imageUrl: '/images/reality-prompt.webp', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/REALITY-PROMPT-ENGINE', live: 'https://jojodevs-git.github.io/REALITY-PROMPT-ENGINE/' },
  { id: 6, title: 'Mon Produit', description: 'Dashboard de gestion de produits avec statistiques, ROI et suivi des bénéfices.', longDescription: "Tableau de bord de gestion de produits avec statistiques, calcul de ROI et suivi des bénéfices. Un outil concret pour piloter une activité au quotidien.", role: 'Développement front-end', year: '2024', imageUrl: '/images/mon-produit.webp', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/MON-PRODUIT', live: 'https://jojodevs-git.github.io/MON-PRODUIT/' },
  { id: 7, title: 'QCM JavaScript', description: 'Quiz interactif JavaScript — 70 questions, 7 thèmes, timer 20s par question.', longDescription: "Quiz interactif pour s'entraîner en JavaScript : 70 questions réparties en 7 thèmes, timer de 20s par question et statistiques de résultats. Ludique et pédagogique.", role: 'Conception & développement', year: '2024', imageUrl: '/images/qcm-javascript.webp', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/QCM-JAVASCRIPT', live: 'https://jojodevs-git.github.io/QCM-JAVASCRIPT/' },
  { id: 8, title: 'Suivi Chauffeur', description: 'Application de suivi de paiements chauffeurs en temps réel avec historique.', longDescription: "Application de suivi des paiements chauffeurs en temps réel, avec historique et vue d'ensemble. Conçue pour simplifier la gestion au jour le jour.", role: 'Développement front-end', year: '2024', imageUrl: '/images/suivi-chauffeur.webp', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/SUIVI-CHAUFFEUR', live: 'https://jojodevs-git.github.io/SUIVI-CHAUFFEUR/' },
  { id: 9, title: 'Générateur QR Codes', description: 'Outil desktop de génération de QR codes avec interface graphique Tkinter.', longDescription: "Application desktop de génération de QR codes avec une interface graphique Tkinter. Un utilitaire simple et efficace développé en Python.", role: 'Développement Python', year: '2023', gradient: 'from-purple-600 to-[#0F3460]', category: 'Python', tech: ['Python', 'Tkinter', 'qrcode'], github: 'https://github.com/JOJODEVS-GIT/GENERATEUR-QR-CODES' },
];

/** Clé de rapprochement : nom du repo GitHub, sinon titre normalisé */
const repoKey = (url) => (url || '').toLowerCase().replace(/\/+$/, '').split('/').pop();
const normTitle = (t) => (t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');

/** Complète un projet Firestore avec les valeurs locales (image, description longue…) là où Firestore est vide */
function mergeProject(fs, local) {
  if (!local) return fs;
  const merged = { ...local };
  for (const [k, v] of Object.entries(fs)) {
    const empty = v === '' || v == null || (Array.isArray(v) && v.length === 0);
    if (!empty) merged[k] = v;
  }
  merged.id = fs.id;
  return merged;
}

/** Source de vérité des projets : Firestore (admin) complété par le fallback local */
export function resolveProjects(firestoreProjects) {
  if (!firestoreProjects?.length) return fallbackProjects;
  const byRepo = {};
  const byTitle = {};
  for (const p of fallbackProjects) {
    if (p.github) byRepo[repoKey(p.github)] = p;
    byTitle[normTitle(p.title)] = p;
  }
  return firestoreProjects.map((fs) => {
    const local = (fs.github && byRepo[repoKey(fs.github)]) || byTitle[normTitle(fs.title)] || null;
    return mergeProject(fs, local);
  });
}

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

      <Link to={`/projet/${project.id}`} className="block">
        <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-[#16C79A] transition-colors flex items-center gap-1.5">
          {project.title}
          <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }} />
        </h3>
      </Link>
      <p className="text-sm mb-5 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {(project.tech || []).map((tech, tidx) => (
          <span key={tidx} className="px-2.5 py-1 rounded text-[0.7rem]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', background: 'var(--accent-glow)' }}>{tech}</span>
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

  // Projets pilotés depuis l'admin (Firestore), complétés par les visuels/descriptions locaux
  const { projects } = useSiteData();
  const projectsData = resolveProjects(projects);

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
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="section-heading">
          <span className="idx text-base sm:text-lg">04.</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">Projets</h2>
          <span className="rule" />
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className="px-5 py-2 rounded-md text-sm transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.02em',
                  background: active ? 'var(--accent-glow)' : 'transparent',
                  border: `1px solid ${active ? 'var(--accent)' : 'var(--border-card)'}`,
                  color: active ? 'var(--accent)' : 'var(--text-secondary)',
                }}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Carousel container */}
        <div className="relative md:px-16">
          {/* Arrow left */}
          {totalPages > 1 && currentPage > 0 && (
            <button
              onClick={() => paginate(-1)}
              aria-label="Projets précédents"
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full transition-all hover:-translate-x-0.5"
              style={{ border: '1px solid var(--border-card)', color: 'var(--accent)', background: 'var(--bg-card)' }}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Arrow right */}
          {totalPages > 1 && currentPage < totalPages - 1 && (
            <button
              onClick={() => paginate(1)}
              aria-label="Projets suivants"
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full transition-all hover:translate-x-0.5"
              style={{ border: '1px solid var(--border-card)', color: 'var(--accent)', background: 'var(--bg-card)' }}
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
