import React from 'react'

export default function Profile({userData}) {

    let {first_name , last_name , age , email} = userData
  return (
    <>
      <div className=' d-flex justify-content-start mt-5'>
        <div className=''>
            <h1 className=' text-info'>Your Info</h1>
            <h4>Name : {first_name} {last_name}</h4>
            <h4>Age : {age}</h4>
            <h4>Email : {email}</h4>
        </div>
      </div>
    </>
  )
}
