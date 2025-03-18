import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BookDetail from "./pages/BookDetail";
import ManageBooks from "./pages/admin/ManageBooks";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageCategories from "./pages/admin/ManageCategories";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [CartCount, setCartCount] = useState(0); // Thêm state quản lý số lượng giỏ hàng
  return (
    <>
      <Header CartCount={CartCount} />
      <Routes>
        {/* Client */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:id" element={<BookDetail />} />

        {/* Admin */}
        <Route path="/admin/books" element={<ManageBooks />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/categories" element={<ManageCategories />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
