import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export function Login() {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const logar = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username: user,
                password: password
            });
            localStorage.setItem('token', response.data.access);

            navigate('/home');
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Usuário ou senha incorretos. Tente novamente.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-white h-[100vh] w-full">
            <p className="text-4xl font-bold text-[#4895ef] !mb-4">Smart City</p>

            <div className="flex flex-col items-center justify-start h-100 w-[80%] shadow-lg">
                <h1 className='font-medium text-[26px] !mt-15'>Login</h1>

                <input className='w-[300px] !p-1.5 !mt-5 border-2 border-gray-300' value={user} onChange={(e) => setUser(e.target.value)} placeholder='User' />

                <input className='w-[300px] !p-1.5 !mt-2 border-2 border-gray-300' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' type="password" />

                <button className='w-[100px] !p-1 !mt-5 bg-[#007bc0] text-white text-[18px] font-medium' onClick={logar}>Entrar</button>

                <h4 className='!mt-3 text-[17px] font-medium'>Não possui uma Conta? <Link to="/cadastro" className='text-[#007bc0]'>Fazer Cadastro</Link></h4>
            </div>
        </div>
    )
} 