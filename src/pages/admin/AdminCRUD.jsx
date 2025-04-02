import { useState, useEffect } from "react";
import axios from "axios";

const useAdminCRUD = (resource, setShowForm) => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/${resource}`);
        setData(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, [resource]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addItem = async () => {
    try {
      const response = await axios.post(`/api/${resource}`, formData);
      setData([...data, response.data]);
      setFormData({});
      setShowForm(false); // Đóng form sau khi thêm thành công
    } catch (error) {
      console.error("Lỗi khi thêm dữ liệu:", error);
    }
  };

  const updateItem = async () => {
    if (!editingId) return;  // Kiểm tra xem đang ở chế độ cập nhật hay không

    try {
      const response = await axios.put(`/api/${resource}/${editingId}`, formData);
      const updatedItem = response.data;

      setData((prevData) =>
        prevData.map((item) => (item.id === editingId ? updatedItem : item))
      );

      setFormData({});
      setEditingId(null);
      setShowForm(false); // Đóng form sau khi cập nhật thành công
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
    }
  };

  const editItem = (id) => {
    const itemToEdit = data.find((item) => item.id === id);

    if (itemToEdit) {
      setFormData(itemToEdit); // Gán dữ liệu cần sửa vào `formData`
      setEditingId(id);
      setShowForm(true); // Mở form ra để sửa
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/api/${resource}/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa dữ liệu:", error);
    }
  };

  return { data, formData, setFormData, editingId, setEditingId, handleInputChange, addItem, updateItem, editItem, deleteItem };
};

export default useAdminCRUD;