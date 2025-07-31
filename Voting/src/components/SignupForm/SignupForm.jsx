import API from '../../Api/axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignupForm() {
    const [formData,setFormData]=useState({
        name:'',
        age:'',
        email:'',
        mobile:'',
        address:'',
        adharCardNumber: '',
        password: '',
        role:'',
    });
    const [error,setError]=useState(null);
    const navigate=useNavigate();

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError(null);
        try {
            const response=await API.post("http://localhost:3000/user/signup",formData,{
                headers:{
                    "Content-Type":"application/json",
                }
            });
            setFormData({
                name:'',
                age:'',
                email:'',
                mobile:'',
                address:'',
                adharCardNumber:'',
                password: '',
                role:'',
            })
            if (response.status === 200) {
                const {token}=response.data;
                localStorage.setItem("token",token);
                alert("signup successful");
                navigate('/user/profile');
            }
        } catch (error) {
            setError(error.response?.data?.error || "Signup failed");
        }
    };
  return (
    <div className='w-full max-w-md  mx-auto'>
        <h1 className='text-lg font-bold'>Signup</h1>
        {error && <p className='text-red-500'>{error}</p>}
        <form onSubmit={handleSubmit} className='p-4 rounded-xl shadow-md shadow-current mt-5'>
            <div>
                <label className='block text-gray-700'>Name</label>
                <input 
                type="text"
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                required
                />
            </div>
            <div>
                <label className='block text-gray-700'>Age</label>
                <input 
                type="number"
                name='age'
                value={formData.age}
                onChange={handleChange}
                className='w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                required
                />
            </div>
            <div>
                <label className='block text-gray-700'>Email</label>
                <input 
                type="email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                required
                />
            </div>
            <div>
                <label className='block text-gray-700'>Mobile-Number</label>
                <input 
                type="text"
                name='mobile'
                value={formData.mobile}
                onChange={handleChange}
                className='w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                required
                />
            </div>
            <div >
                <label className='block text-gray-700'>Address</label>
                <input 
                type="text"
                name='address'
                value={formData.address}
                onChange={handleChange}
                className='w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                required
                />
            </div>
            <div>
                <label className='block text-gray-700'>Adhar card number</label>
                <input
                type="Number"
                name="adharCardNumber"
                value={formData.adharCardNumber}
                onChange={handleChange}
                placeholder='123456789012'
                className='w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-blue-400'
                required
                />
            </div>
            <div>
                <label className='block text-gray-700'>Password</label>
                <input 
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}                    
                placeholder='Enter Password'
                className='w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-blue-400'
                required
                />
            </div>
            <div>
                <label className='block text-gray-700'>Role</label>
                <select 
                name="role"
                value={formData.role}
                onChange={handleChange}                    
                className='w-full border-gray-300 rounded p-2 focus:ring focus:ring-indigo-300'
                >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button
            type='submit'
            className='w-full mt-2 bg-indigo-500 text-white py-3 rounded hover:bg-indigo-600'
            >Signup</button>
        </form> 
    </div> 
  )
}

export default SignupForm
