import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BD_name from "../components/BD_name";
import BD_infor from "../components/BD_infor";
import BD_describ from "../components/BD_describ";
import BD_pay from "../components/BD_pay";
import { useOutletContext } from "react-router-dom";

import "../App.css";

function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const { setCartCount } = useOutletContext();

    // Fetch dữ liệu từ JSON
    useEffect(() => {
        fetch("/data.json")
            .then((response) => response.json())
            .then((data) => {
                const foundBook = data.books.find((item) => item.id == id);
                setBook(foundBook);
            })
            .catch((error) => console.error("Lỗi khi tải dữ liệu:", error));
    }, [id]);

    useEffect(() => {
    }, [setCartCount]);

    // Hàm thêm vào giỏ hàng
    const addToCart = (quantity) => {
        setCartCount((prev) => prev + quantity);
    };

    if (!book) {
        return <h2 className="text-center">Sách không tồn tại hoặc đang tải...</h2>;
    }

    return (
        <>
            <div className="container mb-5 mt-5 BookDetail">
                <div className="row text-start d-flex justify-content-center">
                    {/* Hình ảnh */}
                    <div className="col-md-3">
                        <div className="card shadow" style={{ width: "100%" }}>
                            <div id="img">
                                <img src={book.images[0].medium_url} className="card-img-top" alt="..." />
                            </div>
                            <div className="card-body" id="features">
                                <h5 className="card-title">Đặc điểm nổi bật</h5>
                                <ul className="fs-6">
                                    <li>Câu chuyện cảm động về tình yêu và sự sống.</li>
                                    <li>Ngôn ngữ sâu sắc, gần gũi và tinh tế.</li>
                                    <li>Được chuyển thể thành phim điện ảnh thành công.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Chi tiết sách */}
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

                    {/* Thanh toán */}
                    <div className="col-md-3">
                        <div className="rounded-3 p-3 bg-white border" id="pay">
                            <BD_pay book={book} AddToCart={addToCart} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookDetail;
