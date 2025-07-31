import React, { useState } from 'react'
import API from '../../Api/axios';
import { useParams,useNavigate } from 'react-router-dom';


function EditCandidateForm() {
    const {id}=useParams();
    const navigate =useNavigate();
    const [formData,setFormData]=useState({name:"",party:"",age:""});
    const [error,setError]=useState("");
    const [message,setMessage]=useState("");
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value});
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError("");
        setMessage("");
        
        try {
            const token=localStorage.getItem('token');
            const response=await API.put(`http://localhost:3000/candidate/update/${id}`,formData,
                {
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type":"application/json",
                    }
                }
            );
            console.log("Candidate Successfully:",response.data);
            setMessage("Candidate updated Successfully");
            alert("Candidate Updated Successfully")
            navigate('/candidate');
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || 'Failed to update candidate .please try again.');
        }
    }
  return (
    <div className='max-w-md mx-auto shadow-lg shadow-current rounded-lg p-2 my-auto mt-36'>
        <h1 className='text-2xl font-bold mb-4'>Edit Candidate</h1>
        {error && <p className='text-red-600 mb-4'>{error}</p>}
        {message && <p className='text-green-600'>{message}</p>}
        <form onSubmit={handleSubmit} className='space-y-4'><div>
        <label className='block text-gray-700'>Name</label>
        <input 
        type="text"
        name='name'
        placeholder='Candidate Name'
        value={formData.name || ''}
        onChange={handleChange}
        className='w-full p-2 border rounded-lg'
        required
        />
      </div>
      <div>
        <label className='block text-gray-700'>Party</label>
        <input 
        type="text"
        name="party"
        placeholder='Party Name'
        value={formData.party || ''}
        onChange={handleChange}
        className='w-full p-2 border rounded'
        required
        />
      </div>

      <div>
        <label className='block text-gray-700'>Age</label>
        <input 
        type="number"
        name="age"
        placeholder='age'
        value={formData.age || ''}
        onChange={handleChange}
        className='w-full p-2 border rounded'
        required
        />
      </div>
      <button type='submit' className='bg-blue-600 text-white w-full p-2 rounded'>Candidate Update
      </button>
        </form>
    </div>
  )
}

export default EditCandidateForm