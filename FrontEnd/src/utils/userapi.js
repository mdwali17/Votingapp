const BASE = import.meta.env.VITE_API_URL;
const request = async (path, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${BASE}/user,${path}`, {
    credentials: 'include',
    ...options,
    headers,
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const err = (data && data.error) || res.statusText || 'Request failed';
    throw new Error(err);
  }
  return data;
};

export const signup = (payload) => request('/signup', {
  method: 'POST',
  body: JSON.stringify(payload),
});

export const login = (payload) => request('/login', {
  method: 'POST',
  body: JSON.stringify(payload),
});

export const getProfile = () => request('/profile');

export const changePassword = (payload) => request('/p/password', {
  method: 'PUT',
  body: JSON.stringify(payload),
});
