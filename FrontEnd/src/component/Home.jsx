import {React,useEffect,useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { motion } from "framer-motion";
import { useAuth } from '../AuthContext';
import { fetchCandidates } from '../utils/candidateapi';
import { VscAccount } from "react-icons/vsc";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoFacebook } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";



function Home() {
    const { user, logout,refreshProfile,loading:authLoading } = useAuth();
    const [candidates, setCandidates] = useState([]);
    const [loading,setLoading]=useState(true)

    const loadCandidates = async () => {
      try {
        const data = await fetchCandidates();
        setCandidates(data);
      } catch (e) {
        console.error('Error loading candidates', e);
      }
    };

    const checkVote = async () => {
    if (!user) return;
    try {
      // Assuming your backend exposes something like /voting/profile or returns vote status in profile
      const res = await fetch(`/vote`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
      });
      if (res.ok) {
        const d = await res.json();
        if (d.voted) {
          setHasVoted(true);
          setVoteInfo(d); // e.g., { candidateId: ..., timestamp: ... }
        }
      }
    } catch {}
  };

    useEffect(() => {
    const init = async () => {
      setLoading(true);
      await refreshProfile(); // ensure user is loaded
      await loadCandidates();
      await checkVote();
      setLoading(false);
    };
    init();
  }, []);

      if (authLoading || loading) return <div className="p-6">Loading...</div>;
  return (

        <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-gray-700 to-blue-800 text-white">
      {/* Navbar */}
      <nav className="backdrop-blur-md bg-white/10 fixed w-full top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-wide">VoteSphere</h1>
          <div className="flex items-center gap-5">
            <a href="#home" className='font-semibold hover:text-black'>Home</a>
            <a href="#features" className="font-semibold hover:text-black">Features</a>
            <a href="#howtowork" className="font-semibold hover:text-black">How To Work</a>
            <a href="#contact" className="font-semibold hover:text-black">Contact</a>
        {!user && (
          <>
            <Link to="/login" className="px-4 py-2 border-2 border-white rounded-lg hover:bg-white hover:text-purple-600 transition">Login</Link>
            <Link to="/signup" className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-purple-100 transition">Register</Link>
          </>
        )}
        {user && (
          <>
            {user.role === "admin" && (
              <Link to="/admin/candidates" className=" font-semibold hover:text-black">Admin Panel</Link>
            )}
            <Link to="/profile" className="ml-auto flex items-center justify-center text-2xl hover:text-black"><VscAccount/></Link>

          </>
        )}
      </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id='home' className="max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col md:flex-row items-center gap-10">
        {/* Text */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Empower Your <span className="text-yellow-300">Voice</span>
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Join the next generation of online voting — fast, secure, and transparent.
          </p>
          <div className="mt-6 space-x-4">
            <button className="px-6 py-3 bg-yellow-300 text-purple-800 font-semibold rounded-lg hover:bg-yellow-400 transition">
              Get Started
            </button>
            <button className="px-6 py-3 border border-white font-semibold rounded-lg hover:bg-white hover:text-purple-700 transition">
              Learn More
            </button>
          </div>
        </motion.div>
        {/* Illustration */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
        <section id="features">
          <div className="max-w-md w-full mx-auto p-6 space-y-4  relative overflow-hidden">
          <h1 className="text-2xl font-bold">Candidates</h1>  
          <div className="grid gap-4">
          {candidates.map(c => (
          <div
            key={c._id}
            className="border-2  rounded p-4 flex justify-center items-center"
            >
            <div>
              <h2 className="font-semibold">{c.name || `Candidate ${c._id}`}</h2>
              <p>{c.party}</p>
            </div>
          </div>
        ))}
        {candidates.length === 0 && <div>No candidates found.</div>}
        <div className='flex justify-items-start items-center gap-4'>
        <Link to='/candidates'className='mt-2 font-semibold bg-tansparent hover:text-green-800 hover:bg-white border text-white px-6 py-3 rounded-lg ' >Vote </Link>
        <Link to='/results' className='mt-2 bg-red-500 border  text-white px-6 py-3 rounded-lg'>Result</Link>
        </div>
      </div>
      </div>
      </section>
        </motion.div>
      </header>

      <section id="features" className="px-8 py-16 bg-gray-700">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-gray-800 text-shadow-2xs text-shadow-blue-700">Features</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="min-h-48 p-10 shadow-lg rounded-xl hover:shadow-xl bg-blue-950">
            <h3 className="text-2xl font-semibold ">🔒 Secure Voting</h3>
            <p className="text-gray-400 text-xl ">Encrypted and tamper-proof voting process.</p>
          </div>
          <div className="min-h-48 p-10 shadow-lg rounded-xl hover:shadow-xl bg-blue-950">
            <h3 className="text-2xl font-semibold ">⚡ Real-Time Results</h3>
            <p className="text-gray-400 text-xl">Instant and accurate result updates.</p>
          </div>
          <div className="min-h-48 p-10 shadow-lg rounded-xl hover:shadow-xl bg-blue-950">
            <h3 className="text-2xl font-semibold ">🌍 Accessible Anywhere</h3>
            <p className="text-gray-400 text-xl">Vote from any device, anywhere in the world.</p>
          </div>
        </div>
      </section>

      <section id='howtowork' className="py-16 min-h-8 bg-gray-700">
        <div className="max-w-7xl mx-auto text-center text-blue-950">
          <h3 className="text-3xl font-extrabold text-center mb-10 text-gray-800 text-shadow-2xs text-shadow-blue-700">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-8">
            {["Register Your self", "Vote Your Favourite Candidate", "View Results to check the winner"].map((step, i) => (
              <div
                key={i}
                className="bg-gray-400 rounded-xl p-8  shadow hover:shadow-lg transition"
              >
                <div className="text-blue-700 font-bold text-3xl mb-3">{i + 1}</div>
                <h1 className="text-gray-800 text-xl font-semibold">{step}</h1>

              </div>
            ))}
          </div>
        </div>
      </section>

      <footer  id='contact' className="text-center bg-gray-800 text-gray-300">
        <div className='flex items-center justify-between mx-auto'>
          <div className='flex items-center justify-between gap-40 mx-auto '>
          <div className='p-4 space-y-4 '>
            <h2 className='font-bold text-3xl '>Vote Sphere</h2>
            <p className='max-w-xs text-start text-lg'>One vote can spark At VoteSphere,<br /> we bring voices together,<br />building a future led by the people.</p>
          </div>
            <div className='grid grid-cols-1 items-center space-y-4'>
                <Link to="https://www.instagram.com/m.r.__khan_/#" className=" flex items-center text-xl hover:text-black "><FaInstagram /> Instagram</Link>
                <Link to="https://www.facebook.com/profile.php?id=100017848996998&mibextid=rS40aB7S9Ucbxw6v" className=" flex items-center  text-xl hover:text-black"><IoLogoFacebook />Facebook</Link>
                <Link to="https://www.linkedin.com/in/mohd-wali-891081256/" className=" flex items-center text-xl hover:text-black"><FaLinkedin />LinkedIn</Link>
                <Link to="https://github.com/mdwali17" className=" flex items-center text-xl hover:text-black"><FaGithub />GitHub</Link>
            </div>
          </div>
          <div className='flex items-center justify-between gap-40 px-6 mx-auto'>
          <div className='grid grid-cols-1 space-y-2 text-start items-center'>
            <a href="#home" className='text-xl hover:text-black ' >Home</a>
            <a href="#features" className='text-xl hover:text-black' >Feature</a>
            <a href="#howtowork" className='text-xl hover:text-black' >How To Work</a>
          </div>
            <div className='max-w-xs p-7'>
            <h3 className='font-semibold text-xl '>Contact-us</h3>
          <form action="" className='space-y-1 mt-3'>
            <label htmlFor="" className='font-normal text-lg flex items-start'>Email
              </label>
            <input type="text"
            placeholder='email'
            className='w-full border-2 rounded-sm py-1 px-2'
            />
            <label htmlFor="" className='font-normal text-lg flex items-start '>Description
              </label>
            <input type="text"
            placeholder='feedback'
            className='w-full border-2 rounded-sm py-1 px-2'
            />
            <button type='submit' className='max-w-md bg-gray-500 rounded-sm mt-2 px-2 py-1 flex items-start text-black font-mono'>SEND FEEDBACK</button>
          </form>
          </div>
            </div>
        </div>
        © {new Date().getFullYear()} VoteNow. All rights reserved.
      </footer>
    </div>
  )
}
export default Home