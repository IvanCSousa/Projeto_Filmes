import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Registro.css';

const Registro = () => {
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) =>{
        event.preventDefault();
        //console.log(nome, email, senha)
        try {
            const response = await axios.post('http://localhost:3000/auth/reg', { nome, email, senha });
            navigate("/");
        } catch (error) {
            console.error('Erro ao registrar cliente:', error.response.data.error);
        }
    }
    
    return (
        <div className="containerregistro">
            <form onSubmit={handleSubmit}>
                <h1>Registrar-se</h1>
                <div className='input-field'>
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='input-field'>
                    <input 
                        type='text' 
                        placeholder='Nome' 
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className='input-field'>
                    <input 
                        type='password' 
                        placeholder='Senha' 
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <div className='button'>
                    <button>Registrar</button>
                </div>
                <div className='login-link'>
                    <p>
                        Já tem uma conta? <Link to="/"> Faça o Login</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Registro;