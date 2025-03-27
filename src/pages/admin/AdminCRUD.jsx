import { useState, useEffect } from "react";

const useAdminCRUD = (endpoint, setShowForm) => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch(`/api/${endpoint}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [endpoint]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newItem) => {
        setData([...data, newItem]);
        setFormData({});
      });
  };

  const editItem = (id) => {
    setEditingId(id);
    const itemToEdit = data.find((item) => item.id === id);
    setFormData(itemToEdit);
    setShowForm(true);
  };

  const updateItem = () => {
    fetch(`/api/${endpoint}/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => {
      setData(data.map((item) => (item.id === editingId ? formData : item)));
      setEditingId(null);
      setFormData({});
    });
  };

  const deleteItem = (id) => {
    fetch(`/api/${endpoint}/${id}`, { method: "DELETE" }).then(
      () => {
        setData(data.filter((item) => item.id !== id));
      }
    );
  };

  return {
    data,
    formData,
    editingId,
    handleInputChange,
    addItem,
    editItem,
    updateItem,
    deleteItem,
  };
};

export default useAdminCRUD;
