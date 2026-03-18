# 📋 Documentation - Portfolio Josué Hounkanrin

## 🎯 À propos du projet

Ce portfolio est une application web moderne et animée créée pour Josué Hounkanrin, Développeur Web WordPress & Marketeur Digital. Le site présente les projets, compétences, expérience et permet aux clients de le contacter directement.

**URL en développement:** `http://localhost:5174`

---

## 🚀 Technologies utilisées

| Technologie | Version | Utilité |
|------------|---------|---------|
| **React** | 18+ | Framework JavaScript pour l'UI |
| **Vite** | 7+ | Build tool et dev server |
| **Tailwind CSS** | 4 | Framework CSS utilitaire |
| **Framer Motion** | Latest | Animations et transitions |
| **Lucide React** | Latest | Bibliothèque d'icônes |
| **PostCSS** | Latest | Traitement CSS |

---

## 📁 Structure du projet

```
Portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Barre de navigation avec dark/light toggle
│   │   ├── Hero.jsx             # Section d'accueil (landing)
│   │   ├── About.jsx            # Section "À propos" avec bio
│   │   ├── Stats.jsx            # Statistiques animées (6 projets, 8 clients, etc.)
│   │   ├── Projects.jsx         # Grid de projets avec filtrage par catégorie
│   │   ├── ProjectModal.jsx     # Modal pour détails des projets
│   │   ├── Skills.jsx           # Compétences techniques avec icônes
│   │   ├── Experience.jsx       # Timeline d'expérience professionnelle
│   │   ├── Testimonials.jsx     # Carousel de témoignages clients
│   │   ├── Contact.jsx          # Formulaire de contact
│   │   ├── Footer.jsx           # Pied de page
│   │   └── SEOHead.jsx          # Méta tags SEO
│   ├── hooks/
│   │   └── useScrollAnimation.js # Hook custom pour animations au scroll
│   ├── App.jsx                  # Composant racine
│   ├── App.css                  # Styles globaux
│   ├── index.css                # Imports Tailwind v4
│   ├── main.jsx                 # Point d'entrée
│   └── assets/                  # Images et ressources
├── public/
│   └── images/                  # Images du portfolio (1.png = photo de profil)
├── index.html                   # HTML template
├── vite.config.js               # Configuration Vite
├── tailwind.config.js           # Configuration Tailwind
├── postcss.config.js            # Configuration PostCSS
├── package.json                 # Dépendances NPM
└── eslint.config.js             # Configuration ESLint
```

---

## 💾 Installation

### Prérequis
- Node.js v18+ 
- npm ou yarn

### Étapes

```bash
# 1. Cloner ou accéder au dossier
cd /Users/mac/Desktop/Portofolio

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev

# 4. Ouvrir dans le navigateur
http://localhost:5174
```

---

## 🎨 Composants Principaux

### **Navbar** (`components/Navbar.jsx`)
- Navigation fixe avec scroll detection
- Bouton dark/light mode (toggle)
- Barre de progression au scroll
- Menu mobile responsive
- Liens vers GitHub, LinkedIn, Email

### **Hero** (`components/Hero.jsx`)
- Section d'accueil avec animations
- Présentation: "Salut, je suis Josué"
- Background animé avec gradients
- CTA (Call To Action) buttons

### **Stats** (`components/Stats.jsx`)
- Compteurs animés pour les métriques:
  - 6 projets complétés
  - 8 clients satisfaits
  - 2 ans d'expérience
  - 100% satisfaction client

### **About** (`components/About.jsx`)
- Photo de profil (source: `/public/images/1.png`)
- Bio personnelle
- Liens sociaux (GitHub, LinkedIn, Email)
- Description des compétences

### **Projects** (`components/Projects.jsx`)
- Grid de 6 projets:
  1. **ESC Cosmétique** - WordPress/WooCommerce
  2. **CLASSICO PARTY 2** - Marketing/Event
  3. **BJ Variety Shop** - E-commerce
  4. **ROI Dashboard** - Excel/Analytics
  5. **Bulletin Paie** - HR Management
  6. **Bot Telegram** - Automation
- Filtrage par catégorie (WordPress, E-commerce, Marketing, Automation)
- Modal pour voir les détails
- Tech stack de chaque projet

### **Skills** (`components/Skills.jsx`)
- 10 compétences avec icônes:
  - WordPress, WooCommerce, JavaScript
  - HTML/CSS, Elementor
  - Facebook Ads, SEO, Excel Avancé
  - WhatsApp Business, Git
- Couleurs différentes par compétence

### **Experience** (`components/Experience.jsx`)
- Timeline de 3 expériences:
  1. Freelance WordPress Developer (2024-present)
  2. Auto-entrepreneur Marketer (2024-present)
  3. Continuous Learning
- Dates, descriptions, localisation

### **Testimonials** (`components/Testimonials.jsx`)
- Carousel de 4 témoignages clients
- Navigation par boutons (Prev/Next)
- Indicateurs de page
- Notes 5 étoiles

