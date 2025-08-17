import { useState } from 'react';
import { login } from '../utils/userapi';
import { useAuth } from '../AuthContext';
import { useNavigate} from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";


export default function Login() {
  const { refreshProfile } = useAuth();
  const [form, setForm] = useState({ adharCardNumber: '', password: '' });
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem('token', res.token);
      toast.success("Login successful!");
      await refreshProfile();
      setTimeout(()=>{
        navigate('/');
      },1200)
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
     <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-300 to-gray-400 p-6'>
      <Toaster position="top-right" reverseOrder={false} />
     <div className="backdrop-blur-md bg-white/80 border border-blue/5 rounded-3xl shadow-2xl w-full max-w-md p-8 text-gray-600 relative overflow-hidden">
    
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <form onSubmit={handle} className="space-y-2">
        <input
          required
          placeholder="Adhar Card Number"
          className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-1 focus:ring-blue-800 outline-none space-y-3"
          value={form.adharCardNumber}
          onChange={e => setForm(f => ({ ...f, adharCardNumber: e.target.value }))}
        />
        <input
          required
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-1 focus:ring-blue-800 outline-none"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300" type="submit">
          Login
        </button>
      </form>
    </div>
    </div>
  );
}
