import { useState } from 'react';
import { signup } from '../utils/userapi';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

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
  const navigate=useNavigate();
  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      localStorage.setItem('token', res.token);
      toast.success('Signed up successfully');
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
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>
              <form onSubmit={handle} className="space-y-2">
                <input
                  required
                  placeholder="Name"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-1 focus:ring-red-800 outline-none space-y-3"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
                <input
                  required
                  placeholder="Age"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-1 focus:ring-red-800 outline-none space-y-3"
                  value={form.age}
                  onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                />
                <input
                  required
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-1 focus:ring-red-800 outline-none space-y-3"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        />
        <input
          required
          placeholder="Mobile Number"
          className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-1 focus:ring-red-800 outline-none space-y-3"
          value={form.mobile}
          onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))}
        />
        <input
          required
          placeholder="Address"
          className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-1 focus:ring-red-800 outline-none space-y-3"
          value={form.address}
          onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
        />
        <input
          required
          placeholder="Adhar Card Number"
          className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-1 focus:ring-red-800 outline-none space-y-3"
          value={form.adharCardNumber}
          onChange={e => setForm(f => ({ ...f, adharCardNumber: e.target.value }))}
        />
        <input
          required
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-1 focus:ring-red-800 outline-none space-y-3"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        />
        <select
          className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-1 focus:ring-red-800 outline-none space-y-3"
          value={form.role}
          onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-300" type="submit">
          Register
        </button>
      </form>
    </div>
    </div>
  );
}