### **Contact** (`components/Contact.jsx`)
- Formulaire avec validation
- Intégration FormSpree (prête pour Form ID)
- Email visible: `josue.dev@gmail.com`
- Bouton copier email
- Liens sociaux

### **Footer** (`components/Footer.jsx`)
- Marque et description
- Liens rapides
- Icônes réseaux sociaux
- Copyright dynamique

---

## 🎯 Fonctionnalités

### ✅ Fonctionnalités implémentées

- **Responsive Design** - Mobile, tablet, desktop
- **Dark/Light Mode** - Toggle global
- **Animations Smooth** - Scroll, hover, fade-in
- **Filtrage de projets** - Par catégorie
- **Modal de détails** - Clic sur un projet
- **Compteurs animés** - Stats avec animation numérique
- **Carousel testimonials** - Navigation fluide
- **Formulaire de contact** - Validation + FormSpree ready
- **Scroll progress bar** - Indicateur de progression
- **SEO Meta tags** - Préparé pour les moteurs

### 🔜 À configurer/améliorer

- **FormSpree ID** - À remplacer dans Contact.jsx (actuellement placeholder)
- **Images projets** - À ajouter dans `/public/images/`
- **URLs live** - Remplacer les "#" par les vraies URLs
- **Testimonials réels** - Remplacer les placeholders par les vrais clients

---

## 📝 Comment personnaliser

### **Changer la photo de profil**
1. Mets ta photo dans `/public/images/1.png`
2. Elle s'affiche automatiquement dans About.jsx

### **Modifier les projets**
Ouvre `src/components/Projects.jsx` et édite le tableau `projects`:
```javascript
{
  id: 1,
  title: 'Nom du projet',
  category: 'WordPress', // wordpress, ecommerce, marketing, automation
  description: 'Description courte',
  image: '/images/project1.png',
  technologies: ['WordPress', 'WooCommerce'],
  features: ['Feature 1', 'Feature 2'],
  demoUrl: 'https://example.com',
  githubUrl: '#'
}
```

### **Changer les compétences**
Dans `src/components/Skills.jsx`, modifie le tableau `skills`:
```javascript
{ name: 'Ma compétence', icon: IconName, color: 'text-blue-400' }
```

### **Ajouter des testimonials**
Dans `src/components/Testimonials.jsx`, édite le tableau `testimonials`.

### **Dark/Light Mode**
Le toggle fonctionne via Tailwind CSS `dark:` classes. Changer de mode affecte:
- Fond (gris foncé ↔ blanc)
- Texte (blanc ↔ noir)
- Borders et accents

---

## 🚀 Build & Déploiement

### **Build pour production**
```bash
npm run build
```
Crée un dossier `dist/` optimisé.

### **Prévisualiser le build**
```bash
npm run preview
```

### **Déployer sur Vercel** (recommandé)
```bash
npm install -g vercel
vercel
```

### **Déployer sur Netlify**
1. Push sur GitHub
2. Connecte Netlify à ton repo
3. Configure le build: `npm run build`
4. Directory: `dist/`

### **Déployer sur autre host**
Copie le contenu du dossier `dist/` et upload-le.

---

## 🔧 Scripts disponibles

```bash
npm run dev          # Démarrer le serveur de développement
npm run build        # Build production
npm run preview      # Prévisualiser le build
npm run lint         # Vérifier le code (ESLint)
```

---

## 🎨 Personnalisation des couleurs

Les couleurs principales sont:
- **Violet**: `from-violet-500` (primaire)
- **Cyan**: `to-cyan-500` (accent)
- **Jaune**: `text-yellow-400` (highlights)
- **Gris**: `gray-900` (background dark), `gray-50` (background light)

Pour changer, mets à jour les classes Tailwind dans les composants.

---

## 📱 Responsive Breakpoints (Tailwind)

- **Mobile**: < 640px (`sm:`)
- **Tablet**: 640px - 1024px (`md:`)
- **Desktop**: > 1024px (`lg:`)

---

## 🐛 Dépannage

### **Portfolio ne s'affiche pas**
```bash
npm install
npm run dev
```

### **Images ne s'affichent pas**
Vérifie que les images sont dans `/public/images/` avec les bons noms.

### **Dark mode ne fonctionne pas**
- Vérifie que `darkMode: 'class'` est dans `tailwind.config.js`
- Rafraîchis le navigateur

### **Formulaire ne fonctionne pas**
- FormSpree ID est un placeholder (`xyzaabcd`)
- Crée un compte FormSpree et remplace l'ID dans Contact.jsx

---

## 📊 SEO

Le portfolio inclut des meta tags pour Google et les réseaux sociaux:
- Titre: "Josué Hounkanrin - Développeur WordPress & Marketer"
- Description: Optimisée pour recherche
- Open Graph tags pour partage social

---

## 📞 Contact & Support

**Email:** josue.dev@gmail.com
**GitHub:** https://github.com/josue-dev
**LinkedIn:** https://www.linkedin.com/in/josue-web

---

## 📄 Licence

Projet personnel. Libre d'utilisation et modification.

---

**Dernière mise à jour:** 5 janvier 2026  
**Status:** ✅ Production-ready (FormSpree ID à configurer)
