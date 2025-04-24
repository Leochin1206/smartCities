import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

    // Função que atualiza o estado ao digitar no formulário
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Função para enviar o formulário e cadastrar o usuário
    const cadastrar = async (e) => {
        e.preventDefault();  // Previne o comportamento padrão de envio do formulário

        // Verifica se as senhas coincidem
        if (formData.senha !== formData.confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            // Envia os dados para o backend via POST
            await axios.post('http://127.0.0.1:8000/api/cadastro/', {
                username: formData.username,
                email: formData.email,
                telefone: formData.telefone,
                data_nascimento: formData.data_nascimento,
                senha: formData.senha
            });

            alert("Usuário cadastrado com sucesso!");
            navigate('/home');  // Redireciona para a página de Home após o cadastro
        } catch (error) {
            // Captura e exibe o erro se a requisição falhar
            console.error("Erro ao cadastrar usuário:", error);
            alert("Erro ao cadastrar. Tente novamente.");
        }
    };

    return (
        <div>
            <h2>Cadastro de Usuário</h2>
            <form onSubmit={cadastrar}>

                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Digite o nome de usuário" required />

                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Digite seu e-mail" required />

                <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Digite seu telefone" />

                <input type="date" name="data_nascimento" value={formData.data_nascimento} onChange={handleChange} />

                <input type="password" name="senha" value={formData.senha} onChange={handleChange} placeholder="Digite a senha" required />

                <input type="password" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} placeholder="Confirme a senha" required />

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}
