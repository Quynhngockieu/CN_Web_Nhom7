import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = ({  CartCount, setCartCount  }) => {
  return (
    <>
      <Header CartCount={ CartCount } />
      <Outlet  context={{ CartCount, setCartCount }} /> {/* Các trang con sẽ được hiển thị ở đây */}
      <Footer />
    </>
  );
};

export default MainLayout;