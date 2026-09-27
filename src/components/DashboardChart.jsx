import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: false }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  const data = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        fill: true,
        label: 'المبيعات ($)',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: '#0d6efd',
        backgroundColor: 'rgba(13, 110, 253, 0.1)',
        tension: 0.4
      }
    ]
  };

  return (
    <div className="card border-0 shadow-sm rounded-3 p-3">
      <h5 className="fw-bold mb-3">نمو المبيعات الشهري</h5>
      <div style={{ height: '300px' }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default DashboardChart;