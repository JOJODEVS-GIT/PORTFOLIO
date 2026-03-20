import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};

    // Dynamically import Firebase Auth — NOT loaded on initial render
    async function initAuth() {
      try {
        const [{ auth }, { onAuthStateChanged }] = await Promise.all([
          import('../firebase/config'),
          import('firebase/auth'),
        ]);

        unsubscribe = onAuthStateChanged(auth, (u) => {
          setUser(u);
          setLoading(false);
        });
      } catch (err) {
        if (import.meta.env.DEV) console.error('Firebase Auth init error:', err);
        setLoading(false);
      }
    }

    initAuth();

    return () => unsubscribe();
  }, []);

  const logout = useCallback(async () => {
    const [{ auth }, { signOut }] = await Promise.all([
      import('../firebase/config'),
      import('firebase/auth'),
    ]);
    return signOut(auth);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
