import React from 'react';
import { Navigate } from 'react-router-dom'

export default function ProtectiveRoute({children}) {
    if(localStorage.getItem('userToken') === null)
    {
        return <Navigate to='/login'/>
    }
    else
    {
        return children
    }
    
}

