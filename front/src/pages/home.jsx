import { useState, useEffect } from "react";
import axios from "axios";
import { ChartCont } from "../components/chartCont";
import { ChartTemp } from "../components/chartTemp";
import { ChartLux } from "../components/chartLux";
import { ChartUmid } from "../components/chatUmid";

export function Home() {
    const [dados, setDados] = useState({
        pessoas: [],
        luminosidade: [],
        temperatura: [],
        umidade: [],
    });
    const [dadosBrutos, setDadosBrutos] = useState([]);
    const [periodo, setPeriodo] = useState("mes");
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/historico", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const dados = response.data;
                console.log(dados)
                const dadosPessoas = dados.filter(item => item.id >= 1 && item.id <= 499);
                const dadosLuminosidade = dados.filter(item => item.id >= 500 && item.id <= 999);
                const dadosTemperatura = dados.filter(item => item.id >= 1000 && item.id <= 1499);
                const dadosUmidade = dados.filter(item => item.id >= 1500 && item.id <= 1999);
                setDadosBrutos(dados);

                setDados({
                    pessoas: dadosPessoas,
                    luminosidade: dadosLuminosidade,
                    temperatura: dadosTemperatura,
                    umidade: dadosUmidade,
                });

            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, [token]);

    const filtrarPorPeriodo = (dados) => {
        const agora = new Date();
        let dataLimite;

        switch (periodo) {
            case "24h":
                dataLimite = new Date(agora.getTime() - 24 * 60 * 60 * 1000);
                break;
            case "3dias":
                dataLimite = new Date(agora.getTime() - 3 * 24 * 60 * 60 * 1000);
                break;
            case "semana":
                dataLimite = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case "2semanas":
                dataLimite = new Date(agora.getTime() - 14 * 24 * 60 * 60 * 1000);
                break;
            case "mes":
                dataLimite = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000);
                break;
            case "todos":
            default:
                return dados;
        }

        return dados.filter(item => new Date(item.timestamp) >= dataLimite);
    };

    const ultimos100 = [...dadosBrutos].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 100);


    return (
        <div className="flex flex-col items-center justify-center bg-[#faf9f9] !p-4">

            <div className="xl:w-full xl:!pl-[242px]">
                <h1 className="text-[30px] text-[#3473BA] font-bold">Gráfico de todos Sensores</h1>
            </div>
            <div className="xl:w-full xl:!pl-[242px]">
                <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className="border border-gray-300 rounded shadow-sm !mt-6 !p-2">
                    <option value="todos">Todos Dados</option>
                    <option value="24h">Últimas 24 horas</option>
                    <option value="3dias">Últimos 3 dias</option>
                    <option value="semana">Última semana</option>
                    <option value="2semanas">Últimas 2 semanas</option>
                    <option value="mes">Último mês</option>
                </select>
            </div>

            <div className="flex flex-col xl:flex-row items-center justify-center w-full">
                <div className="flex flex-col xl:flex-row items-center justify-evenly xl:w-[91%] xl:!ml-[160px]">
                    <div className="flex flex-col items-center justify-center text-[18px] font-bold text-[#34d399] w-[400px] xl:w-[700px] h-[250px] !mt-6 xl:!mt-4">
                        <h1>Contador de Pessoas(Un)</h1>
                        <ChartCont dados={filtrarPorPeriodo(dados.pessoas)} />
                    </div>

                    <div className="flex flex-col items-center justify-center text-[18px] font-bold text-[#ffce56] w-[400px] xl:w-[700px] h-[250px] !mt-4 xl:!mt-4">
                        <h1>Luminosidade(Lux)</h1>
                        <ChartLux dados={filtrarPorPeriodo(dados.luminosidade)} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row items-center justify-center w-full">
                <div className="flex flex-col xl:flex-row items-center justify-evenly xl:w-[91%] xl:!ml-[160px]">
                    <div className="flex flex-col items-center justify-center text-[18px] font-bold text-[#ef233c] w-[400px] xl:w-[700px] h-[250px] !mt-4 xl:!mt-6">
                        <h1>Temperatura(°C)</h1>
                        <ChartTemp dados={filtrarPorPeriodo(dados.temperatura)} />
                    </div>

                    <div className="flex flex-col items-center justify-center text-[18px] font-bold text-[#3B82F6] w-[400px] xl:w-[700px] h-[250px] !mt-10 xl:!mt-6">
                        <h1>Umidade(%)</h1>
                        <ChartUmid dados={filtrarPorPeriodo(dados.umidade)} />
                    </div>
                </div>
            </div>

            <div className="xl:w-full xl:!pl-[242px]">
                <h1 className="text-[30px] text-[#3473BA] font-bold">Histórico de Dados</h1>
            </div>
            <div className="w-[90%] h-[500px] overflow-y-auto text-sm !mt-4 xl:!pl-[160px]">
                {ultimos100.map((dado, index) => (
                    <div key={index} className="bg-white rounded shadow-lg !p-2 !mb-1">
                        <div>
                            <h1 className="text-gray-500 font-medium text-[14px]">#{dado.id}</h1>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <p className="text-[14px] sm:text-[18px] font-semibold text-gray-800">{dado.sensor.sensor} - {dado.sensor.sensor === "Contador de Pessoas" ? Number(dado.valor).toFixed(0) : Number(dado.valor).toFixed(2)}
                                {dado.sensor.sensor === "Contador de Pessoas" ? "Un" :
                                dado.sensor.sensor === "Luminosidade" ? "Lux" :
                                dado.sensor.sensor === "Temperatura" ? "°C" :
                                dado.sensor.sensor === "Umidade" ? "%" :""}</p>
                            <span className="font-medium text-[12px] sm:text-[16px] text-gray-500">({new Date(dado.timestamp).toLocaleString("pt-BR")})</span>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
