import { useState } from 'react';
import { changePassword } from '../utils/userapi';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


export default function ChangePassword() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' });
  const navigate=useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await changePassword(form);
      toast.success('Password changed');
      setTimeout(()=>{
        navigate('/');
      },1200)
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-indigo-300 to-gray-400 p-6'>
    <Toaster position="top-right" reverseOrder={false} />
    <div className="backdrop-blur-md bg-white/80 border border-blue/5 rounded-3xl shadow-2xl w-full max-w-md p-8 text-gray-600 relative overflow-hidden">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Change Password</h2>
      <form onSubmit={handle} className="space-y-2">
        <input
          required
          type="password"
          placeholder="Current Password"
          className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-1 focus:ring-yellow-600 outline-none space-y-3"
          value={form.currentPassword}
          onChange={e => setForm(f => ({ ...f, currentPassword: e.target.value }))}
        />
        <input
          required
          type="password"
          placeholder="New Password"
          className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-1 focus:ring-yellow-600 outline-none space-y-3"
          value={form.newPassword}
          onChange={e => setForm(f => ({ ...f, newPassword: e.target.value }))}
        />
        <button className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300" type="submit">
          Change
        </button>
      </form>
    </div>
    </div>
  );
}
