import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormStyle.css";
import { getCurrentUser } from "../components/AuthService";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/users");
      if (!response.ok) {
        throw new Error(`Lỗi server: ${response.status}`);
      }
      const users = await response.json();

      const user = users.find((u) => u.username === formData.username);

      if (!user) {
        alert("Tài khoản không tồn tại!");
        return;
      }

      if (user.password.trim() !== formData.password.trim()) {
        alert("Username hoặc password không đúng");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user)); // Lưu user vào localStorage
      alert("Đăng nhập thành công!");
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert("Lỗi kết nối đến server!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">Đăng nhập</h2>
          <input
            type="text"
            name="username"
            className="auth-input"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            type="password"
            name="password"
            className="auth-input"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-button">
            Đăng nhập
          </button>
          <a href="/register" className="auth-link">
            Chưa có tài khoản? Đăng ký ngay
          </a>
        </div>
      </div>
    </form>
  );
}

export default Login;
