const BASE = 'http://localhost:3000'
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const fetchCandidates = async () => {
  const res = await fetch(`${BASE}/candidate`, {
    headers: getAuthHeaders(),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to load candidates');
  return res.json();
};

export const fetchCandidate = async (id) => {
  const res = await fetch(`${BASE}/candidate/${id}`, {
    headers: getAuthHeaders(),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to load candidate');
  return res.json();
};

export const addCandidate = async (payload) => {
  const res = await fetch(`${BASE}/candidate/add`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || err.message || 'Add failed');
  }
  return res.json();
};

export const updateCandidate = async (id, payload) => {
  const res = await fetch(`${BASE}/candidate/update/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || err.message || 'Update failed');
  }
  return res.json();
};

export const deleteCandidate = async (id) => {
  const res = await fetch(`${BASE}/candidate/delete/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || err.message || 'Delete failed');
  }
  return res.json();
};
