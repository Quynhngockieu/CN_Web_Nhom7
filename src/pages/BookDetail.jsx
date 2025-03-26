import Footer from "../components/Footer";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
//import { books } from "../../data.json";
import BD_name from "../components/BD_name";
import BD_infor from "../components/BD_infor";
import BD_describ from "../components/BD_describ";
import BD_pay from "../components/BD_pay";
import "../App.css";

function BookDetail() {
  // React hook
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [CartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5001/books/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu sách:", error));
  }, [id]);

  // cart
  const AddToCart = () => {
    setCartCount(CartCount + 1);
  };
  if (!book) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <>
      <Header CartCount={CartCount} />
      {/* body */}
      <div className="container mb-5 mt-5 BookDetail">
        <div className="row text-start d-flex justify-content-center">
          <div className="col-md-3">
            <div className="card shadow" style={{ width: "100%" }}>
              <div id="img">
                <img
                  src={
                    book.images?.[0]?.medium_url ||
                    "https://via.placeholder.com/150"
                  }
                  className="card-img-top"
                  alt={book.name}
                />
              </div>
              <div className="card-body" id="features">
                <h5 className="card-title">Đặc điểm nổi bật</h5>
                <ul className="fs-6">
                  <li>{book.short_description || "Thông tin chưa cập nhật"}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="border rounded-3 p-3 bg-white" id="name">
              <BD_name book={book} />
            </div>
            <div className="border rounded-3 p-3 bg-white" id="infor">
              <BD_infor book={book} />
            </div>
            <div className="border mt-4 rounded-3 p-3 bg-white" id="describ">
              <BD_describ book={book} />
            </div>
          </div>

          <div className="col-md-3">
            <div className=" rounded-3 p-3 bg-white border" id="pay">
              <BD_pay book={book} AddToCart={AddToCart} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BookDetail;
