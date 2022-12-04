import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'
export default function ItemDetails() {

    const {id , media_type} = useParams();
    const [getMovie, setMovieDetails] = useState({})
    console.log(getMovie);
    async function GetMovieDetails(id , media_type)
    {
        let {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=31e3549976fc3acdf47a17163486ca61&language=en-US`);
        setMovieDetails(data)
    }

    useEffect(()=>{
        GetMovieDetails(id , media_type);
    },[])

    const truncate = (input) =>
    input?.length > 900 ? `${input.substring(0, 899)}...` : input;
    
    return (
        
        
        <>
            <Helmet>
                <meta charSet="utf-8" />
                {getMovie.name !== undefined ? <title>{getMovie.name}</title>:<title>{getMovie.title}</title>}
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            {Object.keys(getMovie).length === 0 ? console.log("yes") :console.log("no")}
        {Object.keys(getMovie).length > 0 ?<> <div className=' row mt-5'>
            <div className=' col-md-3'>
                {getMovie.poster_path === undefined? <img className=' mt-4 w-100' src={'https://image.tmdb.org/t/p/w500'+getMovie.profile_path} alt="" /> : 
                <img className=' mt-4 w-100' src={'https://image.tmdb.org/t/p/w500'+getMovie.poster_path} alt=""/>}
            </div>

            <div className=' col-md-9 mt-3'>
                <h2>{getMovie.title}{getMovie.name}</h2>
                <p className=' text-muted'>{getMovie.overview}{truncate(getMovie.biography)}</p> 
                <div>
                    {getMovie.genres &&<h6 className='p-1'>Genres :{getMovie.genres && getMovie.genres.map((g , index)=><span key={index}> <span> {g.name} ,</span></span>)}</h6>}
                    {getMovie.release_date &&<h6 className=' p-1'>release date : {getMovie.release_date}</h6>}
                    {getMovie.budget  !== 0 & undefined ? <h6 className=' p-1'>budget : {getMovie.budget}$</h6> : ''}
                    {getMovie.status && <h6 className=' p-1'>Status : {getMovie.status}</h6>}
                    {getMovie.vote_average && <h6 className=' p-1'>vote average : {getMovie.vote_average.toFixed(1)}</h6>}
                    {getMovie.vote_count && <h6 className=' p-1'>vote count : {getMovie.vote_count}</h6>}
                    {getMovie.popularity && <h6 className=' p-1'>popularity : {getMovie.popularity}</h6>}
                    {getMovie.birthday && <h6 className=' p-1'>birthday : {getMovie.birthday}</h6>}
                    {getMovie.place_of_birth && <h6 className=' p-1'>place of_birth : {getMovie.place_of_birth}</h6>}
                    {getMovie.homepage && <button className=' btn btn-info p-1 my-2' ><a href={getMovie.homepage}>Visite homepage</a></button>}
                </div>
                
            </div>
        </div></>
        : <div className=' vh-100 d-flex justify-content-center align-items-center'><i className=' fas fa-spinner fa-spin fa-4x'></i></div> }
       
    </>
  )
}

