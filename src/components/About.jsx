import { motion } from 'framer-motion';
import { Github, MessageCircle, Mail } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

const fallbackParagraphs = [
  'Je suis Josué, développeur Full Stack basé à Cotonou 🇧🇯. Je crée des sites web modernes avec React et Next.js, des sites vitrine/e-commerce avec WordPress, et j\'automatise les process répétitifs avec Python.',
  'Passionné par la technologie et l\'innovation, je transforme des idées en projets concrets et fonctionnels. Mon objectif : fournir des solutions digitales de qualité, adaptées aux réalités locales africaines.',
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
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          À <span className="accent-gradient">propos</span> de moi
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Glow background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#16C79A] to-[#0F3460] rounded-3xl blur-2xl opacity-25 animate-pulse" />
              {/* Rotating border ring */}
              <div
                className="absolute -inset-1 rounded-3xl opacity-60"
                style={{
                  background: 'linear-gradient(135deg, #16C79A, #0F3460, #16C79A)',
                  animation: 'spin 8s linear infinite',
                }}
              />
              {/* Photo container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-[#16C79A]/30 shadow-2xl" style={{ background: 'var(--bg-card)' }}>
                <img
                  src={photoUrl}
                  alt="Josué Hounkanrin"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{p}</p>
            ))}

            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>{tagline}</p>

            <div className="pt-6 border-t border-[#16C79A]/20">
              <h3 className="text-lg font-semibold mb-4">Me retrouver :</h3>
              <div className="flex gap-4">
                {socialLinks.github && (
                  <a href={socialLinks.github} target="_blank" rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-[#16C79A]/20 transition-all glow-effect hover:bg-[#16C79A]/20"
                    style={{ background: 'var(--bg-card)' }} aria-label="GitHub">
                    <Github size={24} />
                  </a>
                )}
                {socialLinks.whatsapp && (
                  <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-[#16C79A]/20 transition-all glow-effect hover:bg-[#16C79A]/20"
                    style={{ background: 'var(--bg-card)' }} aria-label="WhatsApp">
                    <MessageCircle size={24} />
                  </a>
                )}
                {socialLinks.email && (
                  <a href={socialLinks.email.startsWith('mailto:') ? socialLinks.email : `mailto:${socialLinks.email}`}
                    className="p-3 rounded-lg border border-[#16C79A]/20 transition-all glow-effect hover:bg-[#16C79A]/20"
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
