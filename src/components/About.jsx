import { motion } from 'framer-motion';
import { Github, MessageCircle, Mail } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

const fallbackParagraphs = [
  'Je suis Josué, développeur full-stack basé à Cotonou 🇧🇯. J\'aide les entreprises et entrepreneurs à exister en ligne avec des sites et applications modernes — React, Next.js — et à travailler plus intelligemment grâce à l\'automatisation Python.',
  'Ce qui me distingue : je ne m\'arrête pas au design. Je livre un produit qui marche, rapidement, et je reste disponible après la mise en ligne. Des solutions concrètes, adaptées à votre budget et à votre réalité — que vous soyez une PME à Cotonou ou une équipe à l\'international.',
];

const fallbackTagline = '📍 Cotonou, Bénin \u2022 🎯 Projets avec impact \u2022 💡 Full Stack & Automatisation';

export default function About() {
  const { about } = useSiteData();

  const photoUrl = about?.photoUrl || '/images/1.webp';
  const paragraphs = about?.paragraphs?.length ? about.paragraphs : fallbackParagraphs;
  const tagline = about?.tagline || fallbackTagline;
  const socialLinks = about?.socialLinks || {
    github: 'https://github.com/JOJODEVS-GIT',
    whatsapp: 'https://wa.me/2290160293043',
    email: 'mailto:jojohkdev@gmail.com',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-accent)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-heading"
        >
          <span className="idx text-base sm:text-lg">01.</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">À propos</h2>
          <span className="rule" />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="flex justify-center md:justify-start">
            <div className="relative w-72 h-80 md:w-80 md:h-96 group">
              {/* Cadre décalé accent */}
              <div
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3"
                style={{ borderColor: 'var(--accent)' }}
              />
              {/* Photo */}
              <div
                className="relative w-full h-full rounded-2xl overflow-hidden border"
                style={{ borderColor: 'var(--border-card)', background: 'var(--bg-card)' }}
              >
                <img
                  src={photoUrl}
                  alt="Josué Hounkanrin"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Teinte accent qui s'efface au survol (signature) */}
                <div className="absolute inset-0 bg-[color:var(--accent-a25)] group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{p}</p>
            ))}

            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>{tagline}</p>

            <div className="pt-6 border-t border-[color:var(--accent-a20)]">
              <h3 className="text-lg font-semibold mb-4">Me retrouver :</h3>
              <div className="flex gap-4">
                {socialLinks.github && (
                  <a href={socialLinks.github} target="_blank" rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-[color:var(--accent-a20)] transition-all glow-effect hover:bg-[color:var(--accent-a20)]"
                    style={{ background: 'var(--bg-card)' }} aria-label="GitHub">
                    <Github size={24} />
                  </a>
                )}
                {socialLinks.whatsapp && (
                  <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-[color:var(--accent-a20)] transition-all glow-effect hover:bg-[color:var(--accent-a20)]"
                    style={{ background: 'var(--bg-card)' }} aria-label="WhatsApp">
                    <MessageCircle size={24} />
                  </a>
                )}
                {socialLinks.email && (
                  <a href={socialLinks.email.startsWith('mailto:') ? socialLinks.email : `mailto:${socialLinks.email}`}
                    className="p-3 rounded-lg border border-[color:var(--accent-a20)] transition-all glow-effect hover:bg-[color:var(--accent-a20)]"
                    style={{ background: 'var(--bg-card)' }} aria-label="Email">
                    <Mail size={24} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
