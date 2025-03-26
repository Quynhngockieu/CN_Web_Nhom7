import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BookDetail from "./pages/BookDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "./components/AuthService";

function App() {
  const [CartCount, setCartCount] = useState(0); // Thêm state quản lý số lượng giỏ hàng
  const isAdminPage = window.location.pathname.startsWith("/admin"); // Kiểm tra nếu đang ở trang admin

  const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.role === "admin" ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      {!isAdminPage && <Header CartCount={CartCount} />}{" "}
      {/* Ẩn Header nếu là trang admin */}
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book/:id" element={<BookDetail />} />
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
