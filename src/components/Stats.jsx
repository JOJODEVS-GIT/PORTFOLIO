import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const statsData = [
  { number: 6, label: 'Projets Réalisés', suffix: '+' },
  { number: 8, label: 'Clients & Projets', suffix: '+' },
  { number: 2, label: 'Années Expérience', suffix: '+' },
  { number: 100, label: 'Satisfaction Client', suffix: '%' },
];

function CountUp({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = target / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += stepValue;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [target]);

  return count;
}

export default function Stats() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8"
        >
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text mb-2">
                <CountUp target={stat.number} />
                {stat.suffix}
              </div>
              <p className="text-gray-400 font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
