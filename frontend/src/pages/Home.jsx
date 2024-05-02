import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardMovie from "../components/CardMovie";

import './CardsMovie.css';
//Arquivo .env onde lista as urls e a api key (Estou repassando a minha nesse caso)
//alterar o arquivo env para .env isso no backend também
const movieURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
//Home para listar todos os filmes
const Home = () => {
    //Utilização de um hook que permite adicionar estado a componentes dos filmes.
    const [topMovies, setTopMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [novosMovies, setNovosMovies] = useState([])
    //Utilização do id do usuário para navegação
    const {idU} = useParams()
    //chamadas a api e recebendo JSON dos filmes
    const getTopRatedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setTopMovies(data.results);
    };
    
    const getPopularMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setPopularMovies(data.results);
    };
    
    const getNovosMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setNovosMovies(data.results);
    };
    
    //hook que compõe as urls da api
    useEffect(() => {
        const topRatedUrl = `${movieURL}top_rated?${apiKey}`;  
        getTopRatedMovies(topRatedUrl);
        const popularUrl = `${movieURL}popular?${apiKey}`;  
        getPopularMovies(popularUrl);
        const novoUrl = `${movieURL}now_playing?${apiKey}`;  
        getNovosMovies(novoUrl);
        
    }, []);
    //montagem da págiana de todos os filmes, utilização do componente Card Movie para a contrução dos
    // cards dos filmes
    return (
        <div className="container">
            <h2 className="title">Os Melhores</h2>
            <div className="movies-container">
                {topMovies.length > 0 && topMovies.map((movie) => <CardMovie key={movie.id} movie={movie}/>)}           
            </div>
            <h2 className="title">Mais Populares</h2>
            <div className="movies-container">
                {popularMovies.length > 0 && popularMovies.map((moviep) => <CardMovie key={moviep.id} movie={moviep}/>)}           
            </div>
            <h2 className="title">Novos</h2>
            <div className="movies-container">
                { novosMovies.length > 0 &&  novosMovies.map((movien) => <CardMovie key={movien.id} movie={movien}/>)}           
            </div>
           
        </div>
    );          
};

export default Home;