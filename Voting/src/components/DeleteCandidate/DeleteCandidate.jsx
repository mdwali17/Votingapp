import React, { useState } from 'react'
import API from '../../Api/axios';
import { useNavigate, useParams } from 'react-router-dom';

function DeleteCandidate() {

    const [responseMessage,setResponseMessage]=useState('');
    const [error ,setError]=useState('');
    const {candidateId}=useParams();
    const navigate=useNavigate();

    const handleDelete=async()=>{
        try {
            setResponseMessage('');
            setError('');

            const token=localStorage.getItem('token');
            const response=await API.delete(`candidate/delete/${candidateId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            console.log('response',response)
            setResponseMessage(`Candidate deleted successfully :${response.data.message || response.data}`);
            alert('Deleted Successfully')
            navigate('/candidate/');
        } catch (error) {
            setError(error.response.data.message || 'An error occured.');
        }
    }
  return (
    <div className='max-w-md p-8 w-full shadow-lg shadow-current m-auto p-auto'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>Delete Candidate</h2>
        <button
        className='bg-blue-500 text-white rounded p-2 border-spacing-1 border-black shadow-md shadow-slate-900'
        onClick={handleDelete}>DELETE</button>
    </div>
  )
}

export default DeleteCandidate