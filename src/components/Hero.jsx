import { ArrowRight, ExternalLink, Download } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function Hero() {
  const { hero } = useSiteData();

  const badge = hero?.badge || 'Développeur full-stack & automatisation · Cotonou 🇧🇯';
  const title = hero?.title || 'Salut, je suis';
  const name = hero?.name || 'Josué';
  const subtitle = hero?.subtitle || "Des sites qui convertissent. Des tâches qui s'automatisent.";
  const description = hero?.description || 'Je crée des sites web et applications modernes, rapides et fiables — pour les entreprises d\'ici comme d\'ailleurs. Et je vais plus loin : j\'automatise vos tâches répétitives pour vous faire gagner des heures chaque semaine.';
  const ctaPrimaryText = hero?.ctaPrimaryText || 'Voir mes projets';
  const ctaPrimaryLink = hero?.ctaPrimaryLink || '#projects';
  const ctaSecondaryText = hero?.ctaSecondaryText || 'Discutons de votre projet';
  const ctaSecondaryLink = hero?.ctaSecondaryLink || '#contact';

  const isExternal = ctaSecondaryLink.startsWith('http');

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative pt-24 overflow-hidden"
      style={{ background: 'var(--hero-gradient)' }}
    >
      {/* Atmosphère : halos diffus raffinés */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-32 -right-40 w-[42rem] h-[42rem] rounded-full blur-[130px]"
          style={{ background: 'var(--accent-glow)' }}
        />
        <div
          className="absolute bottom-[-10rem] left-[15%] w-[30rem] h-[30rem] rounded-full blur-[140px]"
          style={{ background: 'rgba(15,52,96,0.12)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <p className="overline mb-6 animate-hero-item" style={{ animationDelay: '0.15s' }}>
          {badge}
        </p>

        <h1 className="animate-hero-item" style={{ animationDelay: '0.3s' }}>
          <span
            className="block font-display text-2xl sm:text-3xl font-medium mb-3"
            style={{ color: 'var(--text-secondary)' }}
          >
            {title}
          </span>
          <span className="block accent-gradient font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.9]">
            {name}.
          </span>
        </h1>

        <p
          className="mt-7 font-display text-3xl sm:text-4xl lg:text-5xl font-medium max-w-3xl leading-[1.08] animate-hero-item"
          style={{ color: 'var(--text-primary)', opacity: 0.72, animationDelay: '0.5s' }}
        >
          {subtitle}
        </p>

        <p
          className="mt-7 text-base sm:text-lg max-w-xl leading-relaxed animate-hero-item"
          style={{ color: 'var(--text-secondary)', animationDelay: '0.7s' }}
        >
          {description}
        </p>

        <div
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-hero-item"
          style={{ animationDelay: '0.9s' }}
        >
          <a href={ctaPrimaryLink} className="btn-primary group">
            {ctaPrimaryText}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={ctaSecondaryLink}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="btn-secondary group"
          >
            {ctaSecondaryText}
            <ExternalLink size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
          </a>
          <div
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: 'var(--text-muted)' }}
          >
            <Download size={16} />
            <span>Télécharger mon CV :</span>
            <a href="/cv-josue-hounkanrin.pdf" download
               className="underline underline-offset-2 transition-colors hover:text-[color:var(--accent)]">FR</a>
            <span aria-hidden="true" className="opacity-50">·</span>
            <a href="/cv-josue-hounkanrin-en.pdf" download
               className="underline underline-offset-2 transition-colors hover:text-[color:var(--accent)]">EN</a>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-hero-item"
        style={{ animationDelay: '1.3s' }}
        aria-hidden="true"
      >
        <span className="overline" style={{ fontSize: '0.6rem', letterSpacing: '0.3em' }}>Scroll</span>
        <div className="w-5 h-9 rounded-full border flex items-start justify-center p-1.5" style={{ borderColor: 'var(--border-card)' }}>
          <div className="w-1 h-1.5 rounded-full animate-bounce-slow" style={{ background: 'var(--accent)' }} />
        </div>
      </div>
    </section>
  );
}
