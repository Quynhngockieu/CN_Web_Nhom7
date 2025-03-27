// import Search from "./Search";
// import Infor from "./Infor";
// import Logo from "./Logo";
// import React, { useState } from "react";
// import { Button, Collapse } from "react-bootstrap";
// import Cart from "./Cart";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types"; // khai báo để định nghĩa kiểu dữ liệu cho CartCount

// function Header({ CartCount = 0 }) {
//   //Giá trị mặc định của giỏ hàng =0
//   const [NavOpen, setNavOpen] = useState(false);
//   console.log(CartCount);
//   return (
//     <div className="nav collapse-lg bg-white pt-2 pb-2">
//       <div
//         className="d-flex container align-items-center justify-content-between"
//         id="header"
//       >
//         <div className="col-md-1 d-none d-md-block">
//           <Logo />
//         </div>
//         <div className="col-md-1 d-block d-md-none">
//           <Link to={"/"} style={{ color: "black" }}>
//             <i className="bi bi-chevron-compact-left"></i>
//           </Link>
//         </div>

//         <Button
//           onClick={() => setNavOpen(!NavOpen)}
//           aria-expanded={open}
//           className="border-0 d-block d-md-none bg-white"
//         >
//           <i
//             className="bi bi-list"
//             style={{ fontSize: "1rem", color: "black" }}
//           ></i>
//         </Button>

//         <div className="col-md-8">
//           <Search />
//         </div>
//         <div className="gap-0 pe-2 border-end d-none d-md-flex">
//           <Link to="/" className="text-decoration-none">
//             <Infor
//               icon="bi bi-house-door-fill"
//               name="Trang chủ"
//               color={{ color: "#81818a" }}
//             />
//           </Link>
//           <Link to="/login" className="text-decoration-none">
//             <Infor
//               icon="bi bi-emoji-wink"
//               name="Đăng nhập"
//               color={{ color: "#81818a" }}
//             />
//           </Link>
//         </div>
//         <div>
//           <Cart CartCount={CartCount} />
//         </div>
//       </div>
//       <Collapse in={NavOpen}>
//         <div className="mt-2 container d-md-none w-100">
//           <Link to="/" className="text-decoration-none">
//             <Infor
//               icon="bi bi-house-door-fill"
//               name="Trang chủ"
//               color={{ color: "#81818a" }}
//             />
//           </Link>
//           <Link to="/login" className="text-decoration-none">
//             <Infor
//               icon="bi bi-emoji-wink"
//               name="Đăng nhập"
//               color={{ color: "#81818a" }}
//             />
//           </Link>
//         </div>
//       </Collapse>
//     </div>
//   );
// }
// // 🛠 Thêm kiểm tra kiểu dữ liệu của prop
// Header.propTypes = {
//   CartCount: PropTypes.number.isRequired,
// };

// export default Header;

import Search from "./Search";
import Infor from "./Infor";
import Logo from "./Logo";
import React, { useState, useEffect } from "react";
import { Button, Collapse } from "react-bootstrap";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Header({ CartCount }) {
  const [NavOpen, setNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);
  

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("isLoggedIn"); 
      setIsLoggedIn(false);
    } else {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    }
  };
  
  return (
    <div className="nav collapse-lg bg-white pt-2 pb-2">
      <div className="d-flex container align-items-center justify-content-between" id="header">

        <div className="col-md-1 d-none d-md-block">
          <Logo />
        </div>
        <div className="col-md-1 d-block d-md-none">
          <Link to={"/"} style={{ color: "black" }}>
            <i className="bi bi-chevron-compact-left"></i>
          </Link>
        </div>

        <Button
          onClick={() => setNavOpen(!NavOpen)}
          aria-expanded={NavOpen}
          className="border-0 d-block d-md-none bg-white"
        >
          <i className="bi bi-list" style={{ fontSize: "1rem", color: "black" }}></i>
        </Button>
        <div className="col-md-8">
          <Search />
        </div>
        <div className="gap-0 pe-2 border-end d-none d-md-flex">
          <Link to="/" className="text-decoration-none">
            <Infor icon="bi bi-house-door-fill" name="Trang chủ" color={{ color: "#81818a" }} />
          </Link>
          <Link to={isLoggedIn ? "/" : "/login"} className="text-decoration-none" onClick={handleAuthClick}>
            <Infor
              icon={isLoggedIn ? "bi bi-box-arrow-right" : "bi bi-emoji-wink"}
              name={isLoggedIn ? "Đăng xuất" : "Đăng nhập"}
              color={{ color: "#81818a" }}
            />
          </Link>
        </div>
        <div>
          <Cart CartCount={CartCount} />
        </div>
      </div>
      <Collapse in={NavOpen}>
        <div className="mt-2 container d-md-none w-100">
          <Link to="/" className="text-decoration-none">
            <Infor icon="bi bi-house-door-fill" name="Trang chủ" color={{ color: "#81818a" }} />
          </Link>
          <Link to={isLoggedIn ? "/" : "/login"} className="text-decoration-none" onClick={handleAuthClick}>
            <Infor
              icon={isLoggedIn ? "bi bi-box-arrow-right" : "bi bi-emoji-wink"}
              name={isLoggedIn ? "Đăng xuất" : "Đăng nhập"}
              color={{ color: "#81818a" }}
            />
          </Link>
        </div>
      </Collapse>
    </div>
  );
}

Header.propTypes = {
  CartCount: PropTypes.number.isRequired,
};

export default Header;
