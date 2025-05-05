import React, { useState, useEffect } from "react";
import axios from "axios";

export function ModalAdd({ isOpen, onClose, titulo, url, campos = [], relacoes = {} }) {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({});
    const [opcoesFK, setOpcoesFK] = useState({});
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const initialFormData = campos.reduce((acc, campo) => {
            acc[campo] = '';
            return acc;
        }, {});
        setFormData(initialFormData);
    }, [campos]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            alert("Token não encontrado. Faça login novamente.");
            return;
        }

        try {
            await axios.post(`http://127.0.0.1:8000/api/${url}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Cadastro realizado com sucesso!");
            onClose();
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            alert("Erro ao cadastrar.");
        }
    };

    useEffect(() => {
        const fetchFKs = async () => {
            const novasOpcoes = {};

            for (const campo in relacoes) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/${relacoes[campo].url}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    novasOpcoes[campo] = response.data;
                } catch (err) {
                    console.error(`Erro ao buscar ${campo}:`, err);
                    novasOpcoes[campo] = [];
                }
            }

            setOpcoesFK(novasOpcoes);
        };

        if (Object.keys(relacoes).length > 0) {
            fetchFKs();
        }
    }, [relacoes, token]);


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/30 z-50">
            <div className="bg-white rounded-lg p-6 w-[700px] shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Adicionar novo {titulo}</h2>

                <form onSubmit={handleSubmit}>
                    {campos.map((campo) => (
                        <div key={campo} className="mb-4">
                            <label htmlFor={campo} className="block text-gray-700 capitalize">{campo.replace("_id", "").replace("_", " ")}</label>

                            {relacoes[campo] ? (
                                <select
                                    id={campo}
                                    name={campo}
                                    value={formData[campo]}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Selecione</option>
                                    {opcoesFK[campo]?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item[relacoes[campo].label]}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={(campo === "ni" || campo === "localizacao" || campo === "sig") ? "number" : 
                                        (campo === "data_abertura" || campo === "data_encerramento") ? "date" : "text"}
                                    id={campo}
                                    name={campo}
                                    placeholder={campo}
                                    value={formData[campo]}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex justify-end gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Salvar</button>
                        <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}