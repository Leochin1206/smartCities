import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import imgCadastro from "../assets/imgCadastro.jpg"

export function Cadastro() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        senha: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const cadastrar = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/cadastro/', {
                username: formData.username,
                email: formData.email,
                password: formData.senha
            });

            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            console.log(response.data.access);
            alert("Usuário cadastrado com sucesso!");
            navigate('/home');
        }catch (error) {
                console.error("Erro ao cadastrar usuário:", error);
                if (error.response?.data) {
                    console.log("Detalhes do erro:", error.response.data);
                    alert("Erro ao cadastrar: " + JSON.stringify(error.response.data));
                } else {
                    alert("Erro ao cadastrar. Tente novamente.");
                }
            }

        };

        return (
            <div className="flex flex-col items-center justify-center bg-[#faf9f9] h-[100vh] w-full">
                <p className="text-4xl font-bold text-[#3473BA] !mb-10">Smart City</p>


                <form onSubmit={cadastrar} className="flex flex-col items-center justify-start h-110 w-[80%] lg:w-[87%] 2xl:w-[70%] lg:h-120 shadow-lg xl:h-150 bg-white lg:flex-row">

                    <div>
                        <img src={imgCadastro} alt="Imagem ilustrativa de uma cidade futurista" className='h-0 w-0 lg:w-auto lg:h-120 xl:h-150' />
                    </div>
                    <div className='flex flex-col items-center justify-center sm:w-[71%]'>

                        <h1 className='font-medium text-[26px] !mt-7'>Cadastro de Usuário</h1>

                        <div className='flex flex-col items-center justify-cente'>
                            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Digite o nome de usuário" className='w-[300px] md:w-[450px] xl:w-[500px] xl:!p-2 !p-1.5 !mt-8 border-2 border-gray-300' required />

                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Digite seu e-mail" className='w-[300px] md:w-[450px] xl:w-[500px] xl:!p-2 !p-1.5 !mt-4 border-2 border-gray-300' required />

                            <input type="password" name="senha" value={formData.senha} onChange={handleChange} placeholder="Digite a senha" className='w-[300px] md:w-[450px] xl:w-[500px] xl:!p-2 !p-1.5 !mt-4 border-2 border-gray-300' required />

                        </div>

                        <button className='w-[100px] !p-1 !mt-5 bg-[#007bc0] text-white text-[18px] font-medium' type="submit">Cadastrar</button>
                        <h4 className='!mt-3 text-[17px] font-medium'>Já possui uma Conta? <Link to="/" className='text-[#007bc0]'>Fazer Login</Link></h4>
                    </div>
                </form>
            </div>
        );
    }
