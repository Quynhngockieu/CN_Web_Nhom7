import React, { useEffect, useState } from "react";
import Book from "../components/Book";
import { books } from "../../data.json";
import CardL from "../components/Card_HP";
import BreadCrumb from "../components/BreadCrumb";
import CusPagination from "../components/CusPagination";
import "../App.css";
import { isAdmin } from "../components/AuthService";

function HomePage() {
  const [admin, setAdmin] = useState(false);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAdmin(isAdmin());
    fetch("/api/books")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Lỗi Server: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setBooks(data))
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách sách:", error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div className="alert alert-danger">Lỗi: {error}</div>;
  }

  return (
    <div className="container">
      <BreadCrumb />
      <div className="row d-flex justify-content-center">
        <div className="col-md-2 d-none d-lg-block">
          <CardL books={books} />
        </div>
        <div className="col-md-10" id="book">
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
            {books.map((book, index) => (
              <div key={index} className="col d-flex flex-wrap mb-3">
                <Book data={book} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <CusPagination />
      </div>
    </div>
  );
}

export default HomePage;
