import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const SiteDataContext = createContext(null);

const PROJECT_ID = 'jojo-portfolio';
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

/** Convert Firestore REST value to JS value */
function fromFirestoreValue(val) {
  if ('stringValue' in val) return val.stringValue;
  if ('integerValue' in val) return Number(val.integerValue);
  if ('doubleValue' in val) return val.doubleValue;
  if ('booleanValue' in val) return val.booleanValue;
  if ('nullValue' in val) return null;
  if ('arrayValue' in val) return (val.arrayValue.values || []).map(fromFirestoreValue);
  if ('mapValue' in val) return fromFirestoreFields(val.mapValue.fields || {});
  return null;
}

/** Convert Firestore REST fields to JS object */
function fromFirestoreFields(fields) {
  const obj = {};
  for (const [key, val] of Object.entries(fields)) {
    obj[key] = fromFirestoreValue(val);
  }
  return obj;
}

/** Fetch a single document */
async function fetchDoc(collectionName, docId) {
  try {
    const res = await fetch(`${BASE_URL}/${collectionName}/${docId}`);
    if (!res.ok) return null;
    const doc = await res.json();
    if (!doc.fields) return null;
    return fromFirestoreFields(doc.fields);
  } catch {
    return null;
  }
}

/** Fetch all documents from a collection, sorted by order */
async function fetchCollection(collectionName) {
  try {
    const res = await fetch(`${BASE_URL}/${collectionName}?orderBy=order`);
    if (!res.ok) return [];
    const body = await res.json();
    if (!body.documents) return [];
    return body.documents.map((doc) => ({
      id: doc.name.split('/').pop(),
      ...fromFirestoreFields(doc.fields || {}),
    }));
  } catch {
    return [];
  }
}

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

  const loadAllData = useCallback(async () => {
    const [siteData, heroData, aboutData, contactData, statsData, parcoursData, servicesData, projectsData, skillsData] = await Promise.all([
      fetchDoc('settings', 'site'),
      fetchDoc('settings', 'hero'),
      fetchDoc('settings', 'about'),
      fetchDoc('settings', 'contact'),
      fetchCollection('stats'),
      fetchCollection('parcours'),
      fetchCollection('services'),
      fetchCollection('projects'),
      fetchCollection('skills'),
    ]);

    setSite(siteData);
    setHero(heroData);
    setAbout(aboutData);
    setContact(contactData);
    setStats(statsData);
    setParcours(parcoursData);
    setServices(servicesData);
    setProjects(projectsData);
    setSkills(skillsData);
    setLoading(false);
  }, []);

  // Initial load
  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const value = useMemo(() => ({
    site, hero, about, contact,
    stats, parcours, services, projects, skills,
    loading, refreshData: loadAllData,
  }), [site, hero, about, contact, stats, parcours, services, projects, skills, loading, loadAllData]);

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
