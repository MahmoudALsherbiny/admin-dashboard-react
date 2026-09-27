import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    toast.info('تم تسجيل الخروج بنجاح 👋');
  };

  return (
    <nav className={`navbar navbar-expand-lg border-bottom px-4 py-3 shadow-sm ${darkMode ? 'navbar-dark bg-dark border-secondary' : 'navbar-light bg-white'}`}>
      <div className="container-fluid p-0">
        <span className={`navbar-brand fw-bold mb-0 h1 ${darkMode ? 'text-white' : 'text-secondary'}`}>لوحة التحكم</span>
        <div className="d-flex align-items-center gap-3">
          <button 
            className={`btn btn-sm rounded-circle ${darkMode ? 'btn-outline-warning' : 'btn-outline-dark'}`}
            onClick={toggleTheme}
            title="تغيير المظهر"
          >
            <i className={`bi ${darkMode ? 'bi-sun-fill' : 'bi-moon-fill'}`}></i>
          </button>

          <div className="d-flex align-items-center gap-2 me-2">
            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '38px', height: '38px' }}>
              {user?.avatar || 'M'}
            </div>
            <span className={`fw-semibold d-none d-md-inline ${darkMode ? 'text-white' : 'text-dark'}`}>
              {user?.name || 'محمود سليمان'}
            </span>
          </div>

          <button className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1" onClick={handleLogout} title="تسجيل الخروج">
            <i className="bi bi-box-arrow-right"></i>
            <span className="d-none d-md-inline">خروج</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;