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

export function ChartTemp({ dados }) {
  if (!Array.isArray(dados) || dados.length === 0)
    return <p>Carregando gráfico de Temperatura...</p>;

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
  const valores = labels.map(label => agrupados[label]);

  const data = {
    labels,
    datasets: [
      {
        label: "Temperatura por semana",
        data: valores,
        borderColor: "#ef233c",
        backgroundColor: "#ff7477",
        tension: 0.3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#ef233c",
        pointRadius: 2,
        pointHoverRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const rawDate = tooltipItems[0].label;
            const date = new Date(rawDate);
            return `${date.toLocaleDateString("pt-BR")}`;
          },
          label: (tooltipItem) => `Temperatura: ${tooltipItem.formattedValue}°`,
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
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
