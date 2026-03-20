import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { LogIn, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin', { replace: true });
    } catch {
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            <span style={{ color: 'var(--text-primary)' }}>JOJO</span>
            <span className="text-[#16C79A]">.DEV's</span>
          </h1>
          <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>Administration</p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-6">Connexion</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-300 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Email</label>
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-[#16C79A]/20 rounded-lg focus:border-[#16C79A] focus:outline-none"
                style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }}
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Mot de passe</label>
              <input
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-[#16C79A]/20 rounded-lg focus:border-[#16C79A] focus:outline-none"
                style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={20} />
                  Se connecter
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6">
          <a href="/" className="hover:text-[#16C79A] text-sm transition-colors" style={{ color: 'var(--text-secondary)' }}>
            Retour au site
          </a>
        </p>
      </div>
    </div>
  );
}
