import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({userData , logOut}) {
  return (
    <>
      <nav className=' p-2 flex-column nav-bg top-0 d-flex flex-md-row justify-content-between w-100'>
      
        <div className=' left-nav flex-column flex-md-row d-flex align-items-center'>
        <Link to='home'><h1 className=' m-0 pe-3'>Noxe</h1></Link>


          {userData?<ul className=' list-unstyled m-0 d-flex flex-column flex-md-row align-items-center'>
            <li className=' px-2'><Link to='home'>Home</Link></li>
            <li className=' px-2'><Link to='movies'>Movies</Link></li>
            <li className=' px-2'><Link to='tv'>Tv</Link></li>
            <li className=' px-2'><Link to='people'>People</Link></li>
          </ul>:'' }
         </div>
        

        <div className=' right-nav flex-column flex-md-row d-flex align-items-center end-0'>

          <div className='socila-media'>
            <i className=' fab mx-1 fa-facebook'></i>
            <i className=' fab mx-1 fa-instagram'></i>
            <i className=' fab mx-1 fa-twitter'></i>
            <i className=' fab mx-1 fa-spotify'></i>
            <i className=' fab mx-1 fa-youtube'></i>
          </div>

          <ul className=' list-unstyled m-0 d-flex flex-column flex-md-row align-items-center'>
            {userData?
            <>
              <li className=' px-2'><Link to='profile'>Profile</Link></li>
              <li className=' px-2 cursor-pointer' ><span onClick={logOut} >Logout</span></li>
            </>:
            <>
              <li className=' px-2'><Link to='login'>Login</Link></li>
              <li className=' px-2'><Link to='/'>Register</Link></li>
            </>
            }
            

            
          </ul>

        </div>
        
      </nav>
    </>
  )
}
