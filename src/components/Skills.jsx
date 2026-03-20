import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconMap';
import { useSiteData } from '../context/SiteDataContext';

const fallbackSkills = [
  { name: 'React / Next.js', iconName: 'Sparkles', color: 'text-[#16C79A]' },
  { name: 'WordPress', iconName: 'Globe', color: 'text-blue-400' },
  { name: 'Python', iconName: 'Terminal', color: 'text-yellow-400' },
  { name: 'TypeScript', iconName: 'Code2', color: 'text-blue-300' },
  { name: 'JavaScript', iconName: 'Zap', color: 'text-yellow-300' },
  { name: 'HTML / CSS', iconName: 'Layout', color: 'text-orange-400' },
  { name: 'Tailwind / Bootstrap', iconName: 'Layers', color: 'text-cyan-400' },
  { name: 'Figma (UI/UX)', iconName: 'Palette', color: 'text-pink-400' },
  { name: 'Git / GitHub', iconName: 'GitBranch', color: 'text-orange-500' },
  { name: 'SEO / Lighthouse', iconName: 'Search', color: 'text-green-400' },
];

export default function Skills() {
  const { skills } = useSiteData();
  const skillsData = skills.length ? skills : fallbackSkills;

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center">
          Compétences <span className="accent-gradient">Techniques</span>
        </motion.h2>

        <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {skillsData.map((skill, idx) => {
            const IconComponent = getIcon(skill.iconName);
            return (
              <motion.div key={skill.id || idx} variants={itemVariants} className="card flex flex-col items-center justify-center py-8 hover:scale-105">
                <IconComponent className={`${skill.color} mb-3`} size={40} />
                <p className="text-center font-semibold text-sm" style={{ color: 'var(--text-secondary)' }}>{skill.name}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
