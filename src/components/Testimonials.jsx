import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

const fallbackTestimonials = [
  {
    id: 't1',
    name: 'Aline K.',
    role: 'Fondatrice · Boutique en ligne',
    quote: "Josué a livré mon site e-commerce en avance, propre et rapide. Il comprend le besoin et propose mieux. Je recommande les yeux fermés.",
    rating: 5,
  },
  {
    id: 't2',
    name: 'Marc D.',
    role: 'Gérant · PME à Cotonou',
    quote: "L'automatisation qu'il a mise en place nous fait gagner des heures chaque semaine. Sérieux, réactif et vraiment à l'écoute.",
    rating: 5,
  },
  {
    id: 't3',
    name: 'Fatima O.',
    role: 'Responsable communication',
    quote: "Un vrai professionnel. Le rendu final dépasse ce que j'imaginais, et le suivi après livraison est impeccable.",
    rating: 5,
  },
];

function Avatar({ name, avatarUrl }) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        width={44}
        height={44}
        className="w-11 h-11 rounded-full object-cover border"
        style={{ borderColor: 'var(--border-card)' }}
        loading="lazy"
      />
    );
  }
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div
      className="w-11 h-11 rounded-full flex items-center justify-center text-sm"
      style={{ background: 'var(--accent-glow)', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
    >
      {initials}
    </div>
  );
}

export default function Testimonials() {
  const { testimonials } = useSiteData();
  const data = testimonials?.length ? testimonials : fallbackTestimonials;

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const itemVariants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="section-heading !mb-4">
          <span className="idx text-base sm:text-lg">06.</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">Témoignages</h2>
          <span className="rule" />
        </motion.div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mb-16 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          Ce que disent celles et ceux avec qui j'ai travaillé.
        </motion.p>

        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {data.map((t) => (
            <motion.div key={t.id} variants={itemVariants} className="card flex flex-col gap-5">
              <Quote size={28} style={{ color: 'var(--accent)' }} className="opacity-80" />

              {t.rating ? (
                <div className="flex gap-1" aria-label={`Note ${t.rating} sur 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} style={{ color: i < t.rating ? 'var(--accent)' : 'var(--text-muted)' }} fill={i < t.rating ? 'currentColor' : 'none'} />
                  ))}
                </div>
              ) : null}

              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>“{t.quote}”</p>

              <div className="flex items-center gap-3 mt-auto pt-5 border-t" style={{ borderColor: 'var(--border-hair)' }}>
                <Avatar name={t.name} avatarUrl={t.avatarUrl} />
                <div className="min-w-0">
                  <p className="font-display font-semibold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                  <p className="text-xs truncate" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
