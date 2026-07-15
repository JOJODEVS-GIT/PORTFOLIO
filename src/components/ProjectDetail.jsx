import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { resolveProjects } from './Projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects, site } = useSiteData();

  const data = resolveProjects(projects);
  const project = data.find((p) => String(p.id) === String(id));

  const logoText = site?.logoText || 'JOJO';
  const logoDot = site?.logoDot || ".DEV's";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--hero-gradient)', color: 'var(--text-primary)' }}>
      {/* Barre supérieure */}
      <header className="sticky top-0 z-40 backdrop-blur border-b" style={{ backgroundColor: 'var(--nav-bg)', borderColor: 'var(--border-hair)' }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-display font-semibold tracking-tight">
            <span style={{ color: 'var(--text-primary)' }}>{logoText}</span>
            <span className="text-[#16C79A]">{logoDot}</span>
          </Link>
          <Link to="/#projects" className="nav-link flex items-center gap-2">
            <ArrowLeft size={15} /> Retour aux projets
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 sm:px-8 py-16">
        {!project ? (
          <div className="py-24 text-center">
            <p className="overline mb-4">Erreur 404</p>
            <h1 className="text-3xl sm:text-4xl font-display mb-6">Projet introuvable</h1>
            <Link to="/#projects" className="btn-primary">Voir tous les projets</Link>
          </div>
        ) : (
          <article className="animate-hero-item" style={{ animationDelay: '0.05s' }}>
            {/* En-tête */}
            <p className="overline mb-5">{project.category}</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] mb-6" style={{ color: 'var(--text-primary)' }}>
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-12" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {project.role && <span>{project.role}</span>}
              {project.year && <span>· {project.year}</span>}
            </div>

            {/* Visuel principal */}
            {project.imageUrl ? (
              <div className="w-full rounded-2xl overflow-hidden border mb-14" style={{ borderColor: 'var(--border-card)' }}>
                <img src={project.imageUrl} alt={project.title} className="w-full object-cover" loading="lazy" />
              </div>
            ) : (
              <div className={`w-full h-72 rounded-2xl mb-14 bg-gradient-to-br ${project.gradient || 'from-[#16C79A] to-[#0F3460]'} flex items-center justify-center`}>
                <span className="font-display text-white/80 text-5xl">{project.title.split(' ')[0]}</span>
              </div>
            )}

            {/* Corps : description + méta */}
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="section-heading !mb-6 text-2xl">
                  <span className="idx text-sm">•</span>
                  À propos du projet
                  <span className="rule" />
                </h2>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {project.longDescription || project.description}
                </p>

                {/* Galerie optionnelle */}
                {Array.isArray(project.gallery) && project.gallery.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-4 mt-10">
                    {project.gallery.map((src, i) => (
                      <div key={i} className="rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border-card)' }}>
                        <img src={src} alt={`${project.title} — visuel ${i + 1}`} className="w-full object-cover" loading="lazy" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <aside className="space-y-8">
                {project.tech?.length > 0 && (
                  <div>
                    <p className="overline mb-4" style={{ fontSize: '0.7rem' }}>Stack technique</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span key={i} className="px-2.5 py-1 rounded text-[0.72rem]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', background: 'var(--accent-glow)' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full">
                      <Github size={16} /> Code source
                    </a>
                  )}
                  {project.live && project.live !== '#' && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
                      Voir en ligne <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </aside>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
