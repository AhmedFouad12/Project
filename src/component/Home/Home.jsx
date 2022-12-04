import React, { useContext } from 'react'
import { Helmet } from 'react-helmet';
import { MediaContext } from '../Context/MediaContext';
import MediaItem from '../MediaItem/MediaItem';

export default function Home() {

  let {trendingMovies , trendingTv , trendingPeople} = useContext(MediaContext);
  console.log(trendingMovies);
  return (
    <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home Page</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      {Object.keys(trendingMovies).length > 0 ? <><div className=' row py-5'>

        <div className=' col-md-4 d-flex align-items-center'>
          <div>
            <div className='brdr w-25 mb-3'></div>
              <h2 className=' h5'>Trending movies <br/> To Watch Right Now</h2>
              <p className=' text-muted py-2'>Watched Movies To Watch Right Now</p>
            <div className='brdr w-100 mt-3'></div>
          </div>
        </div>

        {trendingMovies.slice(0,10).map((item , index)=> <MediaItem key={index} item={item}/>)}

          <div className=' mt-5'></div>

        <div className=' col-md-4 d-flex align-items-center'>
          <div>
            <div className='brdr w-25 mb-3'></div>
              <h2 className=' h5'>Trending Tv <br/> To Watch Right Now</h2>
              <p className=' text-muted py-2'>Watched Tv To Watch Right Now</p>
            <div className='brdr w-100 mt-3'></div>
          </div>
        </div>

        {trendingTv.slice(0,10).map((item , index)=> <MediaItem key={index} item={item}/>)}

        <div className=' mt-5'></div>
        
        <div className=' col-md-4 d-flex align-items-center'>
          <div>
            <div className='brdr w-25 mb-3'></div>
              <h2 className=' h5'>Trending People <br/> To Watch Right Now</h2>
              <p className=' text-muted py-2'>Watched People To Watch Right Now</p>
            <div className='brdr w-100 mt-3'></div>
          </div>
        </div>

        {trendingPeople.filter((person)=> person.profile_path !== null).slice(0,10).map((item , index)=> <MediaItem key={index} item={item}/>)}

      </div>

          <footer className=' text-center'>CopyRight All reseved</footer></>
          :<div className=' vh-100 d-flex justify-content-center align-items-center'><i class="fa-solid fa-spinner fa-spin fa-4x"></i></div>}
      

    </>
  )
}
