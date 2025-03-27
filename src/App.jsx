import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BookDetail from "./pages/BookDetail";
import ManageBooks from "./pages/admin/ManageBooks";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageCategories from "./pages/admin/ManageCategories";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AuthLayout from "./AuthLayout";
import MainLayout from "./MainLayout";

function App() {
  const [CartCount, setCartCount] = useState(0);

  return (
      <Routes>
        {/* Layout có Header và Footer */}
        <Route element={<MainLayout CartCount={CartCount} setCartCount={setCartCount} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<BookDetail setCartCount={setCartCount} />} />
        </Route>

        {/* Layout không có Header & Footer */}
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/books" element={<ManageBooks />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/categories" element={<ManageCategories />} />
        </Route>
      </Routes>
  );
}

export default App;

