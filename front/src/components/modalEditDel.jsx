import React, { useState, useEffect } from "react";
import axios from "axios";

export function ModalEditDel({ isOpen, onClose, url, camposUpdate = [], dados, relacoes = {} }) {
    if (!isOpen || !dados) return null;

    const [formData, setFormData] = useState({});
    const [opcoesRelacoes, setOpcoesRelacoes] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        setFormData(dados);

        const fetchRelacoes = async () => {
            const novasOpcoes = {};
            for (const campo in relacoes) {
                const { url: relUrl, label } = relacoes[campo];
                try {
                    const res = await axios.get(`http://127.0.0.1:8000/api/${relUrl}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    novasOpcoes[campo] = res.data;
                } catch (err) {
                    console.error(`Erro ao buscar ${relUrl}`, err);
                }
            }
            setOpcoesRelacoes(novasOpcoes);
        };

        if (Object.keys(relacoes).length > 0) {
            fetchRelacoes();
        }
    }, [dados]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/${url}/${dados.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert(`${url} atualizado com sucesso!`);
            onClose();
        } catch (error) {
            console.error("Erro ao atualizar:", error);
            alert("Erro ao atualizar.");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Tem certeza que deseja excluir?")) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/${url}/${dados.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert(`${url} excluído com sucesso!`);
            onClose();
        } catch (error) {
            console.error("Erro ao excluir:", error);
            alert("Erro ao excluir.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/30 z-50">
            <div className="bg-white rounded-lg !p-6 w-[400px] shadow-lg">
                <h2 className="text-xl font-bold !mb-4 text-gray-800">Editar</h2>

                {camposUpdate.map((campo) => (
                    <div key={campo} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">{campo}</label>

                        {relacoes[campo] ? (
                            <select
                                name={campo}
                                value={formData[campo] || ""}
                                onChange={handleChange}
                                className="w-full !p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Selecione</option>
                                {opcoesRelacoes[campo]?.map((opcao) => (
                                    <option key={opcao.id} value={opcao.id}>
                                        {opcao[relacoes[campo].label]}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                name={campo}
                                value={formData[campo] || ""}
                                onChange={handleChange}
                                className="w-full !p-2 !mb-2 border border-gray-300 rounded-md"
                            />
                        )}
                    </div>
                ))}

                <div className="flex justify-end gap-4 !mt-3">
                    <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-600 text-white rounded-md !p-2">Salvar</button>
                    <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white rounded-md !p-2">Excluir</button>
                    <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md !p-2">Cancelar</button>
                </div>
            </div>
        </div>
    );
}