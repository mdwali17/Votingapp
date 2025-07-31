import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../../Api/axios';

function LoginForm() {
  const [credentials,setCredentials]=useState({adharCardNumber:"",password:""});
  const [error,setError]=useState(null);
  const navigate=useNavigate();

  const handleChange=(e)=>{
    const {name ,value}=e.target;
    setCredentials({...credentials,[name]:value});
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError(null);

    try {
      const response=await API.post("/user/login",credentials);
      if (response.status === 200) {
        const token=response.data.token;
        localStorage.setItem("token",token);
        alert('Login successful!');
        navigate("/user/profile");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Login failed");
    }
  };
  return (
    <form onSubmit={handleSubmit} className='p-4 max-w-md mx-auto shadow-md shadow-current rounded   space-y-4 mt-36'>
      <h2 className='text-xl font-bold mb-4'>Login</h2>
      {error && <div className='mt-2 text-red-600'>{error}</div>}
      <div>
        <label className='block text-gray-700'>Adhar Card Number</label>
        <input 
        type="text"
        name="adharCardNumber"
        placeholder='AdharCardNumber'
        value={credentials.adharCardNumber}
        onChange={handleChange}
        className='w-full p-2 border rounded'
        required
        />
      </div>
      <div>
        <label className='block text-gray-700'>Password</label>
        <input 
        type="password"
        name="password"
        placeholder='password'
        value={credentials.password}
        onChange={handleChange}
        className='w-full p-2 border rounded'
        required
        />
      </div>
      <button type='submit' className='bg-blue-600 text-white w-full p-2 rounded'>Login
        {/* <div className='alert rounded shadow-md shadow-current font-light'>{alert}</div> */}
      </button>
    </form>
  )
}

export default LoginForm