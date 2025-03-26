import React, { useEffect, useState } from "react";

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Lỗi khi lấy danh mục:", error));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        await fetch(`http://localhost:5001/categories/${id}`, {
          method: "DELETE",
        });
        setCategories(categories.filter((category) => category.id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa danh mục:", error);
      }
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      alert("Tên danh mục không được để trống!");
      return;
    }
    try {
      const response = await fetch("http://localhost:5001/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
      });
      const newCat = await response.json();
      setCategories([...categories, newCat]);
      setNewCategory("");
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory.name.trim()) {
      alert("Tên danh mục không được để trống!");
      return;
    }
    try {
      await fetch(`http://localhost:5001/categories/${editingCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCategory),
      });
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? editingCategory : cat
        )
      );
      setEditingCategory(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
    }
  };

  return (
    <div>
      <h2>Quản lý Danh Mục</h2>
      <h3>Thêm Danh Mục</h3>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Nhập tên danh mục mới"
      />
      <button onClick={handleAddCategory}>Thêm danh mục</button>

      {editingCategory && (
        <div>
          <h3>Cập nhật Danh Mục</h3>
          <input
            type="text"
            value={editingCategory.name}
            onChange={(e) =>
              setEditingCategory({ ...editingCategory, name: e.target.value })
            }
          />
          <button onClick={handleUpdateCategory}>Cập nhật</button>
          <button onClick={() => setEditingCategory(null)}>Hủy</button>
        </div>
      )}

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button onClick={() => setEditingCategory(category)}>
                  Sửa
                </button>
                <button onClick={() => handleDelete(category.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageCategories;
