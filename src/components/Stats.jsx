import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useSiteData } from '../context/SiteDataContext';

const fallbackStats = [
  { number: 10, label: 'Projets Réalisés', suffix: '+' },
  { number: 12, label: 'Clients Satisfaits', suffix: '+' },
  { number: 2, label: 'Années Expérience', suffix: '+' },
  { number: 100, label: 'Satisfaction Client', suffix: '%' },
];

function CountUp({ target }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

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
  }, [target, hasStarted]);

  return <span ref={ref}>{count}</span>;
}

export default function Stats() {
  const { stats } = useSiteData();
  const statsData = stats.length ? stats : fallbackStats;

  return (
    <section id="stats" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {statsData.map((stat, idx) => (
            <motion.div
              key={stat.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold accent-gradient mb-2">
                <CountUp target={stat.number} />
                {stat.suffix}
              </div>
              <p className="font-semibold text-sm" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
