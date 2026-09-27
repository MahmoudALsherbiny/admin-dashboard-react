const StatCard = ({ title, value, icon, bgClass, trend }) => {
  return (
    <div className="card border-0 shadow-sm rounded-3">
      <div className="card-body p-3">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <span className="text-muted small fw-semibold">{title}</span>
            <h3 className="fw-bold my-1">{value}</h3>
            {trend && (
              <span className={`badge ${trend.includes('+') ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} rounded-pill`}>
                <i className={`bi ${trend.includes('+') ? 'bi-arrow-up-short' : 'bi-arrow-down-short'}`}></i>
                {trend} مقارنة بالشهر السابق
              </span>
            )}
          </div>
          <div className={`rounded-circle p-3 text-white d-flex align-items-center justify-content-center ${bgClass}`} style={{ width: '50px', height: '50px' }}>
            <i className={`bi ${icon} fs-4`}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;