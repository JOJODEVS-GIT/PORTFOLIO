import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Jean Dupont',
      role: 'CEO, Tech Startup',
      image: 'bg-gradient-to-br from-blue-500 to-purple-500',
      text: 'Excellent développeur, très professionnel et créatif. Le projet a été livré à temps et dépassé nos attentes.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Marie Martin',
      role: 'Product Manager, Digital Agency',
      image: 'bg-gradient-to-br from-pink-500 to-rose-500',
      text: 'Un vrai plaisir de travailler ensemble. Toujours à l\'écoute des feedback et propose des solutions innovantes.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Pierre Bernard',
      role: 'Freelancer, Web Developer',
      image: 'bg-gradient-to-br from-green-500 to-emerald-500',
      text: 'Très bon collaborateur. Code bien structuré et documentation claire. Je recommande vivement!',
      rating: 5,
    },
    {
      id: 4,
      name: 'Sophie Laurent',
      role: 'Design Lead, Creative Studio',
      image: 'bg-gradient-to-br from-orange-500 to-yellow-500',
      text: 'Parfait pour transformer les designs en code. Attentif aux détails et soucieux de la qualité.',
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          Avis <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">Clients</span>
        </motion.h2>

        <div className="relative">
          {/* Testimonials Carousel */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto"
          >
            <div className="card text-center">
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className={`w-16 h-16 rounded-full ${testimonials[currentIndex].image} ring-4 ring-violet-500/30`}></div>
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-xl text-gray-300 mb-6 italic">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author Info */}
              <div>
                <h3 className="text-lg font-bold">{testimonials[currentIndex].name}</h3>
                <p className="text-violet-400 text-sm">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-lg bg-gray-800 border border-gray-700 hover:border-violet-500 hover:bg-violet-500/10 transition-all glow-effect"
              aria-label="Avis précédent"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'bg-gradient-to-r from-violet-500 to-cyan-500 w-8'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Aller à l'avis ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-lg bg-gray-800 border border-gray-700 hover:border-violet-500 hover:bg-violet-500/10 transition-all glow-effect"
              aria-label="Avis suivant"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
