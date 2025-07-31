import { useState } from 'react';
import { signup } from '../utils/userapi';

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    age:'',
    email: '',
    mobile:'',
    address:'',
    adharCardNumber: '',
    password: '',
    role: 'user', // or 'admin' depending
  });
  const [msg, setMsg] = useState('');

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      localStorage.setItem('token', res.token);
      setMsg('Signed up successfully');
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Sign Up</h2>
      {msg && <div className="text-sm text-red-600">{msg}</div>}
      <form onSubmit={handle} className="space-y-2">
        <input
          required
          placeholder="Name"
          className="w-full border rounded px-3 py-2"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        />
        <input
          required
          placeholder="Age"
          className="w-full border rounded px-3 py-2"
          value={form.age}
          onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
        />
        <input
          required
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        />
        <input
          required
          placeholder="Mobile Number"
          className="w-full border rounded px-3 py-2"
          value={form.mobile}
          onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))}
        />
        <input
          required
          placeholder="Address"
          className="w-full border rounded px-3 py-2"
          value={form.address}
          onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
        />
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
        <select
          className="w-full border rounded px-3 py-2"
          value={form.role}
          onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="w-full bg-green-600 text-white px-4 py-2 rounded" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
