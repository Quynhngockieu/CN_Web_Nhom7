import React, { useEffect, useState } from "react";
function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) =>
        console.error("Lỗi khi lấy danh sách người dùng:", error)
      );
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        await fetch(`http://localhost:5001/users/${id}`, { method: "DELETE" });
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
      }
    }
  };

  const handleAddUser = async () => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      const response = await fetch("http://localhost:5001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const addedUser = await response.json();
      setUsers([...users, addedUser]);
      setNewUser({ username: "", email: "", password: "", role: "user" });
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser.username || !editingUser.email || !editingUser.password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      await fetch(`http://localhost:5001/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingUser),
      });
      setUsers(
        users.map((user) => (user.id === editingUser.id ? editingUser : user))
      );
      setEditingUser(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
    }
  };

  return (
    <div>
      <h2>Quản lý Tài Khoản</h2>
      <h3>Thêm Người Dùng</h3>
      <input
        type="text"
        placeholder="Username"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <button onClick={handleAddUser}>Thêm</button>

      {editingUser && (
        <div>
          <h3>Cập nhật Người Dùng</h3>
          <input
            type="text"
            value={editingUser.username}
            onChange={(e) =>
              setEditingUser({ ...editingUser, username: e.target.value })
            }
          />
          <input
            type="email"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
          />
          <input
            type="password"
            value={editingUser.password}
            onChange={(e) =>
              setEditingUser({ ...editingUser, password: e.target.value })
            }
          />
          <button onClick={handleUpdateUser}>Cập nhật</button>
          <button onClick={() => setEditingUser(null)}>Hủy</button>
        </div>
      )}

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.role !== "admin" && (
                  <>
                    <button onClick={() => setEditingUser(user)}>Sửa</button>
                    <button onClick={() => handleDelete(user.id)}>Xóa</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
