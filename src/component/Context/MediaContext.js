import axios from "axios";
import { createContext , useState , useEffect } from "react";
export let MediaContext = createContext('');

export default function MediaContextProvider(props)
{

    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingTv, setTrendingTv] = useState([]);
    const [trendingPeople, setTrendingPeople] = useState([]);
  
    async function getApi(mediaType , callBack)
    {
      let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=31e3549976fc3acdf47a17163486ca61`);
      callBack(data.results);
    }
  
    useEffect(()=>
    {
      getApi('movie' , setTrendingMovies);
      getApi('tv' , setTrendingTv);
      getApi('person' , setTrendingPeople);
  
    } , [])

    return<MediaContext.Provider value={{trendingMovies , trendingTv , trendingPeople}}>
        {props.children}
    </MediaContext.Provider>
}

