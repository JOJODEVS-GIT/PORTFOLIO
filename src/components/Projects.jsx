import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'ESC – École Supérieure de Cosmétique',
      description: 'Site vitrine + pages formations pour une école professionnelle avec inscriptions, CTA et branding.',
      image: 'bg-gradient-to-br from-violet-500 to-purple-500',
      category: 'WordPress',
      tech: ['WordPress', 'Elementor', 'Fluent Forms', 'SEO'],
      github: '',
      live: 'https://esc-cosmetique.com',
    },
    {
      id: 2,
      title: 'CLASSICO PARTY 2 – Billetterie',
      description: 'Plateforme de vente de tickets pour événement avec gestion des commandes et paiements.',
      image: 'bg-gradient-to-br from-cyan-500 to-blue-500',
      category: 'WordPress',
      tech: ['WordPress', 'WooCommerce', 'Paiements', 'Admin'],
      github: '',
      live: '#',
    },
    {
      id: 3,
      title: 'BJ Variety Shop',
      description: 'E-commerce multi-catégories (mode, cuisine, accessoires) optimisé pour conversions.',
      image: 'bg-gradient-to-br from-pink-500 to-rose-500',
      category: 'WordPress',
      tech: ['WordPress', 'Facebook Marketing', 'WhatsApp', 'WooCommerce'],
      github: '',
      live: '#',
    },
    {
      id: 4,
      title: 'Dashboard ROI Produits',
      description: 'Outil interactif de suivi de rentabilité produits avec calculs automatisés et export CSV.',
      image: 'bg-gradient-to-br from-orange-500 to-yellow-500',
      category: 'JavaScript',
      tech: ['JavaScript', 'HTML', 'CSS', 'LocalStorage'],
      github: 'https://github.com/josue-dev/roi-dashboard',
      live: '#',
    },
    {
      id: 5,
      title: 'Bulletin de Paie Automatisé',
      description: 'Modèle Excel avancé avec calculs automatisés, formules complexes et alertes RH.',
      image: 'bg-gradient-to-br from-green-500 to-emerald-500',
      category: 'Excel',
      tech: ['Excel Avancé', 'Formules', 'Automatisation', 'VBA'],
      github: '',
      live: '#',
    },
    {
      id: 6,
      title: 'Bot Telegram – Architecture Logique',
      description: 'Refonte de la logique et UX d\'un bot Telegram pour meilleure expérience utilisateur.',
      image: 'bg-gradient-to-br from-indigo-500 to-purple-500',
      category: 'JavaScript',
      tech: ['JavaScript', 'Telegram API', 'Backend', 'UX'],
      github: '',
      live: '#',
    },
  ];

  const categories = ['Tous', 'WordPress', 'JavaScript', 'Excel'];
  const filteredProjects = selectedCategory === 'Tous'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          Mes <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Projets</span>
        </motion.h2>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                selectedCategory === category
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onClick={() => setSelectedProject(project)}
              className="card group overflow-hidden cursor-pointer"
            >
              {/* Project Image */}
              <div className={`w-full h-48 ${project.image} rounded-lg mb-4 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300"></div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-violet-300 text-xs font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 pt-4 border-t border-gray-700">
                <a
                  href={project.github}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-violet-400 transition-colors"
                >
                  <Github size={16} />
                  Code
                </a>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors ml-auto"
                >
                  <ExternalLink size={16} />
                  Détails
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">Aucun projet dans cette catégorie</p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
