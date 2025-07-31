import React, { useEffect, useState } from 'react'
import Login from '../../pages/Login'
import Profile from '../../pages/Profile'

function Auth() {
    const [token,setToken]=useState(null);

    useEffect(()=>{
      const savedToken=localStorage.getItem('authToken');
      if(savedToken){
        setToken(savedToken);
      }
    },[])
    const handlelogin=(newToken)=>{
        setToken(newToken);
        localStorage.setItem('authToken',newToken);
    };

  return (
    <div className='App'>{token ?(
        <Profile token={token}/>
    ):(
        <Login onLogin={handlelogin}/>
    )}
    </div>
  )
}

export default Auth;