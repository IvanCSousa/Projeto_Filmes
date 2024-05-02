import { useParams } from "react-router-dom";
import axios from 'axios';

// É definida uma constante imageUrl conter o caminho da API Tmdb Imagens
//para a construção da url de chamada da API
const imageUrl = import.meta.env.VITE_IMG;

// Componente de um filme em forma de cartão. 
// Ele recebe um objeto movie como propriedade, contendo informações sobre o filme a ser exibido.
const CardMovie = ({movie}) => {
  const {idU} = useParams()

  //token JWT do armazenamento local do navegador.
  const token = localStorage.getItem('token');
            
  // Define o cabeçalho Authorization com o token JWT
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  };
         
  //Coleta dos filmes dos  para adicionar a lista representada
  const handleClick = async (e) => {
    const buttonClassName = e.target.className;
    if (buttonClassName.includes('favoritos-btn')) {
      try {
        const movieid = movie.id
        const response = await axios.post('http://localhost:3000/add/filmefavorito', { idU, movieid}, config);
        console.log(response.data); 
      } catch (error) {
        console.error('Ocorreu um erro:', error);
      }
    } else if (buttonClassName.includes('assistir-btn')) {
      try {
        const movieid = movie.id
        const response = await axios.post('http://localhost:3000/add/filmesassistirdepois', { idU, movieid}, config);
        console.log(response.data); 
      } catch (error) {
        console.error('Ocorreu um erro:', error);
      }
    } else if (buttonClassName.includes('assistido-btn')) {
      try {
        const movieid = movie.id
        const response = await axios.post('http://localhost:3000/add/filmeassistido', { idU, movieid}, config);
        console.log(response.data); 
      } catch (error) {
        console.error('Ocorreu um erro:', error);
      }
    }
  };
  //Esse rederização e utilizada no homeusuários e home
  // Renderização do componente: O componente renderiza uma imagem do filme, o título do filme, sua classificação no IMDB e três botões para ações
  return (
    <div className="card-movie">
        <a href={`/movie/${idU}/${movie.id}`}><img src={imageUrl + movie.poster_path} alt={movie.title} /></a>
        <h2>{movie.title}</h2>
        <p>
            Imdb: {movie.vote_average} 
        </p>
        <p>
        </p>
        
        <button className="favoritos-btn" onClick={handleClick}>Add em Favoritos</button>
        <button className="assistir-btn" onClick={handleClick}>Assistir Mais Tarde</button>
        <button className="assistido-btn" onClick={handleClick}>Assistido</button>
    </div>
  )
}

export default CardMovie;
