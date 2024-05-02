import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BiSearchAlt2, BiSolidCameraMovie, BiBody  } from "react-icons/bi";

import './Navbar.css';

//componente de barra de navegação (Navbar)
const Navbar = () => {
  // Utiliza o hook useState para controlar o estado do campo de busca (search)
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const {idU} = useParams();
  // verifica se o campo de busca não está vazio, navega para a página de busca 
  // (/search/:idU?q=search) e limpa o campo de busca.
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
    console.log(idU)
    navigate(`/search/${idU}?q=${search}`);
    setSearch("");
  };

  return (
    <nav id='navbar'>
        {/* links de navegação */}
        <h2>
            <Link to={`/homeusuario/${idU}`}> Home</Link>
        </h2>
        <h2>
            <Link to={`/home/${idU}`}> <BiSolidCameraMovie />Filmes Vivo</Link>
        </h2>
        {/* Quando o formulário de busca é submetido, chama a função handleSubmit, que evita o comportamento padrão de recarregar a página, */}
        <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Buscar Filmes" 
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button type='submit'> <BiSearchAlt2 /> </button>
        </form>
    </nav>
  );
};
export default Navbar;





