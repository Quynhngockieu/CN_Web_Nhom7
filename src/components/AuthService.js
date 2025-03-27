// Lấy thông tin người dùng hiện tại từ localStorage
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  
  // Kiểm tra xem người dùng có phải admin không
  export const isAdmin = () => {
    const user = getCurrentUser();
    return user && user.role === "admin";
  };
  
  // Kiểm tra xem người dùng đã đăng nhập chưa
  export const isAuthenticated = () => {
    return getCurrentUser() !== null;
  };
  
  // Đăng xuất người dùng
  export const logout = () => {
    localStorage.removeItem("user");
  };
  