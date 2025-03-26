import { useState, useEffect } from "react";
import "./AdminDashboard.css";
import useAdminCRUD from "./AdminCRUD";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [showForm, setShowForm] = useState(false);
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  const usersCRUD = useAdminCRUD("users");
  const booksCRUD = useAdminCRUD("books");
  const categoriesCRUD = useAdminCRUD("categories");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "admin") {
      setAdminName(user.username || "Admin");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <span>Chào, {adminName} 👋</span>
        <button className="btn-logout" onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>
      <div className="sidebar">
        <h2>Quản lý Admin</h2>
        <ul>
          <li
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            👤 Quản lý Users
          </li>
          <li
            className={activeTab === "books" ? "active" : ""}
            onClick={() => setActiveTab("books")}
          >
            📚 Quản lý Books
          </li>
          <li
            className={activeTab === "categories" ? "active" : ""}
            onClick={() => setActiveTab("categories")}
          >
            🏷️ Quản lý Categories
          </li>
        </ul>
      </div>
      <div className="content">
        {activeTab === "users" && (
          <div>
            <h3>
              Danh sách Users{" "}
              <button className="btn-add" onClick={toggleForm}>
                Thêm
              </button>
            </h3>
            {showForm && (
              <div className="form-container">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={usersCRUD.formData.username || ""}
                  onChange={usersCRUD.handleInputChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={usersCRUD.formData.email || ""}
                  onChange={usersCRUD.handleInputChange}
                />
                <button
                  onClick={
                    usersCRUD.editingId
                      ? usersCRUD.updateItem
                      : usersCRUD.addItem
                  }
                >
                  {usersCRUD.editingId ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            )}
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {usersCRUD.data.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => usersCRUD.editItem(user.id)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => usersCRUD.deleteItem(user.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "books" && (
          <div>
            <h3>
              Danh sách Books{" "}
              <button className="btn-add" onClick={toggleForm}>
                Thêm
              </button>
            </h3>
            {showForm && (
              <div className="form-container">
                <input
                  type="text"
                  name="title"
                  placeholder="Tên sách"
                  value={booksCRUD.formData.title || ""}
                  onChange={booksCRUD.handleInputChange}
                />
                <input
                  type="text"
                  name="author"
                  placeholder="Tác giả"
                  value={booksCRUD.formData.author || ""}
                  onChange={booksCRUD.handleInputChange}
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Giá"
                  value={booksCRUD.formData.price || ""}
                  onChange={booksCRUD.handleInputChange}
                />
                <select
                  name="category"
                  value={booksCRUD.formData.category || ""}
                  onChange={booksCRUD.handleInputChange}
                >
                  <option value="">Chọn danh mục</option>
                  {categoriesCRUD.data.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={
                    booksCRUD.editingId
                      ? booksCRUD.updateItem
                      : booksCRUD.addItem
                  }
                >
                  {booksCRUD.editingId ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            )}
            <table>
              <thead>
                <tr>
                  <th>Tên sách</th>
                  <th>Tác giả</th>
                  <th>Giá</th>
                  <th>Danh mục</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {booksCRUD.data.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.price} VND</td>
                    <td>{book.category}</td>
                    <td className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => booksCRUD.editItem(book.id)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => booksCRUD.deleteItem(book.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "categories" && (
          <div>
            <h3>
              Danh sách Categories{" "}
              <button className="btn-add" onClick={toggleForm}>
                Thêm
              </button>
            </h3>
            {showForm && (
              <div className="form-container">
                <input
                  type="text"
                  name="name"
                  placeholder="Tên danh mục"
                  value={categoriesCRUD.formData.name || ""}
                  onChange={categoriesCRUD.handleInputChange}
                />
                <button
                  onClick={
                    categoriesCRUD.editingId
                      ? categoriesCRUD.updateItem
                      : categoriesCRUD.addItem
                  }
                >
                  {categoriesCRUD.editingId ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            )}
            <table>
              <thead>
                <tr>
                  <th>Tên danh mục</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {categoriesCRUD.data.map((category) => (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => categoriesCRUD.editItem(category.id)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => categoriesCRUD.deleteItem(category.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
