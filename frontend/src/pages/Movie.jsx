import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardMovie from "../components/CardMovie"

import "./Movie.css"

const movieURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {

  const {id} = useParams()
  const [movie, setMovie] = useState([])
  const [director, setDirector] = useState([])
  const [year, setYear] = useState([])
    

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovie(data);
    setYear((String(data.release_date)));
  };

  const getDirector = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setDirector(data.crew.filter(({job})=> job ==='Director')[0]);
  };

  useEffect(() => {
    const directorUrl = `${movieURL}${id}/credits?${apiKey}`;
    const movieUrl = `${movieURL}${id}?${apiKey}`;
    getMovie(movieUrl);
    getDirector(directorUrl);
  }, []);

  
  return ( 
    <div className="movie-page">
    
      {movie && ( 
        <>
          <div className="infocard">
            <div className="card">
              <CardMovie movie={movie}/>
            </div>
            <h4 className="tagline">{movie.tagline}</h4>
          </div>

          <div className="info">
            <h4 >Descrição:</h4>
            <p>{movie.overview}</p>
          
          </div>
          
          <div className="info">
            <h4 >Duração: </h4>
            <p> {movie.runtime}min</p>
          </div>
          
          <div className="info">
            <h4 >Direção: </h4>
            <p>{director.name}</p>
          </div>
          
          
          <div className="info">
            <h4 >Data de Lançamento: </h4>
            <p>{year}</p>
          </div>
          

        </ >
      )}
    </div>
  );
};
  
export default Movie;