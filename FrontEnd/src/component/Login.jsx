import { useState } from 'react';
import { login } from '../utils/userapi';
import { useAuth } from '../AuthContext';

export default function Login() {
  const { refreshProfile } = useAuth();
  const [form, setForm] = useState({ adharCardNumber: '', password: '' });
  const [msg, setMsg] = useState('');

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem('token', res.token);
      setMsg('Logged in');
      await refreshProfile();
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Login</h2>
      {msg && <div className="text-sm text-red-600">{msg}</div>}
      <form onSubmit={handle} className="space-y-2">
        <input
          required
          placeholder="Adhar Card Number"
          className="w-full border rounded px-3 py-2"
          value={form.adharCardNumber}
          onChange={e => setForm(f => ({ ...f, adharCardNumber: e.target.value }))}
        />
        <input
          required
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        />
        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
