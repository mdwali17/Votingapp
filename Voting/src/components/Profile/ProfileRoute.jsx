import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../../Api/axios';

function ProfileRoute() {
  const [profile ,setProfile]=useState(null);
  const [error,setError]=useState(null);
  const navigate=useNavigate();

  useEffect(()=>{
    const fetchProfile =async()=>{
      try {
        const token=localStorage.getItem("token");
        const response=await API.get("/user/profile",{
          headers:{
            Authorization:`Bearer ${token}`,
          },
      });
      setProfile(response.data.user);
      } catch (err) {
        const errormessage=err.response?.data?.error || "failed to fetch profile .please try again.";
        setError(errormessage);

        if (err.response?.status===401) {
          navigate("/user/login")
        }
      }
    };
    fetchProfile();
  },[navigate]);

  const handleVote=()=>{
    navigate('/voting/vote');
  }
  const handleCount=()=>{
    navigate('/voting/vote/count');
  }
  const handleCandidate=()=>{
    navigate('/candidate/')
  }
  const handleDashBoard=()=>{
    navigate('/user/profile')
  }
  
  if(error){
    return <div className='text-red-600'>{error}</div>
  }

  if (!profile) {
    return <div>Loading profile...</div>
  }
  return (
    <div className='flex'>
      <div 
      className='inline-grid m-auto p-4 rounded-r-2xl border-2  border-green-600'>
        <h2 className='text-xl font-bold mt-4'>Hello      {profile.name}</h2>
        <button
        onClick={handleDashBoard}
        className='bg-orange-400 rounded-lg shadow-md shadow-current hover:bg-orange-500 w-auto border-2  border-blue-900 p-2 mt-10'>DashBoard
        </button>

        <button
        onClick={handleVote}
        className='bg-orange-400 rounded-lg shadow-md shadow-current hover:bg-orange-500 w-auto border-2  border-blue-900 p-2 mt-10'>Vote
        </button>

        <button
        onClick={handleCount}
        className='bg-orange-400 rounded-lg shadow-md shadow-current hover:bg-orange-500 w-auto border-2  border-blue-900 p-2 mt-10'
        >
          Result
        </button>

        <button
        onClick={handleCandidate}
        className='bg-orange-400 rounded-lg shadow-md shadow-current hover:bg-orange-500 w-auto border-2  border-blue-900 p-2 mt-10'
        >
          Candidates
        </button>
      </div>

      <div className='absolute top-60 right-0 w-auto'>
      <h1 className=' font-bold text-2xl text-orange-600 text-clip'>WELCOME {profile.name}</h1>
      </div>
    <div className='p-4 space-y-2 rounded-lg m-auto absolute right-0'>
      
      <div>
        <strong>Email: </strong>{profile.email}
      </div>
      <div>
        <strong>Adhar Card Number: </strong>{profile.adharCardNumber}
      </div>
      <div>
        <strong>Role: </strong>{profile.role}
      </div>
    </div>
    </div>
  )
}

export default ProfileRoute