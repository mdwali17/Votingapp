import React, { useEffect, useState } from 'react'
import API from '../../Api/axios';

function VoteCount() {
    const [voteData,setVoteData]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);

    useEffect(()=>{
        const fetchVoteData=async()=>{
            try {
                const response=await API.get('voting/vote/count');
                setVoteData(response.data);
                setLoading(false);
            } catch (error) {
                setError("failed to fetch data");
                setLoading(false);
            }
        };
        fetchVoteData();
    },[]);

    if(loading) return <div className='text-center mt-10'>Loading...</div>

    if(error) return <div className='text-center mt-10 text-red-500'>{error}</div>

  return (
    <div className='max-w-md m-auto p-4 mt-32  shadow-lg rounded-3xl shadow-current'>
        <h1 className='text-2xl font-bold text-center mb-6'>Vote Count</h1>
        <table className='min-w-full border-4 border-green-800'>
            <thead >
                <tr >
                    <th className=' px-4 py-2 text-left'>Party</th>
                    <th className=' px-4 py-2 text-right'>Votes</th>
                </tr>
            </thead>
            <tbody>
                {voteData.map((item,index)=>(
                    <tr key={index} className=' border-4 border-green-800 odd:bg-gray-100  even:bg-white'>
                        <td className=' px-4 py-2'>{item.party}</td>
                        <td className=' px-4 py-2 text-right'>{item.count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default VoteCount