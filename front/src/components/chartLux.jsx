import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip, Legend);

export function ChartLux({ dados }) {
  if (!Array.isArray(dados) || dados.length === 0)
    return <p>Carregando gráfico de Luminosidade...</p>;

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

  const orderedKeys = Object.keys(agrupados).sort();
  const valores = orderedKeys.map((label) => agrupados[label]);

  const data = {
    labels: orderedKeys,
    datasets: [
      {
        label: "Luminosidade por semana",
        data: valores,
        fill: 'origin',
        backgroundColor: "rgba(255, 206, 86, 0.4)",
        borderColor: "rgba(255, 206, 86, 1)",
        tension: 0.3,
        pointRadius: 2,
        pointHoverRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const rawDate = tooltipItems[0].label;
            const date = new Date(rawDate);
            return `${date.toLocaleDateString("pt-BR")}`;
          },
          label: (tooltipItem) => `Luminosidade: ${tooltipItem.formattedValue}`,
        },
      },
    },
    scales: {
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
      y: {
        beginAtZero: true,
        title: { display: true, text: "" },
      },
    },
  };

  return <Line data={data} options={options} />
}
