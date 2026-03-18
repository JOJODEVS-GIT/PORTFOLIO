import { motion } from 'framer-motion';
import {
  Code2,
  GitBranch,
  Layers,
  Zap,
  Layout,
  Search,
  BarChart3,
  MessageSquare,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react';

export default function Skills() {
  const skills = [
    { name: 'WordPress', icon: Code2, color: 'text-blue-400' },
    { name: 'WooCommerce', icon: ShoppingCart, color: 'text-green-400' },
    { name: 'JavaScript', icon: Zap, color: 'text-yellow-400' },
    { name: 'HTML/CSS', icon: Layout, color: 'text-orange-400' },
    { name: 'Elementor', icon: Layers, color: 'text-violet-400' },
    { name: 'Facebook Ads', icon: TrendingUp, color: 'text-blue-500' },
    { name: 'SEO', icon: Search, color: 'text-green-500' },
    { name: 'Excel Avancé', icon: BarChart3, color: 'text-emerald-400' },
    { name: 'WhatsApp Business', icon: MessageSquare, color: 'text-green-600' },
    { name: 'Git', icon: GitBranch, color: 'text-orange-600' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          Compétences <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Techniques</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill, idx) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="card flex flex-col items-center justify-center py-8 hover:scale-110"
              >
                <IconComponent className={`${skill.color} mb-3 transition-transform group-hover:scale-125`} size={40} />
                <p className="text-center font-semibold text-gray-300 text-sm">{skill.name}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
