import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Tester() {


    let navigate = useNavigate();
    const [error, setError] = useState([])
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        first_name:'',
        last_name:'',
        age:'',
        email:'',
        password:''
    });

    function getRegesterData(e)
    {
        let myUser = {...user};
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
    }

    async function postRegisterData()
    {
      let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signup' , user);
      console.log(data);
      if(data.message === 'success')
      {
        setLoading(false);
        navigate('/login')
      }
      else
      {
        setLoading(false);
      }
    }

    function validationRegex()
    {
      let scheme = Joi.object({
        first_name: Joi.string().min(3).max(10).required(),
        last_name: Joi.string().min(3).max(6).required(),
        age: Joi.number().min(16).max(80).required(),
        email: Joi.string().email({tlds:{allow:['net','com']}}).required(),
        password: Joi.string().pattern(/^[A-Z][a-z]{3,6}/).required()
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
          setError(validation.error.details);
        }
        else
        {
          postRegisterData()
        }
    }



  return (
    <>
        <form onSubmit={submitFormControl} className=' mt-5'>

            <label className=' mt-5' htmlFor="first_name">First_name :</label>
            <input onChange={getRegesterData} type="text" className=' form-control my-input my-2' name='first_name' id='first_name' />
            {error.filter((err)=> err.context.label === 'first_name')[0]?
            <div className=' alert alert-danger my-2 p-0'><p className=' m-0'>{error.filter((err)=> err.context.label === 'first_name')[0]?.message}</p></div>: ''}

            <label htmlFor="last_name">Last_name :</label>
            <input onChange={getRegesterData} type="text" className=' form-control my-input my-2' name='last_name' id='last_name' />
            {error.filter((err)=> err.context.label === 'last_name')[0]?
            <div className=' alert alert-danger my-2 p-0'><p className=' m-0'>{error.filter((err)=> err.context.label === 'last_name')[0]?.message}</p></div>: ''}

            <label htmlFor="age">Age :</label>
            <input onChange={getRegesterData} type="number" className=' form-control my-input my-2' name='age' id='age' />
            {error.filter((err)=> err.context.label === 'age')[0]?
            <div className=' alert alert-danger my-2 p-0'><p className=' m-0'>{error.filter((err)=> err.context.label === 'age')[0]?.message}</p></div>: ''}

            <label htmlFor="email">Email :</label>
            <input onChange={getRegesterData} type="text" className=' form-control my-input my-2' name='email' id='email' />
            {error.filter((err)=> err.context.label === 'email')[0]?
            <div className=' alert alert-danger my-2 p-0'><p className=' m-0'>{error.filter((err)=> err.context.label === 'email')[0]?.message}</p></div>: ''}

            <label htmlFor="password">Password :</label>
            <input onChange={getRegesterData} type="password" className=' form-control my-input my-2' name='password' id='password' />
            {error.filter((err)=> err.context.label === 'password')[0]?
            <div className=' alert alert-danger my-2 p-0'><p className=' m-0'>Invalid Password</p></div>: ''}

            <button type='submit' className=' btn btn-info mt-3'>
                {loading === true ? <i className=' fas fa-spinner fa-spin'></i> : 'Register'}
            </button>
        </form>
    </>
  );
}