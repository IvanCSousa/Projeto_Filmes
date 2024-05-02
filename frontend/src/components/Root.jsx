import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route}  from "react-router-dom";

//Conceito de paginas
import App from '../../App.jsx'
import Home from '../pages/Home.jsx';
import Movie from '../pages/Movie.jsx';
import Search from '../pages/Search.jsx';
import Login from '../pages/Login.jsx';
import Registro from '../pages/Registro.jsx';
import HomeUsuario from '../pages/HomeUsuario.jsx';

// definidas as rotas da aplicação utilizando o componente Routes
//element (componente que será renderizado quando a rota for acessada).
const Root = () => (
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route element={<App />}>
            <Route path="/home/:idU" element={<Home />} />
            <Route path="/movie/:idU/:id" element={<Movie />} />
            <Route path="/search/:idU" element={<Search />} /> 
            <Route exact path="/homeusuario/:idU" element={<HomeUsuario />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  )
);


export default Root
