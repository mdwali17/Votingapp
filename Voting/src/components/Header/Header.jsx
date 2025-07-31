import React, { useState } from 'react'
// import Container from '../Container/Container'
// import { Link, useNavigate } from 'react-router-dom'
// import Logo from '../Logo/Logo'
// import {useSelector} from 'react-redux'

function Header() {
  // const authStatus=useSelector((state)=>state.auth.status)
  // const navigate=useNavigate()

  // const navItems=[
  //   {
  //     name:'Home',
  //     slug:'/',
  //     active:true
  //   },
  //   {
  //     name:'user',
  //     slug:'/signup',
  //     active:!authStatus,
  //   },
  //   {
  //     name:'Login',
  //     slug:'/login',
  //     active:!authStatus
  //   },
  //   {
  //     name:'Profile',
  //     slug:'/profile',
  //     active:authStatus
  //   },
    // {
    //   name:'',
    //   slug:'',
    //   active:
    // }
  // ]
  const [isOpen ,setIsOpen]=useState(false);
  return (
    <header >
      <nav className='bg-white border-gray-500 dark:bg-gradient-to-l from-green-300 to-orange-300 dark:border-gray-500'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
    
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-black'>My-App</span>
          
          {/* <button
          type='button'
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          onClick={()=>setIsOpen(!isOpen)}
          >
            <span>Open main menu</span>
            <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            >
              <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
          </button> */}
            <div className={`${isOpen ? "block":"hidden"}w-full md:flex md:w-auto`}>
              <ul className='flex flex-col font-medium mt-4 md:flex-row md:space-x-8 md:mt-0'>
                <li>
                  <a href="/" className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-700 md:dark:hover:text-orange-700 dark:hover:bg-gray-900 dark:hover:text-gray-900 md:dark:hover:bg-transparent'>Home</a>
                </li>
                <li>
                <a href="/user/profile" className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-700 md:dark:hover:text-orange-700 dark:hover:bg-gray-900 dark:hover:text-gray-900 md:dark:hover:bg-transparent'>Profile</a>
                </li>
                <li>
                <a
                href="/user/login"
                className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-700 md:dark:hover:text-orange-700 dark:hover:bg-gray-900 dark:hover:text-gray-900 md:dark:hover:bg-transparent'
              >
                login
              </a>
                </li>
                <li>
                <a
                href="#"
                className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-700 md:dark:hover:text-orange-700 dark:hover:bg-gray-900 dark:hover:text-gray-900 md:dark:hover:bg-transparent'
              >
                Contact
              </a>
                </li>
                <li>
                <a
                href="/user/signup" target='_self'
                className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-700 md:dark:hover:text-orange-700 dark:hover:bg-gray-900 dark:hover:text-gray-900 md:dark:hover:bg-transparent'
              >
                Signup
              </a>
                </li>
              </ul>
            </div>
        </div>
      </nav>
    </header>
    
  )
}

export default Header