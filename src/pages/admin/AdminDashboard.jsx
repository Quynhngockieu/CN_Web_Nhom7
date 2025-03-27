import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAdminCRUD from "./AdminCRUD";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Button, Form, Nav, Navbar, Card } from "react-bootstrap";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [showForm, setShowForm] = useState(false);
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  const usersCRUD = useAdminCRUD("users", setShowForm);
  const booksCRUD = useAdminCRUD("books", setShowForm);
  const categoriesCRUD = useAdminCRUD("categories", setShowForm);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "admin") {
      setAdminName(user.username || "Admin");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    setShowForm(false);
  }, [activeTab]);

  return (
    <Container fluid className="admin-dashboard">
      {/* Thanh điều hướng trên cùng */}
      <Navbar bg="primary" variant="dark" expand="lg" fixed="top" className="shadow-sm p-3">
        <Container fluid>
          <Row className="w-100 align-items-center">
            <Col xs="auto">
              <Navbar.Brand className="d-flex align-items-center">
                📊 <span className="ms-2">Quản lý Admin</span>
              </Navbar.Brand>
            </Col>
            <Col className="text-end">
              <Navbar.Text className="text-white fw-bold">
                Xin chào, <span className="text-white">{adminName.charAt(0).toUpperCase() + adminName.slice(1)}</span> 👋
              </Navbar.Text>
              <Button variant="danger" className="ms-3" onClick={handleLogout}>
                Đăng xuất
              </Button>
            </Col>
          </Row>
        </Container>
      </Navbar>



      <Row>
        {/* Sidebar - Gần với thanh trên hơn */}
        <Col md={2} className="bg-dark text-white sidebar pt-3">
          <Nav className="flex-column p-2">
            <Nav.Link className={`sidebar-item ${activeTab === "users" ? "active bg-primary text-white rounded-2 mt-1" : ""}`} onClick={() => setActiveTab("users")}>
              👤 Quản lý Users
            </Nav.Link>
            <Nav.Link className={`sidebar-item ${activeTab === "books" ? "active bg-primary text-white rounded-2 mt-1" : ""}`} onClick={() => setActiveTab("books")}>
              📚 Quản lý Books
            </Nav.Link>
            <Nav.Link className={`sidebar-item ${activeTab === "categories" ? "active bg-primary text-white rounded-2 mt-1" : ""}`} onClick={() => setActiveTab("categories")}>
              🏷️ Quản lý Categories
            </Nav.Link>
          </Nav>

        </Col>

        {/* Nội dung chính */}
        <Col md={10} className="content">
          <Card className="shadow-sm p-4">
            {activeTab === "users" && (
              <>
                <h3 className="text-primary">Danh sách Users</h3>
                <Button variant="success" className="mb-3" onClick={() => setShowForm(!showForm)}>
                  {showForm ? "Ẩn" : "+ Thêm mới"}
                </Button>
                {showForm && (
                  <Form className="mb-3 border p-3 rounded bg-light">
                    <Row>
                      <Col>
                        <Form.Control
                          type="text"
                          name="username"
                          placeholder="Username"
                          value={usersCRUD.formData.username || ""}
                          onChange={usersCRUD.handleInputChange}
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={usersCRUD.formData.email || ""}
                          onChange={usersCRUD.handleInputChange}
                        />
                      </Col>
                      <Col>
                        <Button variant="primary" onClick={usersCRUD.editingId ? usersCRUD.updateItem : usersCRUD.addItem}>
                          {usersCRUD.editingId ? "Cập nhật" : "Thêm"}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}

                <Table striped bordered hover className="shadow-sm">
                  <thead className="table-dark">
                    <tr>
                      <th>STT</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersCRUD.data.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                          <Button variant="warning" className="me-2" onClick={() => usersCRUD.editItem(user.id)}>
                            ✏️ Sửa
                          </Button>
                          <Button variant="danger" onClick={() => usersCRUD.deleteItem(user.id)}>
                            ❌ Xóa
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}

            {activeTab === "books" && (
              <>
                <h3 className="text-primary">Danh sách Books</h3>
                <Button variant="success" className="mb-3" onClick={() => setShowForm(!showForm)}>
                  {showForm ? "Ẩn" : "+ Thêm mới"}
                </Button>
                {showForm && (
                  <Form className="mb-3 border p-3 rounded bg-light">
                    <Row>
                      <Col>
                        <Form.Control
                          type="text"
                          name="title"
                          placeholder="Tên sách"
                          value={booksCRUD.formData.title || ""}
                          onChange={booksCRUD.handleInputChange}
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          name="author"
                          placeholder="Tác giả"
                          value={booksCRUD.formData.author || ""}
                          onChange={booksCRUD.handleInputChange}
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="number"
                          name="price"
                          placeholder="Giá"
                          value={booksCRUD.formData.price || ""}
                          onChange={booksCRUD.handleInputChange}
                        />
                      </Col>
                      <Col>
                        <Form.Select name="category" value={booksCRUD.formData.category || ""} onChange={booksCRUD.handleInputChange}>
                          <option value="">Chọn danh mục</option>
                          {categoriesCRUD.data.map((category) => (
                            <option key={category.id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col>
                        <Button variant="primary" onClick={booksCRUD.editingId ? booksCRUD.updateItem : booksCRUD.addItem}>
                          {booksCRUD.editingId ? "Cập nhật" : "Thêm"}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}

                <Table striped bordered hover className="shadow-sm">
                  <thead className="table-dark">
                    <tr>
                      <th>STT</th>
                      <th>Tên sách</th>
                      <th>Tác giả</th>
                      <th>Giá</th>
                      <th>Danh mục</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {booksCRUD.data.map((book, index) => (
                      <tr key={book.id}>
                        <td>{index + 1}</td>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>{book.list_price} VND</td>
                        <td>{book.categories.name}</td>
                        <td>
                          <Button variant="warning" className="me-2" onClick={() => booksCRUD.editItem(book.id)}>
                            ✏️ Sửa
                          </Button>
                          <Button variant="danger" onClick={() => booksCRUD.deleteItem(book.id)}>
                            ❌ Xóa
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}

            {activeTab === "categories" && (
              <>
                <h3 className="text-primary">Danh sách Categories</h3>
                <Button variant="success" className="mb-3" onClick={() => setShowForm(!showForm)}>
                  {showForm ? "Ẩn" : "+ Thêm mới"}
                </Button>
                {showForm && (
                  <Form className="mb-3 border p-3 rounded bg-light">
                    <Row>
                      <Col>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Tên danh mục"
                          value={categoriesCRUD.formData.name || ""}
                          onChange={categoriesCRUD.handleInputChange}
                        />
                      </Col>
                      <Col>
                        <Button variant="primary" onClick={categoriesCRUD.editingId ? categoriesCRUD.updateItem : categoriesCRUD.addItem}>
                          {categoriesCRUD.editingId ? "Cập nhật" : "Thêm"}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}

                <Table striped bordered hover className="shadow-sm">
                  <thead className="table-dark">
                    <tr>
                      <th>STT</th>
                      <th>Tên danh mục</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoriesCRUD.data.map((category, index) => (
                      <tr key={category.id}>
                        <td>{index + 1}</td>
                        <td>{category.name}</td>
                        <td>
                          <Button variant="warning" className="me-2" onClick={() => categoriesCRUD.editItem(category.id)}>
                            ✏️ Sửa
                          </Button>
                          <Button variant="danger" onClick={() => categoriesCRUD.deleteItem(category.id)}>
                            ❌ Xóa
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default AdminDashboard;
