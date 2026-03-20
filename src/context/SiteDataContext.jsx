import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const SiteDataContext = createContext(null);

export function SiteDataProvider({ children }) {
  const [site, setSite] = useState(null);
  const [hero, setHero] = useState(null);
  const [about, setAbout] = useState(null);
  const [contact, setContact] = useState(null);
  const [stats, setStats] = useState([]);
  const [parcours, setParcours] = useState([]);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    let unsubscribers = [];

    // Dynamically import Firebase — NOT loaded on initial render
    async function initFirestore() {
      try {
        const [{ db }, { collection, doc, onSnapshot, query, orderBy }] = await Promise.all([
          import('../firebase/config'),
          import('firebase/firestore'),
        ]);

        const errorList = [];
        const isDev = import.meta.env.DEV;

        // Helper: subscribe to a document
        function subDoc(path, docId, setter) {
          const unsub = onSnapshot(
            doc(db, path, docId),
            (snap) => setter(snap.exists() ? snap.data() : null),
            (err) => { if (isDev) console.error(`Firestore [${path}/${docId}]:`, err); errorList.push(err); }
          );
          unsubscribers.push(unsub);
        }

        // Helper: subscribe to a collection
        function subCol(colName, setter) {
          const q = query(collection(db, colName), orderBy('order'));
          const unsub = onSnapshot(
            q,
            (snap) => setter(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
            (err) => { if (isDev) console.error(`Firestore [${colName}]:`, err); errorList.push(err); }
          );
          unsubscribers.push(unsub);
        }

        subDoc('settings', 'site', setSite);
        subDoc('settings', 'hero', setHero);
        subDoc('settings', 'about', setAbout);
        subDoc('settings', 'contact', setContact);
        subCol('stats', setStats);
        subCol('parcours', setParcours);
        subCol('services', setServices);
        subCol('projects', setProjects);
        subCol('skills', setSkills);

        if (errorList.length) setErrors(errorList);
        setLoading(false);
      } catch (err) {
        if (import.meta.env.DEV) console.error('Firebase init error:', err);
        setErrors([err]);
        setLoading(false);
      }
    }

    initFirestore();

    return () => unsubscribers.forEach((unsub) => unsub());
  }, []);

  const value = useMemo(() => ({
    site, hero, about, contact,
    stats, parcours, services, projects, skills,
    loading, errors,
  }), [site, hero, about, contact, stats, parcours, services, projects, skills, loading, errors]);

  return (
    <SiteDataContext.Provider value={value}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error('useSiteData must be used within SiteDataProvider');
  return ctx;
}
