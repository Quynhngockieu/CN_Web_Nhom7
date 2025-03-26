import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormStyle.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra thông tin nhập vào
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Email không hợp lệ!");
      return;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
        formData.password
      )
    ) {
      alert(
        "Mật khẩu chưa đủ mạnh. Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
      );
    }

    try {
      const response = await fetch("http://localhost:5001/users");
      const users = await response.json();

      if (users.some((user) => user.username === formData.username)) {
        alert("Username đã tồn tại!");
        return;
      }

      await fetch("http://localhost:5001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: "user", // Mặc định tài khoản mới là user
        }),
      });

      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      alert("Lỗi kết nối đến server!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">Đăng ký</h2>
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
            type="email"
            name="email"
            className="auth-input"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
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
          <input
            type="password"
            name="confirmPassword"
            className="auth-input"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button
            type="submit
          "
            className="auth-button"
          >
            Đăng ký
          </button>
          <a href="/login" className="auth-link">
            Bạn đã có tài khoản? Đăng nhập
          </a>
        </div>
      </div>
    </form>
  );
}

export default Register;

/**
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [setError] = useState(""); // Khai báo setError */
