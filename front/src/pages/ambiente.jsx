import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ModalAdd } from "../components/modalAdd";
import { ModalEditDel } from "../components/modalEditDel";
import menu from "../assets/menu.svg"
import add from "../assets/add.svg"
import filter from "../assets/filter.svg"
import search from "../assets/search.svg"

export function Ambiente() {

    const [dados, setDados] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalDeleteEdit, setModalDeleteEdit] = useState(false);
    const [ambienteSelecionado, setAmbienteSelecionado] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/ambientes", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDados(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };
        fetchData();
    }, [token]);

    return (
        <div className="bg-[#faf9f9]">


            <div className="grid place-items-center grid-cols-1 lg:grid-cols-2 gap-3 w-full sm:!pl-40 lg:!pl-42">

                <div className="flex items-center justify-between w-[80%] lg:w-[100vh] bg-amber-100 h-auto">
                    <div className="flex gap-3">
                        <img src={add} alt="Icone para criar novo Ambiente" className="bg-white shadow-md rounded !p-1 lg:!p-2 hover:shadow-lg transition-all" onClick={() => setModalAdd(true)} />
                        <img src={filter} alt="Icone para filtrar Ambiente" className="bg-white shadow-md rounded !p-1 lg:!p-2 hover:shadow-lg transition-all" onClick={() => setModalSearch(true)} />
                    </div>

                    <div className="bg-white shadow-md rounded !p-1 lg:!p-2 hover:shadow-lg transition-all w-[65%] h-12">
                        <img src={search} alt="Icone para a barra de pesquisa" />
                    </div>
                </div>

                <ModalAdd isOpen={modalAdd} onClose={() => setModalAdd(false)} />

                {dados.map((ambientes) => (

                    <div key={ambientes.id} className="bg-white shadow-md rounded-xl !p-3 w-[80%] lg:w-[95%] flex justify-between items-center hover:shadow-lg transition-all">

                        <div>
                            <p className="text-sm text-gray-500">SIG #{ambientes.sig}</p>
                            <p className="text-lg font-semibold text-gray-800">{ambientes.descricao}</p>
                        </div>

                        <img src={menu} onClick={() => { setAmbienteSelecionado(ordemServico); setModalDeleteEdit(true); }} className="cursor-pointer w-[35px] h-auto" />

                    </div>

                ))}
            </div>
        </div>
    )
}