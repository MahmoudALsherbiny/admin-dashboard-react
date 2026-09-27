import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-dark text-white vh-100 p-3 d-flex flex-column position-sticky top-0" style={{ width: '250px' }}>
      <h4 className="text-center py-3 border-bottom border-secondary fw-bold">
        <i className="bi bi-speedometer2 me-2 text-primary"></i> AdminPanel
      </h4>
      <ul className="nav nav-pills flex-column mb-auto mt-3 gap-2">
        <li className="nav-item">
          <NavLink to="/" className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary' : ''}`}>
            <i className="bi bi-house-door me-2"></i> الرئيسية
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary' : ''}`}>
            <i className="bi bi-box-seam me-2"></i> المنتجات (CRUD)
          </NavLink>
        </li>
        <li>
          <NavLink to="/analytics" className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary' : ''}`}>
            <i className="bi bi-graph-up me-2"></i> التحليلات
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary' : ''}`}>
            <i className="bi bi-gear me-2"></i> الإعدادات
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;