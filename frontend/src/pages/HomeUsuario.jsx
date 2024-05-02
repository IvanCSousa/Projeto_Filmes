import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import CardMovie from "../components/CardMovie";
//Arquivo .env onde lista as urls e a api key (Estou repassando a minha nesse caso)
//alterar o arquivo env para .env isso no backend também
const movieURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const HomeUsuario = () => {
    const [favoritosMovies, setFavoritosMovies] = useState([]);
    const [assistidosMovies, setAssistidosMovies] = useState([]);
    const [assistirdepoisMovies, setAssistirdepoisMovies] = useState([]);
    const {idU} = useParams()
    
    const getMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    };

    const token = localStorage.getItem('token');
            
    // Definição  do cabeçalho Authorization com o token JWT
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
            
        
    useEffect(() => {
        const idsF = [];      
        const fetchData = async () => {
             // IDs dos filmes
            
            const response = await axios.post('http://localhost:3000/filmefavoritos',{idU}, config).then(response => {
                response.data.forEach(objeto => {
                    idsF.push(objeto.filme);
                });
            })
            .catch(error => {
                console.error('Erro ao obter os filmes:', error);
            });
            
            // Mapeia cada ID para uma chamada assíncrona getFavoritosMovies e aguarda todas as chamadas
            const moviesData = await Promise.all(idsF.map(async (id) => {
                const movieUrl = `${movieURL}${id}?${apiKey}`;
                return await getMovies(movieUrl);
            }));

            // Atualiza o estado com os dados obtidos apenas se ainda não estiverem presentes
            setFavoritosMovies(prevFavoritosMovies => {
                const uniqueMoviesData = moviesData.filter(movieData => {
                    return !prevFavoritosMovies.some(prevMovieData => prevMovieData.id === movieData.id);
                });
                return [...prevFavoritosMovies, ...uniqueMoviesData];
            });
        };

        fetchData();
    }, []);
    
    useEffect(() => {
        const idA = []; // IDs dos filmes

        const fetchData = async () => {
            const response = await axios.post('http://localhost:3000/filmeassistido',{idU}, config).then(response => {
                response.data.forEach(objeto => {
                    idA.push(objeto.filme);
                });
            })
            .catch(error => {
                console.error('Erro ao obter os filmes:', error);
            });
            
            const moviesData = await Promise.all(idA.map(async (id) => {
                const movieUrl = `${movieURL}${id}?${apiKey}`;
                return await getMovies(movieUrl);
            }));

            // Atualiza o estado com os dados obtidos apenas se ainda não estiverem presentes
            setAssistidosMovies(prevFavoritosMovies => {
                const uniqueMoviesData = moviesData.filter(movieData => {
                    return !prevFavoritosMovies.some(prevMovieData => prevMovieData.id === movieData.id);
                });
                return [...prevFavoritosMovies, ...uniqueMoviesData];
            });
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
        
            const idD = []; // IDs dos filmes

            const response = await axios.post('http://localhost:3000/filmesassistirdepois',{idU}, config).then(response => {
                response.data.forEach(objeto => {
                    idD.push(objeto.filme);
                });
            })
            .catch(error => {
                console.error('Erro ao obter os filmes:', error);
            });
            
            // Mapeia cada ID para uma chamada assíncrona getFavoritosMovies e aguarda todas as chamadas
            const moviesData = await Promise.all(idD.map(async (id) => {
                const movieUrl = `${movieURL}${id}?${apiKey}`;
                return await getMovies(movieUrl);
            }));

            // Atualiza o estado com os dados obtidos apenas se ainda não estiverem presentes
            setAssistirdepoisMovies(prevFavoritosMovies => {
                const uniqueMoviesData = moviesData.filter(movieData => {
                    return !prevFavoritosMovies.some(prevMovieData => prevMovieData.id === movieData.id);
                });
                return [...prevFavoritosMovies, ...uniqueMoviesData];
            });
        };

        fetchData();
    }, []);
    


    return (
        <div className="container">
            <h2 className="title">Favoritos</h2>
            <div className="movies-container">
                {favoritosMovies.length > 0 && favoritosMovies.map((movie) => <CardMovie key={movie.id} movie={movie}/>)}           
            </div>
            <h2 className="title">Assistidos</h2>
            <div className="movies-container">
                {assistidosMovies.length > 0 && assistidosMovies.map((movie) => <CardMovie key={movie.id} movie={movie}/>)}           
            </div>
            <h2 className="title">Assistir Depois</h2>
            <div className="movies-container">
                {assistirdepoisMovies.length > 0 && assistirdepoisMovies.map((movie) => <CardMovie key={movie.id} movie={movie}/>)}           
            </div>
        </div>
    );          
};



export default HomeUsuario;