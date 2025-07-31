import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import App from './App.jsx'
import SignupCandidate from './pages/SignupCandidate.jsx'
import Candidate from './pages/Candidate.jsx'
import EditCandidate from './pages/EditCandidate.jsx'
import Vote from './pages/VotePages.jsx'
import VoteCount from './pages/VoteCountPages.jsx'
import DeleteCandidatePage from './pages/DeleteCandidatePage.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  
    <Router>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/voting/vote' element={<Vote/>}/>
        <Route path='/voting/vote/count' element={<VoteCount/>}/>
        <Route path='/candidate/delete/:candidateId' element={<DeleteCandidatePage/>}/>
        <Route path='/candidate/update/:id' element={<EditCandidate/>}/>
        <Route path='/candidate/' element={<Candidate/>}/>
        <Route path='/candidate/add' element={<SignupCandidate/>}/>  
        <Route path='/user/profile' element={<Profile/>} />
        <Route path='/user/login' element={<Login/>}/>
        <Route path='/user/signup' element={<Signup/>}/>
      </Routes>
    </Router>
  </StrictMode>
)
