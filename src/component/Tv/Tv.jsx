import axios from 'axios';
import React, { useEffect , useState } from 'react'
import MediaItem from '../MediaItem/MediaItem';

export default function Movies() {

  const [counter, setCounter1] = useState(1)
  const [trendingTv, setTrendingTv] = useState([]);
  console.log(counter);

  async function getApi(mediaType , callBack , page)
  {
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=31e3549976fc3acdf47a17163486ca61&language=en-US&page=${page}`);
    callBack(data.results);
    console.log(data);
  }

  
  useEffect(()=>
  {
    getApi('tv' , setTrendingTv , counter);
  } , [counter]);
  
  function counterPageForward()
  {
    setCounter1(counter +1)
  }
  function counterPageBackward()
  {
    
    if(counter === 1)
    {
      return false
    }
    else
    {
      setCounter1(counter -1)
    }
  }

  return (
    <>
    {trendingTv.length > 0 ? <><div className=' row py-5'>
        <div className=' col-md-4 d-flex align-items-center'>
          <div>
            <div className='brdr w-25 mb-3'></div>
              <h2 className=' h5'>Trending movies <br/> To Watch Right Now</h2>
              <p className=' text-muted py-2'>Watched Movies To Watch Right Now</p>
            <div className='brdr w-100 mt-3'></div>
          </div>
        </div>
      {trendingTv.map((item , index)=> <MediaItem key={index} item={item}/>)}

      <div className=' col-md-4 d-flex justify-content-center align-items-center'>
        <button className=' bg-transparent border-0 me-2' onClick={counterPageBackward}><i className='fa-solid fa-arrow-left text-info'></i></button>
        <h6 className=' m-0 text-light'>Page <span className=' text-info'>:</span> {counter}</h6>
        <button className=' bg-transparent border-0 ms-2' onClick={counterPageForward}><i className='fa-solid fa-arrow-right text-info'></i></button>
      </div>
      
    </div>

    <footer className=' p-2 text-center'>CopyRight All reseved</footer></> : <div className=' vh-100 d-flex justify-content-center align-items-center'><i className=' fas fa-spinner fa-spin fa-4x'></i></div>}
      
    </>
  )
}
