import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'


export default function Layout({userData , setUserData}) {

  let nav = useNavigate()
  function logOut()
  {
    localStorage.removeItem('userToken');
    setUserData(null);
    nav('/login')
  }

  return (
    <>
      <Navbar userData={userData} logOut={logOut}/>
        <div className=' container'>
          <Outlet></Outlet>
        </div>
      <Footer/>
    </>
  )
}
