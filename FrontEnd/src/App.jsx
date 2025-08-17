import { useEffect,useState } from 'react'
import { BrowserRouter as Router, Routes,Route,Link } from 'react-router-dom';
import { AuthProvider,useAuth } from './AuthContext';
import Signup from './component/Signup';
import Login from './component/Login';
import Profile from './component/Profile';
import ChangePassword from './component/ChangePassword';
import Candidates from './component/Candidate';
import CandidateForm from './component/CandidateForm';
import AdminCandidates from './component/AdminCandidate';
import VotePage from './component/VotePage'
import VoteResults from './component/VoteResult';
import Home from './component/Home';
import './App.css'
// import DashBoard from './component/DashBoard';
import ProtectedRoute from './component/ProtectedRoute';

// import Navbar from './component/Navbar';

// function Nav() {
  
//   return (
//     <div className="flex gap-4 p-4 bg-gray-100">
//       <Link to="/">Home</Link>
//       {user && <Link to="/dashboard" className="font-medium">DashBoard</Link>}  
//       {user?.role === 'admin' && (
//           <Link to="/admin/candidates" className="ml-4">
//           Manage Candidates
//         </Link>
//         )}
//         {user && <Link to="/profile" className='ml-auto 20px'>
//           <RiUser2Fill className='border-x-0'/>
//           </Link>}
//       </div>
//     );
//   }
  
  export default function App() {
    const { user } = useAuth();
    return ( 
      
      <>
      <Router>
        {/* <Navbar/> */}
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/candidates" element={<ProtectedRoute user={user}><Candidates/></ProtectedRoute>}/>
            <Route path="/results" element={<ProtectedRoute user={user}>
              <VoteResults />
              </ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute user={user}>
                <Profile /> 
                </ProtectedRoute>}
              />
            <Route path="/change-password" element={<ProtectedRoute user={user}>
              <ChangePassword />
              </ProtectedRoute>
              }/>
            <Route path="/vote/:candidateId" 
            element={<ProtectedRoute user={user}>
              <VotePage />
              </ProtectedRoute>
              } />
            <Route
            path='/admin/candidates'
            element={
              <ProtectedRoute user={user} requiredRole="admin">
                <AdminCandidates/>
              </ProtectedRoute>
            }
            />
            <Route path="/candidates/new" element={<ProtectedRoute user={user} requiredRole="admin">
              <CandidateForm /> 
            </ProtectedRoute>}
            />
            <Route path="/candidates/:id/edit" element={<ProtectedRoute user={user} requiredRole="admin">
              <CandidateForm />
            </ProtectedRoute>
            }/>
        </Routes>  
      </Router>
      </>
  );
}

