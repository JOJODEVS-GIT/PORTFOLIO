import { Routes, Route, Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PortfolioPage from './components/PortfolioPage';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load admin routes — these pull in Firebase (~500KB) and admin UI
const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const Dashboard = lazy(() => import('./admin/Dashboard'));
const SiteSettingsForm = lazy(() => import('./admin/SiteSettingsForm'));
const HeroForm = lazy(() => import('./admin/HeroForm'));
const StatsForm = lazy(() => import('./admin/StatsForm'));
const AboutForm = lazy(() => import('./admin/AboutForm'));
const ParcoursForm = lazy(() => import('./admin/ParcoursForm'));
const ServicesForm = lazy(() => import('./admin/ServicesForm'));
const ProjectsForm = lazy(() => import('./admin/ProjectsForm'));
const SkillsForm = lazy(() => import('./admin/SkillsForm'));
const ContactForm = lazy(() => import('./admin/ContactForm'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#16C79A] mb-4">404</h1>
        <p className="text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>Page introuvable</p>
        <Link to="/" className="btn-primary">Retour à l'accueil</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="site" element={<SiteSettingsForm />} />
          <Route path="hero" element={<HeroForm />} />
          <Route path="stats" element={<StatsForm />} />
          <Route path="about" element={<AboutForm />} />
          <Route path="parcours" element={<ParcoursForm />} />
          <Route path="services" element={<ServicesForm />} />
          <Route path="projects" element={<ProjectsForm />} />
          <Route path="skills" element={<SkillsForm />} />
          <Route path="contact" element={<ContactForm />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
