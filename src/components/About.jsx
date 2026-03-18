import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          À <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">propos</span> de moi
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Image */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-2xl opacity-30"></div>
              <div className="relative w-full h-full bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
                <img
                  src="/images/1.png"
                  alt="Josué Hounkanrin"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              Je suis Josué, développeur web WordPress et marketeur digital avec 1-2 ans d'expérience pratique intensive. Je crée des sites web professionnels, efficaces et adaptés aux réalités locales africaines.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed">
              Ma passion: transformer des idées simples en projets concrets et fonctionnels. Je maîtrise WordPress, WooCommerce, JavaScript, et les outils marketing digital. Actuellement en développement de compétences front-end & back-end pour des solutions toujours plus solides.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              📍 Basé au Bénin • 🎯 Projets avec impact • 💡 Solutions no-code & code
            </p>

            <div className="pt-6 border-t border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Me contacter:</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/josue-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-lg hover:bg-emerald-500/20 hover:border-emerald-500/50 border border-gray-700 transition-all glow-effect"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/josue-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-lg hover:bg-emerald-500/20 hover:border-emerald-500/50 border border-gray-700 transition-all glow-effect"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:josue.dev@gmail.com"
                  className="p-3 bg-gray-800 rounded-lg hover:bg-emerald-500/20 hover:border-emerald-500/50 border border-gray-700 transition-all glow-effect"
                  aria-label="Email"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
