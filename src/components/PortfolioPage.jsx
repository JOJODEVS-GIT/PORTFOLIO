import { lazy, Suspense } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';

// Lazy load below-the-fold sections
const Stats = lazy(() => import('./Stats'));
const About = lazy(() => import('./About'));
const Services = lazy(() => import('./Services'));
const Parcours = lazy(() => import('./Parcours'));
const Projects = lazy(() => import('./Projects'));
const Skills = lazy(() => import('./Skills'));
const Contact = lazy(() => import('./Contact'));
const Footer = lazy(() => import('./Footer'));

export default function PortfolioPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#16C79A] focus:text-black focus:rounded-lg focus:font-semibold"
      >
        Aller au contenu
      </a>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Stats />
          <About />
          <Services />
          <Parcours />
          <Projects />
          <Skills />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
