import { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { Link } from 'react-router-dom';
import { doc, setDoc, collection, addDoc, getDocs, deleteDoc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/config';
import {
  Settings, Sparkles, BarChart3, User, Route,
  Briefcase, FolderGit2, Code2, Mail, Database, CheckCircle, AlertCircle, RefreshCw
} from 'lucide-react';

const sections = [
  { to: '/admin/site', label: 'Site', icon: Settings, desc: 'Logo et paramètres du site' },
  { to: '/admin/hero', label: 'Hero', icon: Sparkles, desc: "Section d'accueil" },
  { to: '/admin/stats', label: 'Stats', icon: BarChart3, desc: 'Chiffres clés' },
  { to: '/admin/about', label: 'À propos', icon: User, desc: 'Bio et réseaux sociaux' },
  { to: '/admin/parcours', label: 'Parcours', icon: Route, desc: 'Timeline formations/xp' },
  { to: '/admin/services', label: 'Services', icon: Briefcase, desc: 'Services proposés' },
  { to: '/admin/projects', label: 'Projets', icon: FolderGit2, desc: 'Portfolio de projets' },
  { to: '/admin/skills', label: 'Compétences', icon: Code2, desc: 'Compétences techniques' },
  { to: '/admin/contact', label: 'Contact', icon: Mail, desc: 'Informations de contact' },
];

const seedData = {
  settings: {
    site: { logoText: 'JOJO', logoDot: ".DEV's", siteName: "JOJO.DEV's Portfolio", description: 'Portfolio de Josué Hounkanrin' },
    hero: {
      badge: 'Bienvenue 👋', title: 'Salut, je suis', name: 'Josué',
      subtitle: 'Développeur Web Full Stack & Automatisation',
      description: 'Basé à Cotonou 🇧🇯, je transforme vos idées en solutions digitales performantes — sites web, applications et automatisations sur mesure.',
      ctaPrimaryText: 'Voir mes projets', ctaPrimaryLink: '#projects',
      ctaSecondaryText: 'Mon GitHub', ctaSecondaryLink: 'https://github.com/JOJODEVS-GIT',
    },
    about: {
      photoUrl: '/images/1.webp',
      paragraphs: [
        'Je suis Josué, développeur Full Stack basé à Cotonou 🇧🇯. Je crée des sites web modernes avec React et Next.js, des sites vitrine/e-commerce avec WordPress, et j\'automatise les process répétitifs avec Python.',
        'Passionné par la technologie et l\'innovation, je transforme des idées en projets concrets et fonctionnels. Mon objectif : fournir des solutions digitales de qualité, adaptées aux réalités locales africaines.',
      ],
      tagline: '📍 Cotonou, Bénin \u2022 🎯 Projets avec impact \u2022 💡 Full Stack & Automatisation',
      socialLinks: { github: 'https://github.com/JOJODEVS-GIT', whatsapp: 'https://wa.me/2290160293043', email: 'mailto:jojohkdev@gmail.com' },
    },
    contact: {
      email: 'jojohkdev@gmail.com', whatsapp: 'https://wa.me/2290160293043',
      github: 'https://github.com/JOJODEVS-GIT',
      responseTime: 'Je réponds sous 24h. N\'hésitez pas !',
      availabilityMessage: 'Disponible pour de nouvelles collaborations et projets freelance.',
    },
  },
  stats: [
    { number: 10, label: 'Projets Réalisés', suffix: '+', order: 0 },
    { number: 12, label: 'Clients Satisfaits', suffix: '+', order: 1 },
    { number: 2, label: 'Années Expérience', suffix: '+', order: 2 },
    { number: 100, label: 'Satisfaction Client', suffix: '%', order: 3 },
  ],
  parcours: [
    { type: 'formation', title: 'Formation Développement Web', organization: 'Autodidacte & Formations en ligne', location: 'Cotonou, Bénin', startDate: '2022', endDate: 'Présent', description: 'Apprentissage intensif de React, Next.js, TypeScript, Python et des technologies web modernes.', order: 0 },
    { type: 'experience', title: 'Développeur Web Full Stack Freelance', organization: "JOJO.DEV's", location: 'Cotonou, Bénin', startDate: '2023', endDate: 'Présent', description: 'Création de sites web, applications et automatisations pour des clients locaux et internationaux.', order: 1 },
    { type: 'certification', title: 'Certifications Web & Python', organization: 'Plateformes en ligne', location: 'En ligne', startDate: '2023', endDate: '2024', description: 'Certifications en développement web, Python, et bonnes pratiques de programmation.', order: 2 },
  ],
  services: [
    { title: 'Création Web', description: 'Sites vitrine, e-commerce, applications web complètes avec React, Next.js et WordPress.', iconName: 'Globe', features: ['Sites vitrine', 'E-commerce', 'Applications web', 'Landing pages'], order: 0 },
    { title: 'Automatisation', description: 'Bots, scripts, génération automatique de documents avec Python et APIs.', iconName: 'Bot', features: ['Bots Python', 'Scripts automatisés', 'Génération de documents', 'Intégrations API'], order: 1 },
    { title: 'Conseil & Design', description: 'Maquettes Figma, cahiers des charges, audit SEO et conseil technique.', iconName: 'Palette', features: ['Maquettes Figma', 'Cahiers des charges', 'Audit SEO', 'Conseil technique'], order: 2 },
  ],
  projects: [
    { title: 'JOJO E-Commerce Mastery', description: 'Plateforme e-commerce complète avec panier, paiement et gestion produits.', gradient: 'from-[#16C79A] to-[#0F3460]', category: 'React', tech: ['TypeScript', 'React', 'Vite'], github: 'https://github.com/JOJODEVS-GIT/JOJO-ECOMMERCE-MASTERY', live: 'https://jojo-ecommerce-mastery.vercel.app', imageUrl: '', order: 0 },
    { title: 'MODALLAS', description: 'Site vitrine événementiel — décoration et scénographie élégante.', gradient: 'from-[#0F3460] to-[#16C79A]', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/MODALLAS', live: 'https://modallas.vercel.app', imageUrl: '', order: 1 },
    { title: 'AFRO-FLASH-BENIN', description: 'Plateforme de services flash et livraison au Bénin.', gradient: 'from-[#16C79A] to-emerald-700', category: 'React', tech: ['Next.js', 'TypeScript'], github: 'https://github.com/JOJODEVS-GIT/AFRO-FLASH-BENIN', live: '#', imageUrl: '', order: 2 },
    { title: 'Reality Prompt Engine', description: 'Générateur de prompts IA avec interface intuitive.', gradient: 'from-purple-600 to-[#0F3460]', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/REALITY-PROMPT-ENGINE', live: 'https://reality-prompt-engine.vercel.app', imageUrl: '', order: 3 },
    { title: 'Mon Produit', description: 'Dashboard de gestion de produits avec statistiques et suivi.', gradient: 'from-[#0F3460] to-blue-800', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/MON-PRODUIT', live: 'https://mon-produit.vercel.app', imageUrl: '', order: 4 },
    { title: 'QCM JavaScript', description: 'Quiz interactif JavaScript — 60 questions, timer, stats par thème.', gradient: 'from-yellow-600 to-[#16C79A]', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/QCM-JAVASCRIPT', live: 'https://qcm-javascript.vercel.app', imageUrl: '', order: 5 },
    { title: 'Suivi Chauffeur', description: 'Application de suivi et gestion de chauffeurs en temps réel.', gradient: 'from-[#16C79A] to-teal-700', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/SUIVI-CHAUFFEUR', live: 'https://suivi-chauffeur.vercel.app', imageUrl: '', order: 6 },
  ],
  skills: [
    { name: 'React / Next.js', iconName: 'Sparkles', color: 'text-[#16C79A]', order: 0 },
    { name: 'WordPress', iconName: 'Globe', color: 'text-blue-400', order: 1 },
    { name: 'Python', iconName: 'Terminal', color: 'text-yellow-400', order: 2 },
    { name: 'TypeScript', iconName: 'Code2', color: 'text-blue-300', order: 3 },
    { name: 'JavaScript', iconName: 'Zap', color: 'text-yellow-300', order: 4 },
    { name: 'HTML / CSS', iconName: 'Layout', color: 'text-orange-400', order: 5 },
    { name: 'Tailwind / Bootstrap', iconName: 'Layers', color: 'text-cyan-400', order: 6 },
    { name: 'Figma (UI/UX)', iconName: 'Palette', color: 'text-pink-400', order: 7 },
    { name: 'Git / GitHub', iconName: 'GitBranch', color: 'text-orange-500', order: 8 },
    { name: 'SEO / Lighthouse', iconName: 'Search', color: 'text-green-400', order: 9 },
  ],
};

async function clearAllCollections(colNames) {
  const batch = writeBatch(db);
  for (const colName of colNames) {
    const snapshot = await getDocs(collection(db, colName));
    snapshot.docs.forEach((d) => batch.delete(d.ref));
  }
  await batch.commit();
}

export default function Dashboard() {
  const { stats, parcours, services, projects, skills } = useSiteData();
  const [seeding, setSeeding] = useState(false);
  const [status, setStatus] = useState(null);

  const counts = [
    { label: 'Stats', count: stats.length },
    { label: 'Parcours', count: parcours.length },
    { label: 'Services', count: services.length },
    { label: 'Projets', count: projects.length },
    { label: 'Compétences', count: skills.length },
  ];

  const totalItems = stats.length + parcours.length + services.length + projects.length + skills.length;

  const handleSeed = async (reset = false) => {
    const msg = reset
      ? 'Réinitialiser toutes les données ? Les données actuelles seront SUPPRIMÉES et remplacées par les données par défaut.'
      : 'Importer les données par défaut dans Firestore ?';
    if (!confirm(msg)) return;

    setSeeding(true);
    setStatus(null);
    const colNames = ['stats', 'parcours', 'services', 'projects', 'skills'];
    try {
      // If reset, clear all collections in one batch
      if (reset) {
        setStatus({ type: 'info', message: 'Suppression des anciennes données...' });
        await clearAllCollections(colNames);
      }

      // Seed settings in parallel
      setStatus({ type: 'info', message: 'Import des paramètres...' });
      await Promise.all(
        Object.entries(seedData.settings).map(([docId, data]) =>
          setDoc(doc(db, 'settings', docId), data)
        )
      );

      // Seed all collections in parallel
      setStatus({ type: 'info', message: 'Import des collections...' });
      await Promise.all(
        colNames.flatMap((colName) =>
          seedData[colName].map((item) => addDoc(collection(db, colName), item))
        )
      );

      setStatus({ type: 'success', message: 'Données importées avec succès ! Le site se met à jour en temps réel.' });
      setTimeout(() => setStatus(null), 5000);
    } catch (err) {
      console.error('Seed error:', err);
      setStatus({ type: 'error', message: 'Erreur: ' + err.message });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-[var(--text-secondary)] mb-8">Gérez le contenu de votre portfolio</p>

      {/* Status message */}
      {status && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 text-sm ${
          status.type === 'success'
            ? 'bg-[#16C79A]/20 border border-[#16C79A]/50 text-[#16C79A]'
            : status.type === 'info'
            ? 'bg-blue-500/20 border border-blue-500/50 text-blue-300'
            : 'bg-red-500/20 border border-red-500/50 text-red-300'
        }`}>
          {status.type === 'success' ? <CheckCircle size={16} /> : status.type === 'info' ? <RefreshCw size={16} className="animate-spin" /> : <AlertCircle size={16} />}
          {status.message}
        </div>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        {counts.map((c) => (
          <div key={c.label} className="card text-center py-4">
            <p className="text-2xl font-bold text-[#16C79A]">{c.count}</p>
            <p className="text-[var(--text-secondary)] text-xs">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Seed section */}
      <div className="card mb-8 text-center py-6">
        <Database size={32} className="mx-auto text-[#16C79A] mb-3" />
        <h3 className="text-lg font-bold mb-2">
          {totalItems === 0 ? 'Base de données vide' : 'Gestion des données'}
        </h3>
        <p className="text-[var(--text-secondary)] text-sm mb-4">
          {totalItems === 0
            ? 'Importez les données actuelles du portfolio dans Firestore pour commencer'
            : 'Réinitialisez les données à leurs valeurs par défaut si nécessaire'
          }
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {totalItems === 0 ? (
            <button
              onClick={() => handleSeed(false)}
              disabled={seeding}
              className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
            >
              {seeding ? (
                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Import en cours...</>
              ) : (
                <><Database size={18} /> Importer les données</>
              )}
            </button>
          ) : (
            <button
              onClick={() => handleSeed(true)}
              disabled={seeding}
              className="btn-secondary inline-flex items-center gap-2 disabled:opacity-50 !border-orange-500 !text-orange-400 hover:!bg-orange-500/10"
            >
              {seeding ? (
                <><div className="w-5 h-5 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" /> Réinitialisation...</>
              ) : (
                <><RefreshCw size={18} /> Réinitialiser les données</>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Section links */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.to}
              to={section.to}
              className="card group hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#16C79A]/10 group-hover:bg-[#16C79A]/20 transition-colors">
                  <Icon size={20} className="text-[#16C79A]" />
                </div>
                <h3 className="font-bold">{section.label}</h3>
              </div>
              <p className="text-[var(--text-secondary)] text-sm">{section.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
