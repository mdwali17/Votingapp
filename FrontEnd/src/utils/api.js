const BASE = 'https://voting-6qcx.onrender.com'; // same origin, because Express will serve the built frontend and API together

async function request(path, options = {}) {
  const res = await fetch(path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

export const getUsers = () => request('/user'); // adjust if your route returns list
export const getCandidates = () => request('/candidate');
export const vote = (payload) => request('/voting', {
  method: 'POST',
  body: JSON.stringify(payload),
});
