import { useState } from 'react';
import { toast } from 'react-toastify';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'محمود سليمان',
    email: 'mahmoud@example.com',
    role: 'مدير النظام (Admin)',
    notifications: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('تم حفظ التعديلات والإعدادات بنجاح! ⚙️');
  };

  return (
    <div className="d-flex flex-column gap-4 max-w-lg">
      <h4 className="fw-bold mb-0">إعدادات الحساب والنظام</h4>

      <div className="card border-0 shadow-sm rounded-3 p-4">
        <h5 className="fw-bold mb-4">الملف الشخصي</h5>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label fw-semibold">الاسم بالكامل</label>
            <input
              type="text"
              className="form-control"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="form-label fw-semibold">البريد الإلكتروني</label>
            <input
              type="email"
              className="form-control"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="form-label fw-semibold">الدور / الصلاحية</label>
            <input type="text" className="form-control" value={profile.role} disabled />
          </div>

          <hr className="my-2" />

          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="notifSwitch"
              checked={profile.notifications}
              onChange={(e) => setProfile({ ...profile, notifications: e.target.checked })}
            />
            <label className="form-check-label fw-semibold" htmlFor="notifSwitch">
              تفعيل إشعارات البريد الإلكتروني للطلبات الجديدة
            </label>
          </div>

          <div className="mt-3">
            <button type="submit" className="btn btn-primary px-4">
              حفظ التعديلات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;