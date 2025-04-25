import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export function Cadastro() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        telefone: '',
        data_nascimento: '',
        senha: '',
        confirmarSenha: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const cadastrar = async (e) => {
        e.preventDefault();

        if (formData.senha !== formData.confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/cadastro/', {
                username: formData.username,
                email: formData.email,
                telefone: formData.telefone,
                data_nascimento: formData.data_nascimento,
                senha: formData.senha
            });

            alert("Usuário cadastrado com sucesso!");
            navigate('/home');
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Erro ao cadastrar. Tente novamente.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-[#faf9f9] h-[100vh] w-full">
            <p className="text-4xl font-bold text-[#4895ef] !mb-4">Smart City</p>

            <form onSubmit={cadastrar} className="flex flex-col items-center justify-start h-140 w-[80%] shadow-lg bg-white">
                <h1 className='font-medium text-[26px] !mt-10'>Cadastro de Usuário</h1>

                <div className='flex flex-col items-center justify-cente'>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Digite o nome de usuário" className='w-[300px] !p-1.5 !mt-5 border-2 border-gray-300' required />

                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Digite seu e-mail" className='w-[300px] !p-1.5 !mt-5 border-2 border-gray-300' required />

                    <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Digite seu telefone" className='w-[300px] !p-1.5 !mt-5 border-2 border-gray-300' required />

                    <input type="date" name="data_nascimento" value={formData.data_nascimento} onChange={handleChange} className='w-[300px] !p-1.5 !mt-5 border-2 border-gray-300' />

                    <input type="password" name="senha" value={formData.senha} onChange={handleChange} placeholder="Digite a senha" className='w-[300px] !p-1.5 !mt-5 border-2 border-gray-300' required />

                    <input type="password" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} placeholder="Confirme a senha" className='w-[300px] !p-1.5 !mt-5 border-2 border-gray-300' required />
                </div>

                <button className='w-[100px] !p-1 !mt-5 bg-[#007bc0] text-white text-[18px] font-medium' type="submit">Cadastrar</button>
                <h4 className='!mt-3 text-[17px] font-medium'>Já possui uma Conta? <Link to="/" className='text-[#007bc0]'>Fazer Login</Link></h4>
            </form>
        </div>
    );
}
