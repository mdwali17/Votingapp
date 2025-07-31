import React, { useEffect, useState } from 'react'
import API from '../../Api/axios';
import { useNavigate} from 'react-router-dom';
function Vote() {
    const[candidates,setCandidate]=useState([]);
    const[message,setMessage]=useState('');
    const[error,setError]=useState('');
    const navigate=useNavigate();

    const fetchCandidates=async()=>{
        try {
            const response=await API.get('/candidate/');
            setCandidate(response.data);
        } catch (error) {
            console.error(error);
            setError('failed to fetch candidates');
        }
    }

    const handleVote=async(_id)=>{
      try {
        const response=await API.post(`/voting/vote/${_id}`,{},{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`,
          },
        })
        setMessage(response.data.message);
        alert("Succesfully voted")
        navigate("/voting/Vote/count")
        setError('');
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || '');
        setMessage('');
      }
    }
    useEffect(()=>{
      fetchCandidates();
    },[]);
  return (
    <div className='p-6 max-w-3xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Vote For Your Candidate</h1>
      {error && <p className='text-red-600'>{error}</p>}
      {message && <p className='text-green-600'>{message}</p>}

      <ul className='space-y-4'>
        {candidates.map((candidate)=>(
          <li
          key={candidate._id}
          className='p-4 border rounded flex max-w-md mx-auto shadow-lg shadow-current justify-between items-center'
          >
            <div>
              <h2 className='text-xl font-bold'>{candidate.name}</h2>
              <h5 className='text-sm font-bold'>{candidate.party}</h5>
            </div>
            <button onClick={()=>handleVote(candidate._id)}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:to-blue-700'  
            >
              vote
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Vote