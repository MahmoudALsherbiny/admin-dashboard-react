import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const NotFound = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`min-vh-100 d-flex flex-column align-items-center justify-content-center p-4 text-center ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="display-1 fw-bold text-primary mb-2">404</div>
      <h2 className="fw-bold mb-3">الصفحة غير موجودة!</h2>
      <p className="text-muted mb-4 style-p" style={{ maxWidth: '480px' }}>
        عذراً، الرابط الذي تحاول الوصول إليه غير موجود أو تم نقله. يمكنك العودة للوحة التحكم الرئيسية.
      </p>
      <Link to="/" className="btn btn-primary btn-lg rounded-3 fw-semibold px-4 d-inline-flex align-items-center gap-2">
        <i className="bi bi-house-door-fill"></i>
        العودة للرئيسية
      </Link>
    </div>
  );
};

export default NotFound;