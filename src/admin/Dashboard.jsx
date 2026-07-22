import { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { restSetDoc, restAddDoc, restClearCollection } from '../firebase/firestoreRest';
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
      badge: 'Développeur full-stack & automatisation · Cotonou 🇧🇯', title: 'Salut, je suis', name: 'Josué',
      subtitle: "Des sites qui convertissent. Des tâches qui s'automatisent.",
      description: "Je crée des sites web et applications modernes, rapides et fiables — pour les entreprises d'ici comme d'ailleurs. Et je vais plus loin : j'automatise vos tâches répétitives pour vous faire gagner des heures chaque semaine.",
      ctaPrimaryText: 'Voir mes projets', ctaPrimaryLink: '#projects',
      ctaSecondaryText: 'Discutons de votre projet', ctaSecondaryLink: '#contact',
    },
    about: {
      photoUrl: '/images/1.webp',
      paragraphs: [
        "Je suis Josué, développeur full-stack basé à Cotonou 🇧🇯. J'aide les entreprises et entrepreneurs à exister en ligne avec des sites et applications modernes — React, Next.js — et à travailler plus intelligemment grâce à l'automatisation Python.",
        "Ce qui me distingue : je ne m'arrête pas au design. Je livre un produit qui marche, rapidement, et je reste disponible après la mise en ligne. Des solutions concrètes, adaptées à votre budget et à votre réalité — que vous soyez une PME à Cotonou ou une équipe à l'international.",
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
    { type: 'experience', title: 'Développeur Full-Stack Freelance', organization: "JOJO.DEV's", location: 'Cotonou, Bénin', startDate: '2023', endDate: 'Présent', description: 'Conception de sites web, applications et automatisations pour des clients locaux et internationaux — du design à la mise en ligne, avec suivi après livraison.', order: 0 },
    { type: 'formation', title: 'Développement Web Full-Stack', organization: 'Autodidacte & formations en ligne', location: 'Cotonou, Bénin', startDate: '2022', endDate: 'Présent', description: 'Maîtrise de React, Next.js, TypeScript, Python et Firebase, avec les bonnes pratiques modernes : Git, CI/CD et sécurité.', order: 1 },
    { type: 'experience', title: 'Applications web modernes & sécurisées', organization: 'Projets clients & personnels', location: 'Cotonou, Bénin', startDate: '2024', endDate: 'Présent', description: 'E-commerce, dashboards et apps mobiles déployés sur Vercel, avec intégration continue (CI/CD) et sécurisation (règles Firebase, headers, audits).', order: 2 },
    { type: 'certification', title: 'Certification n8n — Automatisation & Workflows', organization: 'Udemy', location: 'En ligne', startDate: '2025', endDate: '2025', description: "Automatisation de workflows avec n8n : intégration d'API, orchestration de tâches et connexion d'outils sans code.", order: 3 },
  ],
  services: [
    { title: 'Création de sites & apps', description: 'Des sites vitrine, e-commerce et applications web rapides, modernes et pensés pour convertir vos visiteurs en clients.', iconName: 'Globe', features: ['Sites vitrine & landing pages', 'E-commerce', 'Applications web (React / Next.js)', 'Responsive & rapide'], order: 0 },
    { title: 'Automatisation & gain de temps', description: "J'automatise vos tâches répétitives — documents, données, relances — avec des scripts et bots Python sur mesure.", iconName: 'Bot', features: ['Bots & scripts Python', 'Génération de documents', 'Traitement de données', 'Intégrations API'], order: 1 },
    { title: 'Conseil, design & SEO', description: "Maquettes, cahier des charges et audit SEO pour partir sur des bases solides et un site qu'on trouve sur Google.", iconName: 'Palette', features: ['Maquettes (Figma)', 'Cahier des charges', 'Audit SEO & performance', 'Conseil technique'], order: 2 },
    { title: 'Maintenance & sécurité', description: 'Suivi après livraison, mises à jour, sauvegardes et sécurisation — pour un site qui reste rapide, sûr et à jour.', iconName: 'Shield', features: ['Suivi après livraison', 'Sécurité & sauvegardes', 'Mises à jour', 'Optimisation performance'], order: 3 },
    { title: 'Applications de gestion & dashboards', description: "Des outils de gestion sur mesure — ERP simplifié, suivi d'activité, tableaux de bord — pour piloter votre business en un coup d'œil.", iconName: 'Layout', features: ['ERP & gestion sur mesure', 'Tableaux de bord', 'Suivi en temps réel', 'Laravel / React / Firebase'], order: 6 },
    { title: 'Chatbots & automatisation WhatsApp', description: 'Des chatbots WhatsApp et automatisations qui répondent à vos clients et gèrent vos commandes 24h/24, avec n8n.', iconName: 'Bot', features: ['Bots WhatsApp', 'Réponses automatiques', 'Gestion de commandes', 'Automatisation n8n'], order: 7 },
  ],
  projects: [
    { title: 'JOJO E-Commerce Mastery', description: 'Plateforme e-commerce complète avec panier, paiement et gestion produits.', gradient: 'from-[#16C79A] to-[#0F3460]', category: 'React', tech: ['TypeScript', 'React', 'Vite'], github: 'https://github.com/JOJODEVS-GIT/JOJO-ECOMMERCE-MASTERY', live: 'https://jojo-ecommerce-mastery.vercel.app', imageUrl: '', order: 0 },
    { title: 'MODALLAS', description: 'Site vitrine événementiel — décoration et scénographie élégante.', gradient: 'from-[#0F3460] to-[#16C79A]', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/MODALLAS', live: 'https://modallas.vercel.app', imageUrl: '', order: 1 },
    { title: 'Afro Flash Bénin', description: "Média d'actualités du Bénin développé avec Laravel — base de données, rubriques et back-end.", category: 'Laravel', tech: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Tailwind'], github: 'https://github.com/JOJODEVS-GIT/afro-flash-benin', live: 'https://afro-flash-benin.onrender.com', imageUrl: '/images/afro-flash-benin.webp', order: 2 },
    { title: 'Reality Prompt Engine', description: 'Générateur de prompts IA avec interface intuitive.', gradient: 'from-purple-600 to-[#0F3460]', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/REALITY-PROMPT-ENGINE', live: 'https://reality-prompt-engine.vercel.app', imageUrl: '', order: 3 },
    { title: 'Mon Produit', description: 'Dashboard de gestion de produits avec statistiques et suivi.', gradient: 'from-[#0F3460] to-blue-800', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/MON-PRODUIT', live: 'https://mon-produit.vercel.app', imageUrl: '', order: 4 },
    { title: 'QCM JavaScript', description: 'Quiz interactif JavaScript — 60 questions, timer, stats par thème.', gradient: 'from-yellow-600 to-[#16C79A]', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/QCM-JAVASCRIPT', live: 'https://qcm-javascript.vercel.app', imageUrl: '', order: 5 },
    { title: 'Suivi Chauffeur', description: 'Application de suivi et gestion de chauffeurs en temps réel.', gradient: 'from-[#16C79A] to-teal-700', category: 'HTML/CSS/JS', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/JOJODEVS-GIT/SUIVI-CHAUFFEUR', live: 'https://suivi-chauffeur.vercel.app', imageUrl: '', order: 6 },
    { title: 'MERAYA — First Anniversary', description: 'Landing événementielle premium pour une marque de mode : hero vidéo, animations GSAP et réservation en ligne.', gradient: 'from-[#0F3460] to-[#16C79A]', category: 'React', tech: ['Next.js', 'React', 'TypeScript', 'GSAP', 'Tailwind'], github: 'https://github.com/JOJODEVS-GIT/meraya', live: 'https://meraya-demo.vercel.app', imageUrl: '/images/meraya.webp', order: 7 },
  ],
  skills: [
    { name: 'React / Next.js', iconName: 'Sparkles', order: 0 },
    { name: 'TypeScript', iconName: 'Code2', order: 1 },
    { name: 'JavaScript', iconName: 'Zap', order: 2 },
    { name: 'Python', iconName: 'Terminal', order: 3 },
    { name: 'HTML / CSS', iconName: 'Layout', order: 4 },
    { name: 'Tailwind CSS', iconName: 'Layers', order: 5 },
    { name: 'Firebase / Firestore', iconName: 'Database', order: 6 },
    { name: 'API REST', iconName: 'Server', order: 7 },
    { name: 'Git / GitHub', iconName: 'GitBranch', order: 8 },
    { name: 'CI/CD (GitHub Actions)', iconName: 'Rocket', order: 9 },
    { name: 'React Native', iconName: 'Smartphone', order: 10 },
    { name: 'Sécurité & SEO', iconName: 'Shield', order: 11 },
    { name: 'PHP', iconName: 'FileCode', order: 12 },
    { name: 'Laravel', iconName: 'Layers', order: 13 },
    { name: 'SQL / Bases de données', iconName: 'Database', order: 14 },
    { name: 'Bootstrap', iconName: 'Package', order: 15 },
    { name: 'n8n / Automatisation', iconName: 'Bot', order: 16 },
    { name: 'Vue.js', iconName: 'Monitor', order: 17 },
  ],
};

export default function Dashboard() {
  const { stats, parcours, services, projects, skills, refreshData } = useSiteData();
  const { user } = useAuth();
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

  const handleSeed = async () => {
    if (!user) {
      setStatus({ type: 'error', message: 'Vous devez être connecté pour importer des données.' });
      return;
    }

    if (!confirm('Synchroniser tout le contenu depuis le code ? (tes témoignages sont préservés)')) return;

    setSeeding(true);
    setStatus(null);
    const colNames = ['stats', 'parcours', 'services', 'projects', 'skills'];
    try {
      // ALWAYS clear collections first to avoid duplicates
      setStatus({ type: 'info', message: 'Suppression des anciennes données...' });
      for (const colName of colNames) {
        await restClearCollection(user, colName);
      }

      // Seed settings via REST
      setStatus({ type: 'info', message: 'Import des paramètres...' });
      for (const [docId, data] of Object.entries(seedData.settings)) {
        await restSetDoc(user, 'settings', docId, data);
      }

      // Seed collections via REST
      let done = 0;
      const totalDocs = colNames.reduce((sum, c) => sum + seedData[c].length, 0);
      for (const colName of colNames) {
        for (const item of seedData[colName]) {
          await restAddDoc(user, colName, item);
          done++;
          setStatus({ type: 'info', message: `Import en cours... ${done}/${totalDocs}` });
        }
      }

      await refreshData();
      setStatus({ type: 'success', message: `${totalDocs} éléments importés avec succès !` });
      setTimeout(() => setStatus(null), 5000);
    } catch (err) {
      console.error('Seed error:', err);
      setStatus({ type: 'error', message: `Erreur: ${err.message}` });
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
        <h3 className="text-lg font-bold mb-2">Synchroniser le contenu</h3>
        <p className="text-[var(--text-secondary)] text-xs mb-3">Applique en 1 clic le dernier contenu (services, compétences, projets, parcours…) préparé dans le code. Tes témoignages sont conservés.</p>
        <p className="text-[var(--text-secondary)] text-sm mb-1">
          Connecté : <strong className="text-[#16C79A]">{user?.email || 'Non connecté'}</strong>
        </p>
        <p className="text-[var(--text-secondary)] text-sm mb-4">
          {totalItems === 0
            ? 'Base vide — importez les données pour commencer'
            : `${totalItems} éléments dans Firestore`
          }
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => handleSeed()}
            disabled={seeding}
            className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
          >
            {seeding ? (
              <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Import en cours...</>
            ) : (
              <><RefreshCw size={18} /> Synchroniser depuis le code</>
            )}
          </button>
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
