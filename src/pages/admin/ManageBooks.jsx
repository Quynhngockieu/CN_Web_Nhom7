import React, { useEffect, useState } from "react";
function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    name: "",
    authors: "",
    price: "",
    image: "",
  });
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Lỗi khi lấy danh sách sách:", error));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sách này?")) {
      try {
        await fetch(`http://localhost:5001/books/${id}`, { method: "DELETE" });
        setBooks(books.filter((book) => book.id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa sách:", error);
      }
    }
  };

  const handleAddBook = async () => {
    if (!newBook.name || !newBook.authors || !newBook.price || !newBook.image) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      const response = await fetch("http://localhost:5001/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newBook,
          authors: [{ name: newBook.authors }],
          current_seller: { price: newBook.price },
        }),
      });
      const addedBook = await response.json();
      setBooks([...books, addedBook]);
      setNewBook({ name: "", authors: "", price: "", image: "" });
    } catch (error) {
      console.error("Lỗi khi thêm sách:", error);
    }
  };

  const handleUpdateBook = async () => {
    if (
      !editingBook.name ||
      !editingBook.authors ||
      !editingBook.price ||
      !editingBook.image
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      await fetch(`http://localhost:5001/books/${editingBook.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingBook),
      });
      setBooks(
        books.map((book) => (book.id === editingBook.id ? editingBook : book))
      );
      setEditingBook(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật sách:", error);
    }
  };

  return (
    <div>
      <h2>Quản lý Sách</h2>
      <h3>Thêm Sách</h3>
      <input
        type="text"
        placeholder="Tên sách"
        value={newBook.name}
        onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Tác giả"
        value={newBook.authors}
        onChange={(e) => setNewBook({ ...newBook, authors: e.target.value })}
      />
      <input
        type="number"
        placeholder="Giá"
        value={newBook.price}
        onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL ảnh"
        value={newBook.image}
        onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
      />
      <button onClick={handleAddBook}>Thêm</button>

      {editingBook && (
        <div>
          <h3>Cập nhật Sách</h3>
          <input
            type="text"
            value={editingBook.name}
            onChange={(e) =>
              setEditingBook({ ...editingBook, name: e.target.value })
            }
          />
          <input
            type="text"
            value={editingBook.authors}
            onChange={(e) =>
              setEditingBook({ ...editingBook, authors: e.target.value })
            }
          />
          <input
            type="number"
            value={editingBook.price}
            onChange={(e) =>
              setEditingBook({ ...editingBook, price: e.target.value })
            }
          />
          <input
            type="text"
            value={editingBook.image}
            onChange={(e) =>
              setEditingBook({ ...editingBook, image: e.target.value })
            }
          />
          <button onClick={handleUpdateBook}>Cập nhật</button>
          <button onClick={() => setEditingBook(null)}>Hủy</button>
        </div>
      )}

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sách</th>
            <th>Tác giả</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>
                {book.authors?.map((author) => author.name).join(", ") ||
                  "Không có thông tin"}
              </td>
              <td>{book.current_seller?.price || "Chưa có giá"} VND</td>
              <td>
                <button onClick={() => setEditingBook(book)}>Sửa</button>
                <button onClick={() => handleDelete(book.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageBooks;
