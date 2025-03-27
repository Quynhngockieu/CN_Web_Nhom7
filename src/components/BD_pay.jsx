import Currency from "./Currency";
import React, { useState } from "react";

function BD_pay({ book, AddToCart }) {
  const [quantity, SetQuantity] = useState(1);

  return (
    <>
      <h6>Số lượng</h6>
      <div className="pagination gap-1">
        <button onClick={() => SetQuantity(quantity > 1 ? quantity - 1 : 1)} className="btn btn-outline-secondary">
          <i className="bi bi-dash-lg"></i>
        </button>
        <div className="border border-secondary rounded align-self-center ps-3 pe-3 pt-2 pb-2 ">
          {quantity}
        </div>
        <button onClick={() => SetQuantity(quantity + 1)} className="btn btn-outline-secondary">
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>
      <h6>Tạm tính</h6>
      <p className="fw-medium fs-3">
        <Currency val={book.list_price * quantity} />
      </p>
      <div className="d-grid gap-2">
        <button className="btn btn-danger" type="button">
          Mua ngay
        </button>
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={() => AddToCart(quantity)}
        >
          Thêm vào giỏ
        </button>
        <button className="btn btn-outline-primary" type="button">
          Mua trước trả sau
        </button>
      </div>
    </>
  );
}

export default BD_pay;
