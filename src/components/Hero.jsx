import { ArrowRight, ExternalLink } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function Hero() {
  const { hero } = useSiteData();

  const badge = hero?.badge || 'Bienvenue 👋';
  const title = hero?.title || 'Salut, je suis';
  const name = hero?.name || 'Josué';
  const subtitle = hero?.subtitle || 'Développeur Web Full Stack & Automatisation';
  const description = hero?.description || 'Basé à Cotonou 🇧🇯, je transforme vos idées en solutions digitales performantes — sites web, applications et automatisations sur mesure.';
  const ctaPrimaryText = hero?.ctaPrimaryText || 'Voir mes projets';
  const ctaPrimaryLink = hero?.ctaPrimaryLink || '#projects';
  const ctaSecondaryText = hero?.ctaSecondaryText || 'Mon GitHub';
  const ctaSecondaryLink = hero?.ctaSecondaryLink || 'https://github.com/JOJODEVS-GIT';

  const isExternal = ctaSecondaryLink.startsWith('http');

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden"
      style={{ background: 'var(--hero-gradient)' }}
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 left-10 w-72 h-72 bg-[#16C79A]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-72 h-72 rounded-full blur-3xl" style={{ background: 'rgba(15,52,96,0.3)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6 animate-hero-item" style={{ animationDelay: '0.3s' }}>
          <span className="inline-block px-4 py-2 bg-[#16C79A]/10 border border-[#16C79A]/30 rounded-full text-[#16C79A] text-sm font-semibold">
            {badge}
          </span>
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}{' '}
          <span className="accent-gradient">{name}</span>
        </h1>

        <p
          className="text-lg sm:text-xl mb-4 max-w-3xl mx-auto animate-hero-item"
          style={{ color: 'var(--text-secondary)', animationDelay: '0.7s' }}
        >
          <span className="text-[#16C79A] font-semibold">{subtitle}</span>
        </p>

        <p
          className="text-base sm:text-lg mb-8 max-w-3xl mx-auto leading-relaxed animate-hero-item"
          style={{ color: 'var(--text-secondary)', animationDelay: '0.9s' }}
        >
          {description}
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-hero-item"
          style={{ animationDelay: '1.1s' }}
        >
          <a href={ctaPrimaryLink} className="btn-primary flex items-center gap-2 group">
            {ctaPrimaryText}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={ctaSecondaryLink}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="btn-secondary flex items-center gap-2"
          >
            {ctaSecondaryText}
            <ExternalLink size={20} />
          </a>
        </div>

        <div className="mt-16 animate-bounce-slow" aria-hidden="true">
          <div className="flex justify-center">
            <div className="w-6 h-10 border-2 border-[#16C79A]/40 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-[#16C79A] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
