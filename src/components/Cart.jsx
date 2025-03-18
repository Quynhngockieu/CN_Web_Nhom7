import "../App.css";
import PropTypes from "prop-types"; // để định nghĩa kiểu dữ liệu cho CartCount
function Cart({ CartCount }) {
  console.log(CartCount);
  return (
    <button type="button" className="cart btn position-relative">
      <i className="bi bi-cart-fill" style={{ color: "#0060ff" }}></i>
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {CartCount}
        <span className="visually-hidden" aria-label="Items in Cart"></span>
      </span>
    </button>
  );
}
Cart.propTypes = {
  CartCount: PropTypes.number.isRequired, // Kiểm tra CartCount phải là số và bắt buộc có
};

export default Cart;
