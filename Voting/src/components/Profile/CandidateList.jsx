import React, { useEffect, useState } from 'react'
import API from '../../Api/axios';
import { useNavigate, useParams } from 'react-router-dom';

function CandidateList() {
    const [candidates, setCandidates]=useState([]);
    const [error,setError]=useState("");
    const [loading ,setLoading]=useState(true);
    const navigate=useNavigate();
    const handleEdit=(candidate)=>{
        navigate(`/candidate/update/${candidate._id}`);
    }

    const handleDelete=(candidate)=>{
        navigate(`/candidate/delete/${candidate._id}`)
    }
    useEffect(()=>{
        const fetchCandidates=async()=>{
            try {
                const response =await API.get("http://localhost:3000/candidate/",candidates);
                setCandidates(response.data);
                setError("");
            } catch (error) {
                console.error("Error fetching candidates:",err);
                setError("failed to fetch candidates. Please try Again later");
            }
            finally{
                setLoading(false);
            }
        };
        fetchCandidates();
    },[]);
  return (
    <div>
        <h1 className='text-2xl font-bold mb-4'>Candidates</h1>
        {loading && <p>Loading candidates...</p>}
        {error && <p className='text-red-600'>{error}</p>}
        {!loading && candidates.length === 0 && !error && (
            <p className='text-gray-500'>No Candidates Found</p>
        )}
        <table>
            <tr>
                <th></th>
            </tr>
            <tr>
                <td></td>
            </tr>
        </table>
        <ul className='max-w-md mx-auto'>
            {candidates.map((candidate) => (
                <li
                key={candidate._id} className='p-2 border border-black rounded-lg mb-2 shadow-lg shadow-current flex '>
                    <div className='mx-auto'>
                    <p>
                        <strong>Name:</strong>{candidate.name}</p>   
                    <p> 
                        <strong>Party:</strong>{candidate.party}</p>
                    <p>
                        <strong>Age:</strong>{candidate.age}
                    </p>
                    </div>
                    <div className='space-y-2 '>
                    <button 
                    className='bg-green-700 rounded p-1 text-white focus:ring-2 my-auto hover:bg-green-900 border border-black '
                    onClick={()=>handleEdit(candidate)}>UPDATE</button>
                    <br />
                    <button
                    className='bg-red-700 rounded px-2 py-1 text-white my-auto hover:bg-red-900 border border-black'
                    onClick={()=>handleDelete(candidate)}>DELETE</button>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default CandidateList