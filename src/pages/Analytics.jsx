import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { toast } from 'react-toastify';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const { darkMode } = useContext(ThemeContext);
  const textColor = darkMode ? '#f8f9fa' : '#212529';

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Category,Revenue\nElectronics,42000\nClothing,28000\nFurniture,18000\nAccessories,15000\nBooks,9000";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "analytics_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("تم تنزيل تقرير CSV بنجاح! 📄");
  };

  const barData = {
    labels: ['الإلكترونيات', 'الملابس', 'الأثاث', 'الإكسسوارات', 'الكتب'],
    datasets: [
      {
        label: 'الإيرادات ($)',
        data: [42000, 28000, 18000, 15000, 9000],
        backgroundColor: '#0d6efd',
      },
    ],
  };

  const pieData = {
    labels: ['محركات البحث (SEO)', 'مواقع التواصل', 'الإعلانات المدفوعة', 'زيارات مباشرة'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: textColor } },
    },
    scales: {
      x: { ticks: { color: textColor } },
      y: { ticks: { color: textColor } },
    },
  };

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h4 className="fw-bold mb-1">التحليلات والتقارير الشاملة</h4>
          <p className="text-muted small mb-0">نظرة عامة على أدوات المبيعات ومصادر التفاعل</p>
        </div>
        <button className="btn btn-outline-success fw-semibold d-flex align-items-center gap-2" onClick={exportCSV}>
          <i className="bi bi-file-earmark-excel"></i> تصدير التقرير (CSV)
        </button>
      </div>

      <div className="row g-3">
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-sm rounded-3 p-3">
            <h5 className="fw-bold mb-3">المبيعات حسب الفئة</h5>
            <div style={{ height: '300px' }}>
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card border-0 shadow-sm rounded-3 p-3">
            <h5 className="fw-bold mb-3">مصادر الزوار</h5>
            <div style={{ height: '300px' }} className="d-flex justify-content-center">
              <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;