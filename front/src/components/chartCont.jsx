import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export function ChartCont({ dados }) {
  if (!Array.isArray(dados) || dados.length === 0) {
    return <p>Carregando gráfico de Contador de Pessoas...</p>;
  }

  const agrupados = dados.reduce((acc, item) => {
    const data = new Date(item.timestamp);
    const diaSemana = data.getDay();
    const diffSegunda = (diaSemana + 6) % 7;
    const segunda = new Date(data);
    segunda.setDate(data.getDate() - diffSegunda);
    const chave = segunda.toISOString().slice(0, 10);
    acc[chave] = (acc[chave] || 0) + parseFloat(item.valor);
    return acc;
  }, {});

  const orderedKeys = Object.keys(agrupados).sort();
  const valores = orderedKeys.map((label) => agrupados[label]);

  const data = {
    labels: orderedKeys,
    datasets: [
      {
        label: "Pessoas por semana",
        data: valores,
        backgroundColor: "#34d399",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const rawDate = tooltipItems[0].label;
            const date = new Date(rawDate);
            return `${date.toLocaleDateString("pt-BR")}`;
          },
          label: (tooltipItem) => `Pessoas: ${tooltipItem.formattedValue}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "" },
      },
      x: {
        title: { display: true, text: "" },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10, 
          maxRotation: 45,
          minRotation: 45,
          callback: function (value, index) {
            const rawDate = orderedKeys[index];
            const [year, month, day] = rawDate.split("-");
            return `${day}/${month}`;
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />
}
