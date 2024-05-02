import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css"

const Login = () => {
    //hook de autenticação do usuário
    const [email, setUsername]= useState("");
    const [senha, setPassword]= useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async(event) =>{
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/login', { email, senha });
            // Extrai o token da resposta
            const token = response.data.token;
            // Salva o token no localStorage
            localStorage.setItem('token', token);
            //console.log(response.data)
            navigate(`/homeusuario/${response.data.usuarioid}`);
            
        } catch {
            console.log("Email ou senha inválidos.");
        }
    }
    //rederização da página
    return (
        <div className="login">
            <div className="containerlogin">
                <form onSubmit={handleSubmit}>
                    <h1>Acesse o sistema</h1>
                    <div  className='input-field'>
                        <input type="email" 
                            placeholder="E-mail"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='input-field'>
                        <input type='password' 
                            placeholder='Senha' 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='button'>
                        <button type='submit'>Entrar</button>
                    </div>
                    <div className='signup-link'>
                        <p>
                            <Link to="/registro">Registrar-se</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
        );
};

export default Login;
