/**
 * Firestore REST API helpers — bypass SDK write issues.
 * Reads still use the SDK (onSnapshot), writes use REST.
 */

const PROJECT_ID = 'jojo-portfolio';
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

/** Convert a JS value to Firestore REST field format */
function toFirestoreValue(value) {
  if (value === null || value === undefined) return { nullValue: null };
  if (typeof value === 'boolean') return { booleanValue: value };
  if (typeof value === 'number') return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  if (typeof value === 'string') return { stringValue: value };
  if (Array.isArray(value)) return { arrayValue: { values: value.map(toFirestoreValue) } };
  if (typeof value === 'object') {
    const fields = {};
    for (const [k, v] of Object.entries(value)) {
      fields[k] = toFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(value) };
}

/** Convert a JS object to Firestore REST document fields */
function toFields(obj) {
  const fields = {};
  for (const [key, val] of Object.entries(obj)) {
    fields[key] = toFirestoreValue(val);
  }
  return fields;
}

/** Get auth token from Firebase user */
async function getToken(user) {
  return user.getIdToken();
}

/** Set a document (create or overwrite) */
export async function restSetDoc(user, collectionName, docId, data) {
  const token = await getToken(user);
  const url = `${BASE_URL}/${collectionName}/${docId}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: toFields(data) }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`setDoc ${collectionName}/${docId}: ${res.status} — ${err}`);
  }
  return res.json();
}

/** Add a document (auto-generated ID) */
export async function restAddDoc(user, collectionName, data) {
  const token = await getToken(user);
  const url = `${BASE_URL}/${collectionName}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: toFields(data) }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`addDoc ${collectionName}: ${res.status} — ${err}`);
  }
  return res.json();
}

/** Delete a document */
export async function restDeleteDoc(user, collectionName, docId) {
  const token = await getToken(user);
  const url = `${BASE_URL}/${collectionName}/${docId}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`deleteDoc ${collectionName}/${docId}: ${res.status} — ${err}`);
  }
}

/** List all documents in a collection (returns array of { id, ...data }) */
export async function restListDocs(user, collectionName) {
  const token = await getToken(user);
  const url = `${BASE_URL}/${collectionName}`;
  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`listDocs ${collectionName}: ${res.status} — ${err}`);
  }
  const body = await res.json();
  if (!body.documents) return [];
  return body.documents.map((doc) => {
    const name = doc.name.split('/').pop();
    return { id: name };
  });
}

/** Clear all documents in a collection */
export async function restClearCollection(user, collectionName) {
  const docs = await restListDocs(user, collectionName);
  await Promise.all(docs.map((d) => restDeleteDoc(user, collectionName, d.id)));
}
