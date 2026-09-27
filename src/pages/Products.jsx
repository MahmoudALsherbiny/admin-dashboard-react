import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    category: 'smartphones',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://dummyjson.com/products?limit=30');
      setProducts(res.data.products);
    } catch (err) {
      toast.error('حدث خطأ أثناء جلب البيانات!');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price) {
      toast.warning('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const created = {
      id: Date.now(),
      title: newProduct.title,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      thumbnail: 'https://via.placeholder.com/150',
      rating: 5,
    };

    setProducts([created, ...products]);
    setShowAddModal(false);
    setNewProduct({ title: '', price: '', category: 'smartphones' });
    toast.success('تمت إضافة المنتج بنجاح! 🚀');
  };

  const handleDeleteConfirm = () => {
    setProducts(products.filter((p) => p.id !== selectedProductId));
    setShowDeleteModal(false);
    toast.error('تم حذف المنتج بنجاح! 🗑️');
  };

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h4 className="fw-bold mb-1">إدارة المنتجات</h4>
          <p className="text-muted small mb-0">عرض، تصفية، وإضافة منتجات جديدة للمتجر</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2 fw-semibold" onClick={() => setShowAddModal(true)}>
          <i className="bi bi-plus-lg"></i> إضافة منتج جديد
        </button>
      </div>

      <div className="card border-0 shadow-sm p-3 rounded-3">
        <div className="row g-3">
          <div className="col-12 col-md-8">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="ابحث عن اسم المنتج..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <select
              className="form-select"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">جميع التصنيفات</option>
              <option value="smartphones">الهواتف الذكية (Smartphones)</option>
              <option value="laptops">أجهزة المحمول (Laptops)</option>
              <option value="fragrances">العطور (Fragrances)</option>
              <option value="groceries">المواد الغذائية (Groceries)</option>
            </select>
          </div>
        </div>
      </div>

      {/* الجدول الرئيسي */}
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">المنتج</th>
                <th>التصنيف</th>
                <th>السعر</th>
                <th>التقييم</th>
                <th className="text-end pe-4">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="text-muted small mt-2 mb-0">جاري تحميل البيانات...</p>
                  </td>
                </tr>
              ) : currentProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    <i className="bi bi-inbox fs-1 d-block mb-2 text-secondary"></i>
                    لا توجد نتائج مطابقة للبحث
                  </td>
                </tr>
              ) : (
                currentProducts.map((p) => (
                  <tr key={p.id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center gap-3">
                        <img src={p.thumbnail} alt={p.title} width="45" height="45" className="rounded-3 object-fit-cover border" />
                        <span className="fw-semibold">{p.title}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-secondary-subtle text-secondary border px-2 py-1 rounded-2">
                        {p.category}
                      </span>
                    </td>
                    <td className="fw-bold text-success">${p.price}</td>
                    <td>
                      <span className="text-warning fw-bold">
                        ★ {p.rating}
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      <button
                        className="btn btn-outline-danger btn-sm rounded-2 ms-2"
                        onClick={() => {
                          setSelectedProductId(p.id);
                          setShowDeleteModal(true);
                        }}
                      >
                        <i className="bi bi-trash"></i> حذف
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center p-3 border-top">
            <small className="text-muted">
              عرض {startIndex + 1} إلى {Math.min(startIndex + itemsPerPage, filteredProducts.length)} من إجمالي {filteredProducts.length} منتج
            </small>
            <div className="btn-group">
              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                السابق
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                التالي
              </button>
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">إضافة منتج جديد</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <form onSubmit={handleAddProduct}>
                <div className="modal-body d-flex flex-column gap-3">
                  <div>
                    <label className="form-label fw-semibold small">عنوان المنتج</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newProduct.title}
                      onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                      placeholder="مثال: iPhone 15 Pro"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label fw-semibold small">السعر ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="999"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label fw-semibold small">التصنيف</label>
                    <select
                      className="form-select"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    >
                      <option value="smartphones">smartphones</option>
                      <option value="laptops">laptops</option>
                      <option value="fragrances">fragrances</option>
                      <option value="groceries">groceries</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-light" onClick={() => setShowAddModal(false)}>إلغاء</button>
                  <button type="submit" className="btn btn-primary px-4">إضافة الآن</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content border-0 shadow-lg rounded-4 text-center p-3">
              <div className="text-danger mb-2">
                <i className="bi bi-exclamation-circle fs-1"></i>
              </div>
              <h5 className="fw-bold">تأكيد الحذف</h5>
              <p className="text-muted small">هل أنت تأكد من رغبتك في حذف هذا المنتج؟ لا يمكن التراجع.</p>
              <div className="d-flex gap-2 justify-content-center mt-2">
                <button className="btn btn-light w-50" onClick={() => setShowDeleteModal(false)}>إلغاء</button>
                <button className="btn btn-danger w-50" onClick={handleDeleteConfirm}>حذف</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;