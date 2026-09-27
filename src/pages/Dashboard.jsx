import StatCard from '../components/StatCard';
import DashboardChart from '../components/DashboardChart';

const Dashboard = () => {
  const recentOrders = [
    { id: '#1024', customer: 'أحمد محمود', amount: '$120.00', status: 'مكتمل', bg: 'bg-success' },
    { id: '#1023', customer: 'سارة علي', amount: '$85.50', status: 'قيد الانتظار', bg: 'bg-warning text-dark' },
    { id: '#1022', customer: 'عمر خالد', amount: '$210.00', status: 'مكتمل', bg: 'bg-success' },
    { id: '#1021', customer: 'منى يوسف', amount: '$45.00', status: 'ملغي', bg: 'bg-danger' }
  ];

  return (
    <div className="d-flex flex-column gap-4">
      {/* 1. كروت الإحصائيات */}
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard title="إجمالي المبيعات" value="$128,450" icon="bi-currency-dollar" bgClass="bg-primary" trend="+12.5%" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard title="إجمالي الطلبات" value="1,420" icon="bi-cart-check" bgClass="bg-success" trend="+8.2%" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard title="المستخدمين الجدد" value="530" icon="bi-people" bgClass="bg-warning text-dark" trend="+5.0%" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard title="معدل التحويل" value="3.42%" icon="bi-graph-up-arrow" bgClass="bg-info" trend="-1.1%" />
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-lg-8">
          <DashboardChart />
        </div>
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-3 p-3 h-100">
            <h5 className="fw-bold mb-3">آخر الطلبات</h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>الطلب</th>
                    <th>العميل</th>
                    <th>المبلغ</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="fw-semibold">{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.amount}</td>
                      <td>
                        <span className={`badge ${order.bg}`}>{order.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;