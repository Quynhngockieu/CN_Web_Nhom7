import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="auth-container">
      <Outlet /> {/* Chỗ này sẽ hiển thị nội dung của các trang con */}
    </div>
  );
};

export default AuthLayout;