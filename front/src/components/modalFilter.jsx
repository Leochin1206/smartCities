import React, { useState } from "react";
import axios from "axios";

export function ModalFilter({ isOpen, onClose, url, campos = [] }) {
    if (!isOpen) return null;

    const [campoSelecionado, setCampoSelecionado] = useState(null);
    const [valorFiltro, setValorFiltro] = useState("");
    const [resultados, setResultados] = useState([]);
    const token = localStorage.getItem('token');

    const handleCheckboxChange = (campo) => {
        if (campo === campoSelecionado) {
            setCampoSelecionado(null);
            setValorFiltro("");
        } else {
            setCampoSelecionado(campo);
            setValorFiltro("");
        }
    };

    const handleFiltrar = async () => {
        if (!valorFiltro.trim()) return;

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/${url}/search/`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { search: valorFiltro.trim() },
            });

            const filtrado = campoSelecionado
                ? response.data.filter(item =>
                    item[campoSelecionado]?.toLowerCase().includes(valorFiltro.toLowerCase())
                )
                : response.data;

            setResultados(filtrado);
        } catch (error) {
            console.error("Erro ao aplicar filtro:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/30 z-50">
            <div className="bg-white rounded-lg !p-6 w-[400px] overflow-y-auto shadow-lg">
                <h2 className="text-xl font-bold !mb-2 text-gray-800">Filtro</h2>

                <div className="flex">
                    {campos.map((campo) => (
                        <div key={campo} className="flex w-[25%] !mb-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={campo === campoSelecionado}
                                    onChange={() => handleCheckboxChange(campo)}
                                />
                                <span className="!ml-1.5 text-sm font-medium text-gray-700">{campo}</span>
                            </label>
                        </div>
                    ))}
                </div>

                <input
                    type="text"
                    placeholder={`Buscar por ${campoSelecionado || "qualquer campo"}`}
                    className="w-full outline-none text-sm shadow !p-2 !mb-3"
                    value={valorFiltro}
                    onChange={(e) => setValorFiltro(e.target.value)}
                />

                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md !p-2">Cancelar</button>
                    <button onClick={handleFiltrar} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md !p-2">Filtrar</button>
                </div>

                {resultados.length > 0 && (
                    <div className="!mt-2">
                        <h3 className="text-lg font-semibold !mb-2 text-gray-800">Resultados:</h3>
                        <ul className="space-y-2 max-h-[300px] overflow-y-auto">
                            {resultados.map((item, index) => (
                                <li key={index} className="!p-2 rounded text-sm bg-gray-50 shadow !mb-1.5">
                                    {Object.entries(item).map(([key, value]) => (
                                        <div key={key}><strong>{key}:</strong> {String(value)}</div>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
