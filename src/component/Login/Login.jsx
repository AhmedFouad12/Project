import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({saveToken}) {
    let navigate = useNavigate();
    const [errorList, setErrorList] = useState({})
    const [error, setError] = useState([])
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email:'',
        password:''
    });

    function getLoginData(e)
    {
        let myUser = {...user};
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
    }

    async function postLoginData()
    {
      let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signin' , user);
      if(data.message === 'success')
      {
        setLoading(false);
        localStorage.setItem('userToken' , data.token);
        saveToken()
        navigate('/home');

      }
      else
      {
        setErrorList(data.message)
        setLoading(false);
      }
    }

    function validationRegex()
    {
      let scheme = Joi.object({
        email: Joi.string().email({tlds:{allow:['net','com']}}),
        password: Joi.string().pattern(/^[A-Z][a-z]{3,6}/)
      });
      return scheme.validate(user , {abortEarly:false});
    }

    function submitFormControl(e)
    {
        e.preventDefault();
        setLoading(true);
        let validation = validationRegex();
        if(validation.error)
        {
          setLoading(false);
          setError(validation.error.details)
        }
        else
        {
          postLoginData()
        }
    }



  return (
    <>
        <form onSubmit={submitFormControl} className=' mt-5'>
            
            
            <label className='mt-5' htmlFor="email">Email :</label>
            <input onChange={getLoginData} type="text" className=' form-control my-input my-2' name='email' id='email' />
            {error.filter((err)=> err.context.label === 'email')[0]?
             <div className=' alert alert-danger my-2 p-0'>{error[0].message}</div> : ''}
            {errorList === "email doesn't exist" ?<div className=' alert alert-danger my-2 p-0'>{errorList}</div> : ''  }


            <label htmlFor="password">Password :</label>
            <input onChange={getLoginData} type="password" className=' form-control my-input my-2' name='password' id='password' />
            {error.filter((err)=> err.context.label === 'password')[0]?
            <div className=' alert alert-danger my-2 p-0'><p className=' m-0'>Invalid Password</p></div>: ''}
            {errorList === 'incorrect password' ? <div className=' alert alert-danger my-2 p-0'>{errorList}</div> : ''}

            <button type='submit' className=' btn btn-info mt-3'>
                {loading === true ? <i className=' fas fa-spinner fa-spin'></i> : 'Login'}
            </button>
        </form>
    </>
  );
}