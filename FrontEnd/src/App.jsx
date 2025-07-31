import { useEffect,useState } from 'react'
// import { getCandidates,getUsers,vote } from './utils/api';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import { AuthProvider,useAuth } from './AuthContext';
import Signup from './component/Signup';
import Login from './component/Login';
import Profile from './component/Profile';
import ChangePassword from './component/ChangePassword';
import Candidates from './component/Candidate';
import CandidateForm from './component/CandidateForm';
import './App.css'

function Nav() {
  const { user, logout } = useAuth();
  return (
    <div className="flex gap-4 p-4 bg-gray-100">
      <Link to="/" className="font-medium">Home</Link>
      {!user && <Link to="/signup">Sign Up</Link>}
      {!user && <Link to="/login">Login</Link>}
      {user && <Link to="/profile">Profile</Link>}
      {user && <Link to="/change-password">Change Password</Link>}
      {user && <button onClick={logout} className="ml-auto text-red-500">Logout</button>}
    </div>
  );
}

// function App1() {
//    const [users, setUsers] = useState([]);
//   const [candidates, setCandidates] = useState([]);
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [status, setStatus] = useState('');

//   useEffect(() => {
//     getUsers().then(setUsers).catch(e => console.error(e));
//     getCandidates().then(setCandidates).catch(e => console.error(e));
//   }, []);

//   const handleVote = async () => {
//     if (!selectedCandidate) return;
//     try {
//       const res = await vote({ candidateId: selectedCandidate, userId: users[0]?.id });
//       setStatus('Voted successfully');
//       console.log(res);
//     } catch (e) {
//       setStatus('Vote failed: ' + e.message);
//     }
//   };

//   return (
//     <>
//         <div className="max-w-xl mx-auto p-6 space-y-6 font-sans">
//       <h1 className="text-2xl font-bold">Voting App</h1>

//       <section className="bg-white shadow rounded p-4">
//         <h2 className="font-semibold mb-2">Users</h2>
//         {users.length === 0 ? (
//           <p>No users loaded.</p>
//         ) : (
//           <ul className="list-disc list-inside">
//             {users.map(u => (
//               <li key={u.id}>{u.name || u.username || u.email || `User ${u.id}`}</li>
//             ))}
//           </ul>
//         )}
//       </section>

//       <section className="bg-white shadow rounded p-4">
//         <h2 className="font-semibold mb-2">Candidates</h2>
//         {candidates.length === 0 ? (
//           <p>No candidates loaded.</p>
//         ) : (
//           <div className="flex flex-col gap-2">
//             {candidates.map(c => (
//               <label key={c.id} className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="candidate"
//                   value={c.id}
//                   onChange={() => setSelectedCandidate(c.id)}
//                   checked={selectedCandidate === c.id}
//                 />
//                 <span>{c.name || `Candidate ${c.id}`}</span>
//               </label>
//             ))}
//           </div>
//         )}
//       </section>

//       <button
//         onClick={handleVote}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         disabled={!selectedCandidate || users.length === 0}
//       >
//         Vote
//       </button>

//       {status && <p className="mt-2">{status}</p>}
//     </div>
//     </>
//   )
// }
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<div>Welcome to Voting App</div>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/candidates/new" element={<CandidateForm />} />
            <Route path="/candidates/:id/edit" element={<CandidateForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

// export default App1
