import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconMap';
import { useSiteData } from '../context/SiteDataContext';

const fallbackSkills = [
  { name: 'React / Next.js', iconName: 'Sparkles' },
  { name: 'TypeScript', iconName: 'Code2' },
  { name: 'JavaScript', iconName: 'Zap' },
  { name: 'Python', iconName: 'Terminal' },
  { name: 'HTML / CSS', iconName: 'Layout' },
  { name: 'Tailwind CSS', iconName: 'Layers' },
  { name: 'Firebase / Firestore', iconName: 'Database' },
  { name: 'API REST', iconName: 'Server' },
  { name: 'Git / GitHub', iconName: 'GitBranch' },
  { name: 'CI/CD (GitHub Actions)', iconName: 'Rocket' },
  { name: 'React Native', iconName: 'Smartphone' },
  { name: 'Sécurité & SEO', iconName: 'Shield' },
  { name: 'PHP', iconName: 'FileCode' },
  { name: 'Laravel', iconName: 'Layers' },
  { name: 'SQL / Bases de données', iconName: 'Database' },
  { name: 'Bootstrap', iconName: 'Package' },
  { name: 'n8n / Automatisation', iconName: 'Bot' },
  { name: 'Vue.js', iconName: 'Monitor' },
];

export default function Skills() {
  const { skills } = useSiteData();
  const skillsData = skills.length ? skills : fallbackSkills;

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="section-heading">
          <span className="idx text-base sm:text-lg">05.</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">Compétences</h2>
          <span className="rule" />
        </motion.div>

        <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {skillsData.map((skill, idx) => {
            const IconComponent = getIcon(skill.iconName);
            return (
              <motion.div key={skill.id || idx} variants={itemVariants} className="card group flex flex-col items-center justify-center py-8">
                <IconComponent className="mb-4 sk-ic" size={36} />
                <p className="text-center text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{skill.name}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
