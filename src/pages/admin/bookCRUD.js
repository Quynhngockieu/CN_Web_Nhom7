import { useState } from "react";
import axios from "axios";

const bookCRUD = (booksCRUD, setShowForm) => {
    const handleAddBook = async () => {
      // Thực hiện gọi API để thêm sách mới vào cơ sở dữ liệu
      try {
        // Giả sử bạn đang sử dụng fetch hoặc axios để gọi API
        const response = await fetch('/api/books', {
          method: 'POST',
          body: JSON.stringify(booksCRUD.formData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        // Cập nhật lại danh sách sau khi thêm
        if (response.ok) {
          booksCRUD.setData([...booksCRUD.data, result]);
          setShowForm(false); // Đóng form thêm sách
        } else {
          alert("Lỗi khi thêm sách");
        }
      } catch (error) {
        console.error('Error adding book:', error);
      }
    };
  
    const handleUpdateBook = async () => {
      // Thực hiện gọi API để cập nhật sách
      try {
        const response = await fetch(`/api/books/${booksCRUD.editingId}`, {
          method: 'PUT',
          body: JSON.stringify(booksCRUD.formData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        // Cập nhật lại danh sách sách sau khi cập nhật
        if (response.ok) {
          booksCRUD.setData(booksCRUD.data.map(book =>
            book.id === booksCRUD.editingId ? result : book
          ));
          setShowForm(false); // Đóng form sau khi cập nhật
        } else {
          alert("Lỗi khi cập nhật sách");
        }
      } catch (error) {
        console.error('Error updating book:', error);
      }
    };

    const handleDeleteBook = async (id) => {
        try {
          const response = await fetch(`/api/books/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            booksCRUD.setData(booksCRUD.data.filter(book => book.id !== id));
          } else {
            alert("Lỗi khi xóa sách");
          }
        } catch (error) {
          console.error('Error deleting book:', error);
        }
      };
      
  
    return {
      handleAddBook,
      handleUpdateBook,
      handleDeleteBook
    };
  };
  

export default bookCRUD;
