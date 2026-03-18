import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden bg-gray-950"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/2 animate-pulse"></div>
      </div>

      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 text-sm font-semibold">
            Bienvenue 👋
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Salut, je suis{' '}
          <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
            Josué
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Développeur Web WordPress & Marketeur Digital basé au Bénin. Je conçois des sites web clairs, efficaces et orientés résultats. Transformez vos idées en projets concrets et fonctionnels.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="btn-primary flex items-center gap-2 group">
            Voir mes projets
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="btn-secondary flex items-center gap-2">
            Mon GitHub
            <ExternalLink size={20} />
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16"
        >
          <div className="flex justify-center">
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-gradient-to-b from-violet-500 to-transparent rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
