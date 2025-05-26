import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export function ChartUmid({ dados }) {
  if (!Array.isArray(dados) || dados.length === 0)
    return <p>Carregando gráfico de Umidade...</p>;

  const agrupados = dados.reduce((acc, item) => {
    if (!item.timestamp || isNaN(parseFloat(item.valor))) return acc;

    const data = new Date(item.timestamp);
    const diaSemana = data.getDay();
    const diffSegunda = (diaSemana + 6) % 7;
    const segunda = new Date(data);
    segunda.setDate(data.getDate() - diffSegunda);
    const chave = segunda.toISOString().slice(0, 10); 

    acc[chave] = (acc[chave] || 0) + parseFloat(item.valor);
    return acc;
  }, {});

  const labels = Object.keys(agrupados).sort();
  const valores = labels.map((label) => agrupados[label]);

  const data = {
    labels,
    datasets: [
      {
        label: "Umidade semanal",
        data: valores,
        borderColor: "#3B82F6",
        backgroundColor: "#3B82F6",
        stepped: true,
        pointRadius: 2,
        pointHoverRadius: 5,
        tension: 0,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const rawDate = tooltipItems[0].label;
            const date = new Date(rawDate);
            return `Semana de ${date.toLocaleDateString("pt-BR")}`;
          },
          label: (tooltipItem) => `Umidade: ${tooltipItem.formattedValue}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "",
        },
      },
      x: {
        title: {
          display: true,
          text: "",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10, 
          maxRotation: 45,
          minRotation: 45,
          callback: function (value, index) {
            const rawDate = labels[index];
            const [year, month, day] = rawDate.split("-");
            return `${day}/${month}`;
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />
}
