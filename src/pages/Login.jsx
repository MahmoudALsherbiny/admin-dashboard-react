import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }
    
    login(email, password);
    toast.success('تم تسجيل الدخول بنجاح! مرحباً بك 🚀');
    navigate('/');
  };

  return (
    <div className={`min-vh-100 d-flex align-items-center justify-content-center p-3 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className={`card border-0 shadow-lg rounded-4 p-4 p-md-5 ${darkMode ? 'bg-secondary text-white' : 'bg-white'}`} style={{ maxWidth: '420px', width: '100%' }}>
        <div className="text-center mb-4">
          <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
            <i className="bi bi-shield-lock fs-2"></i>
          </div>
          <h3 className="fw-bold">تسجيل الدخول</h3>
          <p className="text-muted small">أدخل بياناتك للوصول للوحة التحكم</p>
        </div>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label fw-semibold small">البريد الإلكتروني</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-envelope"></i></span>
              <input
                type="email"
                className="form-control"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="form-label fw-semibold small">كلمة المرور</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-key"></i></span>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary fw-bold py-2 mt-2 rounded-3">
            دخول للوحة التحكم <i className="bi bi-box-arrow-in-left ms-1"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
