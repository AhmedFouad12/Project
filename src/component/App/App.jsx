import './App.module.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../Home/Home';
import Movies from '../Movies/Movies';
import Tv from '../Tv/Tv';
import People from '../People/People';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ItemDetails from '../ItemDetails/ItemDetails';
import { useContext, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Profile from '../Profile/Profile';
import { AuthContext } from '../Context/AuthContext';
import ProtectiveRoute from '../ProtectiveRoute/ProtectiveRoute';




function App() {
  
  let {userData , setUserData} = useContext(AuthContext)
  
  useEffect(() => {
    if(localStorage.getItem('userToken') !== null)
    {
      userTokenData()
    }
    }, [])
    
    
    function userTokenData()
    {
      let encodedtoken = localStorage.getItem('userToken');
      let decodedToken = jwtDecode(encodedtoken);
      setUserData(decodedToken);
      
    }
    
  let routers = createBrowserRouter([
    {path:'/' , element:<Layout setUserData={setUserData} userData={userData}/> , children:
    [
      {path:'home' , element:<ProtectiveRoute><Home/></ProtectiveRoute>},
      {path:'movies' , element:<ProtectiveRoute><Movies/></ProtectiveRoute>},
      {path:'itemDetails/:id/:media_type' , element:<ProtectiveRoute><ItemDetails/></ProtectiveRoute>},
      {path:'tv' , element:<ProtectiveRoute><Tv/></ProtectiveRoute>},
      {path:'profile' , element:<ProtectiveRoute><Profile userData={userData}/></ProtectiveRoute>},
      {path:'people' , element:<ProtectiveRoute><People/></ProtectiveRoute>},
      {path:'login' , element:<Login saveToken={userTokenData}/> },
      {index:true , element:<Register/>}
    ]}
  ]);


  return (
    <RouterProvider router={routers}/>
  );
}

export default App;
