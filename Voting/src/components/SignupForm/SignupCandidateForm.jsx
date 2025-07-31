import React, { useState } from 'react'
import API from '../../Api/axios';
import { useNavigate } from 'react-router-dom';

function SignupCandidateForm({token}) {
    const [candidate, setCandidate]=useState({
        name:"",
        party:"",
        age:"",
    });
    const [message,setMessage]=useState("");
    const [error,setError]=useState(null);
    const navigate=useNavigate

    const handleChange=(e)=>{
        const {name ,value}=e.target;
        setCandidate({...candidate,[name]:value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setMessage("");
        setError(null);
        try {
            const token=localStorage.getItem("token")
            const response=await API.post("http://localhost:3000/candidate/add",candidate,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setMessage('candidate added successfully');
            setCandidate({
                name:"",
                party:"",
                age:"",
            })
            navigate('/candidate/')
        } catch (error) {
            console.error(error);
            setError(
                error.response?.data?.message || "failed to add candidate. please try again"
            )
        }
    }
  return (
    <div className='w-full max-w-md mx-auto'>
        <h1 className='text-lg font-bold'>Register-Candidate</h1>
        {message && <p className='text-green-600 mb-4'>{message}</p>}
        {error && <p className='text-red-600 mb-4'>{error}</p>}
        <form onSubmit={handleSubmit} className='p-4 rounded-xl shadow-md shadow-current mt-5'>
            <div>
                <label className='block text-gray-700'>Name</label>
                <input 
                type="text"
                name='name'
                value={candidate.name}
                onChange={handleChange}
                className='w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                required
                />
            </div>
            <div>
                <label className='block text-gray-700'>Party</label>
                <input 
                type="text"
                name='party'
                value={candidate.party}
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
                value={candidate.age}
                onChange={handleChange}
                className='w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                required
                />
            </div>
            <button className='w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-offset-2 mt-4'>Add Candidate</button>
        </form>
    </div>
  )
}

export default SignupCandidateForm