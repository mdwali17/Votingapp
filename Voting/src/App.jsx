import './App.css'
import Footer from './components/Footer/Footer'
import { useEffect, useState } from 'react'
import voteimg from './assets/voting-200.png';
import Navbar from './components/Navbar/Navbar'


function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the API
    fetch('/api/') // Proxy will forward this to the backend's `/`
      .then((response) => {
        if (!response.ok) throw new Error('API Not Found');
        return response.json();
      })
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Error fetching API:', error));
  }, []);

  return (
    <div className='min-h-full bg-gradient-to-br from-orange-200 to-green-200'>
      <Navbar/>
      <h1 className='text-4xl font-bold text-blue-800 mb-4 mt-5'>Welcome to Voting App</h1>
      {message}
      <div className='bg-gradient-to-t from-orange-400 to-green-400 w-96 h-96 mx-auto mt-5 rounded-lg shadow-none'>
        <img src={voteimg} alt="" className='w-80 h-80 pt-8 mx-5'/>
      </div>
      <h2 className='font-semibold mt-5 text-lg space-y-5'>A electronic based voting </h2>
      <button type='submit' className='bg-white'>{}</button>
      <Footer/>
    </div>
  )
}

export default App
