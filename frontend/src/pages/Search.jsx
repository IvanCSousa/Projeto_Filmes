import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardMovie from "../components/CardMovie";
import "./CardsMovie.css";
//Arquivo .env onde lista as urls e a api key (Estou repassando a minha nesse caso)
//alterar o arquivo env para .env isso no backend também
const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;


const Search = () => {
  const [searchParams] = useSearchParams();

  const [moviesS, setMovies] = useState([])
  const query = searchParams.get("q");

  const getSearchedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results);
  };

  useEffect(() => {
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;  
    getSearchedMovies(searchWithQueryURL);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">Filmes encontrados de: {query}</h2>
      <div className="movies-container">
        {moviesS.length > 0 && moviesS.map((movies) => <CardMovie key={movies.id} movie={movies}/>)}           
      </div>
    </div>
  );   
};

export default Search;
