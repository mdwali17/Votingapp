import { useState } from 'react';
import { changePassword } from '../utils/userapi';

export default function ChangePassword() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' });
  const [msg, setMsg] = useState('');

  const handle = async (e) => {
    e.preventDefault();
    try {
      await changePassword(form);
      setMsg('Password changed');
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Change Password</h2>
      {msg && <div>{msg}</div>}
      <form onSubmit={handle} className="space-y-2">
        <input
          required
          type="password"
          placeholder="Current Password"
          className="w-full border rounded px-3 py-2"
          value={form.currentPassword}
          onChange={e => setForm(f => ({ ...f, currentPassword: e.target.value }))}
        />
        <input
          required
          type="password"
          placeholder="New Password"
          className="w-full border rounded px-3 py-2"
          value={form.newPassword}
          onChange={e => setForm(f => ({ ...f, newPassword: e.target.value }))}
        />
        <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded" type="submit">
          Change
        </button>
      </form>
    </div>
  );
}
