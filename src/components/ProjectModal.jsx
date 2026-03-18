import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gray-800 rounded-2xl max-w-2xl w-full border border-gray-700 overflow-hidden">
              {/* Header */}
              <div className={`h-64 ${project.image} relative`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-gray-900/80 rounded-lg hover:bg-gray-900 transition-colors z-10"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
                <p className="text-gray-400 mb-6 text-lg">{project.description}</p>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">Stack Technologique</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-emerald-300 text-sm font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-700">
                  <div>
                    <h4 className="font-semibold text-gray-300 mb-2">Fonctionnalités</h4>
                    <ul className="text-gray-400 text-sm space-y-2">
                      <li>✓ Interface utilisateur responsive</li>
                      <li>✓ Performance optimisée</li>
                      <li>✓ Design moderne</li>
                      <li>✓ Animations fluides</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300 mb-2">Défis Résolus</h4>
                    <ul className="text-gray-400 text-sm space-y-2">
                      <li>✓ Architecture scalable</li>
                      <li>✓ État management</li>
                      <li>✓ SEO optimization</li>
                      <li>✓ Cross-browser compatibility</li>
                    </ul>
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors font-semibold"
                  >
                    <Github size={20} />
                    Code Source
                  </a>
                  <a
                    href={project.live}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-lg hover:shadow-emerald-500/50 rounded-lg transition-all font-semibold"
                  >
                    <ExternalLink size={20} />
                    Voir le Projet
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
