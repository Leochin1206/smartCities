import React, { useState } from 'react';
import axios from 'axios';
import imgLogin from "../assets/imgLogin.jpg";
import { Link, useNavigate } from 'react-router-dom';
import LogoSC from "../assets/logo.png"

export function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const logar = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username: user,
                password: password
            });
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            console.log(response.data.access);
            navigate('/home');
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            if (error.response && error.response.status === 401) {
                setErrorMessage("Usuário ou senha incorretos. Tente novamente.");
            } else {
                setErrorMessage("Ocorreu um erro ao tentar fazer login. Tente mais tarde.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-[#faf9f9] h-[100vh] w-full">
            <div className="flex flex-col items-center justify-start h-auto py-10 w-[80%] lg:w-[87%] 2xl:w-[70%] lg:h-auto shadow-lg bg-white lg:flex-row">
                <div>
                    <img src={imgLogin} alt="Imagem ilustrativa de uma cidade futurista" className='h-0 w-0 lg:w-auto lg:h-120 xl:h-150' />
                </div>
                <div className='flex flex-col items-center justify-center sm:w-[71%] px-4'>
                    <img src={LogoSC} alt="Logo do Smart City" className='h-auto w-[17%] !mb-5' />
                    <h1 className='font-medium text-[26px] !mt-10 lg:!mt-0'>Login</h1>

                    <form onSubmit={logar} className="flex flex-col items-center w-full">
                        <label htmlFor="usernameInput" className="sr-only">Nome de Usuário</label>
                        <input
                            id="usernameInput"
                            className='w-[300px] md:w-[450px] xl:w-[500px] xl:!p-2 !p-1.5 !mt-8 border-2 border-gray-300'
                            value={user}
                            onChange={(e) => { setUser(e.target.value); if (errorMessage) setErrorMessage(''); }}
                            placeholder='Nome de Usuário'
                            aria-label="Nome de Usuário"
                        />

                        <label htmlFor="passwordInput" className="sr-only">Senha</label>
                        <input
                            id="passwordInput"
                            className='w-[300px] md:w-[450px] xl:w-[500px] xl:!p-2 !p-1.5 !mt-3 border-2 border-gray-300'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); if (errorMessage) setErrorMessage(''); }}
                            placeholder='Senha'
                            type="password"
                            aria-label="Senha"
                        />

                        {errorMessage && (
                            <div className="!mt-3 p-2 text-red-700 bg-red-100 border border-red-400 rounded w-[300px] md:w-[450px] xl:w-[500px] text-center">
                                {errorMessage}
                            </div>
                        )}

                        <button type="submit" className='w-[100px] md:w-[170px] !p-1 md:!p-1.5 !mt-7 bg-[#007bc0] text-white text-[18px] font-medium'>Entrar</button>
                    </form>

                    <h4 className='!mt-7 text-[17px] font-medium'>Não possui uma Conta? <Link to="/cadastro" className='text-[#007bc0]'>Fazer Cadastro</Link></h4>
                </div>
            </div>
        </div>
    );
}